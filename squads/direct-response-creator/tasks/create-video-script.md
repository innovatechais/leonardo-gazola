# Task: create-video-script

**Agente responsável:** Reel  
**Posição no pipeline:** 9 de 12 (on-demand)  
**Dependências:** create-usp mínimo (Seções 2-5 preenchidas)  
**Próxima task:** criar outro ângulo OU create-email OU create-faq

---

## Objetivo

Criar roteiro de vídeo de anúncio de 60 segundos para o ângulo escolhido pelo usuário, calibrado para o mercado-alvo, pronto para ser gravado.

---

## Contexto de referência

Esta task implementa os **PROMPTS DE ANÚNCIOS DE VÍDEO INFINITOS** do prompt-library. Leia `data/prompt-library.md → Seção 8: Scripts de Vídeo → {ângulo escolhido}` antes de executar.

---

## Regras obrigatórias

- **Máximo 60 segundos de leitura** em voz natural: ≈150 palavras PT-BR / ≈165 EN-US / ≈155 ES
- **Segue rigorosamente a estrutura do ângulo** — não mistura seções de ângulos diferentes
- **Escrito para ser falado**, não lido — usa linguagem oral natural
- **CTA específico** — não "saiba mais", sim "clique no link abaixo agora" / "vá para {URL}"
- **Hook nos 3 primeiros segundos** — as primeiras palavras decidem se o polegar para ou não

---

## Ângulos disponíveis

Ao iniciar, se o usuário não especificou um ângulo, apresentar a lista e recomendar:

```
Temos 9 ângulos disponíveis. Para este produto, recomendo:
→ [ângulo 1] — porque {razão baseada no avatar}
→ [ângulo 2] — porque {razão baseada no avatar}

Todos os ângulos:
[1] It's Not Luck — debunks mito da sorte
[2] Historical Evolution — compara a avanços tecnológicos
[3] Persona Problem — humor que personifica as dores
[4] Transformation Time-Lapse — antes e depois visual
[5] Whistleblower — grupo secreto escondendo informação
[6] Permission to Skip — gap entre estado atual e desejado
[7] Unexpected Delivery — método surpreendente
[8] Myth Buster — derruba crenças populares
[9] Weird Hack — solução não-convencional
```

---

## Processo (por ângulo)

### Para qualquer ângulo:

**Passo 1 — Ler contexto**

Abrir `outputs/{slug}.md` e ler:
- Seção 3: Avatar — especialmente `[Verbal Triggers]`, `[Frustrations]`, `[Unique Fear]`, `[False Solutions]`
- Seção 4: Oferta — nome, módulos, bônus
- Seção 5: USP + Unique Mechanism
- Abrir `config/market-profiles/{profile}.md`

**Passo 2 — Escrever o roteiro no ângulo escolhido**

Seguir exatamente a estrutura de seções do ângulo (ver `data/prompt-library.md`):

Formato do output:
```
[ÂNGULO: {nome do ângulo}]
[TEMPO ESTIMADO: XX segundos]
[MERCADO: {profile}]

--- ROTEIRO ---

[ABERTURA / HOOK] (0-5s)
{texto da abertura}

[{NOME DA SEÇÃO 2}] (5-20s)
{texto}

[{NOME DA SEÇÃO 3}] (20-40s)
{texto}

[{NOME DA SEÇÃO 4}] (40-50s)
{texto}

[CTA] (50-60s)
{texto do CTA}

--- FIM DO ROTEIRO ---

[NOTAS DE DIREÇÃO]
{Sugestões de visual, entonação, pace para quem vai gravar}
```

**Passo 3 — Contar palavras e ajustar**

- Contar palavras do roteiro
- Se acima do limite: identificar onde cortar sem perder a estrutura
- Se abaixo de 120 palavras: expandir a seção de prova ou benefícios

**Passo 4 — Salvar no context.md**

Adicionar roteiro à **Seção 9 — Scripts de Vídeo** do `outputs/{slug}.md`, identificado pelo ângulo.

Notificar:
```
✅ Script "{ângulo}" criado — {X} palavras / ≈{Y} segundos

Quer criar outro ângulo para teste A/B?
[1] Sim, sugerir próximo ângulo mais diferente deste
[2] Não, prosseguir para emails → @spark *list-templates
[3] Não, ir para FAQ → @sage *create-faq
```

---

## Output

- Roteiro adicionado à Seção 9 do context.md identificado pelo ângulo
- Inclui notas de direção para gravação

---

## Flags de qualidade

- Hook que demora mais de 5 segundos para criar tensão → reescrever abertura
- CTA genérico ("clique aqui para saber mais") → tornar específico
- Roteiro acima de 175 palavras → cortar sem perder estrutura
- Linguagem escrita, não falada → reescrever em tom oral
