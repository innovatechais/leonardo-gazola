import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import { saveOutput, listOutputs, getOutput, detectMarketProfile } from '../../src/squad-adapter/output-manager.js'

describe('squad-adapter/output-manager', () => {
  let tmpDir
  let originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-output-test-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    // Create project manifest
    const knowledgeDir = path.join(tmpDir, 'docs', 'knowledge', 'test-project')
    await fs.ensureDir(knowledgeDir)
    const yaml = await import('js-yaml')
    await fs.writeFile(path.join(knowledgeDir, 'manifest.yaml'), yaml.default.dump({
      slug: 'test-project',
      name: 'Test Project',
      market_profile: 'pt-br-premium',
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  describe('saveOutput', () => {
    it('saves output with frontmatter and traceability footer', async () => {
      const result = await saveOutput('test-project', 'dr-squad', 'landing-page', '# Landing Page\n\nContent here.')
      expect(result.id).toBe('O1')
      expect(result.frontmatter.type).toBe('landing-page')
      expect(result.frontmatter.squad).toBe('dr-squad')
      expect(result.frontmatter.status).toBe('draft')
    })

    it('auto-increments output ID', async () => {
      await saveOutput('test-project', 'squad', 'type1', 'Content 1')
      const second = await saveOutput('test-project', 'squad', 'type2', 'Content 2')
      expect(second.id).toBe('O2')
    })

    it('includes market profile in frontmatter', async () => {
      const result = await saveOutput('test-project', 'squad', 'type', 'Content', {
        marketProfile: 'en-us',
      })
      expect(result.frontmatter.market_profile).toBe('en-us')
    })

    it('defaults market profile to pt-br-massa', async () => {
      const result = await saveOutput('test-project', 'squad', 'type', 'Content')
      expect(result.frontmatter.market_profile).toBe('pt-br-massa')
    })

    it('includes substrates and blocks used', async () => {
      const result = await saveOutput('test-project', 'squad', 'type', 'Content', {
        substratesUsed: ['S1', 'S2'],
        blocksUsed: ['A1'],
      })
      expect(result.frontmatter.substrates_used).toEqual(['S1', 'S2'])
      expect(result.frontmatter.blocks_used).toEqual(['A1'])
    })
  })

  describe('listOutputs', () => {
    it('returns empty array when no outputs', async () => {
      const outputs = await listOutputs('test-project')
      expect(outputs).toEqual([])
    })

    it('lists outputs sorted by ID', async () => {
      await saveOutput('test-project', 'squad', 'type1', 'A')
      await saveOutput('test-project', 'squad', 'type2', 'B')
      await saveOutput('test-project', 'squad', 'type3', 'C')

      const outputs = await listOutputs('test-project')
      expect(outputs).toHaveLength(3)
      expect(outputs[0].id).toBe('O1')
      expect(outputs[2].id).toBe('O3')
    })
  })

  describe('getOutput', () => {
    it('retrieves output by ID', async () => {
      await saveOutput('test-project', 'squad', 'landing-page', 'LP content here')
      const output = await getOutput('test-project', 'O1')
      expect(output.frontmatter.type).toBe('landing-page')
      expect(output.content).toContain('LP content here')
    })

    it('throws for nonexistent output', async () => {
      await expect(getOutput('test-project', 'O99')).rejects.toThrow("Output 'O99' not found")
    })
  })

  describe('detectMarketProfile', () => {
    it('detects market profile from manifest', async () => {
      const profile = await detectMarketProfile('test-project')
      expect(profile).toBe('pt-br-premium')
    })

    it('defaults to pt-br-massa when manifest missing', async () => {
      const profile = await detectMarketProfile('nonexistent')
      expect(profile).toBe('pt-br-massa')
    })
  })
})
