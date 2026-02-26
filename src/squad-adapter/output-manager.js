import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readWithFrontmatter, writeWithFrontmatter, ensureDir, readYaml } from '../shared/fs-utils.js'
import { buildTraceabilityFooter } from './context-injector.js'

export async function saveOutput(projectSlug, squadName, outputType, content, metadata = {}) {
  const dir = paths.outputsDir(projectSlug)
  await ensureDir(dir)

  const id = await generateOutputId(dir)
  const now = new Date().toISOString()

  const frontmatter = {
    id,
    type: outputType,
    squad: squadName,
    project: projectSlug,
    created_at: now,
    status: 'draft',
    market_profile: metadata.marketProfile || 'pt-br-massa',
    substrates_used: metadata.substratesUsed || [],
    blocks_used: metadata.blocksUsed || [],
  }

  const footer = buildTraceabilityFooter(projectSlug, squadName, {
    substratesIncluded: frontmatter.substrates_used,
    blocksIncluded: frontmatter.blocks_used,
    staleBlocks: metadata.staleBlocks || [],
  })

  const fullContent = `${content}\n${footer}`
  const fileName = `${id}-${outputType}.md`
  const filePath = `${dir}/${fileName}`
  await writeWithFrontmatter(filePath, frontmatter, fullContent)

  return { id, filePath, frontmatter }
}

async function generateOutputId(dir) {
  const existing = await glob(`${dir}/O*-*.md`)
  const maxNum = existing.reduce((max, f) => {
    const match = f.match(/O(\d+)-/)
    return match ? Math.max(max, parseInt(match[1], 10)) : max
  }, 0)
  return `O${maxNum + 1}`
}

export async function listOutputs(projectSlug) {
  const dir = paths.outputsDir(projectSlug)
  const pattern = `${dir}/O*-*.md`
  const files = await glob(pattern)
  const outputs = []

  for (const file of files) {
    const { frontmatter } = await readWithFrontmatter(file)
    outputs.push({ ...frontmatter, filePath: file })
  }

  return outputs.sort((a, b) => {
    const numA = parseInt(a.id.slice(1), 10)
    const numB = parseInt(b.id.slice(1), 10)
    return numA - numB
  })
}

export async function getOutput(projectSlug, outputId) {
  const dir = paths.outputsDir(projectSlug)
  const pattern = `${dir}/${outputId}-*.md`
  const files = await glob(pattern)

  if (files.length === 0) {
    throw new Error(`Output '${outputId}' not found in project '${projectSlug}'`)
  }

  const { frontmatter, content } = await readWithFrontmatter(files[0])
  return { frontmatter, content, filePath: files[0] }
}

export async function detectMarketProfile(projectSlug) {
  try {
    const manifest = await readYaml(paths.manifestFile(projectSlug))
    return manifest.market_profile || 'pt-br-massa'
  } catch {
    return 'pt-br-massa'
  }
}
