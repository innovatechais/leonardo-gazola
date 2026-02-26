import { Command } from 'commander'
import { glob } from 'glob'
import { composeBlock, writeBlock } from '../sca-engine/index.js'
import { readWithFrontmatter } from '../shared/fs-utils.js'
import { getActiveProjectSlug } from '../project/session.js'
import { paths } from '../shared/paths.js'
import { theme, FUNNEL_STAGES } from '../shared/constants.js'
import { ProjectNotFoundError, BlockNotFoundError } from '../shared/errors.js'
import { checkStaleness } from '../sca-engine/composer.js'

const STAGE_ICONS = {
  awareness: theme.awareness,
  consideration: theme.consideration,
  decision: theme.decision,
  loyalty: theme.loyalty,
}

async function requireActiveProject() {
  const slug = await getActiveProjectSlug()
  if (!slug) {
    throw new ProjectNotFoundError('No active project. Use `nexus project select <slug>` first.')
  }
  return slug
}

async function findBlockFile(projectSlug, id) {
  const pattern = `${paths.blocksDir(projectSlug)}/${id}-*.md`
  const files = await glob(pattern)
  if (files.length === 0) {
    throw new BlockNotFoundError(id)
  }
  return files[0]
}

async function loadBlocks(projectSlug) {
  const pattern = `${paths.blocksDir(projectSlug)}/*-*.md`
  const files = await glob(pattern)
  const blocks = []

  for (const file of files) {
    try {
      const { frontmatter } = await readWithFrontmatter(file)
      const isStale = await checkStaleness(file, projectSlug)
      blocks.push({ ...frontmatter, filePath: file, isStale })
    } catch {
      // Skip invalid files
    }
  }

  return blocks
}

export const blockCommand = new Command('block')
  .description('Manage blocks')

blockCommand
  .command('create <id>')
  .description('Create a new block')
  .requiredOption('-t, --title <title>', 'Block title')
  .requiredOption('-s, --stage <stage>', `Funnel stage: ${FUNNEL_STAGES.join(', ')}`)
  .requiredOption('--substrates <ids>', 'Comma-separated substrate IDs (e.g., S1,S2,S3)')
  .action(async (id, opts) => {
    try {
      const projectSlug = await requireActiveProject()
      const substrateIds = opts.substrates.split(',').map(s => s.trim())
      const now = new Date().toISOString()

      const blockDef = {
        id,
        title: opts.title,
        funnel_stage: opts.stage,
        substrates: substrateIds,
        version: 1,
        status: 'current',
        compiled_at: now,
      }

      const { compiledContent } = await composeBlock(blockDef, projectSlug)
      const { filePath } = await writeBlock(projectSlug, blockDef, compiledContent)
      console.log(`${theme.success} Block ${id} created: ${filePath}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

blockCommand
  .command('list')
  .description('List all blocks grouped by funnel stage')
  .action(async () => {
    try {
      const projectSlug = await requireActiveProject()
      const blocks = await loadBlocks(projectSlug)

      if (blocks.length === 0) {
        console.log(`${theme.block} No blocks found`)
        return
      }

      console.log(`\n${theme.block} Blocos — ${projectSlug} (${blocks.length} total)\n`)

      for (const stage of FUNNEL_STAGES) {
        const stageBlocks = blocks.filter(b => b.funnel_stage === stage)
        if (stageBlocks.length === 0) continue

        const icon = STAGE_ICONS[stage] || ''
        console.log(`${icon} ${stage.toUpperCase()} (${stageBlocks.length})`)

        for (const b of stageBlocks) {
          const staleFlag = b.isStale ? ' [STALE]' : ''
          const subs = b.substrates.join(', ')
          console.log(`   ${b.id} │ ${b.title}${staleFlag} │ Substrates: ${subs}`)
        }
        console.log()
      }
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

blockCommand
  .command('view <id>')
  .description('View a block with content and references')
  .action(async (id) => {
    try {
      const projectSlug = await requireActiveProject()
      const file = await findBlockFile(projectSlug, id)
      const { frontmatter, content } = await readWithFrontmatter(file)
      const isStale = await checkStaleness(file, projectSlug)

      const staleFlag = isStale ? ' [STALE]' : ''
      const icon = STAGE_ICONS[frontmatter.funnel_stage] || ''

      console.log(`\n${theme.block} ${frontmatter.id}: ${frontmatter.title}${staleFlag}`)
      console.log(`   ${icon} Stage: ${frontmatter.funnel_stage}`)
      console.log(`   Version: ${frontmatter.version} | Status: ${frontmatter.status}`)
      console.log(`   Compiled: ${frontmatter.compiled_at}`)
      console.log(`\n${content}`)
      console.log(`\n── References ──`)
      console.log(`   Substrates: ${frontmatter.substrates.join(', ')}`)
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
