import { translateSquadToInstructions, buildExecutionPlan } from '../squad-adapter/translator.js'

export async function runStep(step, context = {}) {
  const { accumulatedOutputs = {}, projectSlug } = context

  // Resolve inputs
  const inputs = resolveInputs(step, accumulatedOutputs)

  // Translate squad to instructions
  let instructions
  try {
    instructions = await translateSquadToInstructions(step.squad)
  } catch {
    return {
      stepId: step.id,
      status: 'failed',
      error: `Squad '${step.squad}' not found or invalid`,
      output: null,
    }
  }

  // Build execution plan for the step
  const plan = buildExecutionPlan(instructions, step.agent || null)

  return {
    stepId: step.id,
    stepName: step.name,
    status: 'completed',
    squad: step.squad,
    agent: step.agent,
    outputType: step.output_type,
    plan,
    inputs,
    output: {
      type: step.output_type,
      content: `[Simulated output from ${step.squad}/${step.agent || 'pipeline'} for ${step.output_type}]`,
      agents: plan.agents.map(a => a.name),
    },
  }
}

function resolveInputs(step, accumulatedOutputs) {
  if (!step.input_from || step.input_from === 'context') {
    return { source: 'context' }
  }

  const refs = Array.isArray(step.input_from) ? step.input_from : [step.input_from]
  const resolved = {}

  for (const ref of refs) {
    if (ref === 'context') {
      resolved.context = true
    } else if (accumulatedOutputs[ref]) {
      resolved[ref] = accumulatedOutputs[ref]
    }
  }

  return resolved
}
