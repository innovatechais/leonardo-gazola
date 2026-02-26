import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import { analyzeRequest } from '../../src/request-router/analyzer.js'

const FIXTURES = path.resolve('tests/fixtures')

describe('request-router/analyzer', () => {
  let originalRoot

  beforeEach(() => {
    originalRoot = process.env.NEXUS_ROOT
    process.env.NEXUS_ROOT = FIXTURES
  })

  afterEach(() => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
  })

  it('detects output type from description', async () => {
    const result = await analyzeRequest('Preciso de uma landing-page para o produto')
    expect(result.detectedOutputType).toBe('landing-page')
    expect(result.confidence).toBe('high')
  })

  it('detects category when no exact output type match', async () => {
    const result = await analyzeRequest('Quero um texto de vendas para email')
    expect(result.detectedCategory).toBe('copywriting')
    expect(result.confidence).toBe('medium')
  })

  it('returns low confidence when nothing matches', async () => {
    const result = await analyzeRequest('algo completamente diferente xyz')
    expect(result.detectedOutputType).toBeNull()
    expect(result.detectedCategory).toBeNull()
    expect(result.confidence).toBe('low')
  })

  it('normalizes input to lowercase', async () => {
    const result = await analyzeRequest('LANDING-PAGE para Evidex')
    expect(result.detectedOutputType).toBe('landing-page')
    expect(result.normalized).toBe('landing-page para evidex')
  })

  it('preserves original description', async () => {
    const result = await analyzeRequest('Fazer um carousel bonito')
    expect(result.original).toBe('Fazer um carousel bonito')
  })

  it('detects visual category keywords', async () => {
    const result = await analyzeRequest('Preciso de um carrossel para Instagram')
    expect(result.detectedCategory).toBe('visual')
  })

  it('detects design category keywords', async () => {
    const result = await analyzeRequest('Criar design system completo')
    expect(result.detectedCategory).toBe('design')
    expect(result.confidence).toBe('medium')
  })

  it('detects advertising category keywords', async () => {
    const result = await analyzeRequest('Criar campanha de ads para clickbank')
    expect(result.detectedCategory).toBe('advertising')
  })

  it('detects tsl output type', async () => {
    const result = await analyzeRequest('Escrever uma tsl para o produto')
    expect(result.detectedOutputType).toBe('tsl')
  })

  it('detects headlines output type', async () => {
    const result = await analyzeRequest('Gerar headlines para a campanha')
    expect(result.detectedOutputType).toBe('headlines')
  })
})
