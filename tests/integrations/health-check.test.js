import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { listIntegrations, checkHealth } from '../../src/integrations/health-check.js'

describe('integrations/health-check', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-integrations-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    const intDir = path.join(tmpDir, 'config', 'integrations')
    await fs.ensureDir(intDir)
    await fs.writeFile(path.join(intDir, 'test-service.yaml'), yaml.dump({
      name: 'test-service', type: 'deployment', enabled: true, required_env: ['TEST_TOKEN'],
    }))
    await fs.writeFile(path.join(intDir, 'no-env.yaml'), yaml.dump({
      name: 'no-env', type: 'utility', enabled: true, required_env: [],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('lists integrations', async () => {
    const integrations = await listIntegrations()
    expect(integrations).toHaveLength(2)
  })

  it('checks health — ready when no env needed', async () => {
    const result = await checkHealth('no-env')
    expect(result.status).toBe('ready')
  })

  it('checks health — misconfigured when env missing', async () => {
    const result = await checkHealth('test-service')
    expect(result.status).toBe('misconfigured')
    expect(result.missingEnv).toContain('TEST_TOKEN')
  })

  it('returns not_configured for unknown service', async () => {
    const result = await checkHealth('nonexistent')
    expect(result.status).toBe('not_configured')
  })
})
