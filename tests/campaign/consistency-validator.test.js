import { describe, it, expect } from 'vitest'
import { validateConsistency, formatValidationReport } from '../../src/campaign/consistency-validator.js'

describe('campaign/consistency-validator', () => {
  it('returns OK when no issues', () => {
    const result = validateConsistency([
      { status: 'completed', outputType: 'carousel', output: { content: 'visual content' } },
    ])
    expect(result.status).toBe('OK')
    expect(result.issues).toHaveLength(0)
  })

  it('warns about tone consistency with multiple copy outputs', () => {
    const result = validateConsistency([
      { status: 'completed', outputType: 'landing-page', output: { content: 'content 1' } },
      { status: 'completed', outputType: 'email-sequences', output: { content: 'content 2' } },
    ])
    expect(result.issues.some(i => i.check === 'tone_consistency')).toBe(true)
  })

  it('warns about missing CTA in landing page', () => {
    const result = validateConsistency([
      { status: 'completed', outputType: 'landing-page', stepId: 's1', output: { content: 'just some text without any call to action words' } },
    ])
    expect(result.issues.some(i => i.check === 'cta_presence')).toBe(true)
  })

  it('does not warn about CTA when present', () => {
    const result = validateConsistency([
      { status: 'completed', outputType: 'landing-page', stepId: 's1', output: { content: 'Clique aqui para saber mais' } },
    ])
    expect(result.issues.filter(i => i.check === 'cta_presence')).toHaveLength(0)
  })

  it('checks product name against substrates', () => {
    const result = validateConsistency(
      [{ status: 'completed', outputType: 'tsl', output: { content: 'some generic content' } }],
      [{ frontmatter: { id: 'S1', title: 'Evidex Pro', category: 'product' } }],
    )
    expect(result.issues.some(i => i.check === 'product_name')).toBe(true)
  })

  it('formats validation report', () => {
    const report = formatValidationReport({
      status: 'Warning',
      issues: [
        { check: 'cta_presence', severity: 'warning', message: 'No CTA', suggestion: 'Add CTA' },
      ],
    })
    expect(report).toContain('cta_presence')
    expect(report).toContain('Add CTA')
  })

  it('formats clean report when no issues', () => {
    const report = formatValidationReport({ status: 'OK', issues: [] })
    expect(report).toContain('All consistency checks passed')
  })
})
