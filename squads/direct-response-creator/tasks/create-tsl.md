# Task: create-tsl

**Agente responsável:** Quill  
**Posição no pipeline:** 7 de 12  
**Dependências:** create-upsell (Seções 2-6 preenchidas)  
**Próxima task:** create-headlines

---

## Objetivo

Escrever a Carta de Vendas Longa (TSL / Advertorial Jump Page) com +2.000 palavras, seguindo as 9 seções obrigatórias, calibrada para o mercado-alvo, com linguagem de NLP e gatilhos emocionais.

---

## Contexto de referência

Esta task implementa o **PROMPT CRIAÇÃO DE TSL** do prompt-library. Leia `data/prompt-library.md → Seção 6: TSL` antes de executar.

---

## Instruções críticas

- **Mínimo 2.000 palavras** — contar antes de finalizar
- **9 seções obrigatórias** — nenhuma pode ser pulada
- **Linguagem nativa** — leia `config/market-profiles/{profile}.md` antes de escrever
- **Abertura com hook emocional** — não começa apresentando o produto
- **Não use exclamação em excesso** — máximo 3 por seção

---

## Processo

### Passo 1 — Ler todo o contexto

Abrir `outputs/{slug}.md` e ler:
- Seção 2: Parasita (tom, técnicas, storytelling)
- Seção 3: Avatar (dores, desejos, verbal triggers, communication style)
- Seção 4: Oferta (nome, módulos, bônus, garantia, depoimentos)
- Seção 5: USP + Unique Mechanism
- Seção 6: Upsell stack (para referências de valor)

Abrir `config/market-profiles/{profile}.md`.

### Passo 2 — Escrever as 9 seções

#### Seção 1: Opening + Lead In
- Hook emocional que captura atenção nos primeiros 2 parágrafos
- Deve criar identificação imediata com o avatar
- NÃO apresenta o produto ainda
- Estabelece a tensão emocional que vai ser resolvida

#### Seção 2: Intro + Key Concept
- Apresenta o conceito central da promessa
- Posiciona o valor único da solução sem nomear o produto ainda
- Cria o "e se fosse possível...?" na mente do avatar

#### Seção 3: False Solutions
- Lista 3-5 soluções que o avatar já tentou e por que falharam
- Usa linguagem empática (não zomba do avatar por ter tentado)
- Cada solução falsa abre espaço para a solução real
- Conecta com `[False Solutions]` e `[Expensive Alternatives]` do avatar

#### Seção 4: Objections
- Antecipa e destrói as 3-4 principais objeções do avatar
- Usa a estrutura: "Você pode estar pensando..." → resposta que converte objeção em razão para comprar
- Referencia `[Objections]` e `[Doubt Patterns]` do avatar

#### Seção 5: Offer
- Apresenta o produto pelo nome completo pela primeira vez
- Descreve cada módulo/entregável com linguagem de benefício (não feature)
- Inclui o Unique Mechanism como o "porquê funciona"
- Apresenta o stack de valor: produto + bônus com valor percebido de cada

#### Seção 6: Testimonials
- Integra os 3 depoimentos da Seção 4 do context.md
- Cada depoimento tem: nome, contexto (quem era antes), resultado específico
- Adiciona 1-2 mini-depoimentos intercalados nas seções anteriores se natural

#### Seção 7: Sales Bullets
- 10-15 bullets de benefício no formato "Descubra como..." / "Por que..." / "[Resultado] sem [dor]"
- Cada bullet deve ser completo e irresistível isoladamente
- Varia os formatos: curiosidade, resultado, segredo, contraintuitivo

#### Seção 8: Bonuses
- Apresenta cada bônus com nome, valor percebido, e descrição de 2-3 frases
- Usa o stack: "Se você parar aqui, já tem [valor total dos bônus]..."
- Cada bônus resolve um problema secundário do avatar

#### Seção 9: Guarantee + Scarcity
- Garantia de 30 dias escrita de forma que remove risco e demonstra confiança
- Escassez: baseada em realidade (vagas, tempo, bônus) — nunca artificialmente fabricada
- CTA direto e claro — uma única ação
- Fecha com o estado "depois" — como será a vida do avatar após comprar

### Passo 3 — Verificar qualidade

Antes de salvar:
- [ ] Contagem de palavras ≥ 2.000
- [ ] Todas as 9 seções presentes
- [ ] Nenhum AI-writing (adjetivos empilhados, frases genéricas)
- [ ] Linguagem calibrada para o perfil de mercado
- [ ] Avatar mencionado explicitamente (usando verbal triggers do contexto)
- [ ] USP e Unique Mechanism presentes na Seção 5

### Passo 4 — Salvar no context.md

Preencher **Seção 7 — TSL** do `outputs/{slug}.md`.

Atualizar `{status}` para `TSL_COMPLETE`.

Notificar:
```
✅ Carta de vendas concluída.
Palavras: {X}
Seções: 9/9

Próximo passo: @quill *write-headlines
```

---

## Output

- Seção 7 do context.md preenchida com TSL completa
- Status atualizado para `TSL_COMPLETE`

---

## Flags de qualidade

- Hook que começa apresentando o produto → reescrever
- Seção de objeções com menos de 3 objeções → adicionar
- Bullets sem benefício específico → reescrever
- CTA sem ação específica → tornar concreto
