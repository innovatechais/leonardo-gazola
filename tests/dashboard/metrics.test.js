import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { getDashboardMetrics, formatDashboard } from '../../src/dashboard/metrics.js'

describe('dashboard/metrics', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-dashboard-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    // Create a project
    const projDir = path.join(tmpDir, 'docs', 'knowledge', 'test')
    await fs.ensureDir(path.join(projDir, 'substrates'))
    await fs.ensureDir(path.join(projDir, 'blocks'))
    await fs.ensureDir(path.join(projDir, 'contexts'))
    await fs.ensureDir(path.join(projDir, 'outputs'))
    await fs.writeFile(path.join(projDir, 'manifest.yaml'), yaml.dump({
      slug: 'test', name: 'Test', visibility: 'private', market_profile: 'pt-br-massa',
      tone: 'professional', created_at: new Date().toISOString(), tags: [], shared_substrates: [],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('returns dashboard metrics', async () => {
    const metrics = await getDashboardMetrics()
    expect(metrics.totalProjects).toBe(1)
    expect(metrics.projects[0].slug).toBe('test')
  })

  it('includes routing log metrics when log exists', async () => {
    await fs.ensureDir(path.join(tmpDir, '.aios'))
    await fs.writeFile(path.join(tmpDir, '.aios', 'routing-log.yaml'), yaml.dump({
      entries: [
        { matched_squad: 'dr-squad' },
        { matched_squad: 'dr-squad' },
        { matched_squad: 'agencia' },
      ],
    }))

    const metrics = await getDashboardMetrics()
    expect(metrics.routingRequests).toBe(3)
    expect(metrics.topSquads[0][0]).toBe('dr-squad')
    expect(metrics.topSquads[0][1]).toBe(2)
  })

  it('formats dashboard output', () => {
    const formatted = formatDashboard({
      totalProjects: 2,
      totalSubstrates: 10,
      totalBlocks: 5,
      totalOutputs: 3,
      routingRequests: 15,
      topSquads: [['dr-squad', 10]],
      projects: [{ slug: 'test', visibility: 'private', substrates: 10, blocks: 5, outputs: 3 }],
    })
    expect(formatted).toContain('NEXUS Dashboard')
    expect(formatted).toContain('Projects: 2')
    expect(formatted).toContain('dr-squad: 10 requests')
  })
})
