import { listProjects, getProjectStats } from '../project/registry.js'
import { readYaml, exists } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'

export async function getDashboardMetrics() {
  const projects = await listProjects()
  const projectMetrics = []

  for (const project of projects) {
    const stats = await getProjectStats(project.slug)
    projectMetrics.push({
      slug: project.slug,
      name: project.name,
      visibility: project.visibility,
      ...stats,
    })
  }

  // Routing log metrics
  let routingEntries = 0
  const topSquads = {}
  const logPath = paths.routingLogFile()
  if (await exists(logPath)) {
    const log = await readYaml(logPath)
    if (log?.entries) {
      routingEntries = log.entries.length
      for (const entry of log.entries) {
        if (entry.matched_squad) {
          topSquads[entry.matched_squad] = (topSquads[entry.matched_squad] || 0) + 1
        }
      }
    }
  }

  const sortedSquads = Object.entries(topSquads)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return {
    projects: projectMetrics,
    totalProjects: projects.length,
    totalSubstrates: projectMetrics.reduce((sum, p) => sum + p.substrates, 0),
    totalBlocks: projectMetrics.reduce((sum, p) => sum + p.blocks, 0),
    totalOutputs: projectMetrics.reduce((sum, p) => sum + p.outputs, 0),
    routingRequests: routingEntries,
    topSquads: sortedSquads,
  }
}

export function formatDashboard(metrics) {
  const lines = []
  lines.push('# NEXUS Dashboard')
  lines.push('')
  lines.push(`📊 **Overview**`)
  lines.push(`   Projects: ${metrics.totalProjects}`)
  lines.push(`   Substrates: ${metrics.totalSubstrates}`)
  lines.push(`   Blocks: ${metrics.totalBlocks}`)
  lines.push(`   Outputs: ${metrics.totalOutputs}`)
  lines.push(`   Routing requests: ${metrics.routingRequests}`)
  lines.push('')

  if (metrics.topSquads.length > 0) {
    lines.push('🏆 **Top Squads**')
    for (const [squad, count] of metrics.topSquads) {
      lines.push(`   ${squad}: ${count} requests`)
    }
    lines.push('')
  }

  if (metrics.projects.length > 0) {
    lines.push('📁 **Projects**')
    for (const p of metrics.projects) {
      lines.push(`   ${p.slug} (${p.visibility}): ${p.substrates}S ${p.blocks}B ${p.outputs}O`)
    }
  }

  return lines.join('\n')
}
