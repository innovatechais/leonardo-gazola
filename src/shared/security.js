const SENSITIVE_PATTERNS = [
  { name: 'email', pattern: /\b[\w.-]+@[\w.-]+\.\w{2,}\b/g },
  { name: 'cpf', pattern: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g },
  { name: 'api_token', pattern: /\b(?:sk-|pk_|token_|Bearer )\S+/g },
]

export function scanSensitiveContent(text) {
  const matches = []

  for (const { name, pattern } of SENSITIVE_PATTERNS) {
    const found = text.match(pattern)
    if (found) {
      matches.push({ type: name, count: found.length, samples: found.slice(0, 3) })
    }
  }

  return matches
}
