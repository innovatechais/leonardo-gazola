import { describe, it, expect } from 'vitest'
import { formatProcessingOptions } from '../../src/capture/processor.js'

describe('capture/processor', () => {
  it('formats processing options', () => {
    const output = formatProcessingOptions({
      filePath: '/test/note.md',
      content: 'Some content about a product that is very interesting and has many features',
      suggestions: [{ title: 'S1' }],
    })
    expect(output).toContain('note.md')
    expect(output).toContain('Transformar em substrato')
    expect(output).toContain('Pular')
    expect(output).toContain('1 substrate(s)')
  })
})
