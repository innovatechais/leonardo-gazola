import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { parseSquadConfig, parseCapabilities } from '../../src/squad-adapter/parser.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('squad-adapter/parser', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  describe('parseSquadConfig', () => {
    it('parses squad.yaml and returns structured config', async () => {
      const config = await parseSquadConfig('direct-response-creator')
      expect(config.name).toBe('direct-response-creator')
      expect(config.agents).toHaveLength(8)
    })

    it('returns agent details with id, name, role, icon', async () => {
      const config = await parseSquadConfig('direct-response-creator')
      const rex = config.agents.find(a => a.id === 'rex')
      expect(rex.name).toBe('Rex')
      expect(rex.role).toBe('Research & Intelligence')
      expect(rex.icon).toBe('🔍')
    })

    it('returns slashPrefix', async () => {
      const config = await parseSquadConfig('agencia-squad')
      expect(config.slashPrefix).toBe('agencia')
    })

    it('returns null slashPrefix when not set', async () => {
      const config = await parseSquadConfig('direct-response-creator')
      expect(config.slashPrefix).toBe('dr')
    })

    it('returns description', async () => {
      const config = await parseSquadConfig('agencia-squad')
      expect(config.description).toContain('criação visual')
    })

    it('throws for missing squad', async () => {
      await expect(parseSquadConfig('nonexistent')).rejects.toThrow()
    })
  })

  describe('parseCapabilities', () => {
    it('parses capabilities.yaml', async () => {
      const caps = await parseCapabilities('direct-response-creator')
      expect(caps.name).toBe('direct-response-creator')
      expect(caps.category).toBe('copywriting')
      expect(caps.produces).toContain('landing-page')
    })

    it('includes all capability fields', async () => {
      const caps = await parseCapabilities('agencia-squad')
      expect(caps.requires).toContain('identity')
      expect(caps.funnel_stages).toContain('awareness')
      expect(caps.market_profiles).toContain('pt-br-massa')
      expect(caps.agents_count).toBe(6)
      expect(caps.pipeline_order).toHaveLength(6)
    })

    it('throws for missing capabilities', async () => {
      await expect(parseCapabilities('unregistered-squad')).rejects.toThrow()
    })
  })
})
