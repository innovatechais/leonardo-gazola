import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { runStep } from '../../src/campaign/step-runner.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('campaign/step-runner', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  it('runs a step successfully with valid squad', async () => {
    const result = await runStep({
      id: 'step-1',
      name: 'Test Step',
      squad: 'direct-response-creator',
      output_type: 'landing-page',
      input_from: 'context',
    }, { accumulatedOutputs: {} })

    expect(result.status).toBe('completed')
    expect(result.squad).toBe('direct-response-creator')
    expect(result.output.type).toBe('landing-page')
  })

  it('returns failed for missing squad', async () => {
    const result = await runStep({
      id: 'step-1',
      name: 'Bad Step',
      squad: 'nonexistent-squad',
      output_type: 'something',
      input_from: 'context',
    }, { accumulatedOutputs: {} })

    expect(result.status).toBe('failed')
    expect(result.error).toContain('not found')
  })

  it('resolves inputs from accumulated outputs', async () => {
    const result = await runStep({
      id: 'step-2',
      name: 'Second',
      squad: 'direct-response-creator',
      output_type: 'headlines',
      input_from: 'step-1',
    }, {
      accumulatedOutputs: {
        'step-1': { type: 'landing-page', content: 'LP content' },
      },
    })

    expect(result.status).toBe('completed')
    expect(result.inputs['step-1']).toBeDefined()
  })

  it('runs with specific agent target', async () => {
    const result = await runStep({
      id: 'step-1',
      name: 'Specific Agent',
      squad: 'direct-response-creator',
      agent: 'rex',
      output_type: 'headlines',
      input_from: 'context',
    }, { accumulatedOutputs: {} })

    expect(result.status).toBe('completed')
    expect(result.agent).toBe('rex')
    expect(result.plan.mode).toBe('single')
  })

  it('includes agent names in output', async () => {
    const result = await runStep({
      id: 'step-1',
      name: 'Full Pipeline',
      squad: 'direct-response-creator',
      output_type: 'landing-page',
      input_from: 'context',
    }, { accumulatedOutputs: {} })

    expect(result.output.agents).toContain('Rex')
  })
})
