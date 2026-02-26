import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { loadPipeline } from './pipeline-loader.js'
import { validatePipeline } from './pipeline-validator.js'
import { runStep } from './step-runner.js'
import { createProgressTracker } from './progress.js'
import { generateReport } from './report-generator.js'

export async function executeCampaign(pipelineName, projectSlug, options = {}) {
  const { noCheckpoint = false, onProgress = null } = options

  const pipeline = await loadPipeline(pipelineName)
  const validation = validatePipeline(pipeline)
  if (!validation.valid) {
    throw new Error(`Invalid pipeline: ${validation.errors.join(', ')}`)
  }

  const tracker = createProgressTracker(pipeline)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const campaignDir = path.join(paths.campaignsDir(), `${pipelineName}-${timestamp}`)
  await fs.ensureDir(campaignDir)

  const accumulatedOutputs = {}
  const stepResults = []

  for (const step of pipeline.steps) {
    if (onProgress) onProgress(tracker.formatStepStart(step))

    const result = await runStep(step, {
      accumulatedOutputs,
      projectSlug,
    })

    stepResults.push(result)
    tracker.advance(result)

    if (result.status === 'completed' && result.output) {
      accumulatedOutputs[step.id] = result.output
    }

    if (result.status === 'failed') {
      return {
        status: 'failed',
        failedStep: step.id,
        stepResults,
        campaignDir,
        tracker,
      }
    }

    // Checkpoint handling
    if (step.checkpoint && !noCheckpoint) {
      // In real implementation, this would pause for user input
      // For now, auto-approve
    }

    if (onProgress) onProgress(tracker.formatStepComplete(result))
    if (onProgress) onProgress(tracker.formatProgress())
  }

  // Generate report
  const report = generateReport({
    pipeline,
    projectSlug,
    stepResults,
    timestamp,
    campaignDir,
  })

  const reportPath = path.join(campaignDir, 'REPORT.md')
  await fs.writeFile(reportPath, report, 'utf-8')

  return {
    status: 'completed',
    stepResults,
    campaignDir,
    reportPath,
    tracker,
  }
}
