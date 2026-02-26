const CATEGORY_KEYWORDS = {
  identity: ['quem somos', 'sobre nós', 'fundador', 'missão', 'visão', 'valores', 'história', 'empresa'],
  product: ['produto', 'plataforma', 'sistema', 'ferramenta', 'solução', 'funcionalidade', 'feature'],
  pain: ['dor', 'problema', 'desafio', 'frustração', 'dificuldade', 'perda', 'risco', 'gap'],
  solution: ['solução', 'resolve', 'como funciona', 'processo', 'fluxo', 'automação', 'tecnologia'],
  objection: ['objeção', 'mas', 'preocupação', 'dúvida', 'porquê não', 'segurança', 'confiança'],
  differentiator: ['diferencial', 'vantagem', 'único', 'competitivo', 'inovação', 'exclusivo'],
  proof: ['prova', 'case', 'resultado', 'depoimento', 'números', 'métrica', 'roi', 'cliente'],
  offer: ['preço', 'plano', 'oferta', 'pacote', 'investimento', 'valor', 'desconto', 'trial'],
  audience: ['público', 'persona', 'cliente ideal', 'segmento', 'mercado', 'icp', 'target'],
  context: ['contexto', 'cenário', 'mercado', 'tendência', 'indústria', 'setor'],
}

export function categorize(chunk) {
  const lower = chunk.toLowerCase()
  let bestCategory = 'context'
  let bestScore = 0

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0
    for (const keyword of keywords) {
      if (lower.includes(keyword)) score++
    }
    if (score > bestScore) {
      bestScore = score
      bestCategory = category
    }
  }

  return bestCategory
}
