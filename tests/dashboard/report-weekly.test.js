import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { generateWeeklyReport, saveWeeklyReport } from '../../src/dashboard/report-weekly.js'

describe('dashboard/report-weekly', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-weekly-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

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

  it('generates weekly report markdown', async () => {
    const report = await generateWeeklyReport()
    expect(report).toContain('Weekly Report')
    expect(report).toContain('Metrics')
    expect(report).toContain('Projects')
  })

  it('includes suggested actions', async () => {
    const report = await generateWeeklyReport()
    expect(report).toContain('Suggested Actions')
  })

  it('saves report to docs/reports/', async () => {
    const content = '# Test Report\n\nContent here'
    const filePath = await saveWeeklyReport(content)
    expect(filePath).toContain('docs/reports/weekly-')
    expect(await fs.pathExists(filePath)).toBe(true)
  })
})
