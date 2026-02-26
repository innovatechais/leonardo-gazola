import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { listPipelines, loadPipeline, renderPipelineAscii } from '../../src/campaign/pipeline-loader.js'

describe('campaign/pipeline-loader', () => {
  let tmpDir
  let originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-pipeline-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    const pipelinesDir = path.join(tmpDir, 'config', 'pipelines')
    await fs.ensureDir(pipelinesDir)

    await fs.writeFile(path.join(pipelinesDir, 'test-a.yaml'), yaml.dump({
      name: 'test-a',
      description: 'First pipeline',
      version: 1,
      steps: [
        { id: 'step-1', name: 'Step One', squad: 'sq', output_type: 'out', input_from: 'context', output_to: 'final' },
      ],
    }))
    await fs.writeFile(path.join(pipelinesDir, 'test-b.yaml'), yaml.dump({
      name: 'test-b',
      description: 'Second pipeline',
      version: 2,
      steps: [
        { id: 'step-1', name: 'S1', squad: 'sq1', output_type: 'o1', input_from: 'context', output_to: 'step-2' },
        { id: 'step-2', name: 'S2', squad: 'sq2', output_type: 'o2', input_from: 'step-1', output_to: 'final' },
      ],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  describe('listPipelines', () => {
    it('lists all pipelines sorted by name', async () => {
      const pipelines = await listPipelines()
      expect(pipelines).toHaveLength(2)
      expect(pipelines[0].name).toBe('test-a')
      expect(pipelines[1].name).toBe('test-b')
    })

    it('includes step count', async () => {
      const pipelines = await listPipelines()
      expect(pipelines[0].stepsCount).toBe(1)
      expect(pipelines[1].stepsCount).toBe(2)
    })

    it('includes description and version', async () => {
      const pipelines = await listPipelines()
      expect(pipelines[0].description).toBe('First pipeline')
      expect(pipelines[1].version).toBe(2)
    })
  })

  describe('loadPipeline', () => {
    it('loads pipeline by name', async () => {
      const pipeline = await loadPipeline('test-a')
      expect(pipeline.name).toBe('test-a')
      expect(pipeline.steps).toHaveLength(1)
    })

    it('throws for missing pipeline', async () => {
      await expect(loadPipeline('nonexistent')).rejects.toThrow()
    })

    it('throws for invalid pipeline without name', async () => {
      const pipelinesDir = path.join(tmpDir, 'config', 'pipelines')
      await fs.writeFile(path.join(pipelinesDir, 'bad.yaml'), yaml.dump({ steps: [] }))
      await expect(loadPipeline('bad')).rejects.toThrow('Invalid pipeline')
    })
  })

  describe('renderPipelineAscii', () => {
    it('renders pipeline as ASCII diagram', () => {
      const pipeline = {
        name: 'test',
        version: 1,
        description: 'Test pipeline',
        steps: [
          { id: 's1', name: 'First', squad: 'sq1', output_type: 'out1', input_from: 'context', output_to: 's2', checkpoint: true },
          { id: 's2', name: 'Second', squad: 'sq2', agent: 'a1', output_type: 'out2', input_from: 's1', output_to: 'final', checkpoint: false },
        ],
      }
      const ascii = renderPipelineAscii(pipeline)
      expect(ascii).toContain('Pipeline: test')
      expect(ascii).toContain('[s1] First')
      expect(ascii).toContain('🔍')
      expect(ascii).toContain('[s2] Second')
      expect(ascii).toContain('Squad: sq2 (a1)')
      expect(ascii).toContain('▼')
    })
  })
})
