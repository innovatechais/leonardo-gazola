import { describe, it, expect } from 'vitest'
import { categorize } from '../../src/capture/categorizer.js'

describe('categorize', () => {
  it('detects product category', () => {
    expect(categorize('Nosso produto é uma plataforma de automação')).toBe('product')
  })

  it('detects pain category', () => {
    expect(categorize('O maior problema do mercado é a perda de dados')).toBe('pain')
  })

  it('detects solution category', () => {
    expect(categorize('Nossa solução resolve o problema com automação inteligente')).toBe('solution')
  })

  it('detects offer category', () => {
    expect(categorize('Plano básico: preço R$ 497/mês com desconto')).toBe('offer')
  })

  it('detects identity category', () => {
    expect(categorize('Quem somos: fundador e missão da empresa')).toBe('identity')
  })

  it('detects proof category', () => {
    expect(categorize('Case de sucesso: resultado de 300% ROI com nosso cliente')).toBe('proof')
  })

  it('detects audience category', () => {
    expect(categorize('Nosso público alvo são PMEs no segmento logístico')).toBe('audience')
  })

  it('detects differentiator category', () => {
    expect(categorize('Nosso diferencial competitivo é a inovação única')).toBe('differentiator')
  })

  it('defaults to context for unclear text', () => {
    expect(categorize('Lorem ipsum dolor sit amet')).toBe('context')
  })
})
