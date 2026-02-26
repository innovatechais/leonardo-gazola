import { Command } from 'commander'
import { listOutputs, getOutput } from '../squad-adapter/output-manager.js'
import { theme } from '../shared/constants.js'

export const outputsCommand = new Command('outputs')
  .description('Output management')

outputsCommand
  .command('list <project>')
  .description('List all outputs for a project')
  .action(async (project) => {
    try {
      const outputs = await listOutputs(project)

      if (outputs.length === 0) {
        console.log(`${theme.squad} No outputs found for ${project}`)
        return
      }

      console.log(`\n${theme.squad} Outputs for ${project} (${outputs.length} total)\n`)
      console.log(' ID     │ Type                │ Squad                    │ Status  │ Created')
      console.log('────────┼─────────────────────┼──────────────────────────┼─────────┼──────────────────')

      for (const o of outputs) {
        const id = o.id.padEnd(6)
        const type = o.type.padEnd(19).slice(0, 19)
        const squad = o.squad.padEnd(24).slice(0, 24)
        const status = o.status.padEnd(7)
        const created = o.created_at?.slice(0, 10) || '-'
        console.log(` ${id} │ ${type} │ ${squad} │ ${status} │ ${created}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

outputsCommand
  .command('view <project> <id>')
  .description('View an output with traceability')
  .action(async (project, id) => {
    try {
      const { frontmatter, content } = await getOutput(project, id)

      console.log(`\n${theme.squad} Output ${frontmatter.id}: ${frontmatter.type}`)
      console.log(`   Squad: ${frontmatter.squad}`)
      console.log(`   Project: ${frontmatter.project}`)
      console.log(`   Status: ${frontmatter.status}`)
      console.log(`   Market: ${frontmatter.market_profile}`)
      console.log(`   Created: ${frontmatter.created_at}`)

      if (frontmatter.substrates_used?.length > 0) {
        console.log(`   Substrates: ${frontmatter.substrates_used.join(', ')}`)
      }
      if (frontmatter.blocks_used?.length > 0) {
        console.log(`   Blocks: ${frontmatter.blocks_used.join(', ')}`)
      }

      console.log(`\n${content}\n`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
