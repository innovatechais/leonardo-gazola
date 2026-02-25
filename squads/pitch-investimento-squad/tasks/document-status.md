---
task: Document Status
responsavel: "@due-diligence-guardian"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - filtro: all | prontos | pendentes | solicitados (default: all)
Saida: |
  - status_completo: Status de todos os documentos da due diligence
  - proxima_acao: Documento mais urgente e responsável
  - alertas: Documentos desatualizados ou faltando que podem bloquear o round
Checklist:
  - "[ ] Verificar status de cada documento da checklist"
  - "[ ] Identificar documentos prontos"
  - "[ ] Identificar documentos pendentes com o que falta"
  - "[ ] Identificar documentos desatualizados"
  - "[ ] Identificar documentos faltando completamente"
  - "[ ] Definir próxima ação mais urgente com responsável"
  - "[ ] Alertar sobre qualquer bloqueador para o round"
---

# *document-status — Status da Due Diligence

Visão completa de todos os documentos da due diligence com alertas de bloqueadores.

## Output Esperado

```
🗄️ Arquivo — Status da Due Diligence
[data]

━━━━━━━━━━━━━━━━━━━━━━━━
✅ PRONTOS ([N] documentos)
━━━━━━━━━━━━━━━━━━━━━━━━
• Pitch deck executivo (10 slides)
• Projeções financeiras (12 meses)
• Análise competitiva (75+ empresas)
• Case de ROI — Jaloto
• Case de ROI — Metaltintas
• Projeção de uso do round

━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ PRECISAM DE ATENÇÃO ([N] documentos)
━━━━━━━━━━━━━━━━━━━━━━━━
• [documento] — O que falta: [descrição]
• [documento] — Desatualizado desde: [data]

━━━━━━━━━━━━━━━━━━━━━━━━
❌ FALTANDO ([N] documentos)
━━━━━━━━━━━━━━━━━━━━━━━━
• [documento] — Prioridade: [Alta/Média]
• [documento] — Prioridade: [Alta/Média]

━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMA AÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━
[Documento mais urgente] → Responsável: [Leonardo/Lorenzo/Arthur]
Prazo: [data ou "antes da próxima reunião com investidor"]

⚠️ ALERTA: [Se houver algo que pode bloquear o round]
```
