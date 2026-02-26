import { scanSensitiveContent } from '../shared/security.js'

export function sanitizeContent(content) {
  let sanitized = content

  // Remove potential email addresses
  sanitized = sanitized.replace(/[\w.-]+@[\w.-]+\.\w+/g, 'user@example.com')

  // Remove potential phone numbers
  sanitized = sanitized.replace(/\(\d{2}\)\s?\d{4,5}-?\d{4}/g, '(XX) XXXXX-XXXX')

  // Remove potential CPF
  sanitized = sanitized.replace(/\d{3}\.\d{3}\.\d{3}-\d{2}/g, 'XXX.XXX.XXX-XX')

  // Remove API keys/tokens (common patterns)
  sanitized = sanitized.replace(/[a-zA-Z0-9_-]{32,}/g, (match) => {
    // Keep if it looks like a regular word/path
    if (match.includes('/') || match.includes('.')) return match
    if (match.length > 40) return '[REDACTED]'
    return match
  })

  return sanitized
}

export function validateCleanExport(content) {
  const matches = scanSensitiveContent(content)
  return {
    clean: matches.length === 0,
    issues: matches,
  }
}
