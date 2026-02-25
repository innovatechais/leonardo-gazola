---
task: Draft Document
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - doc: brief | prd-lite | notes (default: brief)
Saida: |
  - document_path: docs/ideation/<session>/document.md
Checklist:
  - "[ ] Carregar ideation.json"
  - "[ ] Gerar documento com seções claras"
  - "[ ] Separar fatos vs suposições"
  - "[ ] Listar perguntas em aberto e próximos passos"
  - "[ ] Salvar document.md"
---

# *draft-document — Draft Document

## Elicitação

```text
? Tipo de documento:
  1) brief (resumo executivo + plano)
  2) prd-lite (problema, público, hipóteses, MVP, métricas)
  3) notes (anotações bem organizadas)
? Tom do texto:
  1) Executivo (curto)
  2) Operacional (detalhado)
```

## Output

Crie:

- `docs/ideation/<session>/document.md`

Estrutura recomendada (brief):

- Contexto e objetivo
- Tópicos principais (bullets)
- Decisões
- Hipóteses
- Perguntas em aberto
- Próximos passos (ações)
- Apêndice: ideias (links/IDs do `ideation.json`)

Próximo passo: `*prepare-presentation --session <session> --format outline`

