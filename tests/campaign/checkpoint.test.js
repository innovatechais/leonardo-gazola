import { describe, it, expect } from 'vitest'
import { shouldCheckpoint, formatCheckpointPreview, processCheckpointChoice } from '../../src/campaign/checkpoint.js'

describe('campaign/checkpoint', () => {
  it('returns true when step has checkpoint and not disabled', () => {
    expect(shouldCheckpoint({ checkpoint: true })).toBe(true)
  })

  it('returns false when noCheckpoint option set', () => {
    expect(shouldCheckpoint({ checkpoint: true }, { noCheckpoint: true })).toBe(false)
  })

  it('returns false when step has no checkpoint', () => {
    expect(shouldCheckpoint({ checkpoint: false })).toBe(false)
  })

  it('formats checkpoint preview', () => {
    const preview = formatCheckpointPreview({
      stepName: 'Copy Landing',
      squad: 'dr-squad',
      outputType: 'landing-page',
      output: { content: 'Some preview content here' },
    })
    expect(preview).toContain('Checkpoint: Copy Landing')
    expect(preview).toContain('Aprovar e continuar')
    expect(preview).toContain('Abortar campanha')
  })

  it('truncates long preview content', () => {
    const preview = formatCheckpointPreview({
      stepName: 'Test',
      squad: 'sq',
      outputType: 'out',
      output: { content: 'x'.repeat(300) },
    })
    expect(preview).toContain('...')
  })

  it('processes approve choice', () => {
    const result = processCheckpointChoice(1, { output: { content: 'test' } })
    expect(result.action).toBe('continue')
  })

  it('processes abort choice', () => {
    const result = processCheckpointChoice(4, {})
    expect(result.action).toBe('abort')
  })

  it('processes retry choice', () => {
    const result = processCheckpointChoice('retry', {})
    expect(result.action).toBe('retry')
  })
})
