import { describe, it, expect } from 'vitest'
import { scanSensitiveContent } from '../../src/shared/security.js'

describe('scanSensitiveContent', () => {
  it('detects email addresses', () => {
    const matches = scanSensitiveContent('Contact user@example.com for info')
    expect(matches).toHaveLength(1)
    expect(matches[0].type).toBe('email')
    expect(matches[0].count).toBe(1)
  })

  it('detects CPF numbers', () => {
    const matches = scanSensitiveContent('CPF: 123.456.789-00')
    expect(matches).toHaveLength(1)
    expect(matches[0].type).toBe('cpf')
  })

  it('detects CPF without formatting', () => {
    const matches = scanSensitiveContent('CPF: 12345678900')
    expect(matches).toHaveLength(1)
    expect(matches[0].type).toBe('cpf')
  })

  it('detects API tokens', () => {
    const matches = scanSensitiveContent('Use key sk-test123456789')
    expect(matches).toHaveLength(1)
    expect(matches[0].type).toBe('api_token')
  })

  it('detects Bearer tokens', () => {
    const matches = scanSensitiveContent('Authorization: Bearer eyJhbGciOiJIUzI1NiJ9')
    expect(matches).toHaveLength(1)
    expect(matches[0].type).toBe('api_token')
  })

  it('detects multiple types', () => {
    const matches = scanSensitiveContent('Email: a@b.com CPF: 123.456.789-00 Key: sk-abc123')
    expect(matches).toHaveLength(3)
  })

  it('returns empty array for clean text', () => {
    const matches = scanSensitiveContent('This is perfectly clean content without any sensitive data')
    expect(matches).toHaveLength(0)
  })

  it('limits samples to 3', () => {
    const emails = 'a@b.com c@d.com e@f.com g@h.com i@j.com'
    const matches = scanSensitiveContent(emails)
    expect(matches[0].count).toBe(5)
    expect(matches[0].samples).toHaveLength(3)
  })
})
