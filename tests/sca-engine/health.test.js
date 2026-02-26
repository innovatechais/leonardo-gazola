import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject } from '../../src/project/registry.js'
import { writeSubstrate } from '../../src/sca-engine/writer.js'
import { writeBlock } from '../../src/sca-engine/composer.js'
import { healthCheck } from '../../src/sca-engine/health.js'

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

describe('healthCheck', () => {
  it('returns zero totals for empty project', async () => {
    await createProject('empty', { name: 'Empty' })
    const report = await healthCheck('empty')

    expect(report.totals.substrates).toBe(0)
    expect(report.totals.blocks).toBe(0)
    expect(report.totals.contexts).toBe(0)
    expect(report.totals.outputs).toBe(0)
    expect(report.stale).toHaveLength(0)
    expect(report.orphans).toHaveLength(0)
    expect(report.unused).toHaveLength(0)
  })

  it('detects stale blocks', async () => {
    await createProject('stale-h', { name: 'Stale' })
    await writeSubstrate('stale-h', {
      id: 'S1', title: 'Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Content')
    await writeBlock('stale-h', {
      id: 'A1', title: 'Stale Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'stale', compiled_at: now,
    }, 'Compiled')

    const report = await healthCheck('stale-h')
    expect(report.stale).toHaveLength(1)
    expect(report.stale[0].id).toBe('A1')
  })

  it('detects orphan substrates', async () => {
    await createProject('orphan-h', { name: 'Orphan' })
    await writeSubstrate('orphan-h', {
      id: 'S1', title: 'Orphan Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Not referenced by any block')

    const report = await healthCheck('orphan-h')
    expect(report.orphans).toHaveLength(1)
    expect(report.orphans[0].id).toBe('S1')
  })

  it('detects unused blocks', async () => {
    await createProject('unused-h', { name: 'Unused' })
    await writeSubstrate('unused-h', {
      id: 'S1', title: 'Sub', category: 'product',
      version: 1, status: 'approved', created_at: now, updated_at: now,
    }, 'Content')
    await writeBlock('unused-h', {
      id: 'A1', title: 'Unused Block', funnel_stage: 'awareness',
      substrates: ['S1'], version: 1, status: 'current', compiled_at: now,
    }, 'No context references this')

    const report = await healthCheck('unused-h')
    expect(report.unused).toHaveLength(1)
    expect(report.unused[0].id).toBe('A1')
  })

  it('reports healthy project correctly', async () => {
    await createProject('healthy', { name: 'Healthy' })
    const report = await healthCheck('healthy')
    expect(report.stale).toHaveLength(0)
    expect(report.orphans).toHaveLength(0)
  })
})
