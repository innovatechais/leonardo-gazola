import { Command } from 'commander'
import { createProject, listProjects, getProject, getProjectStats } from '../project/index.js'
import { selectProject, getActiveProject } from '../project/index.js'
import { theme } from '../shared/constants.js'

const program = new Command('project')
  .description('Manage NEXUS projects')

program
  .command('create <slug>')
  .description('Create a new project with manifest')
  .option('-n, --name <name>', 'Project display name')
  .option('-v, --visibility <level>', 'Visibility level', 'private')
  .action(async (slug, options) => {
    try {
      const manifest = await createProject(slug, {
        name: options.name || slug,
        visibility: options.visibility,
      })
      console.log(`${theme.success} Project created: ${theme.project} ${manifest.name} (${manifest.slug})`)
      console.log(`   Visibility: ${manifest.visibility}`)
      console.log(`   Path: docs/knowledge/${slug}/`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

program
  .command('list')
  .description('List all registered projects')
  .action(async () => {
    try {
      const projects = await listProjects()
      if (projects.length === 0) {
        console.log(`${theme.info} No projects registered yet.`)
        return
      }
      console.log(`${theme.project} Projects (${projects.length} total)\n`)
      console.log(' Slug             │ Name                 │ Visibility │ Market Profile')
      console.log('──────────────────┼──────────────────────┼────────────┼────────────────')
      for (const p of projects) {
        const slug = p.slug.padEnd(17)
        const name = (p.name || '').padEnd(20)
        const vis = p.visibility.padEnd(10)
        console.log(` ${slug}│ ${name}│ ${vis} │ ${p.market_profile}`)
      }
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

program
  .command('select <slug>')
  .description('Set active project')
  .action(async (slug) => {
    try {
      await selectProject(slug)
      console.log(`${theme.success} Active project: ${theme.project} ${slug}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

program
  .command('status')
  .description('Show active project status')
  .action(async () => {
    try {
      const project = await getActiveProject()
      if (!project) {
        console.log(`${theme.warning} No active project. Use *project select {slug}`)
        return
      }
      const stats = await getProjectStats(project.slug)
      console.log(`${theme.project} ${project.name} (${project.slug})\n`)
      console.log(`   Visibility:  ${project.visibility}`)
      console.log(`   Market:      ${project.market_profile}`)
      console.log(`   Tone:        ${project.tone}`)
      console.log(`   ${theme.substrate} Substrates: ${stats.substrates}`)
      console.log(`   ${theme.block} Blocks:     ${stats.blocks}`)
      console.log(`   ${theme.context} Contexts:   ${stats.contexts}`)
      console.log(`   ${theme.output} Outputs:    ${stats.outputs}`)
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })

export default program
