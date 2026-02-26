import { Command } from 'commander'
import { executeCampaign } from '../campaign/executor.js'
import { theme } from '../shared/constants.js'

export const campaignCommand = new Command('campaign')
  .description('Campaign execution')

campaignCommand
  .command('run <pipeline> <project>')
  .description('Execute a campaign pipeline')
  .option('--no-checkpoint', 'Skip checkpoints (YOLO mode)')
  .action(async (pipeline, project, opts) => {
    try {
      console.log(`\n${theme.squad} Starting campaign: ${pipeline} for ${project}\n`)

      const result = await executeCampaign(pipeline, project, {
        noCheckpoint: !opts.checkpoint,
        onProgress: (msg) => console.log(`   ${msg}`),
      })

      if (result.status === 'completed') {
        console.log(`\n✅ Campaign completed successfully!`)
        console.log(`   Report: ${result.reportPath}`)
        console.log(`   Campaign dir: ${result.campaignDir}`)
      } else {
        console.log(`\n❌ Campaign failed at step: ${result.failedStep}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
