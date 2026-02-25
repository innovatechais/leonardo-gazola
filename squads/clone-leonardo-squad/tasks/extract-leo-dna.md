---
task: Extract Leo DNA
responsavel: "@dna-extractor-leo"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - fonte: transcrição | documento | histórico | script
  - conteudo: O conteúdo a ser analisado
Saida: |
  - dna_extraido: Padrões identificados por categoria
  - confianca: Nível de confiança de cada padrão (1 fonte vs. múltiplas)
  - lacunas: O que ainda precisa ser extraído de outras fontes
Checklist:
  - "[ ] Receber e processar a fonte"
  - "[ ] Identificar modelos mentais presentes"
  - "[ ] Identificar heurísticas de decisão"
  - "[ ] Extrair vocabulário característico"
  - "[ ] Mapear tom de comunicação"
  - "[ ] Identificar princípios de priorização"
  - "[ ] Verificar se padrões são confirmados em fontes anteriores"
  - "[ ] Documentar nível de confiança de cada padrão"
  - "[ ] Identificar lacunas para próximas sessões de extração"
---

# *extract-leo-dna — Extração de DNA de Leonardo

Analisa fontes de conhecimento de Leonardo e extrai padrões que definem seu perfil.

## Output Esperado

```
🧬 Mira-Leo — DNA Extraído
Fonte: {tipo de fonte} | [data]

━━━━━━━━━━━━━━━━━━━━━━━━
MODELOS MENTAIS IDENTIFICADOS
━━━━━━━━━━━━━━━━━━━━━━━━
• [modelo mental] — Confiança: [Alta=3+ fontes / Média=2 / Baixa=1]
  Evidência: "[citação ou exemplo da fonte]"

━━━━━━━━━━━━━━━━━━━━━━━━
HEURÍSTICAS DE DECISÃO
━━━━━━━━━━━━━━━━━━━━━━━━
• "Quando [X], faço [Y]" — Confiança: [nível]
  Evidência: "[exemplo]"

━━━━━━━━━━━━━━━━━━━━━━━━
VOCABULÁRIO CARACTERÍSTICO
━━━━━━━━━━━━━━━━━━━━━━━━
• "[expressão ou termo único de Leonardo]"
• "[expressão ou termo único]"

━━━━━━━━━━━━━━━━━━━━━━━━
TOM DE COMUNICAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━
• [característica do tom: direto / estruturado / urgente / analítico]
  Evidência: "[exemplo]"

━━━━━━━━━━━━━━━━━━━━━━━━
LACUNAS IDENTIFICADAS
━━━━━━━━━━━━━━━━━━━━━━━━
• [área que ainda não tem dados suficientes]
  Fonte recomendada: [onde buscar]

→ DNA desta sessão entregue para @knowledge-indexer organizar
→ Quando DNA suficiente acumulado: passa para @clone-builder-leo
```
