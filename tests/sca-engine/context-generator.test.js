import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject } from '../../src/project/registry.js'
import { writeSubstrate } from '../../src/sca-engine/writer.js'
import { writeBlock } from '../../src/sca-engine/composer.js'
import { generateContext, saveContext, loadSquadNeeds, loadSubstratesByCategory, loadBlocksByStage } from '../../src/sca-engine/context-generator.js'

let tmpDir, originalEnv

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(path.join(tmpDir, 'docs', 'knowledge'))
  await fs.ensureDir(path.join(tmpDir, 'config'))
  await fs.copy(
    path.join(process.cwd(), 'config', 'squad-context-map.yaml'),
    path.join(tmpDir, 'config', 'squad-context-map.yaml')
  )
  originalEnv = process.env.NEXUS_ROOT
  process.env.NEXUS_ROOT = tmpDir
})

afterEach(async () => {
  process.env.NEXUS_ROOT = originalEnv
  await fs.remove(tmpDir)
})

const now = '2026-02-25T00:00:00Z'

async function seedProject(slug) {
  await createProject(slug, { name: slug })
  await writeSubstrate(slug, {
    id: 'S1', title: 'Product', category: 'product',
    version: 1, status: 'approved', created_at: now, updated_at: now,
  }, 'Product content')
  await writeSubstrate(slug, {
    id: 'S2', title: 'Pain', category: 'pain',
    version: 1, status: 'approved', created_at: now, updated_at: now,
  }, 'Pain content')
  await writeBlock(slug, {
    id: 'A1', title: 'Awareness Block', funnel_stage: 'awareness',
    substrates: ['S1', 'S2'], version: 1, status: 'current', compiled_at: now,
  }, 'Compiled block content')
}

describe('loadSquadNeeds', () => {
  it('loads squad config', async () => {
    const needs = await loadSquadNeeds('direct-response-creator')
    expect(needs.categories).toContain('product')
    expect(needs.funnel_stages).toContain('awareness')
  })

  it('throws for unknown squad', async () => {
    await expect(loadSquadNeeds('nonexistent')).rejects.toThrow()
  })
})

describe('loadSubstratesByCategory', () => {
  it('filters substrates by category', async () => {
    await seedProject('filter-test')
    const subs = await loadSubstratesByCategory('filter-test', ['product'])
    expect(subs).toHaveLength(1)
    expect(subs[0].frontmatter.id).toBe('S1')
  })

  it('returns empty for unmatched categories', async () => {
    await seedProject('empty-cat')
    const subs = await loadSubstratesByCategory('empty-cat', ['identity'])
    expect(subs).toHaveLength(0)
  })
})

describe('loadBlocksByStage', () => {
  it('filters blocks by stage', async () => {
    await seedProject('block-filter')
    const blocks = await loadBlocksByStage('block-filter', ['awareness'])
    expect(blocks).toHaveLength(1)
    expect(blocks[0].frontmatter.id).toBe('A1')
  })

  it('returns empty for no stages', async () => {
    const blocks = await loadBlocksByStage('any', [])
    expect(blocks).toHaveLength(0)
  })
})

describe('generateContext', () => {
  it('generates full context for a squad', async () => {
    await seedProject('ctx-gen')
    const { frontmatter, content } = await generateContext('ctx-gen', 'direct-response-creator')

    expect(frontmatter.project).toBe('ctx-gen')
    expect(frontmatter.squad).toBe('direct-response-creator')
    expect(frontmatter.substrates_included).toContain('S1')
    expect(frontmatter.blocks_included).toContain('A1')
    expect(content).toContain('Product content')
    expect(content).toContain('Compiled block content')
  })

  it('detects stale blocks', async () => {
    await seedProject('stale-ctx')
    // Create a stale block
    await writeBlock('stale-ctx', {
      id: 'C1', title: 'Stale', funnel_stage: 'consideration',
      substrates: ['S1'], version: 1, status: 'stale', compiled_at: now,
    }, 'Stale content')

    const { staleBlocks } = await generateContext('stale-ctx', 'direct-response-creator')
    expect(staleBlocks.some(b => b.frontmatter.id === 'C1')).toBe(true)
  })
})

describe('saveContext', () => {
  it('saves context file', async () => {
    await seedProject('save-ctx')
    const { frontmatter, content } = await generateContext('save-ctx', 'direct-response-creator')
    const filePath = await saveContext('save-ctx', 'direct-response-creator', frontmatter, content)

    expect(await fs.pathExists(filePath)).toBe(true)
    expect(filePath).toContain('direct-response-creator-context.md')
  })
})
