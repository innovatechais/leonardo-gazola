import { describe, it, expect } from 'vitest'
import { sanitizeContent, validateCleanExport } from '../../src/export/sanitizer.js'

describe('export/sanitizer', () => {
  it('redacts email addresses', () => {
    const result = sanitizeContent('Contact: john@example.com for info')
    expect(result).toContain('user@example.com')
    expect(result).not.toContain('john@example.com')
  })

  it('redacts phone numbers', () => {
    const result = sanitizeContent('Call (11) 99999-1234')
    expect(result).toContain('(XX) XXXXX-XXXX')
  })

  it('redacts CPF', () => {
    const result = sanitizeContent('CPF: 123.456.789-00')
    expect(result).toContain('XXX.XXX.XXX-XX')
  })

  it('validates clean export', () => {
    const result = validateCleanExport('Clean content without sensitive data')
    expect(result.clean).toBe(true)
  })

  it('flags sensitive content', () => {
    const result = validateCleanExport('Email: test@test.com CPF: 123.456.789-00')
    expect(result.clean).toBe(false)
  })
})
