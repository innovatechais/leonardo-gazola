---
task: Generate Mindmap
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - style: mindmap | flowchart (default: mindmap)
Saida: |
  - mindmap_path: docs/ideation/<session>/mindmap.md
Checklist:
  - "[ ] Carregar ideation.json"
  - "[ ] Gerar Mermaid consistente (sem nós duplicados)"
  - "[ ] Limitar profundidade (3-5 níveis) para legibilidade"
  - "[ ] Salvar mindmap.md"
---

# *generate-mindmap — Generate Mindmap

## Elicitação

```text
? Você prefere:
  1) Mindmap (Mermaid mindmap)
  2) Flowchart (Mermaid flowchart)
? Profundidade máxima (default 4):
```

## Output

Crie:

- `docs/ideation/<session>/mindmap.md`

Use o template do squad: `templates/mindmap-mermaid-tmpl.md`.

Regras:

- Use **tópicos** como ramos principais.
- Trate `perguntas em aberto` e `próximos passos` como ramos próprios.
- Se houver muitas ideias, agregue em clusters e deixe detalhes no documento.

Próximo passo: `*draft-document --session <session> --doc brief`

