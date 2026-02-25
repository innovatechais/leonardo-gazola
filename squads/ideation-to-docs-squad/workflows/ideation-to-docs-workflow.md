# Ideation → Mindmap → Docs Workflow

Objetivo: transformar uma transcrição em artefatos organizados e reutilizáveis.

## Sequência recomendada

1) **Ingestão**

```text
@ideation-orchestrator
*ingest-transcript --session <session> --source <path>
```

2) **Extração + dados**

```text
*extract-ideas --session <session>
```

3) **Mapa mental**

```text
*generate-mindmap --session <session>
```

3b) **Canvas visual (para Miro/Figma)**

```text
*export-visual --session <session> --format both
```

4) **Documento**

```text
*draft-document --session <session> --doc brief
```

5) **Apresentação**

```text
*prepare-presentation --session <session> --format outline
```

6) **Revisão**

```text
*review-output --session <session>
```

## Fonte de verdade

- `docs/ideation/<session>/ideation.json` é a fonte de verdade.  
  Mindmap, documento e slides devem ser derivados dele.

