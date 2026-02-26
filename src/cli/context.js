import { Command } from 'commander'
import { generateContext, saveContext } from '../sca-engine/context-generator.js'
import { theme } from '../shared/constants.js'

export const contextCommand = new Command('context')
  .description('Manage contexts')

contextCommand
  .command('generate <project>')
  .description('Generate context for a squad')
  .requiredOption('--for <squad>', 'Target squad name')
  .action(async (project, opts) => {
    try {
      const { frontmatter, content, staleBlocks } = await generateContext(project, opts.for)

      if (staleBlocks.length > 0) {
        console.log(`${theme.warning} ${staleBlocks.length} stale block(s): ${staleBlocks.map(b => b.frontmatter.id).join(', ')}`)
      }

      const filePath = await saveContext(project, opts.for, frontmatter, content)
      console.log(`${theme.success} Context generated: ${filePath}`)
      console.log(`   Substrates: ${frontmatter.substrates_included.length} | Blocks: ${frontmatter.blocks_included.length}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

contextCommand
  .command('preview <project>')
  .description('Preview context without saving (dry-run)')
  .requiredOption('--for <squad>', 'Target squad name')
  .action(async (project, opts) => {
    try {
      const { content, staleBlocks } = await generateContext(project, opts.for)

      if (staleBlocks.length > 0) {
        console.log(`${theme.warning} ${staleBlocks.length} stale block(s) detected`)
      }

      console.log(content)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
