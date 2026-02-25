# Task: create-email

**Agente responsável:** Spark  
**Posição no pipeline:** 10 de 12 (on-demand)  
**Dependências:** create-usp mínimo (Seções 2-5 preenchidas)  
**Próxima task:** criar outro template OU create-faq

---

## Objetivo

Criar email de Direct Response para o template escolhido pelo usuário, calibrado para o mercado-alvo, pronto para envio.

---

## Contexto de referência

Esta task implementa os **PROMPTS DE EMAILS INFINITOS** do prompt-library. Leia `data/prompt-library.md → Seção 9: Emails → {template escolhido}` antes de executar.

---

## Regras obrigatórias

- **Assunto: máximo 50 caracteres, sem ponto de exclamação**
- **Abertura: sem "Olá", "Oi", "Prezado" ou "Espero que esteja bem"**
- **Máximo 1 CTA por email, linkado uma única vez**
- **Sem filler content** — cada frase trabalha para a conversão
- **Segue rigorosamente a estrutura do template** — não mistura templates

---

## Templates disponíveis

Ao iniciar, se o usuário não especificou um template, apresentar a lista e recomendar:

```
Temos 17 templates disponíveis. Para este produto e momento, recomendo:
→ [template 1] — porque {razão baseada no estágio do avatar}
→ [template 2] — porque {razão}

Todos os templates:
[1]  Socratic Teaser — perguntas que levam à solução
[2]  Taboo Breaker — desafia normas, apresenta alternativa
[3]  False Choice — expõe falhas do padrão, nova solução
[4]  Polarization Principle — divide crenças, alinha identidade
[5]  Forbidden Curiosity — controvérsia → alternativa ética
[6]  Paradoxical Truth Framework — contradiz sabedoria convencional
[7]  Outcome-Focused Unique Solution — baseado em dados/fatos
[8]  PAS Eliminate Common Problem — clickbait de breakthrough
[9]  PAS What The Hell — valida frustração diretamente
[10] Know It All — valida ceticismo, posiciona como diferente
[11] UMP (Unique Mechanism of the Problem) — causa-raiz
[12] Ideal Life — pinta o "depois" vívido
[13] Impressed Authority — tease de solução nova
[14] Unified Source Surprise — sintomas → causa única
[15] Missing Ingredient — o ingrediente que falta
[16] Disadvantaged Ascension — fraqueza como força
[17] Solution Funeral — enterra o método antigo
```

---

## Processo (por template)

### Para qualquer template:

**Passo 1 — Ler contexto**

Abrir `outputs/{slug}.md` e ler:
- Seção 3: Avatar — especialmente `[Frustrations]`, `[Verbal Triggers]`, `[Doubt Patterns]`, `[Primary Complaint]`
- Seção 4: Oferta — nome, garantia, bônus
- Seção 5: USP + Unique Mechanism
- Abrir `config/market-profiles/{profile}.md`

**Passo 2 — Escrever o email no template escolhido**

Seguir exatamente a estrutura de seções do template (ver `data/prompt-library.md`):

Formato do output:
```
[TEMPLATE: {nome do template}]
[MERCADO: {profile}]

--- EMAIL ---

ASSUNTO: {assunto — máx. 50 chars, sem !}

{corpo do email seguindo a estrutura do template}

[CTA ÚNICO]
{texto do link/botão}
{URL ou instrução}

--- FIM DO EMAIL ---
```

**Passo 3 — Verificar qualidade**

- [ ] Assunto ≤ 50 caracteres
- [ ] Sem exclamação no assunto
- [ ] Abertura não começa com "Olá/Oi/Prezado/Espero"
- [ ] Exatamente 1 CTA
- [ ] Linguagem nativa do mercado
- [ ] Estrutura do template respeitada

**Passo 4 — Salvar no context.md**

Adicionar email à **Seção 10 — Emails** do `outputs/{slug}.md`, identificado pelo template.

Notificar:
```
✅ Email "{template}" criado.
Assunto: "{assunto}"
Palavras: ~{X}

Quer criar outro email para teste A/B ou sequência?
[1] Sim, sugerir próximo template complementar
[2] Não, ir para FAQ → @sage *create-faq
[3] Não, ir para revisão final → @judge *review-all
```

---

## Output

- Email adicionado à Seção 10 do context.md identificado pelo template
- Pronto para copiar e enviar

---

## Flags de qualidade

- Assunto acima de 50 caracteres → encurtar
- Abertura com saudação genérica → substituir por hook direto
- Mais de 1 CTA → remover os adicionais
- AI-writing detectado → reescrever em linguagem mais humana
