import { translateSquadToInstructions, buildExecutionPlan } from './translator.js'
import { injectContext, buildTraceabilityFooter } from './context-injector.js'
import { getSquad } from './registry.js'

export async function executeSquad(projectSlug, squadName, options = {}) {
  const { targetAgent = null, dryRun = false } = options

  const squad = await getSquad(squadName)
  const instructions = await translateSquadToInstructions(squadName)
  const plan = buildExecutionPlan(instructions, targetAgent)

  const result = {
    squad: squadName,
    project: projectSlug,
    plan,
    instructions,
    contextInjected: false,
    staleWarnings: [],
    externalToolNotes: [],
    steps: [],
  }

  // Note external tool dependencies
  if (instructions.externalTools.length > 0) {
    result.externalToolNotes = instructions.externalTools.map(t =>
      `Squad '${squadName}' depends on external tool: ${t}`,
    )
  }

  // Inject context
  if (!dryRun) {
    try {
      const injection = await injectContext(projectSlug, squadName)
      result.contextInjected = true
      result.staleWarnings = injection.staleBlocks

      if (injection.injectionTarget) {
        result.steps.push({
          action: 'context_injected',
          target: injection.injectionTarget,
          path: injection.squadContextPath,
        })
      }
    } catch (error) {
      result.steps.push({
        action: 'context_injection_failed',
        error: error.message,
      })
    }
  }

  // Build execution steps
  for (const agent of plan.agents) {
    result.steps.push({
      action: 'execute_agent',
      agent: agent.id,
      name: agent.name,
      role: agent.role,
      mode: plan.mode,
    })
  }

  return result
}

export function formatExecutionSummary(result) {
  const lines = []
  lines.push(`Squad: ${result.squad}`)
  lines.push(`Project: ${result.project}`)
  lines.push(`Mode: ${result.plan.mode}`)
  lines.push(`Agents: ${result.plan.agents.map(a => `${a.icon || ''} ${a.name}`).join(' → ')}`)

  if (result.contextInjected) {
    lines.push('Context: ✅ injected')
  }

  if (result.staleWarnings.length > 0) {
    lines.push(`⚠️ Stale blocks: ${result.staleWarnings.join(', ')}`)
  }

  if (result.externalToolNotes.length > 0) {
    for (const note of result.externalToolNotes) {
      lines.push(`📦 ${note}`)
    }
  }

  return lines.join('\n')
}
