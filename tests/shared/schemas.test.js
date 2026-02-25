import { describe, it, expect } from 'vitest'
import { ProjectManifest, SubstrateFrontmatter, BlockFrontmatter, SubstrateCategory, FunnelStage, ContextFrontmatter } from '../../src/shared/schemas.js'

describe('ProjectManifest', () => {
  it('validates a valid manifest', () => {
    const result = ProjectManifest.parse({
      slug: 'evidex',
      name: 'Evidex',
      created_at: '2026-02-25T00:00:00Z',
    })
    expect(result.slug).toBe('evidex')
    expect(result.visibility).toBe('private')
    expect(result.market_profile).toBe('pt-br-massa')
    expect(result.tone).toBe('professional')
    expect(result.tags).toEqual([])
  })

  it('rejects invalid slug (uppercase)', () => {
    expect(() => ProjectManifest.parse({
      slug: 'Evidex',
      name: 'Evidex',
      created_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })

  it('rejects invalid slug (spaces)', () => {
    expect(() => ProjectManifest.parse({
      slug: 'my project',
      name: 'My Project',
      created_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })

  it('rejects missing name', () => {
    expect(() => ProjectManifest.parse({
      slug: 'test',
      name: '',
      created_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })

  it('accepts valid visibility values', () => {
    for (const vis of ['public', 'private', 'personal']) {
      const result = ProjectManifest.parse({
        slug: 'test',
        name: 'Test',
        visibility: vis,
        created_at: '2026-02-25T00:00:00Z',
      })
      expect(result.visibility).toBe(vis)
    }
  })

  it('rejects invalid visibility', () => {
    expect(() => ProjectManifest.parse({
      slug: 'test',
      name: 'Test',
      visibility: 'secret',
      created_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })

  it('rejects invalid datetime', () => {
    expect(() => ProjectManifest.parse({
      slug: 'test',
      name: 'Test',
      created_at: 'not-a-date',
    })).toThrow()
  })
})

describe('SubstrateCategory', () => {
  it('accepts all valid categories', () => {
    const categories = ['identity', 'product', 'pain', 'solution', 'objection', 'differentiator', 'proof', 'offer', 'audience', 'context']
    for (const cat of categories) {
      expect(SubstrateCategory.parse(cat)).toBe(cat)
    }
  })

  it('rejects invalid category', () => {
    expect(() => SubstrateCategory.parse('unknown')).toThrow()
  })
})

describe('SubstrateFrontmatter', () => {
  it('validates a valid substrate', () => {
    const result = SubstrateFrontmatter.parse({
      id: 'S1',
      title: 'Test Substrate',
      category: 'product',
      created_at: '2026-02-25T00:00:00Z',
      updated_at: '2026-02-25T00:00:00Z',
    })
    expect(result.version).toBe(1)
    expect(result.status).toBe('draft')
  })

  it('rejects invalid id format', () => {
    expect(() => SubstrateFrontmatter.parse({
      id: 'X1',
      title: 'Test',
      category: 'product',
      created_at: '2026-02-25T00:00:00Z',
      updated_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })
})

describe('BlockFrontmatter', () => {
  it('validates a valid block', () => {
    const result = BlockFrontmatter.parse({
      id: 'A1',
      title: 'Awareness Block',
      funnel_stage: 'awareness',
      substrates: ['S1', 'S2'],
      compiled_at: '2026-02-25T00:00:00Z',
    })
    expect(result.status).toBe('current')
  })

  it('rejects empty substrates', () => {
    expect(() => BlockFrontmatter.parse({
      id: 'A1',
      title: 'Test',
      funnel_stage: 'awareness',
      substrates: [],
      compiled_at: '2026-02-25T00:00:00Z',
    })).toThrow()
  })

  it('accepts all funnel stage IDs', () => {
    const mapping = { A: 'awareness', C: 'consideration', D: 'decision', L: 'loyalty' }
    for (const [letter, stage] of Object.entries(mapping)) {
      const result = BlockFrontmatter.parse({
        id: `${letter}1`,
        title: 'Test',
        funnel_stage: stage,
        substrates: ['S1'],
        compiled_at: '2026-02-25T00:00:00Z',
      })
      expect(result.funnel_stage).toBe(stage)
    }
  })
})

describe('ContextFrontmatter', () => {
  it('validates a valid context', () => {
    const result = ContextFrontmatter.parse({
      project: 'evidex',
      squad: 'direct-response-creator',
      generated_at: '2026-02-25T00:00:00Z',
      substrates_included: ['S1', 'S2'],
      blocks_included: ['A1'],
    })
    expect(result.stale_blocks).toEqual([])
  })
})
