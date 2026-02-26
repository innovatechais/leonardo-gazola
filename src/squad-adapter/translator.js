import { readYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'

export async function translateSquadToInstructions(squadName) {
  const squadPath = `${paths.squadsDir()}/${squadName}/squad.yaml`
  const config = await readYaml(squadPath)

  const agents = (config.agents || []).map(a => ({
    id: a.id,
    name: a.name,
    role: a.role,
    icon: a.icon || '',
    file: a.file || null,
  }))

  const hasPipeline = Array.isArray(config.components?.workflows) && config.components.workflows.length > 0
  const pipelineOrder = extractPipelineOrder(config)
  const externalTools = extractExternalTools(config)

  return {
    name: config.name,
    description: config.description || '',
    slashPrefix: config.slashPrefix || null,
    agents,
    pipelineOrder,
    hasPipeline: pipelineOrder.length > 0,
    tasks: config.components?.tasks || [],
    workflows: config.components?.workflows || [],
    externalTools,
  }
}

function extractPipelineOrder(config) {
  // Try to derive pipeline order from agent list order
  if (!config.agents || config.agents.length === 0) return []
  return config.agents.map(a => a.id)
}

function extractExternalTools(config) {
  const tools = []
  if (config.aios?.tools) {
    for (const tool of config.aios.tools) {
      tools.push(typeof tool === 'string' ? tool : tool.name || tool.id)
    }
  }
  return tools
}

export function buildExecutionPlan(instructions, targetAgent) {
  if (targetAgent) {
    const agent = instructions.agents.find(a => a.id === targetAgent || a.name === targetAgent)
    if (!agent) {
      throw new Error(`Agent '${targetAgent}' not found in squad '${instructions.name}'`)
    }
    return {
      mode: 'single',
      agents: [agent],
      squad: instructions.name,
    }
  }

  if (instructions.pipelineOrder.length > 0) {
    const orderedAgents = instructions.pipelineOrder
      .map(id => instructions.agents.find(a => a.id === id))
      .filter(Boolean)

    return {
      mode: 'pipeline',
      agents: orderedAgents,
      squad: instructions.name,
    }
  }

  return {
    mode: 'manual',
    agents: instructions.agents,
    squad: instructions.name,
  }
}
