import { describe, it, expect } from 'vitest'
import { splitDocument, detectFormat } from '../../src/capture/splitter.js'

describe('detectFormat', () => {
  it('detects markdown', () => {
    expect(detectFormat('file.md')).toBe('markdown')
  })

  it('detects json', () => {
    expect(detectFormat('file.json')).toBe('json')
  })

  it('defaults to text', () => {
    expect(detectFormat('file.txt')).toBe('text')
  })
})

describe('splitDocument', () => {
  it('splits markdown by headers', () => {
    const content = '## Section One\n\nContent one.\n\n## Section Two\n\nContent two.'
    const chunks = splitDocument(content, 'markdown')
    expect(chunks.length).toBeGreaterThanOrEqual(2)
  })

  it('splits text by paragraphs', () => {
    const content = 'First paragraph here.\n\nSecond paragraph here.\n\nThird paragraph here.'
    const chunks = splitDocument(content, 'text')
    expect(chunks.length).toBeGreaterThanOrEqual(1)
  })

  it('splits JSON by keys', () => {
    const content = JSON.stringify({ about: 'Company info', product: 'Product details' })
    const chunks = splitDocument(content, 'json')
    expect(chunks).toHaveLength(2)
  })

  it('respects 200 word limit', () => {
    const longSection = `## Long Section\n\n${Array(300).fill('word').join(' ')}`
    const chunks = splitDocument(longSection, 'markdown')
    for (const chunk of chunks) {
      const wordCount = chunk.split(/\s+/).filter(Boolean).length
      expect(wordCount).toBeLessThanOrEqual(210) // small tolerance for split boundaries
    }
  })

  it('handles empty content', () => {
    const chunks = splitDocument('', 'text')
    expect(chunks).toHaveLength(0)
  })

  it('handles JSON array', () => {
    const content = JSON.stringify(['Item one', 'Item two'])
    const chunks = splitDocument(content, 'json')
    expect(chunks).toHaveLength(2)
  })

  it('falls back to text for invalid JSON', () => {
    const chunks = splitDocument('not valid json', 'json')
    expect(chunks.length).toBeGreaterThanOrEqual(1)
  })
})
