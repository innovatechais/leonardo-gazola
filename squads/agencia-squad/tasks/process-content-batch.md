---
task: Process Content Batch
responsavel: "@content-processor"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cliente: Nome do cliente de agência
  - conteudo: Descrição ou lista do conteúdo a processar
  - tipo: video | audio | texto | briefing | misto
Saida: |
  - cards_criados: Lista de cards Trello criados com nomenclatura correta
  - pendentes_aprovacao: Itens que precisam de aprovação antes de publicar
  - log_processamento: Registro para relatório semanal
Checklist:
  - "[ ] Identificar cliente e carregar seu SOP (@sop-guardian)"
  - "[ ] Listar todos os itens do lote a processar"
  - "[ ] Para cada item: transcrever (se audio/video) ou extrair pontos (se texto)"
  - "[ ] Categorizar cada item (Educacional/Comercial/Engajamento/Institucional)"
  - "[ ] Criar card Trello com nomenclatura correta do SOP"
  - "[ ] Definir data de publicação sugerida"
  - "[ ] Sinalizar itens que precisam de aprovação"
  - "[ ] Registrar tudo no log para @client-reporter"
  - "[ ] Confirmar conclusão do lote"
---

# *process-content-batch — Processamento de Lote de Conteúdo

Processa conteúdo bruto dos clientes seguindo o SOP de cada conta.

## Elicitação

```
? Qual cliente?
? O que tem para processar? (lista os itens ou descreve o lote)
? Alguma instrução especial para esse lote?
```

## Output Esperado

```
⚡ Fluxo — Processamento: {nome do cliente}
Lote de [data]

━━━━━━━━━━━━━━━━━━━━━━━━
CARDS CRIADOS ([N] itens)
━━━━━━━━━━━━━━━━━━━━━━━━
✅ [nomenclatura do card 1] → Publicação: [data]
✅ [nomenclatura do card 2] → Publicação: [data]
✅ [nomenclatura do card 3] → Agendado no Zapier: [data]

━━━━━━━━━━━━━━━━━━━━━━━━
PENDENTES DE APROVAÇÃO ([N] itens)
━━━━━━━━━━━━━━━━━━━━━━━━
⏳ [card] → Aguarda aprovação do cliente — [canal de aprovação]
⏳ [card] → Aguarda aprovação do cliente — [canal de aprovação]

━━━━━━━━━━━━━━━━━━━━━━━━
LOG REGISTRADO
━━━━━━━━━━━━━━━━━━━━━━━━
✅ Log enviado para @client-reporter

Próximo lote previsto: [data]
```
