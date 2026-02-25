# Task: create-upsell

**Agente responsável:** Vera  
**Posição no pipeline:** 6 de 12  
**Dependências:** build-offer + create-usp (Seções 4 e 5 preenchidas)  
**Próxima task:** create-tsl

---

## Objetivo

Criar o stack completo de monetização: 5 order bumps e 5 upsells que não conflitem com os bônus da oferta principal e que resolvam o próximo problema lógico do avatar.

---

## Contexto de referência

Esta task implementa o **UPSELL PROMPT** do prompt-library. Leia `data/prompt-library.md → Seção 5: Upsell` antes de executar.

---

## Regra fundamental da lógica de upsell

- **Order bumps:** decisão rápida e simples. Complementam o que acabou de comprar. Valor percebido alto, preço baixo. Formatos ideais: audiobook, checklist, template, guia rápido.
- **Upsells:** resolvem o **próximo problema lógico** após usar a oferta principal. Mais completos, podem ter preço maior. Oferecem aceleração, profundidade ou suporte.

---

## Processo

### Passo 1 — Mapear o próximo problema lógico

Baseado no avatar (Seção 3) e na oferta principal (Seção 4), perguntar:

> "Depois que o avatar usar o produto principal e começar a ver resultados, qual é o próximo obstáculo que vai enfrentar?"

Mapear 3-5 próximos problemas lógicos em ordem cronológica.

### Passo 2 — Criar 5 Order Bumps

Para cada order bump, criar:

- **Nome** — título atrativo e complementar
- **Formato** — de um dos tipos: audiobook, checklist, template, guia avançado, acesso a webinar, ferramenta, kit de início rápido, certificado, comunidade fechada
- **Descrição persuasiva** — por que adicionar é uma decisão óbvia
- **Valor percebido** — quanto parece valer vs. quanto custa
- **Garantia própria** — garantia simples e direta
- **Texto de apresentação** — 2-3 frases para mostrar na página de checkout

Regra: order bump não deve conflitar com nenhum dos 3 bônus da oferta principal.

### Passo 3 — Criar 5 Upsells

Para cada upsell, criar:

- **Nome da oferta** — nome completo e atrativo
- **Lógica de upsell** — qual próximo problema resolve (deve ser óbvio para o comprador)
- **Descrição completa** — o que inclui, como entrega, quais resultados
- **Faixa de preço** — recomendação baseada no mercado e valor entregue
- **Garantia própria** — garantia persuasiva
- **1-2 bônus extras** — com valor percebido e descrição irresistível
- **Texto de apresentação** — hook de 2-3 frases para a página de upsell

### Passo 4 — Verificação de conflitos

Checar que nenhum order bump ou upsell repete ou diminui o valor dos bônus da oferta principal. Se houver conflito, redesenhar o item conflitante.

### Passo 5 — Salvar no context.md

Preencher **Seção 6 — Stack de Upsell** do `outputs/{slug}.md`.

Atualizar `{status}` para `UPSELL_COMPLETE`.

Notificar:
```
✅ Stack de upsell criado.
5 Order Bumps + 5 Upsells definidos.

A estrutura completa da oferta está pronta.

Próximo passo: @quill *write-tsl (carta de vendas)
```

---

## Output

- Seção 6 do context.md preenchida com stack completo
- Status atualizado para `UPSELL_COMPLETE`

---

## Flags de qualidade

- Order bump com preço maior que oferta principal → repensar posicionamento
- Upsell que duplica benefício da oferta principal → redesenhar
- Descrições de bônus genéricas ("guia completo sobre X") → tornar específicas e irresistíveis
