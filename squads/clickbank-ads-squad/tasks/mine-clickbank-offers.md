---
task: Mine ClickBank Offers
responsavel: "@offer-research-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - niche: Nicho ou categoria ClickBank (ex: health, make-money, relationships)
  - gravity_min: Gravity mínimo desejado (default: 20)
  - gravity_max: Gravity máximo desejado (default: 150 — evitar saturação)
  - language: PT | EN | both (default: both)
Saida: |
  - offer_list: Lista ranqueada de ofertas candidatas
  - top_pick: Oferta com maior score para análise aprofundada
  - next_step: Sugestão de próxima task (*score-offer-fit)
Checklist:
  - "[ ] Coletar nicho e parâmetros via elicitação"
  - "[ ] Listar top ofertas ClickBank pelo nicho"
  - "[ ] Filtrar por gravity_min e gravity_max"
  - "[ ] Extrair EPC, commission rate, ticket médio"
  - "[ ] Verificar se oferta tem página de vendas em PT (se language=PT)"
  - "[ ] Ranquear por potencial (gravity × EPC × ticket)"
  - "[ ] Apresentar lista com score básico"
  - "[ ] Sugerir top pick para *score-offer-fit"
---

# *mine-offers — Mine ClickBank Offers

Minera e ranqueia ofertas no ClickBank com potencial para tráfego pago via Google Ads Search.

## Elicitação

```
? Qual nicho você quer explorar?
  1. Health & Fitness
  2. Make Money Online
  3. Relationships & Dating
  4. Self-Help / Personal Development
  5. Outro (digitar)

? Gravity mínimo: (20)
? Gravity máximo: (150)
? Idioma da oferta: PT | EN | Ambos (both)
? Ticket médio mínimo esperado ($): (37)
```

## Output Esperado

```
🔎 Rex — Ofertas encontradas para {nicho}

| # | Oferta | Gravity | EPC | Ticket | Score |
|---|--------|---------|-----|--------|-------|
| 1 | ...    | 87      | $1.2| $47   | 82/100|
| 2 | ...    | 45      | $0.9| $97   | 71/100|
| 3 | ...    | 120     | $1.8| $37   | 68/100|

⭐ Top Pick: {oferta #1}
→ Próximo: *score-offer {oferta #1}
```

## Critérios de Scoring Inicial

| Fator | Peso |
|-------|------|
| Gravity (20-150 ideal) | 30% |
| EPC | 25% |
| Ticket vs CPC estimado | 25% |
| Disponibilidade PT | 20% |
