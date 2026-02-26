import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import { buildBrief, saveBrief, loadBrief, buildDefaultBrief } from '../../src/campaign/brief-builder.js'

describe('campaign/brief-builder', () => {
  let tmpDir

  beforeEach(async () => {
    tmpDir = path.join(os.tmpdir(), `nexus-brief-${Date.now()}`)
    await fs.ensureDir(tmpDir)
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('builds brief from answers', () => {
    const brief = buildBrief({
      name: 'Summer Campaign',
      objective: 'Increase sales',
      audience: 'Young professionals',
      tone: 'casual',
      pipeline: 'full-campaign',
    })
    expect(brief.name).toBe('Summer Campaign')
    expect(brief.objective).toBe('Increase sales')
    expect(brief.tone).toBe('casual')
  })

  it('provides defaults for missing fields', () => {
    const brief = buildBrief({})
    expect(brief.name).toBe('Untitled Campaign')
    expect(brief.tone).toBe('professional')
    expect(brief.pipeline).toBe('full-campaign')
    expect(brief.market_profile).toBe('pt-br-massa')
  })

  it('saves and loads brief', async () => {
    const brief = buildBrief({ name: 'Test' })
    await saveBrief(tmpDir, brief)
    const loaded = await loadBrief(tmpDir)
    expect(loaded.name).toBe('Test')
  })

  it('returns null for missing brief', async () => {
    const loaded = await loadBrief(tmpDir)
    expect(loaded).toBeNull()
  })

  it('builds default brief from project and pipeline', () => {
    const brief = buildDefaultBrief('evidex', 'landing-page')
    expect(brief.name).toBe('landing-page for evidex')
    expect(brief.pipeline).toBe('landing-page')
  })
})
