import { describe, it, expect } from 'vitest'
import { formatExecutionSummary } from '../../src/squad-adapter/executor.js'

describe('squad-adapter/executor', () => {
  describe('formatExecutionSummary', () => {
    it('formats basic execution summary', () => {
      const summary = formatExecutionSummary({
        squad: 'direct-response-creator',
        project: 'evidex',
        plan: {
          mode: 'pipeline',
          agents: [
            { id: 'rex', name: 'Rex', icon: '🔍' },
            { id: 'quill', name: 'Quill', icon: '✍️' },
          ],
        },
        contextInjected: true,
        staleWarnings: [],
        externalToolNotes: [],
      })
      expect(summary).toContain('Squad: direct-response-creator')
      expect(summary).toContain('Project: evidex')
      expect(summary).toContain('Mode: pipeline')
      expect(summary).toContain('Rex')
      expect(summary).toContain('Context: ✅ injected')
    })

    it('shows stale warnings', () => {
      const summary = formatExecutionSummary({
        squad: 'test',
        project: 'test',
        plan: { mode: 'pipeline', agents: [] },
        contextInjected: true,
        staleWarnings: ['A1', 'C1'],
        externalToolNotes: [],
      })
      expect(summary).toContain('⚠️ Stale blocks: A1, C1')
    })

    it('shows external tool notes', () => {
      const summary = formatExecutionSummary({
        squad: 'test',
        project: 'test',
        plan: { mode: 'manual', agents: [] },
        contextInjected: false,
        staleWarnings: [],
        externalToolNotes: ["Squad 'test' depends on external tool: ffmpeg"],
      })
      expect(summary).toContain("📦 Squad 'test' depends on external tool: ffmpeg")
    })

    it('shows agent chain with arrow separator', () => {
      const summary = formatExecutionSummary({
        squad: 'test',
        project: 'test',
        plan: {
          mode: 'pipeline',
          agents: [
            { id: 'a', name: 'Alpha', icon: '🅰️' },
            { id: 'b', name: 'Beta', icon: '🅱️' },
          ],
        },
        contextInjected: false,
        staleWarnings: [],
        externalToolNotes: [],
      })
      expect(summary).toContain('Alpha')
      expect(summary).toContain('→')
      expect(summary).toContain('Beta')
    })
  })
})
