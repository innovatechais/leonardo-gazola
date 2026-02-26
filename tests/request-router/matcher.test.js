import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { matchSquad } from '../../src/request-router/matcher.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('request-router/matcher', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  it('matches by explicit rule when output type detected', async () => {
    const match = await matchSquad({
      detectedOutputType: 'landing-page',
      detectedCategory: 'copywriting',
    })
    expect(match.squad).toBe('direct-response-creator')
    expect(match.matchType).toBe('rule')
  })

  it('matches carousel to agencia-squad via rule', async () => {
    const match = await matchSquad({
      detectedOutputType: 'carousel',
      detectedCategory: 'visual',
    })
    expect(match.squad).toBe('agencia-squad')
    expect(match.matchType).toBe('rule')
  })

  it('matches ad-copy to clickbank-ads-squad via rule', async () => {
    const match = await matchSquad({
      detectedOutputType: 'ad-copy',
      detectedCategory: 'advertising',
    })
    expect(match.squad).toBe('clickbank-ads-squad')
    expect(match.matchType).toBe('rule')
  })

  it('falls back to category match when no output type', async () => {
    const match = await matchSquad({
      detectedOutputType: null,
      detectedCategory: 'copywriting',
    })
    expect(match.squad).toBe('direct-response-creator')
    expect(match.matchType).toBe('category')
  })

  it('returns none when nothing matches', async () => {
    const match = await matchSquad({
      detectedOutputType: null,
      detectedCategory: null,
    })
    expect(match.squad).toBeNull()
    expect(match.matchType).toBe('none')
    expect(match.fallback).toBeDefined()
  })

  it('returns output type in result', async () => {
    const match = await matchSquad({
      detectedOutputType: 'tsl',
      detectedCategory: null,
    })
    expect(match.outputType).toBe('tsl')
  })

  it('matches design-system to design-extractor-squad', async () => {
    const match = await matchSquad({
      detectedOutputType: 'design-system',
      detectedCategory: 'design',
    })
    expect(match.squad).toBe('design-extractor-squad')
    expect(match.matchType).toBe('rule')
  })

  it('falls back to capability match for unknown output with capability', async () => {
    // An output type that's not in rules but exists in capabilities
    const match = await matchSquad({
      detectedOutputType: 'faqs',
      detectedCategory: null,
    })
    expect(match.squad).toBe('direct-response-creator')
    expect(match.matchType).toBe('rule')
  })
})
