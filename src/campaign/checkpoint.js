export function shouldCheckpoint(step, options = {}) {
  if (options.noCheckpoint) return false
  return step.checkpoint === true
}

export function formatCheckpointPreview(stepResult) {
  const lines = []
  lines.push(`\n🔍 Checkpoint: ${stepResult.stepName || stepResult.stepId}`)
  lines.push(`   Squad: ${stepResult.squad}`)
  lines.push(`   Output type: ${stepResult.outputType}`)

  if (stepResult.output?.content) {
    const preview = stepResult.output.content.slice(0, 200)
    lines.push(`   Preview: ${preview}${stepResult.output.content.length > 200 ? '...' : ''}`)
  }

  lines.push('')
  lines.push('   Options:')
  lines.push('   [1] Aprovar e continuar')
  lines.push('   [2] Editar output')
  lines.push('   [3] Refazer step')
  lines.push('   [4] Abortar campanha')

  return lines.join('\n')
}

export function processCheckpointChoice(choice, stepResult) {
  switch (choice) {
    case 1:
    case 'approve':
      return { action: 'continue', output: stepResult.output }
    case 2:
    case 'edit':
      return { action: 'edit', output: stepResult.output }
    case 3:
    case 'retry':
      return { action: 'retry' }
    case 4:
    case 'abort':
      return { action: 'abort' }
    default:
      return { action: 'continue', output: stepResult.output }
  }
}
