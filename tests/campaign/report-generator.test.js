import { describe, it, expect } from 'vitest'
import { generateReport } from '../../src/campaign/report-generator.js'

describe('campaign/report-generator', () => {
  it('generates markdown report', () => {
    const report = generateReport({
      pipeline: { name: 'test', version: 1 },
      projectSlug: 'evidex',
      stepResults: [
        { stepId: 's1', stepName: 'Copy', status: 'completed', squad: 'dr', outputType: 'lp', output: { agents: ['Rex', 'Quill'] } },
      ],
      timestamp: '2026-02-25T12-00-00',
      campaignDir: '/tmp/campaigns/test',
    })

    expect(report).toContain('# Campaign Report: test')
    expect(report).toContain('Project: evidex')
    expect(report).toContain('COMPLETED')
    expect(report).toContain('Rex → Quill')
  })

  it('marks failed campaigns', () => {
    const report = generateReport({
      pipeline: { name: 'test', version: 1 },
      projectSlug: 'test',
      stepResults: [
        { stepId: 's1', stepName: 'Bad', status: 'failed', squad: 'sq', outputType: 'out', error: 'Squad not found' },
      ],
      timestamp: '2026-02-25T12-00-00',
      campaignDir: '/tmp/test',
    })

    expect(report).toContain('FAILED')
    expect(report).toContain('Squad not found')
  })

  it('includes summary counts', () => {
    const report = generateReport({
      pipeline: { name: 'test', version: 1 },
      projectSlug: 'test',
      stepResults: [
        { stepId: 's1', status: 'completed', squad: 'sq', outputType: 'o' },
        { stepId: 's2', status: 'completed', squad: 'sq', outputType: 'o' },
      ],
      timestamp: 'now',
      campaignDir: '/tmp',
    })

    expect(report).toContain('Total steps: 2')
    expect(report).toContain('Completed: 2')
    expect(report).toContain('Failed: 0')
  })
})
