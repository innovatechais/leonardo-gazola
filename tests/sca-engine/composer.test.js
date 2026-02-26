import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { composeBlock, checkStaleness, writeBlock, markStale } from '../../src/sca-engine/composer.js'
import { writeSubstrate } from '../../src/sca-engine/writer.js'
import { BrokenReferenceError } from '../../src/shared/errors.js'

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

async function createTestSubstrate(project, id, title, category, content, updatedAt) {
  const now = updatedAt || '2026-02-25T00:00:00Z'
  await writeSubstrate(project, {
    id, title, category, version: 1, status: 'approved',
    created_at: '2026-02-25T00:00:00Z', updated_at: now,
  }, content)
}

describe('composeBlock', () => {
  it('composes block from substrates', async () => {
    await createTestSubstrate('proj1', 'S1', 'First', 'product', 'Content one')
    await createTestSubstrate('proj1', 'S2', 'Second', 'pain', 'Content two')

    const blockDef = {
      id: 'A1', title: 'Test Block', funnel_stage: 'awareness',
      substrates: ['S1', 'S2'], version: 1, status: 'current',
      compiled_at: '2026-02-26T00:00:00Z',
    }

    const result = await composeBlock(blockDef, 'proj1')
    expect(result.compiledContent).toContain('Content one')
    expect(result.compiledContent).toContain('Content two')
    expect(result.substrates).toHaveLength(2)
    expect(result.staleness).toBe(false)
  })

  it('throws BrokenReferenceError for missing substrate', async () => {
    await createTestSubstrate('proj2', 'S1', 'First', 'product', 'Content')

    const blockDef = {
      id: 'A1', title: 'Test', funnel_stage: 'awareness',
      substrates: ['S1', 'S99'], version: 1, status: 'current',
      compiled_at: '2026-02-25T00:00:00Z',
    }

    await expect(composeBlock(blockDef, 'proj2')).rejects.toThrow(BrokenReferenceError)
  })

  it('detects staleness when substrate was updated after compilation', async () => {
    await createTestSubstrate('proj3', 'S1', 'First', 'product', 'Content', '2026-02-28T00:00:00Z')

    const blockDef = {
      id: 'A1', title: 'Test', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current',
      compiled_at: '2026-02-25T00:00:00Z',
    }

    const result = await composeBlock(blockDef, 'proj3')
    expect(result.staleness).toBe(true)
  })
})

describe('checkStaleness', () => {
  it('returns false for current block', async () => {
    await createTestSubstrate('stale-test', 'S1', 'Sub', 'product', 'Content')

    const blockFm = {
      id: 'A1', title: 'Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current',
      compiled_at: '2026-12-31T00:00:00Z',
    }
    const { filePath } = await writeBlock('stale-test', blockFm, 'Compiled')

    const result = await checkStaleness(filePath, 'stale-test')
    expect(result).toBe(false)
  })

  it('returns true for stale block', async () => {
    await createTestSubstrate('stale-test2', 'S1', 'Sub', 'product', 'Content', '2026-06-01T00:00:00Z')

    const blockFm = {
      id: 'A1', title: 'Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current',
      compiled_at: '2026-01-01T00:00:00Z',
    }
    const { filePath } = await writeBlock('stale-test2', blockFm, 'Compiled')

    const result = await checkStaleness(filePath, 'stale-test2')
    expect(result).toBe(true)
  })
})

describe('markStale', () => {
  it('updates block status to stale', async () => {
    await createTestSubstrate('mark-test', 'S1', 'Sub', 'product', 'Content')

    const blockFm = {
      id: 'A1', title: 'Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current',
      compiled_at: '2026-02-25T00:00:00Z',
    }
    const { filePath } = await writeBlock('mark-test', blockFm, 'Content')

    await markStale(filePath)

    const { frontmatter } = await import('../../src/shared/fs-utils.js').then(m => m.readWithFrontmatter(filePath))
    expect(frontmatter.status).toBe('stale')
  })
})
