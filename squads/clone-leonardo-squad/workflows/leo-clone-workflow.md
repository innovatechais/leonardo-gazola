# Leo Clone Workflow

Workflow para capturar, estruturar e escalar o modelo mental de Leonardo Gazola.

> **Fase 5 — iniciar somente após Squads 1-5 operacionais.**

---

## Fluxo de Construção do Clone

```
FASE 1: COLETA DE FONTES
      ↓
Reunir: transcrições Claude + pitch decks + análise competitiva + scripts de vendas
      ↓
FASE 2: EXTRAÇÃO
      ↓
@dna-extractor-leo (*extract-leo-dna {fonte 1})
@dna-extractor-leo (*extract-leo-dna {fonte 2})
... (repetir para cada fonte)
      ↓
FASE 3: INDEXAÇÃO
      ↓
@knowledge-indexer (*index-leo-knowledge) — para cada padrão extraído
      ↓
[DNA suficiente? >= 3 fontes por categoria principal]
      ├── Não → coletar mais fontes
      └── Sim → continua
      ↓
FASE 4: CONSTRUÇÃO
      ↓
@clone-builder-leo (*build-leo-clone {escopo: ceo})
      ↓
[Arquivo .md do clone gerado]
      ↓
FASE 5: VALIDAÇÃO
      ↓
@clone-builder-leo (*validate-leo-clone)
      ↓
[Score >= 80%?]
      ├── Não → calibrar em gaps identificados → nova rodada
      └── Sim → Validação final por Leonardo pessoalmente
      ↓
FASE 6: DEPLOY
      ↓
Clone disponível como agente ativo no sistema AIOS
Usado para: treinamento de time, onboarding de novos membros, decisões de baixo risco
```

---

## Fontes Prioritárias para ETL

| Fonte | Prioridade | Volume estimado |
|-------|-----------|----------------|
| Transcrições de conversas com Claude | Alta | Centenas de conversas |
| Documento de contexto completo | Alta | 1 documento rico |
| Pitch deck e materiais Innovatech | Alta | 10+ documentos |
| Scripts de vendas e treinamentos | Média | 5+ documentos |
| Análise competitiva das 75+ empresas | Média | 1 documento denso |

---

## O que o Clone de Leonardo NÃO Faz

- ❌ Toma decisões estratégicas de alto impacto sem Leonardo
- ❌ Assina contratos ou compromete a empresa
- ❌ Inventa informações quando não sabe — sempre escalona
- ❌ Substitui Leonardo nas relações pessoais com investidores e clientes
