---
task: Extract Ideas
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - transcript_path: (default) docs/ideation/<session>/transcript.md
Saida: |
  - ideation_path: docs/ideation/<session>/ideation.json
Checklist:
  - "[ ] Ler transcript.md"
  - "[ ] Extrair tópicos, sub-tópicos e ideias atômicas"
  - "[ ] Identificar relações (depende de, causa, contradiz, suporta)"
  - "[ ] Marcar: decisões, hipóteses, perguntas em aberto, próximos passos"
  - "[ ] Gerar ideation.json seguindo o template do squad"
---

# *extract-ideas — Extract Ideas

## Elicitação (rápida)

```text
? Qual o objetivo principal desse brainstorming? (1 frase)
? Público-alvo (se existir): (ex.: clientes, time interno, investidores)
? Você quer priorização agora?
  1) Sim (impacto x esforço)
  2) Não (só organizar)
```

## Output: `ideation.json`

Crie/atualize o arquivo:

- `docs/ideation/<session>/ideation.json`

Regras:

- **Tudo deve ser derivado da transcrição**. Se precisar inferir, coloque em `assumptions[]`.
- Use IDs estáveis (`T1`, `T1.1`, `I12`, etc.) para facilitar referências.
- Inclua `quotes[]` curtos (trechos) quando isso ajudar rastreabilidade.

Estrutura mínima (alto nível):

- `meta`: session, title, date, objective, audience
- `topics[]`: árvore de tópicos/subtópicos
- `ideas[]`: ideias atômicas com tags e tipo (ideia, decisão, hipótese, pergunta, ação)
- `relations[]`: ligações entre ideias/tópicos
- `prioritization`: opcional (se usuário pediu)

Próximo passo: `*generate-mindmap --session <session>`

