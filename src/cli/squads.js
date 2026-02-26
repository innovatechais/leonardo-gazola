import { Command } from 'commander'
import { listSquads, getSquadDetails } from '../squad-adapter/index.js'
import { theme } from '../shared/constants.js'

export const squadsCommand = new Command('squads')
  .description('Squad management')

squadsCommand
  .command('list')
  .description('List all squads')
  .action(async () => {
    try {
      const squads = await listSquads()

      if (squads.length === 0) {
        console.log(`${theme.squad} No squads found`)
        return
      }

      console.log(`\n${theme.squad} Squads (${squads.length} total)\n`)
      console.log(' Nome                         │ Categoria   │ Agentes │ Outputs')
      console.log('──────────────────────────────┼─────────────┼─────────┼──────────────────')

      for (const s of squads) {
        const name = s.registered ? s.name : `${s.name} [UNREGISTERED]`
        const display = name.padEnd(28).slice(0, 28)
        const cat = s.category.padEnd(11).slice(0, 11)
        const agents = String(s.agents_count).padStart(4)
        const outputs = s.produces.slice(0, 3).join(', ') || '-'
        console.log(` ${display} │ ${cat} │ ${agents}    │ ${outputs}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

squadsCommand
  .command('info <name>')
  .description('Show squad details')
  .action(async (name) => {
    try {
      const { capabilities, squad } = await getSquadDetails(name)

      console.log(`\n${theme.squad} ${capabilities.name}`)
      console.log(`   Category: ${capabilities.category}`)
      console.log(`   Registered: ${capabilities.registered ? 'Yes' : 'No [UNREGISTERED]'}`)

      if (squad?.description) {
        console.log(`   Description: ${squad.description.trim().slice(0, 120)}`)
      }

      console.log(`\n   Produces: ${capabilities.produces.join(', ') || '-'}`)
      console.log(`   Requires: ${capabilities.requires.join(', ') || '-'}`)
      console.log(`   Funnel stages: ${capabilities.funnel_stages.join(', ') || '-'}`)
      console.log(`   Market profiles: ${capabilities.market_profiles.join(', ') || '-'}`)
      console.log(`   Agents: ${capabilities.agents_count}`)

      if (capabilities.pipeline_order?.length > 0) {
        console.log(`   Pipeline: ${capabilities.pipeline_order.join(' → ')}`)
      }

      if (squad?.agents) {
        console.log(`\n   Team:`)
        for (const a of squad.agents) {
          console.log(`      ${a.icon || ''} ${a.name} — ${a.role}`)
        }
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
