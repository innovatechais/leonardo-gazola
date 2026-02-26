import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { listSquads, getSquad, getSquadDetails } from '../../src/squad-adapter/registry.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('squad-adapter/registry', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  describe('listSquads', () => {
    it('returns all squads with capabilities', async () => {
      const squads = await listSquads()
      expect(squads.length).toBeGreaterThanOrEqual(4)
    })

    it('sorts squads alphabetically by name', async () => {
      const squads = await listSquads()
      const names = squads.map(s => s.name)
      expect(names).toEqual([...names].sort())
    })

    it('includes registered flag for squads with capabilities.yaml', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.registered).toBe(true)
    })

    it('flags unregistered squads without capabilities.yaml', async () => {
      const squads = await listSquads()
      const unreg = squads.find(s => s.name === 'unregistered-squad')
      expect(unreg).toBeDefined()
      expect(unreg.registered).toBe(false)
      expect(unreg.category).toBe('unknown')
    })

    it('includes produces array', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.produces).toContain('landing-page')
      expect(dr.produces).toContain('tsl')
    })

    it('includes requires array', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.requires).toContain('product')
      expect(dr.requires).toContain('pain')
    })

    it('includes category', async () => {
      const squads = await listSquads()
      const ag = squads.find(s => s.name === 'agencia-squad')
      expect(ag.category).toBe('visual')
    })

    it('includes agents_count', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.agents_count).toBe(8)
    })

    it('unregistered squad gets agents_count from squad.yaml', async () => {
      const squads = await listSquads()
      const unreg = squads.find(s => s.name === 'unregistered-squad')
      expect(unreg.agents_count).toBe(1)
    })

    it('includes pipeline_order', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.pipeline_order).toEqual(['rex', 'psyche', 'vera', 'quill', 'reel', 'spark', 'sage', 'judge'])
    })

    it('includes funnel_stages', async () => {
      const squads = await listSquads()
      const dr = squads.find(s => s.name === 'direct-response-creator')
      expect(dr.funnel_stages).toContain('awareness')
    })

    it('includes market_profiles', async () => {
      const squads = await listSquads()
      const cb = squads.find(s => s.name === 'clickbank-ads-squad')
      expect(cb.market_profiles).toEqual(['en-us'])
    })
  })

  describe('getSquad', () => {
    it('returns a specific squad by name', async () => {
      const squad = await getSquad('direct-response-creator')
      expect(squad.name).toBe('direct-response-creator')
      expect(squad.category).toBe('copywriting')
    })

    it('throws for unknown squad', async () => {
      await expect(getSquad('nonexistent')).rejects.toThrow("Squad 'nonexistent' not found")
    })
  })

  describe('getSquadDetails', () => {
    it('returns capabilities and squad.yaml data', async () => {
      const { capabilities, squad } = await getSquadDetails('direct-response-creator')
      expect(capabilities.name).toBe('direct-response-creator')
      expect(squad.agents).toHaveLength(8)
      expect(squad.agents[0].name).toBe('Rex')
    })

    it('returns null squad when no squad.yaml exists', async () => {
      const { capabilities, squad } = await getSquadDetails('clickbank-ads-squad')
      expect(capabilities.name).toBe('clickbank-ads-squad')
      expect(squad).toBeNull()
    })
  })
})
