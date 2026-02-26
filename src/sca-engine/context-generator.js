import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readWithFrontmatter, writeWithFrontmatter, readYaml, ensureDir } from '../shared/fs-utils.js'
import { getProject } from '../project/registry.js'

export async function loadSquadNeeds(squad) {
  const mapPath = paths.squadContextMapFile()
  const map = await readYaml(mapPath)

  if (!map[squad]) {
    throw new Error(`Squad '${squad}' not found in squad-context-map.yaml`)
  }

  return map[squad]
}

export async function loadSubstratesByCategory(projectSlug, categories) {
  const pattern = `${paths.substratesDir(projectSlug)}/S*-*.md`
  const files = await glob(pattern)
  const results = []

  for (const file of files) {
    const { frontmatter, content, wordCount } = await readWithFrontmatter(file)
    if (categories.includes(frontmatter.category)) {
      results.push({ frontmatter, content, wordCount, filePath: file })
    }
  }

  return results.sort((a, b) => {
    const numA = parseInt(a.frontmatter.id.slice(1), 10)
    const numB = parseInt(b.frontmatter.id.slice(1), 10)
    return numA - numB
  })
}

export async function loadBlocksByStage(projectSlug, stages) {
  if (!stages || stages.length === 0) return []

  const pattern = `${paths.blocksDir(projectSlug)}/*-*.md`
  const files = await glob(pattern)
  const results = []

  for (const file of files) {
    const { frontmatter, content } = await readWithFrontmatter(file)
    if (stages.includes(frontmatter.funnel_stage)) {
      results.push({ frontmatter, content, filePath: file })
    }
  }

  return results
}

export function compileContextDocument({ manifest, substrates, blocks, squad, staleBlocks }) {
  const now = new Date().toISOString()

  const frontmatter = {
    project: manifest.slug,
    squad,
    generated_at: now,
    substrates_included: substrates.map(s => s.frontmatter.id),
    blocks_included: blocks.map(b => b.frontmatter.id),
    stale_blocks: staleBlocks.map(b => b.frontmatter.id),
  }

  const lines = []
  lines.push(`# Context: ${manifest.name} → ${squad}`)
  lines.push('')
  lines.push(`> Generated: ${now}`)
  lines.push(`> Project: ${manifest.slug} | Visibility: ${manifest.visibility}`)
  lines.push('')

  if (staleBlocks.length > 0) {
    lines.push(`> ⚠️ STALE BLOCKS: ${staleBlocks.map(b => b.frontmatter.id).join(', ')}`)
    lines.push('')
  }

  // Substrates section
  if (substrates.length > 0) {
    lines.push('## Substratos')
    lines.push('')
    for (const s of substrates) {
      lines.push(`### ${s.frontmatter.id}: ${s.frontmatter.title} [${s.frontmatter.category}]`)
      lines.push('')
      lines.push(s.content)
      lines.push('')
    }
  }

  // Blocks section
  if (blocks.length > 0) {
    lines.push('## Blocos Compilados')
    lines.push('')
    for (const b of blocks) {
      const staleFlag = staleBlocks.some(sb => sb.frontmatter.id === b.frontmatter.id) ? ' [STALE]' : ''
      lines.push(`### ${b.frontmatter.id}: ${b.frontmatter.title} (${b.frontmatter.funnel_stage})${staleFlag}`)
      lines.push('')
      lines.push(b.content)
      lines.push('')
    }
  }

  const content = lines.join('\n').trim()
  return { frontmatter, content }
}

export async function generateContext(projectSlug, squad) {
  const manifest = await getProject(projectSlug)
  const needs = await loadSquadNeeds(squad)

  const substrates = await loadSubstratesByCategory(projectSlug, needs.categories)
  const blocks = await loadBlocksByStage(projectSlug, needs.funnel_stages)
  const staleBlocks = blocks.filter(b => b.frontmatter.status === 'stale')

  const { frontmatter, content } = compileContextDocument({
    manifest, substrates, blocks, squad, staleBlocks,
  })

  return { frontmatter, content, staleBlocks }
}

export async function saveContext(projectSlug, squad, frontmatter, content) {
  const dir = paths.contextsDir(projectSlug)
  await ensureDir(dir)

  const filePath = `${dir}/${squad}-context.md`
  await writeWithFrontmatter(filePath, frontmatter, content)
  return filePath
}
