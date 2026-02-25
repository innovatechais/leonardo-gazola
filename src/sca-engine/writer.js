import { paths } from '../shared/paths.js'
import { writeWithFrontmatter, ensureDir } from '../shared/fs-utils.js'

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function writeSubstrate(projectSlug, frontmatter, content) {
  const dir = paths.substratesDir(projectSlug)
  await ensureDir(dir)

  const slug = slugify(frontmatter.title)
  const fileName = `${frontmatter.id}-${slug}.md`
  const filePath = `${dir}/${fileName}`

  await writeWithFrontmatter(filePath, frontmatter, content)
  return { filePath, fileName }
}
