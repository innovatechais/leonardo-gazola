import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { importFile } from '../../src/capture/importer.js'

let tmpDir

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(tmpDir)
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

describe('importFile', () => {
  it('imports markdown file and generates suggestions', async () => {
    const filePath = path.join(tmpDir, 'test.md')
    await fs.writeFile(filePath, '## Nosso Produto\n\nUma plataforma incrível.\n\n## A Dor do Mercado\n\nEmpresas perdem dinheiro.')

    const suggestions = await importFile(filePath)
    expect(suggestions.length).toBeGreaterThanOrEqual(2)
    expect(suggestions[0].id).toBe('S1')
    expect(suggestions[0].source).toBe(filePath)
    expect(suggestions[0].wordCount).toBeGreaterThan(0)
  })

  it('imports text file', async () => {
    const filePath = path.join(tmpDir, 'test.txt')
    await fs.writeFile(filePath, 'First paragraph about our product.\n\nSecond paragraph about pricing.')

    const suggestions = await importFile(filePath)
    expect(suggestions.length).toBeGreaterThanOrEqual(1)
  })

  it('imports JSON file', async () => {
    const filePath = path.join(tmpDir, 'test.json')
    await fs.writeFile(filePath, JSON.stringify({
      produto: 'Evidex é uma plataforma de comprovação',
      dor: 'Empresas perdem 15% com contestações',
    }))

    const suggestions = await importFile(filePath)
    expect(suggestions).toHaveLength(2)
  })

  it('assigns categories to suggestions', async () => {
    const filePath = path.join(tmpDir, 'categorized.md')
    await fs.writeFile(filePath, '## Nosso Produto\n\nPlataforma de automação.\n\n## Preço e Oferta\n\nPlano básico R$ 497.')

    const suggestions = await importFile(filePath)
    expect(suggestions.some(s => s.category === 'product')).toBe(true)
  })

  it('includes preview in suggestions', async () => {
    const filePath = path.join(tmpDir, 'preview.md')
    await fs.writeFile(filePath, '## Test\n\nSome content for preview testing here.')

    const suggestions = await importFile(filePath)
    expect(suggestions[0].preview).toBeTruthy()
    expect(suggestions[0].preview.endsWith('...')).toBe(true)
  })
})
