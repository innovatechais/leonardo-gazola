# Task: extract-avatar

**Agente responsável:** Psyche  
**Posição no pipeline:** 3 de 12  
**Dependências:** run-parasita (Seção 2 preenchida)  
**Próxima task:** build-offer (após validação do Judge)

---

## Objetivo

Expandir o avatar raso da análise Parasita em um perfil psicográfico profundo com +60 campos, escrito em linguagem visceral e nativa do mercado identificado no intake.

---

## Contexto de referência

Esta task implementa o **PROMPT EXTRAÇÃO DE AVATAR** do prompt-library. Leia `data/prompt-library.md → Seção 2: Avatar` antes de executar.

---

## Instruções críticas

- **Todo campo deve usar linguagem do mundo real** — exemplos concretos que o avatar viveria, não abstrações
- **Calibrado para o perfil de mercado** — leia `config/market-profiles/{profile}.md` antes de escrever
- **Proibido:** "quer melhorar sua vida" / "busca sucesso" — obrigatório: linguagem específica e visceral
- **Cada campo = pelo menos 1 frase** que o avatar poderia ter dito para um amigo

---

## Processo

### Passo 1 — Ler contexto

Abrir `outputs/{slug}.md` e ler:
- Seção 2 (Parasita) — especialmente Avatar, Tom e Dores identificadas
- Meta — confirmar o perfil de mercado ativo
- Abrir `config/market-profiles/{profile}.md` para calibração de linguagem

### Passo 2 — Preencher todos os campos do avatar

Preencher cada campo abaixo em português do mercado-alvo (ou no idioma do perfil):

**DADOS BÁSICOS**
- `[Niche]` — nicho refinado e específico
- `[Avatar]` — descrição vívida, nome simbólico, idade, situação atual
- `[Primary Goal]` — o que mais quer conseguir (específico, com contexto)
- `[Primary Complaint]` — o que mais o frustra agora (em suas próprias palavras)
- `[Secondary Goals]` — 3-5 objetivos secundários
- `[Secondary Complaints]` — 3-5 queixas secundárias

**PROMESSAS E BENEFÍCIOS**
- `[Promises]` — o que o produto promete que ressoa com o avatar
- `[Benefits]` — benefícios tangíveis que o avatar realmente valoriza
- `[Objections]` — por que ainda não comprou
- `[Confusions]` — o que não entende sobre o problema ou solução

**MEDOS E DESEJOS PROFUNDOS**
- `[Ultimate Fear]` — o maior medo de fundo (não superficial)
- `[Deep Occult Desire]` — o desejo que não admite em voz alta
- `[False Solutions]` — o que já tentou que não funcionou
- `[Mistaken Beliefs]` — o que acredita errado sobre o problema
- `[Expensive Alternatives]` — o que usa agora (caro ou ineficaz)

**MUNDO EMOCIONAL**
- `[Frustrations]` — frustrações recorrentes do dia a dia
- `[Anger Triggers]` — o que faz o avatar se sentir injustiçado
- `[Envy Triggers]` — quem ele observa com inveja e o que inveja
- `[Pride Points]` — do que tem orgulho mesmo em meio às dificuldades
- `[Hope Anchors]` — o que ainda mantém a esperança
- `[Joy Catalysts]` — o que genuinamente alegra esse avatar

**IDENTIDADE E SOCIAL**
- `[Identity Anchors]` — quem ele acredita que é (e quem quer se tornar)
- `[Common Enemy]` — o vilão da história do avatar (sistema, pessoa, crença)
- `[Tribe]` — com quem se identifica, grupo de pertencimento
- `[Social Conformity Pressure]` — pressões sociais que enfrenta
- `[Fear of Social Judgment]` — o que tem medo que os outros pensem
- `[Status Games]` — como tenta manter ou ganhar status no seu grupo
- `[Role Models]` — quem admira e quer se tornar
- `[Anti-Models]` — quem definitivamente não quer ser

**PSICOLOGIA DE DECISÃO**
- `[Decision Triggers]` — o que o faz dizer "sim" finalmente
- `[Analysis Paralysis Points]` — onde trava ao tentar decidir
- `[Risk Tolerance Profile]` — como percebe e lida com risco
- `[Authority Biases]` — em quem confia (médico, especialista, "cara que fez")
- `[Doubt Patterns]` — o que o faz desconfiar de ofertas
- `[Loss Aversion]` — o que tem medo de perder
- `[Sunk Cost Fallacies]` — onde já investiu e não quer "jogar fora"

**DORES MAPEADAS**
- `[Acute Pains]` — dores imediatas que sente hoje
- `[Chronic Pains]` — dores de longo prazo que carrega
- `[Social Pains]` — como o problema afeta suas relações
- `[Economic Pains]` — impacto financeiro do problema
- `[Existential Pains]` — questionamentos mais profundos sobre si mesmo
- `[Hidden Pains]` — dores que não compartilha com ninguém

**COMUNICAÇÃO**
- `[Communication Style]` — como prefere receber informação
- `[Verbal Triggers]` — palavras e frases que fazem o avatar parar e prestar atenção
- `[Jargon Usage]` — vocabulário que usa naturalmente
- `[Metaphor Mapping]` — que tipo de analogias e imagens ressoam
- `[Story Reception]` — que tipo de história/narrativa o conecta emocionalmente

### Passo 3 — Refinamento com OPTIONAL REFINER

Após preencher todos os campos, executar o refinamento:

Para cada resposta já escrita, reformulá-la com **exemplos do mundo real e contexto concreto**, mantendo uma única frase vívida por campo. Perguntar ao usuário se quer continuar para a segunda parte do refiner se o avatar for muito extenso.

### Passo 4 — Salvar e solicitar validação

Preencher **Seção 3 — Avatar** do `outputs/{slug}.md`.

Atualizar `{status}` para `AVATAR_COMPLETE`.

Obrigatoriamente notificar:
```
✅ Avatar completo criado com {X} campos preenchidos.

⚠️ CHECKPOINT 1 RECOMENDADO: Antes de prosseguir para a oferta,
sugiro ativar @judge *review-avatar para validar a qualidade do avatar.

Ou, para avançar sem validação: @vera *build-offer
```

---

## Output

- Seção 3 do context.md preenchida com avatar completo
- Status atualizado para `AVATAR_COMPLETE`

---

## Flags de qualidade

- Se um campo ficar genérico → marcar com `[REQUER ESPECIFICIDADE]`
- Se o avatar contradizer dados do Parasita → sinalizar a contradição
- Mínimo de 20 campos preenchidos para o avatar ser considerado utilizável
