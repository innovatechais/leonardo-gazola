import { Command } from 'commander'
import { importFile } from '../capture/index.js'
import { writeSubstrate } from '../sca-engine/writer.js'
import { validateSubstrate } from '../sca-engine/validator.js'
import { getActiveProjectSlug } from '../project/session.js'
import { theme } from '../shared/constants.js'
import { ProjectNotFoundError } from '../shared/errors.js'

async function requireActiveProject() {
  const slug = await getActiveProjectSlug()
  if (!slug) {
    throw new ProjectNotFoundError('No active project.')
  }
  return slug
}

export const captureCommand = new Command('capture')
  .description('Import and capture content')

captureCommand
  .command('import <file>')
  .description('Import a file and split into substrate suggestions')
  .option('--approve-all', 'Auto-approve all suggestions')
  .action(async (file, opts) => {
    try {
      const projectSlug = await requireActiveProject()
      const suggestions = await importFile(file)

      if (suggestions.length === 0) {
        console.log(`${theme.info} No content found to import`)
        return
      }

      console.log(`\n${theme.substrate} Import Preview — ${suggestions.length} substrates\n`)
      console.log(' #  │ ID   │ Categoria      │ Palavras │ Preview')
      console.log('────┼──────┼────────────────┼──────────┼──────────────────────────')

      for (let i = 0; i < suggestions.length; i++) {
        const s = suggestions[i]
        const num = String(i + 1).padStart(2)
        const cat = s.category.padEnd(14).slice(0, 14)
        const words = String(s.wordCount).padStart(5)
        const preview = s.preview.slice(0, 30)
        console.log(` ${num} │ ${s.id.padEnd(4)} │ ${cat} │ ${words}    │ ${preview}`)
      }

      if (opts.approveAll) {
        console.log(`\n${theme.info} Auto-approving all suggestions...\n`)
        const now = new Date().toISOString()

        for (const s of suggestions) {
          const frontmatter = {
            id: s.id, title: s.title, category: s.category,
            version: 1, status: 'draft', created_at: now, updated_at: now,
            source: s.source,
          }

          try {
            await validateSubstrate(projectSlug, frontmatter, s.content)
            await writeSubstrate(projectSlug, frontmatter, s.content)
            console.log(`${theme.success} ${s.id}: ${s.title}`)
          } catch (error) {
            console.log(`${theme.error} ${s.id}: ${error.message}`)
          }
        }
      } else {
        console.log(`\nUse --approve-all to create all substrates`)
      }
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
