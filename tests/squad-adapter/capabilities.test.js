import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { findSquadsByOutput, findSquadsByCategory, findSquadsByRequirements } from '../../src/squad-adapter/capabilities.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('squad-adapter/capabilities', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  describe('findSquadsByOutput', () => {
    it('finds squads that produce landing-page', async () => {
      const squads = await findSquadsByOutput('landing-page')
      const names = squads.map(s => s.name)
      expect(names).toContain('direct-response-creator')
    })

    it('returns empty for unknown output', async () => {
      const squads = await findSquadsByOutput('nonexistent-output')
      expect(squads).toHaveLength(0)
    })

    it('finds multiple squads for shared output type', async () => {
      const squads = await findSquadsByOutput('carousel')
      expect(squads.some(s => s.name === 'agencia-squad')).toBe(true)
    })
  })

  describe('findSquadsByCategory', () => {
    it('finds copywriting squads', async () => {
      const squads = await findSquadsByCategory('copywriting')
      expect(squads).toHaveLength(1)
      expect(squads[0].name).toBe('direct-response-creator')
    })

    it('finds visual squads', async () => {
      const squads = await findSquadsByCategory('visual')
      expect(squads).toHaveLength(1)
      expect(squads[0].name).toBe('agencia-squad')
    })

    it('returns empty for unknown category', async () => {
      const squads = await findSquadsByCategory('nonexistent')
      expect(squads).toHaveLength(0)
    })
  })

  describe('findSquadsByRequirements', () => {
    it('finds squads that require product', async () => {
      const squads = await findSquadsByRequirements(['product'])
      const names = squads.map(s => s.name)
      expect(names).toContain('direct-response-creator')
      expect(names).toContain('agencia-squad')
    })

    it('finds squads matching any of multiple categories', async () => {
      const squads = await findSquadsByRequirements(['proof'])
      const names = squads.map(s => s.name)
      expect(names).toContain('direct-response-creator')
      expect(names).toContain('clickbank-ads-squad')
    })

    it('returns empty when no match', async () => {
      const squads = await findSquadsByRequirements(['nonexistent'])
      expect(squads).toHaveLength(0)
    })
  })
})
