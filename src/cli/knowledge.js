import { Command } from 'commander'
import { glob } from 'glob'
import { healthCheck } from '../sca-engine/health.js'
import { impactAnalysis } from '../sca-engine/impact.js'
import { composeBlock, writeBlock } from '../sca-engine/composer.js'
import { readWithFrontmatter } from '../shared/fs-utils.js'
import { getActiveProjectSlug } from '../project/session.js'
import { paths } from '../shared/paths.js'
import { theme } from '../shared/constants.js'
import { ProjectNotFoundError } from '../shared/errors.js'

async function requireActiveProject() {
  const slug = await getActiveProjectSlug()
  if (!slug) {
    throw new ProjectNotFoundError('No active project.')
  }
  return slug
}

export const knowledgeCommand = new Command('knowledge')
  .description('Knowledge health and analysis')

knowledgeCommand
  .command('health')
  .description('Show knowledge health report')
  .action(async () => {
    try {
      const projectSlug = await requireActiveProject()
      const report = await healthCheck(projectSlug)

      console.log(`\n${theme.info} Knowledge Health — ${projectSlug}\n`)
      console.log(`   ${theme.substrate} Substrates: ${report.totals.substrates}`)
      console.log(`   ${theme.block} Blocks: ${report.totals.blocks}`)
      console.log(`   ${theme.context} Contexts: ${report.totals.contexts}`)
      console.log(`   ${theme.output} Outputs: ${report.totals.outputs}`)

      if (report.stale.length > 0) {
        console.log(`\n   ${theme.stale} Stale blocks (${report.stale.length}):`)
        for (const b of report.stale) {
          console.log(`      - ${b.id}: ${b.title}`)
        }
      }

      if (report.orphans.length > 0) {
        console.log(`\n   ${theme.warning} Orphan substrates (${report.orphans.length}):`)
        for (const s of report.orphans) {
          console.log(`      - ${s.id}: ${s.title}`)
        }
      }

      if (report.unused.length > 0) {
        console.log(`\n   ${theme.warning} Unused blocks (${report.unused.length}):`)
        for (const b of report.unused) {
          console.log(`      - ${b.id}: ${b.title}`)
        }
      }

      const isHealthy = report.stale.length === 0 && report.orphans.length === 0
      console.log(`\n   ${isHealthy ? theme.success : theme.warning} Status: ${isHealthy ? 'Healthy' : 'Needs attention'}\n`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

knowledgeCommand
  .command('refresh')
  .description('Refresh stale blocks and regenerate')
  .action(async () => {
    try {
      const projectSlug = await requireActiveProject()
      const report = await healthCheck(projectSlug)

      if (report.stale.length === 0) {
        console.log(`${theme.success} No stale blocks to refresh`)
        return
      }

      for (const staleBlock of report.stale) {
        const blockFile = staleBlock.filePath
        const { frontmatter } = await readWithFrontmatter(blockFile)

        const updated = {
          ...frontmatter,
          version: (frontmatter.version || 1) + 1,
          status: 'current',
          compiled_at: new Date().toISOString(),
        }

        const { compiledContent } = await composeBlock(updated, projectSlug)
        await writeBlock(projectSlug, updated, compiledContent)
        console.log(`${theme.success} Refreshed ${staleBlock.id}: ${staleBlock.title}`)
      }
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

export const impactCommand = new Command('impact')

// Add impact subcommand to substrate CLI
export function addImpactToSubstrate(substrateCmd) {
  substrateCmd
    .command('impact <id>')
    .description('Show impact analysis for a substrate')
    .action(async (id) => {
      try {
        const projectSlug = await requireActiveProject()
        const result = await impactAnalysis(id, projectSlug)

        console.log(`\n${theme.warning} IMPACT — Edição de ${id}\n`)

        if (result.blocks.length > 0) {
          console.log('   Blocos afetados:')
          for (let i = 0; i < result.blocks.length; i++) {
            const prefix = i === result.blocks.length - 1 ? '└──' : '├──'
            console.log(`   ${prefix} ${theme.block} ${result.blocks[i].id}: ${result.blocks[i].title}`)
          }
        } else {
          console.log('   Nenhum bloco afetado')
        }

        if (result.contexts.length > 0) {
          console.log('\n   Contextos afetados:')
          for (let i = 0; i < result.contexts.length; i++) {
            const prefix = i === result.contexts.length - 1 ? '└──' : '├──'
            console.log(`   ${prefix} ${theme.context} ${result.contexts[i].squad}`)
          }
        }

        console.log()
      } catch (error) {
        console.error(`${theme.error} ${error.message}`)
        process.exitCode = 1
      }
    })
}
