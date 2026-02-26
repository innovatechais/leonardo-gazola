import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { getDashboardMetrics } from './metrics.js'
import { ensureDir } from '../shared/fs-utils.js'

export async function generateWeeklyReport() {
  const metrics = await getDashboardMetrics()
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - 7)

  const lines = []
  lines.push(`# Weekly Report: ${weekStart.toISOString().slice(0, 10)} → ${now.toISOString().slice(0, 10)}`)
  lines.push('')
  lines.push('## Metrics')
  lines.push('')
  lines.push(`| Metric | Value |`)
  lines.push(`|--------|-------|`)
  lines.push(`| Projects | ${metrics.totalProjects} |`)
  lines.push(`| Substrates | ${metrics.totalSubstrates} |`)
  lines.push(`| Blocks | ${metrics.totalBlocks} |`)
  lines.push(`| Outputs | ${metrics.totalOutputs} |`)
  lines.push(`| Routing Requests | ${metrics.routingRequests} |`)
  lines.push('')

  if (metrics.topSquads.length > 0) {
    lines.push('## Top Squads')
    lines.push('')
    for (const [squad, count] of metrics.topSquads) {
      lines.push(`- **${squad}**: ${count} requests`)
    }
    lines.push('')
  }

  // Suggestions
  lines.push('## Suggested Actions')
  lines.push('')

  if (metrics.totalSubstrates === 0) {
    lines.push('- 📝 Add substrates to your projects for better context generation')
  }
  if (metrics.totalOutputs === 0) {
    lines.push('- 🚀 Run your first campaign with `nexus campaign run`')
  }
  if (metrics.totalProjects > 1) {
    lines.push('- 🔄 Review project visibility settings for proper isolation')
  }

  lines.push('')
  lines.push('---')
  lines.push(`> Generated: ${now.toISOString()}`)

  return lines.join('\n')
}

export async function saveWeeklyReport(content) {
  const reportsDir = path.join(paths.root(), 'docs', 'reports')
  await ensureDir(reportsDir)

  const date = new Date().toISOString().slice(0, 10)
  const filePath = path.join(reportsDir, `weekly-${date}.md`)
  await fs.writeFile(filePath, content, 'utf-8')

  return filePath
}
