# Task: qa-review

**Agente responsável:** Judge  
**Posição no pipeline:** 12 de 12 (também usado no Checkpoint 1 após avatar)  
**Dependências:** qualquer seção do context.md que precisar ser revisada  
**Próxima task:** nenhuma (última etapa) ou correções solicitadas aos agentes responsáveis

---

## Objetivo

Validar a qualidade, autenticidade de linguagem e consistência interna de todo o material gerado — eliminando devaneios, AI-writing, claims não sustentados e inconsistências entre seções.

---

## Quando é ativada

### Checkpoint 1 — Após avatar (obrigatório recomendar)
Revisar apenas a Seção 3 do context.md após Psyche completar o avatar.

### Checkpoint 2 — Revisão final (obrigatório recomendar)
Revisar todas as seções após o ciclo de produção estar completo.

### Ad-hoc — Qualquer seção isolada
`*review tsl`, `*review headlines`, `*review email {template}`, etc.

---

## Processo

### Passo 1 — Identificar o escopo

Verificar qual seção(ões) deve revisar e abrir `outputs/{slug}.md`.

Abrir obrigatoriamente:
- `config/standards.md` — regras globais
- `config/market-profiles/{profile}.md` — regras do perfil de mercado ativo

### Passo 2 — Executar revisão por dimensão

#### Dimensão 1: Anti-Hallucination

Varrer cada seção procurando:
- Claims numéricos (perde X kg, ganha R$ Y, em Z dias) → verificar se têm suporte no material de input
- Estatísticas com fonte genérica ("estudos mostram", "pesquisa de Harvard") → verificar especificidade
- Promessas de resultado impossível de sustentar → identificar e flagar

Flag format: `[FLAG-CRÍTICO] Anti-Hallucination`
```
Seção: {seção}
Texto: "{trecho}"
Problema: claim numérico sem suporte no material de input
Correção: remover número OU adicionar [PROVA NECESSÁRIA] como placeholder
```

#### Dimensão 2: Language Authenticity

Para cada seção, verificar contra o perfil de mercado:
- Anglicismos inadequados para o mercado → flag com sugestão de substituição
- Linguagem corporativa em mercado popular → flag
- Expressões que soam traduzidas → flag com reescrita sugerida
- AI-writing (adjetivos empilhados, frases genéricas, abertura com "Eu") → flag

Flag format: `[FLAG-AVISO] Language`
```
Seção: {seção}
Texto: "{trecho}"
Problema: {tipo de problema} — soa como {tradução/corporativo/AI-writing}
Correção sugerida: "{reescrita}"
```

#### Dimensão 3: Structural Integrity

Verificar regras de estrutura:
- TSL: contagem de palavras ≥ 2.000 e todas as 9 seções presentes
- Headlines: exatamente 20, mínimo 5 frameworks distintos, sem ângulos repetidos
- Scripts de vídeo: cada roteiro ≤ 165 palavras
- Emails: assunto ≤ 50 chars, sem exclamação, exatamente 1 CTA
- FAQ: entre 5-10 perguntas

Flag format: `[FLAG-CRÍTICO] Structure`
```
Seção: {seção}
Problema: {descrição específica}
Correção: {ação necessária}
```

#### Dimensão 4: Consistency Check

Verificar consistência entre seções:
- Avatar vs. TSL/Emails: as dores mencionadas no copy existem no avatar?
- USP vs. TSL: o Unique Mechanism aparece na carta de vendas?
- Oferta vs. Emails: bônus mencionados nos emails batem com a oferta?
- Tom de voz: mesmo perfil em TSL, emails, scripts e FAQ?

Flag format: `[FLAG-AVISO] Consistency`
```
Seções: {seção A} vs. {seção B}
Inconsistência: "{elemento A}" não corresponde a "{elemento B}"
Correção: alinhar {seção} com {seção}
```

### Passo 3 — Compilar relatório de revisão

Organizar todos os flags por seção e severidade:

```
## RELATÓRIO DE REVISÃO QA
Produto: {slug}
Data: {data}
Perfil de mercado: {profile}
Revisado por: Judge

### Resumo
- CRÍTICOS: {X} flags
- AVISOS: {Y} flags
- APROVADAS SEM FLAGS: {lista de seções}

### Flags por seção
{lista completa de flags organizados por seção}

### Veredicto
{APROVADO COM CORREÇÕES CRÍTICAS} OU {APROVADO COM AVISOS} OU {APROVADO}
```

### Passo 4 — Salvar no context.md

Preencher **Seção 12 — Revisão QA** do `outputs/{slug}.md` com o relatório.

Para cada seção sem flags, adicionar `[✅ APROVADO — Judge]` no cabeçalho da seção.

Atualizar `{status}` conforme:
- Flags críticos presentes → `QA_PENDING_CORRECTIONS`
- Apenas avisos ou aprovado → `QA_APPROVED`

### Passo 5 — Comunicar ao usuário

```
⚖️ REVISÃO QA CONCLUÍDA
Flags críticos: {X} | Avisos: {Y} | Seções aprovadas: {Z}

{se houver críticos}
Ação necessária antes de usar:
→ {lista de correções prioritárias com agente responsável}

{se apenas avisos ou aprovado}
Material aprovado para uso.
```

---

## Output

- Seção 12 do context.md preenchida com relatório completo
- Cada seção sem flags marcada como `[✅ APROVADO — Judge]`
- Status atualizado conforme resultado

---

## Severidades

| Severidade | Significado | Ação |
|-----------|------------|------|
| CRÍTICO | Impede uso — claim falso, estrutura quebrada, inconsistência grave | Deve corrigir |
| AVISO | Afeta qualidade mas não impede uso | Recomendado corrigir |
| SUGESTÃO | Oportunidade de melhoria | Opcional |
