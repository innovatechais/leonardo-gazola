import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readYaml } from '../shared/fs-utils.js'

export async function listPipelines() {
  const pattern = `${paths.pipelinesDir()}/*.yaml`
  const files = await glob(pattern)
  const pipelines = []

  for (const file of files) {
    const config = await readYaml(file)
    pipelines.push({
      name: config.name,
      description: config.description || '',
      version: config.version || 1,
      stepsCount: config.steps?.length || 0,
      filePath: file,
    })
  }

  return pipelines.sort((a, b) => a.name.localeCompare(b.name))
}

export async function loadPipeline(name) {
  const filePath = `${paths.pipelinesDir()}/${name}.yaml`
  const config = await readYaml(filePath)

  if (!config.name || !config.steps) {
    throw new Error(`Invalid pipeline '${name}': missing name or steps`)
  }

  return config
}

export function renderPipelineAscii(pipeline) {
  const lines = []
  lines.push(`Pipeline: ${pipeline.name} (v${pipeline.version || 1})`)
  lines.push(`${pipeline.description || ''}`)
  lines.push('')

  for (let i = 0; i < pipeline.steps.length; i++) {
    const step = pipeline.steps[i]
    const checkpoint = step.checkpoint ? ' 🔍' : ''
    const input = Array.isArray(step.input_from)
      ? step.input_from.join(' + ')
      : step.input_from
    lines.push(`  [${step.id}] ${step.name}${checkpoint}`)
    lines.push(`    Squad: ${step.squad}${step.agent ? ` (${step.agent})` : ''}`)
    lines.push(`    Output: ${step.output_type}`)
    lines.push(`    Input: ${input} → Output: ${step.output_to}`)

    if (i < pipeline.steps.length - 1) {
      lines.push(`      │`)
      lines.push(`      ▼`)
    }
  }

  return lines.join('\n')
}
