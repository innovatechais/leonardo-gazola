export function validatePipeline(pipeline) {
  const errors = []

  if (!pipeline.name) errors.push('Pipeline must have a name')
  if (!pipeline.steps || pipeline.steps.length === 0) errors.push('Pipeline must have at least one step')

  if (pipeline.steps) {
    const stepIds = new Set()

    for (let i = 0; i < pipeline.steps.length; i++) {
      const step = pipeline.steps[i]

      if (!step.id) errors.push(`Step ${i + 1}: missing id`)
      if (!step.name) errors.push(`Step ${i + 1}: missing name`)
      if (!step.squad) errors.push(`Step ${i + 1}: missing squad`)
      if (!step.output_type) errors.push(`Step ${i + 1}: missing output_type`)

      if (step.id && stepIds.has(step.id)) {
        errors.push(`Duplicate step id: ${step.id}`)
      }
      stepIds.add(step.id)

      // Validate input_from references
      if (step.input_from && step.input_from !== 'context') {
        const refs = Array.isArray(step.input_from) ? step.input_from : [step.input_from]
        for (const ref of refs) {
          if (ref !== 'context' && !stepIds.has(ref)) {
            errors.push(`Step ${step.id}: input_from references unknown step '${ref}'`)
          }
        }
      }
    }

    // Validate last step outputs to final
    const lastStep = pipeline.steps[pipeline.steps.length - 1]
    if (lastStep && lastStep.output_to !== 'final') {
      errors.push('Last step must output to "final"')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
