import { Command } from 'commander'
import { glob } from 'glob'
import { parseSubstrate, validateSubstrate, writeSubstrate } from '../sca-engine/index.js'
import { getActiveProjectSlug } from '../project/session.js'
import { paths } from '../shared/paths.js'
import { theme, MAX_WORD_COUNT, SUBSTRATE_CATEGORIES } from '../shared/constants.js'
import { ProjectNotFoundError, SubstrateNotFoundError } from '../shared/errors.js'

async function requireActiveProject() {
  const slug = await getActiveProjectSlug()
  if (!slug) {
    throw new ProjectNotFoundError('No active project. Use `nexus project select <slug>` first.')
  }
  return slug
}

async function findSubstrateFile(projectSlug, id) {
  const pattern = `${paths.substratesDir(projectSlug)}/${id}-*.md`
  const files = await glob(pattern)
  if (files.length === 0) {
    throw new SubstrateNotFoundError(id)
  }
  return files[0]
}

async function listSubstrates(projectSlug) {
  const pattern = `${paths.substratesDir(projectSlug)}/S*-*.md`
  const files = await glob(pattern)
  const substrates = []

  for (const file of files) {
    try {
      const { frontmatter, wordCount } = await parseSubstrate(file)
      substrates.push({ ...frontmatter, wordCount })
    } catch {
      // Skip invalid files
    }
  }

  return substrates.sort((a, b) => {
    const numA = parseInt(a.id.slice(1), 10)
    const numB = parseInt(b.id.slice(1), 10)
    return numA - numB
  })
}

export const substrateCommand = new Command('substrate')
  .description('Manage substrates')

substrateCommand
  .command('create <id>')
  .description('Create a new substrate')
  .requiredOption('-t, --title <title>', 'Substrate title')
  .requiredOption('-c, --category <category>', `Category: ${SUBSTRATE_CATEGORIES.join(', ')}`)
  .option('--content <content>', 'Substrate content')
  .action(async (id, opts) => {
    try {
      const projectSlug = await requireActiveProject()
      const now = new Date().toISOString()
      const content = opts.content || ''

      const frontmatter = {
        id,
        title: opts.title,
        category: opts.category,
        version: 1,
        status: 'draft',
        created_at: now,
        updated_at: now,
      }

      const result = await validateSubstrate(projectSlug, frontmatter, content)

      if (result.warnings.length > 0) {
        for (const w of result.warnings) {
          if (w.type === 'duplicate_category') {
            console.log(`${theme.warning} Category '${w.category}' already has substrate ${w.existingId}: ${w.existingTitle}`)
          }
          if (w.type === 'sensitive_content') {
            console.log(`${theme.warning} Sensitive content detected: ${w.matches.map(m => m.type).join(', ')}`)
          }
        }
      }

      const { filePath } = await writeSubstrate(projectSlug, result.frontmatter, content)
      console.log(`${theme.success} Substrate ${id} created: ${filePath}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

substrateCommand
  .command('list')
  .description('List all substrates')
  .action(async () => {
    try {
      const projectSlug = await requireActiveProject()
      const substrates = await listSubstrates(projectSlug)

      if (substrates.length === 0) {
        console.log(`${theme.substrate} No substrates found`)
        return
      }

      console.log(`\n${theme.substrate} Substratos — ${projectSlug} (${substrates.length} total)\n`)
      console.log(' ID   │ Título                          │ Categoria      │ Palavras │ Status')
      console.log('──────┼─────────────────────────────────┼────────────────┼──────────┼─────────')

      for (const s of substrates) {
        const title = s.title.padEnd(31).slice(0, 31)
        const cat = s.category.padEnd(14).slice(0, 14)
        const words = String(s.wordCount).padStart(5)
        console.log(` ${s.id.padEnd(4)} │ ${title} │ ${cat} │ ${words}    │ ${s.status}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

substrateCommand
  .command('view <id>')
  .description('View a substrate')
  .action(async (id) => {
    try {
      const projectSlug = await requireActiveProject()
      const file = await findSubstrateFile(projectSlug, id)
      const { frontmatter, content, wordCount } = await parseSubstrate(file)

      console.log(`\n${theme.substrate} ${frontmatter.id}: ${frontmatter.title}`)
      console.log(`   Category: ${frontmatter.category}`)
      console.log(`   Version: ${frontmatter.version} | Status: ${frontmatter.status}`)
      console.log(`   Words: ${wordCount}/${MAX_WORD_COUNT}`)
      console.log(`   Created: ${frontmatter.created_at}`)
      console.log(`\n${content}\n`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

substrateCommand
  .command('edit <id>')
  .description('Edit a substrate')
  .option('-t, --title <title>', 'New title')
  .option('-c, --category <category>', 'New category')
  .option('--content <content>', 'New content')
  .action(async (id, opts) => {
    try {
      const projectSlug = await requireActiveProject()
      const file = await findSubstrateFile(projectSlug, id)
      const { frontmatter, content } = await parseSubstrate(file)

      const updated = {
        ...frontmatter,
        title: opts.title || frontmatter.title,
        category: opts.category || frontmatter.category,
        version: frontmatter.version + 1,
        updated_at: new Date().toISOString(),
      }

      const newContent = opts.content !== undefined ? opts.content : content
      const result = await validateSubstrate(projectSlug, updated, newContent)

      await writeSubstrate(projectSlug, result.frontmatter, newContent)
      console.log(`${theme.success} Substrate ${id} updated to version ${updated.version}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
