import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { setVisibility, canShareWithSquad } from '../../src/project/privacy.js'

describe('project/privacy', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-privacy-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    const dir = path.join(tmpDir, 'docs', 'knowledge', 'test')
    await fs.ensureDir(dir)
    await fs.writeFile(path.join(dir, 'manifest.yaml'), yaml.dump({
      slug: 'test', name: 'Test', visibility: 'private',
      market_profile: 'pt-br-massa', tone: 'professional',
      created_at: new Date().toISOString(), tags: [], shared_substrates: [],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  describe('setVisibility', () => {
    it('changes visibility level', async () => {
      const manifest = await setVisibility('test', 'public')
      expect(manifest.visibility).toBe('public')
    })

    it('rejects invalid visibility', async () => {
      await expect(setVisibility('test', 'invalid')).rejects.toThrow('Invalid visibility')
    })
  })

  describe('canShareWithSquad', () => {
    it('allows public projects to share with any squad', () => {
      expect(canShareWithSquad('public', 'advertising')).toBe(true)
      expect(canShareWithSquad('public', 'visual')).toBe(true)
    })

    it('allows private projects to share with any squad', () => {
      expect(canShareWithSquad('private', 'copywriting')).toBe(true)
    })

    it('blocks personal projects from commercial squads', () => {
      expect(canShareWithSquad('personal', 'advertising')).toBe(false)
      expect(canShareWithSquad('personal', 'copywriting')).toBe(false)
    })

    it('allows personal projects to share with non-commercial squads', () => {
      expect(canShareWithSquad('personal', 'visual')).toBe(true)
      expect(canShareWithSquad('personal', 'design')).toBe(true)
    })
  })
})
