import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { translateSquadToInstructions, buildExecutionPlan } from '../../src/squad-adapter/translator.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('squad-adapter/translator', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  describe('translateSquadToInstructions', () => {
    it('translates squad.yaml into executable instructions', async () => {
      const instructions = await translateSquadToInstructions('direct-response-creator')
      expect(instructions.name).toBe('direct-response-creator')
      expect(instructions.agents).toHaveLength(8)
    })

    it('extracts agent details', async () => {
      const instructions = await translateSquadToInstructions('direct-response-creator')
      const rex = instructions.agents.find(a => a.id === 'rex')
      expect(rex.name).toBe('Rex')
      expect(rex.role).toBe('Research & Intelligence')
      expect(rex.icon).toBe('🔍')
    })

    it('extracts slashPrefix', async () => {
      const instructions = await translateSquadToInstructions('agencia-squad')
      expect(instructions.slashPrefix).toBe('agencia')
    })

    it('derives pipeline order from agent list', async () => {
      const instructions = await translateSquadToInstructions('direct-response-creator')
      expect(instructions.pipelineOrder).toHaveLength(8)
      expect(instructions.pipelineOrder[0]).toBe('rex')
    })

    it('marks hasPipeline based on pipeline order', async () => {
      const instructions = await translateSquadToInstructions('direct-response-creator')
      expect(instructions.hasPipeline).toBe(true)
    })

    it('returns description', async () => {
      const instructions = await translateSquadToInstructions('agencia-squad')
      expect(instructions.description).toContain('criação visual')
    })

    it('throws for missing squad', async () => {
      await expect(translateSquadToInstructions('nonexistent')).rejects.toThrow()
    })
  })

  describe('buildExecutionPlan', () => {
    it('builds pipeline plan when agents have pipeline order', () => {
      const instructions = {
        name: 'test-squad',
        agents: [
          { id: 'a1', name: 'Agent1', role: 'First' },
          { id: 'a2', name: 'Agent2', role: 'Second' },
        ],
        pipelineOrder: ['a1', 'a2'],
      }
      const plan = buildExecutionPlan(instructions, null)
      expect(plan.mode).toBe('pipeline')
      expect(plan.agents).toHaveLength(2)
      expect(plan.agents[0].id).toBe('a1')
    })

    it('builds single agent plan when target specified', () => {
      const instructions = {
        name: 'test-squad',
        agents: [
          { id: 'a1', name: 'Agent1', role: 'First' },
          { id: 'a2', name: 'Agent2', role: 'Second' },
        ],
        pipelineOrder: ['a1', 'a2'],
      }
      const plan = buildExecutionPlan(instructions, 'a2')
      expect(plan.mode).toBe('single')
      expect(plan.agents).toHaveLength(1)
      expect(plan.agents[0].id).toBe('a2')
    })

    it('builds manual plan when no pipeline order', () => {
      const instructions = {
        name: 'test-squad',
        agents: [{ id: 'a1', name: 'Agent1', role: 'First' }],
        pipelineOrder: [],
      }
      const plan = buildExecutionPlan(instructions, null)
      expect(plan.mode).toBe('manual')
    })

    it('throws when target agent not found', () => {
      const instructions = {
        name: 'test-squad',
        agents: [{ id: 'a1', name: 'Agent1', role: 'First' }],
        pipelineOrder: [],
      }
      expect(() => buildExecutionPlan(instructions, 'nonexistent')).toThrow("Agent 'nonexistent' not found")
    })

    it('matches target agent by name', () => {
      const instructions = {
        name: 'test-squad',
        agents: [{ id: 'a1', name: 'Agent1', role: 'First' }],
        pipelineOrder: [],
      }
      const plan = buildExecutionPlan(instructions, 'Agent1')
      expect(plan.mode).toBe('single')
      expect(plan.agents[0].id).toBe('a1')
    })
  })
})
