# Task: create-faq

**Agente responsável:** Sage  
**Posição no pipeline:** 11 de 12  
**Dependências:** create-tsl mínimo (Seções 2-7 preenchidas)  
**Próxima task:** qa-review (Checkpoint 2)

---

## Objetivo

Criar 5-10 perguntas e respostas persuasivas que o avatar realmente faz sobre a oferta, escritas na voz e linguagem do avatar, com respostas que vendem.

---

## Contexto de referência

Esta task implementa o **PROMPT FAQ** do prompt-library. Leia `data/prompt-library.md → Seção 10: FAQ` antes de executar.

---

## Regras obrigatórias

- **Mínimo 5, máximo 10 perguntas**
- **Perguntas na voz do avatar** — na linguagem que ele usaria para perguntar a um amigo
- **Respostas sem exclamação** — tom direto e persuasivo, não efusivo
- **Cada resposta termina reforçando valor ou urgência** — não apenas informando
- **Baseado nos dados do avatar e da oferta** — não inventar preocupações genéricas

---

## Processo

### Passo 1 — Ler contexto

Abrir `outputs/{slug}.md` e ler:
- Seção 3: Avatar — especialmente `[Objections]`, `[Confusions]`, `[Doubt Patterns]`, `[Risk Tolerance Profile]`, `[Analysis Paralysis Points]`
- Seção 4: Oferta — estrutura, garantia, formato de entrega, bônus
- Seção 7: TSL — identificar o que a carta de vendas NÃO cobriu explicitamente

### Passo 2 — Mapear as objeções antes de criar as perguntas

Listar internamente as 10 principais objeções do avatar para este produto, agrupadas por tipo:

- Ceticismo: "Isso realmente funciona?"
- Identidade: "Funciona para alguém como eu / na minha situação?"
- Risco: "E se não funcionar para mim?"
- Comprometimento: "Quanto tempo vou precisar dedicar?"
- Comparação: "Por que não usar [alternativa]?"
- Urgência: "Posso esperar / pensar mais?"
- Entrega: "Como recebo? Quando? Em qual formato?"
- Preço: "Por que esse preço?"
- Suporte: "Vou ter ajuda se não conseguir?"
- Credibilidade: "Quem é você para me ensinar isso?"

Selecionar as mais relevantes para este produto específico.

### Passo 3 — Criar as perguntas e respostas

Para cada FAQ, seguir o formato:

```
**P: {pergunta na voz do avatar}**

R: {resposta — específica, persuasiva, sem !}

{Finalizar com: reforço do valor, da garantia, ou do timing}
```

Regras para as perguntas:
- Escritas como o avatar realmente perguntaria ("Isso funciona mesmo?" não "O produto é eficaz?")
- Incluir a emoção implícita (ceticismo, medo, dúvida)
- Variação de tipos — não todas do mesmo tipo

Regras para as respostas:
- Direto ao ponto — não começa com "Ótima pergunta!"
- Usa dados, depoimentos ou lógica do material de input quando possível
- Se não há prova direta → responde com lógica e reforça a garantia
- Termina com uma micro-razão para agir agora

### Passo 4 — Verificar cobertura

Antes de finalizar, verificar:
- [ ] As principais objeções estão cobertas
- [ ] Pelo menos 1 pergunta de risco (E se não funcionar?)
- [ ] Pelo menos 1 pergunta de identidade (Funciona para mim?)
- [ ] Respostas sem exclamação
- [ ] Linguagem nativa do mercado

### Passo 5 — Salvar no context.md

Preencher **Seção 11 — FAQ** do `outputs/{slug}.md`.

Atualizar `{status}` para `FAQ_COMPLETE`.

Notificar:
```
✅ FAQ criado com {X} perguntas e respostas.

⚠️ CHECKPOINT 2 RECOMENDADO: Material de produção completo.
Ative @judge *review-all para revisão final antes de usar.
```

---

## Output

- Seção 11 do context.md preenchida com FAQ completo
- Status atualizado para `FAQ_COMPLETE`
