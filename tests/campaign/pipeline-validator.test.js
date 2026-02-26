import { describe, it, expect } from 'vitest'
import { validatePipeline } from '../../src/campaign/pipeline-validator.js'

describe('campaign/pipeline-validator', () => {
  it('validates a correct pipeline', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'Step 1', squad: 'sq', output_type: 'out', input_from: 'context', output_to: 'final' },
      ],
    })
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects pipeline without name', () => {
    const result = validatePipeline({ steps: [{ id: 's1', name: 'S', squad: 'sq', output_type: 'o', output_to: 'final' }] })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Pipeline must have a name')
  })

  it('rejects pipeline without steps', () => {
    const result = validatePipeline({ name: 'test', steps: [] })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Pipeline must have at least one step')
  })

  it('detects missing step fields', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [{ id: 's1', output_to: 'final' }],
    })
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('missing name'))).toBe(true)
    expect(result.errors.some(e => e.includes('missing squad'))).toBe(true)
    expect(result.errors.some(e => e.includes('missing output_type'))).toBe(true)
  })

  it('detects duplicate step IDs', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'A', squad: 'sq', output_type: 'o', input_from: 'context', output_to: 's1' },
        { id: 's1', name: 'B', squad: 'sq', output_type: 'o', input_from: 's1', output_to: 'final' },
      ],
    })
    expect(result.errors.some(e => e.includes('Duplicate'))).toBe(true)
  })

  it('detects unknown input_from reference', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'A', squad: 'sq', output_type: 'o', input_from: 'unknown-step', output_to: 'final' },
      ],
    })
    expect(result.errors.some(e => e.includes('unknown step'))).toBe(true)
  })

  it('validates last step must output to final', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'A', squad: 'sq', output_type: 'o', input_from: 'context', output_to: 'somewhere' },
      ],
    })
    expect(result.errors.some(e => e.includes('final'))).toBe(true)
  })

  it('accepts context as valid input_from', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'A', squad: 'sq', output_type: 'o', input_from: 'context', output_to: 'final' },
      ],
    })
    expect(result.valid).toBe(true)
  })

  it('validates array input_from', () => {
    const result = validatePipeline({
      name: 'test',
      steps: [
        { id: 's1', name: 'A', squad: 'sq', output_type: 'o', input_from: 'context', output_to: 's2' },
        { id: 's2', name: 'B', squad: 'sq', output_type: 'o', input_from: ['s1', 'context'], output_to: 'final' },
      ],
    })
    expect(result.valid).toBe(true)
  })
})
