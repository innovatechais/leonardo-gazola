import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject } from '../../src/project/registry.js'
import { writeSubstrate } from '../../src/sca-engine/writer.js'
import { writeBlock } from '../../src/sca-engine/composer.js'
import { saveContext } from '../../src/sca-engine/context-generator.js'
import { impactAnalysis } from '../../src/sca-engine/impact.js'

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

const now = '2026-02-25T00:00:00Z'

describe('impactAnalysis', () => {
  it('finds blocks referencing substrate', async () => {
    await createProject('imp1', { name: 'Imp1' })
    await writeSubstrate('imp1', {
      id: 'S1', title: 'Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Content')
    await writeBlock('imp1', {
      id: 'A1', title: 'Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current', compiled_at: now,
    }, 'Compiled')

    const result = await impactAnalysis('S1', 'imp1')
    expect(result.blocks).toHaveLength(1)
    expect(result.blocks[0].id).toBe('A1')
  })

  it('returns empty when no references', async () => {
    await createProject('imp2', { name: 'Imp2' })
    await writeSubstrate('imp2', {
      id: 'S1', title: 'Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Content')

    const result = await impactAnalysis('S1', 'imp2')
    expect(result.blocks).toHaveLength(0)
    expect(result.contexts).toHaveLength(0)
  })

  it('finds cascading impact to contexts', async () => {
    await createProject('imp3', { name: 'Imp3' })
    await writeSubstrate('imp3', {
      id: 'S1', title: 'Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Content')
    await writeBlock('imp3', {
      id: 'A1', title: 'Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current', compiled_at: now,
    }, 'Compiled')
    await saveContext('imp3', 'test-squad', {
      project: 'imp3', squad: 'test-squad', generated_at: now,
      substrates_included: ['S1'], blocks_included: ['A1'], stale_blocks: [],
    }, 'Context content')

    const result = await impactAnalysis('S1', 'imp3')
    expect(result.blocks).toHaveLength(1)
    expect(result.contexts).toHaveLength(1)
    expect(result.contexts[0].squad).toBe('test-squad')
  })
})
