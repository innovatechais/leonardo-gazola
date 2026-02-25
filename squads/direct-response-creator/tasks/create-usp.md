# Task: create-usp

**Agente responsável:** Vera  
**Posição no pipeline:** 5 de 12  
**Dependências:** build-offer (Seção 4 preenchida)  
**Próxima task:** create-upsell

---

## Objetivo

Criar a Proposta Única de Valor (USP) e o Unique Mechanism da oferta — a combinação que torna o produto uma categoria própria, impossível de comparar diretamente com concorrentes.

---

## Contexto de referência

Esta task implementa o **USP PROMPT** do prompt-library. Leia `data/prompt-library.md → Seção 4: USP` antes de executar.

---

## Regra fundamental

A USP combina **ficção + realidade**: usa referências históricas, científicas ou culturais reais como âncora, e posicionamento criativo como diferenciador. Não copie os exemplos — use como inspiração estrutural.

---

## Processo

### Passo 1 — Responder as 5 perguntas da USP

Baseado nas seções 2, 3 e 4 do context.md, responder cada pergunta:

**Pergunta 1: O que é a nova categoria criada?**
- Criar um nome para a categoria que o produto inaugura
- Formato: `"O/A [Nome]™ — O(A) Primeiro(a)/Único(a) [Mecanismo/Fórmula/Método] de [Benefício Principal]"`
- Deve soar como uma descoberta, não como mais um produto

**Pergunta 2: O que isso significa?**
- Explicar o que torna essa categoria única em 2-3 frases
- Incluir: o mecanismo, a origem (referência histórica/científica/cultural se possível), o que elimina ou resolve
- Deve parecer que não existia antes

**Pergunta 3: Como isso ajuda os clientes?**
- Diferente de: [lista das alternativas/soluções falsas que só mascaram o problema]
- O produto: [lista de 5-7 resultados específicos e como os entrega]
- Formato dos resultados: ação concreta + benefício + sem efeito colateral/desvantagem das alternativas

**Pergunta 4: Quais resultados podem esperar?**
- Resultados em ordem cronológica: "Em X dias/semanas: [resultado 1]. Em Y dias: [resultado 2]..."
- Usar números quando suportados pelo material de input
- Se não houver dados, usar `{RESULTADO REAL NECESSÁRIO}` como placeholder

**Pergunta 5: Qual é o "segredo" que torna a oferta única?**
- Descrever o componente/método/mecanismo proprietário
- Pode ser uma combinação de ingredientes, uma sequência, um framework, um processo
- Incluir validação (científica, histórica, cultural) se possível

### Passo 2 — Criar o Unique Mechanism

Após confirmar a USP, criar o **Unique Mechanism**:

O Unique Mechanism é o "ingrediente secreto" — um nome próprio criativo para o mecanismo que faz o produto funcionar. Deve ser:
- Misterioso e intrigante
- Específico o suficiente para parecer real
- Simples o suficiente para o avatar entender em 1 frase

Exemplos de estrutura (não copie — inspire):
- "The {Adjetivo} {Substantivo}" (ex: "The Watermelon Trick")
- "{Nome de Planta/Animal/Elemento} {Método}" (ex: "Spider's Venom Protocol")
- "{Adjetivo Étnico/Histórico} {Substantivo}" (ex: "The Japanese Salt Tonic")

Gerar **5 opções** de Unique Mechanism para o usuário escolher.

### Passo 3 — Elicitar confirmação (elicit=true)

```
Criei 5 opções de Unique Mechanism para sua USP.
Qual ressoa mais com você?
[lista numerada]

Confirme também a USP principal antes de prosseguir.
```

### Passo 4 — Salvar no context.md

Preencher **Seção 5 — USP & Unique Mechanism** do `outputs/{slug}.md`.

Atualizar `{status}` para `USP_COMPLETE`.

Notificar:
```
✅ USP e Unique Mechanism definidos.
Categoria: {nome da categoria}
Unique Mechanism: {nome escolhido}

Próximo passo: @vera *create-upsell
```

---

## Output

- Seção 5 do context.md preenchida com USP completa e Unique Mechanism
- Status atualizado para `USP_COMPLETE`

---

## Flags de qualidade

- USP que soa igual a concorrentes → retrabalhar
- Unique Mechanism sem mistério → criar com mais intriga
- Resultados prometidos sem suporte no material → marcar `{PROVA NECESSÁRIA}`
