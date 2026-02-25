# Task: create-headlines

**Agente responsável:** Quill  
**Posição no pipeline:** 8 de 12  
**Dependências:** create-tsl (Seção 7 preenchida)  
**Próxima task:** create-video-script ou create-email (on-demand)

---

## Objetivo

Gerar exatamente 20 headlines de alto impacto para anúncios, usando estruturas variadas e linguagem visceral do mercado-alvo.

---

## Contexto de referência

Esta task implementa o **PROMPT CRIAÇÃO DE HEADLINES** do prompt-library. Leia `data/prompt-library.md → Seção 7: Headlines` antes de executar.

---

## Regras obrigatórias

- **Exatamente 20 headlines** — não mais, não menos
- **Mínimo 5 estruturas de template diferentes** entre as 20
- **Proibido** repetir o mesmo ângulo com palavras diferentes
- **Linguagem visceral e específica** — sem adjetivos vazios
- **Nenhuma headline genérica** — cada uma deve funcionar especificamente para este produto

---

## Processo

### Passo 1 — Ler o contexto

Abrir `outputs/{slug}.md` e ler:
- Seção 3: Avatar — especialmente `[Verbal Triggers]`, `[Primary Goal]`, `[Primary Complaint]`, `[Ultimate Fear]`
- Seção 4: Oferta — nome da oferta, Unique Mechanism, bônus
- Seção 5: USP
- Abrir `config/market-profiles/{profile}.md`

### Passo 2 — Selecionar e aplicar os frameworks

Para cada grupo de headlines, usar um framework diferente. Preencher as variáveis com dados reais do context.md:

**Grupo 1 — Número + Método (headlines 1-3)**
- `[número] [métodos/segredos/passos] que os melhores [avatares] usam para [objetivo primário]`
- Variar: métodos, segredos, razões, coisas

**Grupo 2 — Revelado/Descoberto (headlines 4-6)**
- `Revelado: como [verbo] [objetivo primário] sem [dor principal]`
- `Descoberto: o [mecanismo único] que permite a [avatar] finalmente [objetivo]`

**Grupo 3 — Quem mais quer (headlines 7-8)**
- `Quem mais quer [resultado desejado] em [tempo curto]?`
- `Qual [avatar] não quer [resultado específico]?`

**Grupo 4 — Segredo/Little-known (headlines 9-11)**
- `O segredo de [forma inteligente de atingir objetivo] que [avatar de referência] usa`
- `Formas pouco conhecidas de [objetivo] sem [problema/dor]`
- `Aqui está um método que está ajudando [avatares] a [resultado específico]`

**Grupo 5 — Me dê / Tempo curto (headlines 12-13)**
- `Me dê [tempo muito curto] e eu te dou [resultado muito específico]`
- `Em apenas [tempo], descubra como [resultado inesperado]`

**Grupo 6 — Você não precisa ser (headlines 14-15)**
- `Você não precisa ser [algo que o avatar acha que precisa] para [resultado desejado]`
- `Mesmo que você [objeção comum], ainda assim você pode [resultado]`

**Grupo 7 — Pergunta de reconhecimento (headlines 16-17)**
- `Você reconhece os [número] sinais de alerta de [problema que o avatar tem]?`
- `Você já se perguntou por que [frustração recorrente do avatar]?`

**Grupo 8 — Livre de criação (headlines 18-20)**
- 3 headlines usando criatividade máxima, combinando elementos do produto de forma inesperada
- Pelo menos 1 deve usar o Unique Mechanism

### Passo 3 — Revisar variação

Antes de finalizar, verificar:
- [ ] Exatamente 20 headlines
- [ ] Pelo menos 5 frameworks distintos representados
- [ ] Nenhuma repetição de ângulo
- [ ] Pelo menos 2 headlines com número específico
- [ ] Pelo menos 1 headline com o Unique Mechanism
- [ ] Linguagem nativa do mercado em todas

### Passo 4 — Salvar no context.md

Preencher **Seção 8 — Headlines** do `outputs/{slug}.md` como lista numerada.

Atualizar `{status}` para `HEADLINES_COMPLETE`.

Notificar:
```
✅ 20 headlines criadas com {X} frameworks distintos.

Próximo passo (escolha):
[1] @reel *list-angles → criar scripts de vídeo
[2] @spark *list-templates → criar emails
[3] @sage *create-faq → criar FAQ
[4] @judge *review-all → revisão final de todo o material
```

---

## Output

- Seção 8 do context.md preenchida com 20 headlines numeradas
- Status atualizado para `HEADLINES_COMPLETE`
