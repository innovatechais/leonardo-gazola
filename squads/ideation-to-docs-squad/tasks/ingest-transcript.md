---
task: Ingest Transcript
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão (ex: ideation-2026-02-17)
  - source: caminho do arquivo de transcrição (.md/.txt) OU texto colado
  - title: título opcional da sessão
Saida: |
  - transcript_path: docs/ideation/<session>/transcript.md
  - metadata: título, data, fonte
Checklist:
  - "[ ] Confirmar session id e source"
  - "[ ] Normalizar texto (remover ruído, manter sentido; não reescrever ideias)"
  - "[ ] Preservar estrutura útil (tópicos, marcadores, perguntas)"
  - "[ ] Salvar transcript.md em docs/ideation/<session>/"
---

# *ingest-transcript — Ingest Transcript

## Elicitação

Pergunte (e espere resposta):

```text
? Qual o ID da sessão (session)? (ex: ideation-2026-02-17)
? Você quer apontar um arquivo (path) ou colar o texto aqui?
  1) Arquivo
  2) Colar texto
? Título (opcional):
```

## Regras

- **Não inventar conteúdo**.
- Pode corrigir typos óbvios e remover “filler” (ex.: “é…”, “aham…”) quando não muda o sentido.
- Se houver partes ilegíveis, marque como `[inaudível]` ou `[trecho incerto]`.

## Output (arquivo)

Crie:

- `docs/ideation/<session>/transcript.md`

Formato sugerido:

```markdown
# <title ou session>

Data: <YYYY-MM-DD>
Fonte: <path ou "texto colado">

## Transcrição (normalizada)
<conteúdo>
```

Próximo passo: `*extract-ideas --session <session>`

