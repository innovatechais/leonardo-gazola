import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { parseSubstrate } from '../../src/sca-engine/parser.js'
import { SchemaError } from '../../src/shared/errors.js'

const fixturesDir = path.join(process.cwd(), 'tests', 'fixtures', 'substrates')

describe('parseSubstrate', () => {
  it('parses valid substrate with frontmatter', async () => {
    const result = await parseSubstrate(path.join(fixturesDir, 'S1-valid.md'))
    expect(result.frontmatter.id).toBe('S1')
    expect(result.frontmatter.title).toBe('Valid Substrate')
    expect(result.frontmatter.category).toBe('product')
    expect(result.frontmatter.version).toBe(1)
    expect(result.frontmatter.status).toBe('draft')
    expect(result.content).toBeTruthy()
    expect(result.wordCount).toBeGreaterThan(0)
  })

  it('parses substrate with version 2', async () => {
    const result = await parseSubstrate(path.join(fixturesDir, 'S2-valid.md'))
    expect(result.frontmatter.id).toBe('S2')
    expect(result.frontmatter.version).toBe(2)
    expect(result.frontmatter.status).toBe('approved')
  })

  it('returns correct word count', async () => {
    const result = await parseSubstrate(path.join(fixturesDir, 'S99-too-long.md'))
    expect(result.wordCount).toBeGreaterThan(200)
  })

  it('throws SchemaError for invalid frontmatter', async () => {
    await expect(
      parseSubstrate(path.join(fixturesDir, 'S98-bad-frontmatter.md'))
    ).rejects.toThrow(SchemaError)
  })
})
