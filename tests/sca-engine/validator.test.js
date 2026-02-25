import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { validateSubstrateSchema, validateWordCount, checkDuplicateCategory, validateSubstrate } from '../../src/sca-engine/validator.js'
import { writeSubstrate } from '../../src/sca-engine/writer.js'
import { SchemaError, WordCountExceededError } from '../../src/shared/errors.js'

let tmpDir, originalEnv

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(path.join(tmpDir, 'docs', 'knowledge'))
  originalEnv = process.env.NEXUS_ROOT
  process.env.NEXUS_ROOT = tmpDir
})

afterEach(async () => {
  process.env.NEXUS_ROOT = originalEnv
  await fs.remove(tmpDir)
})

describe('validateSubstrateSchema', () => {
  it('validates valid frontmatter', () => {
    const result = validateSubstrateSchema({
      id: 'S1',
      title: 'Test',
      category: 'product',
      created_at: '2026-02-25T00:00:00Z',
      updated_at: '2026-02-25T00:00:00Z',
    })
    expect(result.id).toBe('S1')
    expect(result.version).toBe(1)
    expect(result.status).toBe('draft')
  })

  it('rejects invalid id', () => {
    expect(() => validateSubstrateSchema({
      id: 'X1',
      title: 'Test',
      category: 'product',
      created_at: '2026-02-25T00:00:00Z',
      updated_at: '2026-02-25T00:00:00Z',
    })).toThrow(SchemaError)
  })

  it('rejects invalid category', () => {
    expect(() => validateSubstrateSchema({
      id: 'S1',
      title: 'Test',
      category: 'unknown',
      created_at: '2026-02-25T00:00:00Z',
      updated_at: '2026-02-25T00:00:00Z',
    })).toThrow(SchemaError)
  })
})

describe('validateWordCount', () => {
  it('accepts content within limit', () => {
    const count = validateWordCount('one two three four five')
    expect(count).toBe(5)
  })

  it('rejects content exceeding 200 words', () => {
    const longContent = Array.from({ length: 210 }, (_, i) => `word${i}`).join(' ')
    expect(() => validateWordCount(longContent)).toThrow(WordCountExceededError)
  })

  it('accepts exactly 200 words', () => {
    const content = Array.from({ length: 200 }, (_, i) => `word${i}`).join(' ')
    const count = validateWordCount(content)
    expect(count).toBe(200)
  })
})

describe('checkDuplicateCategory', () => {
  it('returns false when no duplicates', async () => {
    const result = await checkDuplicateCategory('testproj', 'product')
    expect(result.duplicate).toBe(false)
  })

  it('detects duplicate category', async () => {
    const now = new Date().toISOString()
    await writeSubstrate('dup-check', {
      id: 'S1', title: 'Existing', category: 'product',
      version: 1, status: 'draft', created_at: now, updated_at: now,
    }, 'Content here')

    const result = await checkDuplicateCategory('dup-check', 'product')
    expect(result.duplicate).toBe(true)
    expect(result.existingId).toBe('S1')
  })

  it('excludes current id from duplicate check', async () => {
    const now = new Date().toISOString()
    await writeSubstrate('dup-excl', {
      id: 'S1', title: 'Existing', category: 'product',
      version: 1, status: 'draft', created_at: now, updated_at: now,
    }, 'Content')

    const result = await checkDuplicateCategory('dup-excl', 'product', 'S1')
    expect(result.duplicate).toBe(false)
  })
})

describe('validateSubstrate', () => {
  it('returns valid result with no warnings', async () => {
    const now = new Date().toISOString()
    const result = await validateSubstrate('clean-proj', {
      id: 'S1', title: 'Test', category: 'product',
      version: 1, status: 'draft', created_at: now, updated_at: now,
    }, 'Short content here')

    expect(result.valid).toBe(true)
    expect(result.warnings).toHaveLength(0)
    expect(result.wordCount).toBe(3)
  })

  it('includes sensitive content warning', async () => {
    const now = new Date().toISOString()
    const result = await validateSubstrate('sens-proj', {
      id: 'S1', title: 'Test', category: 'product',
      version: 1, status: 'draft', created_at: now, updated_at: now,
    }, 'Contact user@example.com for info')

    expect(result.warnings.some(w => w.type === 'sensitive_content')).toBe(true)
  })
})
