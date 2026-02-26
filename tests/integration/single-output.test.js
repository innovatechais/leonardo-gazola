import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { analyzeRequest } from '../../src/request-router/analyzer.js'
import { matchSquad } from '../../src/request-router/matcher.js'
import { translateSquadToInstructions, buildExecutionPlan } from '../../src/squad-adapter/translator.js'
import { saveOutput, listOutputs, getOutput } from '../../src/squad-adapter/output-manager.js'

describe('integration: single-output end-to-end', () => {
  let tmpDir
  let originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-e2e-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    // Setup project
    const knowledgeDir = path.join(tmpDir, 'docs', 'knowledge', 'evidex')
    await fs.ensureDir(knowledgeDir)
    await fs.writeFile(path.join(knowledgeDir, 'manifest.yaml'), yaml.dump({
      slug: 'evidex',
      name: 'Evidex',
      market_profile: 'pt-br-massa',
      visibility: 'private',
      created_at: new Date().toISOString(),
    }))

    // Setup routing rules
    const configDir = path.join(tmpDir, 'config')
    await fs.ensureDir(configDir)
    await fs.writeFile(path.join(configDir, 'routing-rules.yaml'), yaml.dump({
      rules: [
        { output_types: ['landing-page', 'tsl', 'headlines'], squad: 'direct-response-creator', priority: 1 },
        { output_types: ['carousel', 'stories'], squad: 'agencia-squad', priority: 1 },
      ],
      category_keywords: {
        copywriting: ['copy', 'landing', 'email', 'vendas'],
        visual: ['carousel', 'carrossel', 'stories', 'visual'],
      },
      fallback: { action: 'suggest_creation', message: 'No match.' },
    }))

    // Setup squad capabilities
    const drDir = path.join(tmpDir, 'squads', 'direct-response-creator')
    await fs.ensureDir(drDir)
    await fs.writeFile(path.join(drDir, 'capabilities.yaml'), yaml.dump({
      name: 'direct-response-creator',
      category: 'copywriting',
      produces: ['landing-page', 'tsl', 'headlines'],
      requires: ['product', 'pain'],
      funnel_stages: ['awareness', 'decision'],
      market_profiles: ['pt-br-massa'],
      agents_count: 3,
      pipeline_order: ['rex', 'quill', 'judge'],
    }))
    await fs.writeFile(path.join(drDir, 'squad.yaml'), yaml.dump({
      name: 'direct-response-creator',
      agents: [
        { id: 'rex', name: 'Rex', role: 'Research', icon: '🔍' },
        { id: 'quill', name: 'Quill', role: 'Copywriter', icon: '✍️' },
        { id: 'judge', name: 'Judge', role: 'Quality', icon: '⚖️' },
      ],
    }))

    const agDir = path.join(tmpDir, 'squads', 'agencia-squad')
    await fs.ensureDir(agDir)
    await fs.writeFile(path.join(agDir, 'capabilities.yaml'), yaml.dump({
      name: 'agencia-squad',
      category: 'visual',
      produces: ['carousel', 'stories'],
      requires: ['identity'],
      funnel_stages: ['awareness'],
      market_profiles: ['pt-br-massa'],
      agents_count: 2,
      pipeline_order: ['lens', 'canvas'],
    }))
    await fs.writeFile(path.join(agDir, 'squad.yaml'), yaml.dump({
      name: 'agencia-squad',
      agents: [
        { id: 'lens', name: 'Lens', role: 'Visual Strategy', icon: '📸' },
        { id: 'canvas', name: 'Canvas', role: 'Design', icon: '🎨' },
      ],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('routes landing-page request to direct-response-creator', async () => {
    const analysis = await analyzeRequest('criar landing-page para evidex')
    expect(analysis.detectedOutputType).toBe('landing-page')

    const match = await matchSquad(analysis)
    expect(match.squad).toBe('direct-response-creator')
    expect(match.matchType).toBe('rule')
  })

  it('routes carousel request to agencia-squad', async () => {
    const analysis = await analyzeRequest('criar carousel instagram')
    const match = await matchSquad(analysis)
    expect(match.squad).toBe('agencia-squad')
  })

  it('translates squad and builds execution plan', async () => {
    const instructions = await translateSquadToInstructions('direct-response-creator')
    expect(instructions.agents).toHaveLength(3)

    const plan = buildExecutionPlan(instructions, null)
    expect(plan.mode).toBe('pipeline')
    expect(plan.agents[0].id).toBe('rex')
    expect(plan.agents[2].id).toBe('judge')
  })

  it('saves and retrieves output with traceability', async () => {
    const saved = await saveOutput('evidex', 'direct-response-creator', 'landing-page',
      '# Landing Page\n\nConteúdo gerado pelo squad.',
      { substratesUsed: ['S1', 'S2'], blocksUsed: ['A1'] },
    )
    expect(saved.id).toBe('O1')

    const output = await getOutput('evidex', 'O1')
    expect(output.frontmatter.type).toBe('landing-page')
    expect(output.frontmatter.squad).toBe('direct-response-creator')
    expect(output.content).toContain('Landing Page')
    expect(output.content).toContain('Rastreabilidade')
  })

  it('lists all outputs for a project', async () => {
    await saveOutput('evidex', 'dr', 'landing-page', 'LP')
    await saveOutput('evidex', 'ag', 'carousel', 'Carousel')

    const outputs = await listOutputs('evidex')
    expect(outputs).toHaveLength(2)
    expect(outputs[0].id).toBe('O1')
    expect(outputs[1].id).toBe('O2')
  })

  it('end-to-end: analyze → match → translate → plan → save output', async () => {
    // Step 1: Analyze
    const analysis = await analyzeRequest('preciso de uma landing-page de vendas')
    expect(analysis.confidence).toBe('high')

    // Step 2: Match
    const match = await matchSquad(analysis)
    expect(match.squad).toBe('direct-response-creator')

    // Step 3: Translate
    const instructions = await translateSquadToInstructions(match.squad)
    expect(instructions.agents.length).toBeGreaterThan(0)

    // Step 4: Plan
    const plan = buildExecutionPlan(instructions, null)
    expect(plan.mode).toBe('pipeline')

    // Step 5: Save output (simulated execution result)
    const output = await saveOutput('evidex', match.squad, match.outputType,
      `# Landing Page de Vendas\n\nGerado por ${match.squad} via pipeline: ${plan.agents.map(a => a.name).join(' → ')}`,
      { substratesUsed: ['S1'], blocksUsed: ['A1'], marketProfile: 'pt-br-massa' },
    )

    expect(output.id).toBe('O1')
    expect(output.frontmatter.market_profile).toBe('pt-br-massa')

    // Verify retrieval
    const retrieved = await getOutput('evidex', 'O1')
    expect(retrieved.content).toContain('direct-response-creator')
    expect(retrieved.content).toContain('Rastreabilidade')
  })
})
