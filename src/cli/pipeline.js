import { Command } from 'commander'
import { listPipelines, loadPipeline, renderPipelineAscii } from '../campaign/pipeline-loader.js'
import { validatePipeline } from '../campaign/pipeline-validator.js'
import { theme } from '../shared/constants.js'

export const pipelineCommand = new Command('pipeline')
  .description('Pipeline management')

pipelineCommand
  .command('list')
  .description('List available pipelines')
  .action(async () => {
    try {
      const pipelines = await listPipelines()

      if (pipelines.length === 0) {
        console.log(`${theme.squad} No pipelines found`)
        return
      }

      console.log(`\n${theme.squad} Pipelines (${pipelines.length} available)\n`)
      console.log(' Name                  │ Steps │ Description')
      console.log('───────────────────────┼───────┼──────────────────────────────────')

      for (const p of pipelines) {
        const name = p.name.padEnd(21).slice(0, 21)
        const steps = String(p.stepsCount).padStart(3)
        const desc = (p.description || '-').slice(0, 34)
        console.log(` ${name} │ ${steps}   │ ${desc}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

pipelineCommand
  .command('view <name>')
  .description('View pipeline diagram')
  .action(async (name) => {
    try {
      const pipeline = await loadPipeline(name)
      const validation = validatePipeline(pipeline)

      console.log()
      console.log(renderPipelineAscii(pipeline))

      if (!validation.valid) {
        console.log(`\n⚠️  Validation issues:`)
        for (const err of validation.errors) {
          console.log(`   - ${err}`)
        }
      } else {
        console.log(`\n✅ Pipeline is valid`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
