import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import { buildTraceabilityFooter } from '../../src/squad-adapter/context-injector.js'

describe('squad-adapter/context-injector', () => {
  describe('buildTraceabilityFooter', () => {
    it('builds footer with project and squad info', () => {
      const footer = buildTraceabilityFooter('evidex', 'direct-response-creator', {
        substratesIncluded: ['S1', 'S2'],
        blocksIncluded: ['A1', 'C1'],
        staleBlocks: [],
      })
      expect(footer).toContain('Project: evidex')
      expect(footer).toContain('Squad: direct-response-creator')
      expect(footer).toContain('Substrates: S1, S2')
      expect(footer).toContain('Blocks: A1, C1')
    })

    it('includes stale block warning when present', () => {
      const footer = buildTraceabilityFooter('evidex', 'dr', {
        substratesIncluded: ['S1'],
        blocksIncluded: ['A1'],
        staleBlocks: ['A1'],
      })
      expect(footer).toContain('⚠️ Stale blocks: A1')
    })

    it('shows none when no substrates', () => {
      const footer = buildTraceabilityFooter('test', 'squad', {
        substratesIncluded: [],
        blocksIncluded: [],
        staleBlocks: [],
      })
      expect(footer).toContain('Substrates: none')
      expect(footer).toContain('Blocks: none')
    })

    it('includes rastreabilidade header', () => {
      const footer = buildTraceabilityFooter('test', 'squad', {
        substratesIncluded: [],
        blocksIncluded: [],
        staleBlocks: [],
      })
      expect(footer).toContain('Rastreabilidade')
    })

    it('includes generated timestamp', () => {
      const footer = buildTraceabilityFooter('test', 'squad', {
        substratesIncluded: [],
        blocksIncluded: [],
        staleBlocks: [],
      })
      expect(footer).toContain('Generated:')
    })
  })
})
