import { listProjects, getProjectStats } from '../project/registry.js'
import { listSquads } from '../squad-adapter/registry.js'
import { listPipelines, loadPipeline } from '../campaign/pipeline-loader.js'
import { listIntegrations } from '../integrations/health-check.js'

export async function buildSystemMap() {
  const [projects, squads, pipelines, integrations] = await Promise.all([
    safeCall(listProjects),
    safeCall(listSquads),
    safeCall(listPipelines),
    safeCall(listIntegrations),
  ])

  const projectsWithStats = []
  for (const p of projects) {
    const stats = await safeCall(() => getProjectStats(p.slug), {})
    projectsWithStats.push({ ...p, stats })
  }

  const pipelinesDetailed = []
  for (const p of pipelines) {
    const detail = await safeCall(() => loadPipeline(p.name), null)
    pipelinesDetailed.push({ ...p, detail })
  }

  return {
    overview: {
      totalProjects: projects.length,
      totalSquads: squads.length,
      totalPipelines: pipelines.length,
      totalIntegrations: integrations.length,
    },
    cli: buildCliReference(),
    sca: buildScaReference(),
    projects: projectsWithStats,
    squads,
    pipelines: pipelinesDetailed,
    integrations,
    architecture: buildArchitectureMap(),
  }
}

function buildCliReference() {
  return [
    { group: 'Project Management', commands: [
      { cmd: 'nexus project create <slug>', desc: 'Create a new project', example: 'nexus project create meu-saas' },
      { cmd: 'nexus project list', desc: 'List all projects', example: 'nexus project list' },
      { cmd: 'nexus project switch <slug>', desc: 'Switch active project', example: 'nexus project switch meu-saas' },
      { cmd: 'nexus project clone <source> <new>', desc: 'Clone a project', example: 'nexus project clone meu-saas meu-saas-v2' },
      { cmd: 'nexus project archive <slug>', desc: 'Archive a project', example: 'nexus project archive old-project' },
    ]},
    { group: 'Substrates (Raw Knowledge)', commands: [
      { cmd: 'nexus substrate add <project>', desc: 'Add substrate interactively', example: 'nexus substrate add meu-saas' },
      { cmd: 'nexus substrate list <project>', desc: 'List substrates', example: 'nexus substrate list meu-saas' },
      { cmd: 'nexus substrate view <project> <id>', desc: 'View substrate', example: 'nexus substrate view meu-saas S1' },
    ]},
    { group: 'Blocks (Compiled Knowledge)', commands: [
      { cmd: 'nexus block compile <project>', desc: 'Compile block from substrates', example: 'nexus block compile meu-saas' },
      { cmd: 'nexus block list <project>', desc: 'List blocks', example: 'nexus block list meu-saas' },
    ]},
    { group: 'Context & Knowledge', commands: [
      { cmd: 'nexus context generate <project> <squad>', desc: 'Generate context for a squad', example: 'nexus context generate meu-saas dr-squad' },
      { cmd: 'nexus knowledge graph <project>', desc: 'Show knowledge graph', example: 'nexus knowledge graph meu-saas' },
    ]},
    { group: 'Squad Integration', commands: [
      { cmd: 'nexus squads list', desc: 'List all registered squads', example: 'nexus squads list' },
      { cmd: 'nexus squads info <name>', desc: 'View squad details', example: 'nexus squads info direct-response-creator' },
      { cmd: 'nexus make <description...>', desc: 'Route content request to best squad', example: 'nexus make "landing page para meu SaaS"' },
    ]},
    { group: 'Outputs', commands: [
      { cmd: 'nexus outputs list <project>', desc: 'List outputs', example: 'nexus outputs list meu-saas' },
      { cmd: 'nexus outputs view <project> <id>', desc: 'View output', example: 'nexus outputs view meu-saas O1' },
    ]},
    { group: 'Campaign & Pipelines', commands: [
      { cmd: 'nexus pipeline list', desc: 'List available pipelines', example: 'nexus pipeline list' },
      { cmd: 'nexus pipeline view <name>', desc: 'View pipeline diagram', example: 'nexus pipeline view full-campaign' },
      { cmd: 'nexus campaign start <pipeline> <project>', desc: 'Start a campaign', example: 'nexus campaign start full-campaign meu-saas' },
    ]},
    { group: 'Capture & Export', commands: [
      { cmd: 'nexus capture scan', desc: 'Scan pending captured notes', example: 'nexus capture scan' },
      { cmd: 'nexus capture process <file>', desc: 'Process captured note', example: 'nexus capture process note1.md' },
    ]},
  ]
}

function buildScaReference() {
  return {
    title: 'Sales Content Architecture (SCA)',
    description: 'Three-level system that transforms raw knowledge into targeted sales content',
    levels: [
      {
        name: 'Substrates',
        icon: '🧬',
        description: 'Raw knowledge atoms — facts, insights, data points about your business',
        categories: ['identity', 'product', 'pain', 'solution', 'objection', 'differentiator', 'proof', 'offer', 'audience', 'context'],
        idPattern: 'S1, S2, S3...',
        statuses: ['draft', 'approved', 'deprecated'],
      },
      {
        name: 'Blocks',
        icon: '🧱',
        description: 'Compiled knowledge — substrates combined for specific funnel stages',
        funnelStages: ['awareness', 'consideration', 'decision', 'loyalty'],
        idPattern: 'A1 (awareness), C1 (consideration), D1 (decision), L1 (loyalty)',
        statuses: ['current', 'stale', 'deprecated'],
      },
      {
        name: 'Outputs',
        icon: '📄',
        description: 'Final deliverables — content pieces produced by squads using blocks as context',
        idPattern: 'O1, O2, O3...',
        examples: ['Landing Pages', 'Email Sequences', 'Ad Copy', 'Social Media Posts'],
      },
    ],
    flow: 'Substrates → Blocks → Context → Squad → Output',
  }
}

function buildArchitectureMap() {
  return {
    modules: [
      { name: 'project', path: 'src/project/', desc: 'Multi-project workspace, cloning, archiving, privacy' },
      { name: 'sca', path: 'src/sca/', desc: 'Substrates, Blocks, Context generation, Knowledge graph' },
      { name: 'squad-adapter', path: 'src/squad-adapter/', desc: 'Squad registry, capabilities, context injection, execution' },
      { name: 'request-router', path: 'src/request-router/', desc: 'NLP analyzer, squad matcher, routing logger' },
      { name: 'campaign', path: 'src/campaign/', desc: 'Pipeline execution, step runner, checkpoints, reports' },
      { name: 'capture', path: 'src/capture/', desc: 'Note capture pipeline, processing' },
      { name: 'integrations', path: 'src/integrations/', desc: 'External service health checks' },
      { name: 'export', path: 'src/export/', desc: 'Template packaging, content sanitization' },
      { name: 'dashboard', path: 'src/dashboard/', desc: 'Metrics aggregation, weekly reports' },
      { name: 'shared', path: 'src/shared/', desc: 'Paths, schemas, fs-utils, errors, security, constants' },
      { name: 'cli', path: 'src/cli/', desc: 'Commander.js CLI commands' },
      { name: 'explorer', path: 'src/explorer/', desc: 'This visual interface' },
    ],
    dataFlow: [
      { from: 'Substrates', to: 'Blocks', label: 'compile' },
      { from: 'Blocks', to: 'Context', label: 'generate' },
      { from: 'Context', to: 'Squad', label: 'inject' },
      { from: 'Squad', to: 'Output', label: 'produce' },
      { from: 'Request', to: 'Router', label: 'analyze' },
      { from: 'Router', to: 'Squad', label: 'match' },
      { from: 'Pipeline', to: 'Steps', label: 'orchestrate' },
      { from: 'Steps', to: 'Output', label: 'accumulate' },
    ],
  }
}

async function safeCall(fn, fallback = []) {
  try {
    return await fn()
  } catch {
    return fallback
  }
}
