import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { executeCampaign } from '../../src/campaign/executor.js'

describe('campaign/executor', () => {
  let tmpDir
  let originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-campaign-exec-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    // Setup pipeline
    const pipelinesDir = path.join(tmpDir, 'config', 'pipelines')
    await fs.ensureDir(pipelinesDir)
    await fs.writeFile(path.join(pipelinesDir, 'test-pipeline.yaml'), yaml.dump({
      name: 'test-pipeline',
      version: 1,
      steps: [
        { id: 'step-1', name: 'Copy', squad: 'test-squad', output_type: 'landing-page', input_from: 'context', output_to: 'final', checkpoint: false },
      ],
    }))

    // Setup squad
    const squadDir = path.join(tmpDir, 'squads', 'test-squad')
    await fs.ensureDir(squadDir)
    await fs.writeFile(path.join(squadDir, 'squad.yaml'), yaml.dump({
      name: 'test-squad',
      agents: [{ id: 'a1', name: 'Agent1', role: 'Worker' }],
    }))
    await fs.writeFile(path.join(squadDir, 'capabilities.yaml'), yaml.dump({
      name: 'test-squad',
      category: 'test',
      produces: ['landing-page'],
      requires: [],
      funnel_stages: [],
      market_profiles: [],
      agents_count: 1,
      pipeline_order: ['a1'],
    }))

    // Campaigns dir
    await fs.ensureDir(path.join(tmpDir, 'campaigns'))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('executes a simple pipeline successfully', async () => {
    const result = await executeCampaign('test-pipeline', 'test-project', { noCheckpoint: true })
    expect(result.status).toBe('completed')
    expect(result.stepResults).toHaveLength(1)
    expect(result.stepResults[0].status).toBe('completed')
  })

  it('generates report file', async () => {
    const result = await executeCampaign('test-pipeline', 'test-project', { noCheckpoint: true })
    expect(result.reportPath).toBeDefined()
    const report = await fs.readFile(result.reportPath, 'utf-8')
    expect(report).toContain('Campaign Report')
    expect(report).toContain('test-pipeline')
    expect(report).toContain('COMPLETED')
  })

  it('creates campaign directory', async () => {
    const result = await executeCampaign('test-pipeline', 'test-project', { noCheckpoint: true })
    const exists = await fs.pathExists(result.campaignDir)
    expect(exists).toBe(true)
  })

  it('calls onProgress callback', async () => {
    const messages = []
    await executeCampaign('test-pipeline', 'test-project', {
      noCheckpoint: true,
      onProgress: (msg) => messages.push(msg),
    })
    expect(messages.length).toBeGreaterThan(0)
    expect(messages.some(m => m.includes('Step'))).toBe(true)
  })

  it('rejects invalid pipeline', async () => {
    const pipelinesDir = path.join(tmpDir, 'config', 'pipelines')
    await fs.writeFile(path.join(pipelinesDir, 'bad.yaml'), yaml.dump({
      name: 'bad',
      steps: [],
    }))
    await expect(executeCampaign('bad', 'test')).rejects.toThrow('Invalid pipeline')
  })
})
