import fs from 'fs-extra'
import matter from 'gray-matter'
import yaml from 'js-yaml'

export async function readWithFrontmatter(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return { frontmatter, content: content.trim(), wordCount, raw }
}

export async function writeWithFrontmatter(filePath, frontmatter, content) {
  const yamlStr = yaml.dump(frontmatter, { lineWidth: -1, quotingType: '"' })
  const output = `---\n${yamlStr}---\n\n${content}\n`
  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, output, 'utf-8')
}

export async function readYaml(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return yaml.load(raw)
}

export async function writeYaml(filePath, data) {
  const yamlStr = yaml.dump(data, { lineWidth: -1, quotingType: '"' })
  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, yamlStr, 'utf-8')
}

export async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath)
}

export async function exists(filePath) {
  return fs.pathExists(filePath)
}
