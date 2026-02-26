import { readYaml, writeYaml, exists } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import path from 'node:path'
import { glob } from 'glob'

export function buildBrief(answers) {
  return {
    name: answers.name || 'Untitled Campaign',
    objective: answers.objective || '',
    audience: answers.audience || '',
    tone: answers.tone || 'professional',
    pipeline: answers.pipeline || 'full-campaign',
    market_profile: answers.marketProfile || 'pt-br-massa',
    created_at: new Date().toISOString(),
    custom_instructions: answers.customInstructions || '',
  }
}

export async function saveBrief(campaignDir, brief) {
  const briefPath = path.join(campaignDir, 'campaign-brief.yaml')
  await writeYaml(briefPath, brief)
  return briefPath
}

export async function loadBrief(campaignDir) {
  const briefPath = path.join(campaignDir, 'campaign-brief.yaml')
  if (await exists(briefPath)) {
    return readYaml(briefPath)
  }
  return null
}

export async function listCampaigns(projectFilter = null) {
  const campaignsDir = paths.campaignsDir()
  const dirs = await glob(`${campaignsDir}/*/REPORT.md`)

  const campaigns = []
  for (const reportPath of dirs) {
    const dir = path.dirname(reportPath)
    const name = path.basename(dir)
    const brief = await loadBrief(dir)

    campaigns.push({
      name,
      dir,
      pipeline: brief?.pipeline || name.split('-').slice(0, -1).join('-'),
      created_at: brief?.created_at || null,
      hasBrief: brief !== null,
    })
  }

  return campaigns.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
}

export function buildDefaultBrief(projectSlug, pipelineName) {
  return buildBrief({
    name: `${pipelineName} for ${projectSlug}`,
    pipeline: pipelineName,
    marketProfile: 'pt-br-massa',
  })
}
