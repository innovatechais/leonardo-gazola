---
task: Index Leo Knowledge
responsavel: "@knowledge-indexer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - categoria: transportes | competitivo | produto | vendas | investimento | gestao | mental | referencias | fe
  - conteudo: O conhecimento a ser indexado
  - fonte: Origem do conhecimento (documento, conversa, script)
Saida: |
  - registro: Conhecimento indexado com categoria, fonte e data
  - busca_disponivel: Confirmação de que o conhecimento está consultável
Checklist:
  - "[ ] Identificar categoria correta para o conhecimento"
  - "[ ] Verificar se já existe entrada similar (duplicata?)"
  - "[ ] Registrar o conhecimento com fonte e data"
  - "[ ] Confirmar que está indexado e consultável"
  - "[ ] Identificar conexões com outros conhecimentos existentes"
---

# *index-leo-knowledge — Indexação de Conhecimento de Leonardo

Organiza e indexa qualquer conhecimento de Leonardo para consulta por outros agentes.

## Output Esperado

```
🗃️ Índice — Conhecimento Indexado
[data]

NOVO REGISTRO:
Categoria: [categoria]
Título: [descrição em 1 linha]
Fonte: [documento / conversa / script]
Data de origem: [data]

CONTEÚDO:
[O conhecimento em formato consultável]

CONEXÕES:
→ Relacionado a: [outros itens do índice]

STATUS: ✅ Indexado e disponível para consulta

---
Total de registros na categoria [X]: [N]
Total geral no índice: [N]
```
