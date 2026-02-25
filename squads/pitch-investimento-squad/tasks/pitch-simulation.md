---
task: Pitch Simulation
responsavel: "@pitch-coach"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - modo: rapido (5min) | completo (15min) | perguntas_apenas
  - perfil_simulado: tipo de investidor a simular (conservador, técnico, agressivo)
Saida: |
  - feedback: Avaliação detalhada da narrativa, confiança e pontos fracos
  - pontos_fortes: O que funcionou bem
  - melhorias: O que precisa ajustar antes da próxima reunião real
Checklist:
  - "[ ] Elicitar modo de simulação desejado"
  - "[ ] Definir perfil de investidor a simular"
  - "[ ] Conduzir simulação no modo selecionado"
  - "[ ] Fazer perguntas como um investidor real faria"
  - "[ ] Registrar pontos fortes observados"
  - "[ ] Identificar gaps de narrativa ou confiança"
  - "[ ] Formular objeções baseadas no perfil simulado"
  - "[ ] Entregar feedback estruturado"
---

# *pitch-simulation — Simulação de Pitch

Simula uma reunião real com investidor para preparar Leonardo antes do real.

## Elicitação

```
? Modo: rápido (5min) / completo (15min) / só perguntas?
? Perfil do investidor a simular:
  1. Conservador (foco em risco, proof points, saída)
  2. Técnico (foco em arquitetura, acurácia, escalabilidade)
  3. Operacional (foco em time, processos, execução)
  4. Agressivo (questiona tudo, quer te pressionar)
  5. Neutro (padrão)
```

## Formato da Simulação

Mentor assume o papel do investidor e conduz a simulação:

```
[Mentor como investidor]:
"Olá Leonardo, obrigado por vir. Me conta — o que vocês fazem na Innovatech?"

[Leonardo pitcha]

[Mentor como investidor]:
"Interessante. Mas esse mercado de transportes — não é um mercado muito fragmentado?
 Como vocês pretendem ter escala nisso?"

[continua por X minutos]

[Final]:
[Mentor faz as perguntas mais difíceis do perfil simulado]
```

## Output do Feedback

```
🎯 Mentor — Feedback da Simulação
Perfil simulado: [tipo]

━━━━━━━━━━━━━━━━━━━━━━━━
✅ PONTOS FORTES
━━━━━━━━━━━━━━━━━━━━━━━━
• [o que funcionou bem — narrativa, número citado, resposta específica]

━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ PONTOS DE MELHORIA
━━━━━━━━━━━━━━━━━━━━━━━━
• [gap 1] — Sugestão: [como melhorar]
• [gap 2] — Sugestão: [como melhorar]

━━━━━━━━━━━━━━━━━━━━━━━━
AVALIAÇÃO GERAL
━━━━━━━━━━━━━━━━━━━━━━━━
Narrativa: [Forte / Adequada / Precisa ajustar]
Confiança: [Genuína / Ok / Parece decorado]
Proof points: [Bem usados / Subutilizados / Faltando]

PRONTO PARA REUNIÃO REAL? [Sim / Ainda não — refazer em: X]
```
