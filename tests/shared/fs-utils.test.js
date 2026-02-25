import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { readWithFrontmatter, writeWithFrontmatter, readYaml, writeYaml } from '../../src/shared/fs-utils.js'

let tmpDir

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(tmpDir)
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

describe('readWithFrontmatter', () => {
  it('reads markdown with frontmatter', async () => {
    const filePath = path.join(tmpDir, 'test.md')
    await fs.writeFile(filePath, '---\nid: S1\ntitle: Test\n---\n\nHello world content here.\n')

    const result = await readWithFrontmatter(filePath)
    expect(result.frontmatter.id).toBe('S1')
    expect(result.frontmatter.title).toBe('Test')
    expect(result.content).toBe('Hello world content here.')
    expect(result.wordCount).toBe(4)
  })

  it('counts words correctly', async () => {
    const filePath = path.join(tmpDir, 'words.md')
    const words = Array.from({ length: 200 }, (_, i) => `word${i}`).join(' ')
    await fs.writeFile(filePath, `---\nid: S1\n---\n\n${words}\n`)

    const result = await readWithFrontmatter(filePath)
    expect(result.wordCount).toBe(200)
  })

  it('handles empty content', async () => {
    const filePath = path.join(tmpDir, 'empty.md')
    await fs.writeFile(filePath, '---\nid: S1\n---\n\n')

    const result = await readWithFrontmatter(filePath)
    expect(result.content).toBe('')
    expect(result.wordCount).toBe(0)
  })
})

describe('writeWithFrontmatter', () => {
  it('writes markdown with frontmatter', async () => {
    const filePath = path.join(tmpDir, 'output.md')
    await writeWithFrontmatter(filePath, { id: 'S1', title: 'Test' }, 'Content here.')

    const raw = await fs.readFile(filePath, 'utf-8')
    expect(raw).toContain('---')
    expect(raw).toContain('id: S1')
    expect(raw).toContain('Content here.')
  })

  it('creates parent directories', async () => {
    const filePath = path.join(tmpDir, 'deep', 'nested', 'file.md')
    await writeWithFrontmatter(filePath, { id: 'S1' }, 'Content')

    const exists = await fs.pathExists(filePath)
    expect(exists).toBe(true)
  })
})

describe('readYaml / writeYaml', () => {
  it('round-trips YAML data', async () => {
    const filePath = path.join(tmpDir, 'test.yaml')
    const data = { slug: 'test', name: 'Test Project', tags: ['a', 'b'] }

    await writeYaml(filePath, data)
    const result = await readYaml(filePath)

    expect(result.slug).toBe('test')
    expect(result.name).toBe('Test Project')
    expect(result.tags).toEqual(['a', 'b'])
  })
})
