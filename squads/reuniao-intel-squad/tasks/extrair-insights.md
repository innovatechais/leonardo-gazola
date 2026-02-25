# Task: extrair-insights

## Objetivo

Analisar uma transcrição formatada de reunião e extrair, com critério rigoroso, apenas os itens de alto valor: ações, decisões, insights, substrates, alertas e números-chave.

## Quando executar

Quando o agente Faros receber uma transcrição (preferencialmente já formatada por @nexo).

---

## Workflow

### PASSO 1 — Ingestion

- Receber a transcrição
- Confirmar: "🔦 Transcrição recebida. Iniciando varredura..."
- Estimar volume (palavras) antes de iniciar análise

### PASSO 2 — Leitura integral

**Ler o documento completo antes de extrair qualquer item.**

Não extrair durante a leitura — isso causa viés de atenção. Ler tudo, depois extrair.

Durante a leitura, fazer mentalmente:
- Quem são os participantes e quais os seus papéis?
- Qual o tema central da reunião?
- Qual o tom geral? (alinhamento, conflito, brainstorming, decisório)
- Há urgência ou tensão em algum momento?

### PASSO 3 — Primeira passagem — Extração bruta

Listar TODOS os candidatos a extração, sem filtrar ainda:
- Toda menção de ação ou tarefa
- Toda decisão explícita ou implícita
- Toda ideia nova ou percepção não-óbvia
- Todo dado numérico relevante
- Toda frase poderosa ou conceito rico
- Todo sinal de risco ou problema

### PASSO 4 — Filtro de relevância

Para cada candidato, aplicar o teste:

> Responda SIM ou NÃO para cada pergunta:
> 1. **Isso gera resultado se executado?**
> 2. **Alguém precisa fazer algo com isso?**
> 3. **Isso muda como pensamos sobre o negócio ou situação?**
> 4. **Isso pode virar conteúdo, produto ou estratégia depois?**
> 5. **Se eu não registrar isso, vou me arrepender?**

**Threshold:** Pelo menos 1 SIM → registrar. Todos NÃO → descartar.

### PASSO 5 — Categorizar e formatar cada item

#### ✅ ACTION ITEMS

```markdown
- [ ] **[DESCRIÇÃO CLARA DA AÇÃO]**
      Responsável: [Nome | "Não identificado"]
      Prazo: [quando mencionado | "Não definido"]
      Contexto: [uma linha explicando por que essa ação foi gerada]
```

Regras:
- Se responsável não foi mencionado explicitamente, inferir pelo contexto
- Se não for possível inferir, marcar como "A definir"
- Ações sem "o que fazer" claro não entram

#### 🔑 DECISÕES

```markdown
- **[A DECISÃO EM SI — formulada como afirmação]**
  Contexto: [o que levou a essa decisão]
  Implicação: [o que muda a partir disso]
```

Regras:
- Apenas decisões com impacto real — não registrar "concordamos em continuar fazendo o que já fazemos"
- Formular como afirmação ativa ("Vamos usar X" não "Foi decidido usar X")

#### 💡 INSIGHTS

```markdown
- **[INSIGHT — formulado como descoberta ou percepção]**
  Origem: [dado, observação, discussão, experiência compartilhada]
  Por que importa: [implicação prática em uma linha]
```

Regras:
- Apenas insights não-óbvios para quem conhece o contexto
- "O cliente precisa de valor" não é insight — "Clientes de 50+ nesse nicho tomam decisão por medo de perder, não por ganho" é insight

#### 🧱 SUBSTRATES

```markdown
- **[NOME/TÍTULO DO SUBSTRATE]**
  Tipo: [frase poderosa | conceito único | ângulo de mercado | história real | dado bruto | metáfora]
  Conteúdo bruto: "[trecho exato ou parafraseado da transcrição]"
  Uso potencial: [conteúdo | produto | copy | argumento de venda | framework | outro]
```

Regras:
- Substrates são matéria-prima — não precisam estar prontos, precisam ter potencial
- Registrar com riqueza: contexto suficiente para usar semanas depois sem lembrar da reunião
- Uma boa história que surgiu, uma metáfora poderosa, uma frase que "parou a reunião" → substrate

#### ⚠️ ALERTAS

```markdown
- ⚠️ **[DESCRIÇÃO DO RISCO OU PROBLEMA]**
  Risco: [o que pode acontecer se não endereçado]
  Janela: [urgente (dias) | médio prazo (semanas) | monitorar (meses)]
  Responsável de endereçar: [se identificado]
```

Regras:
- Apenas alertas com consequência real e não-trivial
- "Precisamos melhorar a comunicação" não é alerta — "O cliente X ameaçou cancelar em 30 dias" é alerta

#### 🔢 NÚMEROS-CHAVE

```markdown
- **[NÚMERO/MÉTRICA]** — [contexto: o que significa esse número]
  Relevância: [por que esse número importa para decisão ou direção]
```

Regras:
- Apenas números que orientam algo — não registrar números puramente informativos sem implicação

### PASSO 6 — Montar e exibir relatório

```markdown
# 🔦 Inteligência de Reunião
**Tema:** [identificado ou "Não especificado"]
**Participantes:** [identificados]
**Duração estimada:** [do volume de texto]

---

## ✅ Action Items ([count])
[lista]

## 🔑 Decisões ([count])
[lista]

## 💡 Insights ([count])
[lista]

## 🧱 Substrates ([count])
[lista]

## ⚠️ Alertas ([count — omitir seção se zero])
[lista]

## 🔢 Números-Chave ([count — omitir seção se zero])
[lista]

---
*[X] itens extraídos | [Y] palavras analisadas | Gerado por @faros*
```

**Omitir seções completamente vazias.** Não mostrar "## Alertas (0)" — simplesmente não mostrar a seção.

### PASSO 7 — Oferecer exportação

```
Relatório gerado. Quer exportar alguma categoria específica ou o completo?
Use *exportar acoes | *exportar completo
```

---

## Resumo Executivo (*resumo-executivo)

Quando solicitado, gerar um parágrafo de 5 linhas máximo:

```markdown
## Resumo Executivo

[Uma linha: o que foi a reunião]
[Uma linha: a decisão mais importante]
[Uma linha: a ação mais crítica com responsável]
[Uma linha: o insight ou alerta mais relevante]
[Uma linha: próximo passo ou momentum]
```

---

## Edge cases

**Transcrição pobre em conteúdo:**
- Informar honestamente: "Não encontrei itens de alto valor suficientes para um relatório robusto."
- Listar o que encontrou, mesmo que poucos itens
- Nunca fabricar insights que não existem

**Muitas ações sem responsável:**
- Registrar todas como "Responsável: A definir"
- Adicionar nota ao final: "X ações sem responsável identificado — recomendo definição antes da próxima reunião"

**Reunião muito informal (bate-papo):**
- Filtro mais rigoroso — poucas coisas passam
- Focar em substrates e insights (que podem emergir de conversas informais)
- Ser transparente: "Reunião informal — extraí principalmente substrates"
