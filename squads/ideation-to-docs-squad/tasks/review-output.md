---
task: Review Output
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
Saida: |
  - review_notes: notas de revisão + gaps + perguntas para completar
Checklist:
  - "[ ] Rodar checklist do squad"
  - "[ ] Verificar consistência entre ideation.json, mindmap e document"
  - "[ ] Apontar lacunas e contradições"
  - "[ ] Produzir lista de perguntas de follow-up (numeradas)"
---

# *review-output — Review Output

## O que revisar

Arquivos:

- `docs/ideation/<session>/transcript.md`
- `docs/ideation/<session>/ideation.json`
- `docs/ideation/<session>/mindmap.md`
- `docs/ideation/<session>/document.md`
- `docs/ideation/<session>/slides.md`

Use: `checklists/ideation-output-checklist.md`

## Elicitação (follow-up)

Se faltarem informações essenciais, pergunte em formato numerado:

```text
? Para fechar o documento, preciso de:
  1) ...
  2) ...
  3) ...
```

