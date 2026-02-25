# Clube Tartar — Proposta de Programa de Assinatura B2B

**Sessão:** clube-tartar-2026-02-24
**Data:** 24/02/2026
**Origem:** Reunião operacional Tartar (Leonardo Gazola, Renato de Campos Almeida, Raphael Cavalcanti)
**Status:** Ideia aprovada para amadurecimento

---

## Contexto

A Tartar está em processo de reativação e expansão da sua base de clientes B2B via disparos automatizados no WhatsApp. Durante a reunião de 24/02, enquanto discutiam campanhas de datas comemorativas e modelos de desconto para hamburguerias, surgiu organicamente o conceito do **Clube Tartar**: um programa de assinatura recorrente que fideliza clientes B2B através de um sistema de crédito pré-pago com desconto.

---

## Objetivo

Criar um programa de fidelidade B2B que:
1. **Gera receita recorrente previsível** para a Tartar
2. **Aumenta o LTV** dos clientes (especialmente restaurantes e hamburguerias)
3. **Simplifica o processo de pedido** para o cliente (sem negociar desconto a cada compra)
4. **Mantém ou aumenta o ticket médio** — sem fragmentar pedidos

---

## Público-alvo

**Primário:** Restaurantes e hamburguerias B2B que já compram regularmente da Tartar
**Secundário:** Clientes inativos sendo reativados — o clube é oferecido como upgrade após a primeira recompra
**Não foco (neste momento):** Clientes B2C (volume por cliente é baixo; desconto não é percebido como significativo)

---

## Temas principais

### 1. Mecânica do Clube — Crédito Pré-Pago com Desconto

O cliente adere ao clube fazendo um **aporte periódico** (mensal, trimestral ou anual). Esse valor vira **crédito** que é debitado conforme os pedidos são realizados. Cada produto pedido dentro do plano sai com um **desconto fixo** (ex: 10–15%) em relação ao preço normal.

**Diferencial frente ao kit fixo:** o cliente não precisa comprometer produtos específicos antecipadamente. Pode pedir qualquer mix da linha Tartar — o desconto é aplicado automaticamente no crédito disponível.

**Exemplo prático:**
> Cliente faz aporte de R$ 2.000 → Produto A (normal R$ 100) sai por R$ 80 → Produto B (normal R$ 150) sai por R$ 120 → Crédito vai sendo consumido até zerar → Novo aporte renova o plano

---

### 2. Periodicidade — Por que Trimestral é o Padrão Recomendado

| Período | Ticket por ciclo | Frete | Complexidade | Recomendado |
|---|---|---|---|---|
| Mensal | Menor | Mais custos | Baixa | Não (fragmenta) |
| **Trimestral** | **Médio-alto** | **Diluído** | **Média** | **✅ Sim** |
| Anual | Alto | Muito diluído | Alta | Para redes grandes |

O modelo mensal foi descartado como padrão por Renato pois **fragmenta o ticket médio** e **aumenta a frequência de frete** — que já está caro e subindo (ex: Cavalima aumentou 11% em fevereiro/2026).

O trimestral resolve: cliente faz um pedido maior a cada 3 meses, frete é diluído e a Tartar tem previsibilidade de caixa.

---

### 3. B2B como mercado prioritário

O modelo foi deliberadamente desenhado para **B2B e não B2C** por três razões:

1. **Volume:** Um restaurante compra galões e caixas — um desconto de 10% representa valor real. Um cliente B2C compra 2 garrafinhas — 10% mal se nota.

2. **Estabilidade de pedido:** Restaurante usa os mesmos molhos toda semana. A recorrência é natural, só precisa ser formalizada.

3. **Percepção de valor:** Para o dono do restaurante, entrar no clube significa travar um custo operacional fixo com desconto garantido. Isso é gestão — não só compra.

> *"É mais fácil o B2B ter um plano desse do que o B2C, porque o cara vai querer variar um molho."* — Raphael Cavalcanti

---

### 4. Estratégia de Captação

**Para clientes que já compram regularmente:**
- Abordagem direta: *"Você já compra todo mês — formalize isso e ganhe desconto permanente."*
- Canal: disparo WhatsApp segmentado (filtro por frequência de pedido no CRM)

**Para clientes novos / em reativação:**
- Funil em 2 etapas:
  1. 1ª compra com desconto de boas-vindas
  2. Na recompra (preço cheio): oferta do clube como alternativa inteligente

**Para redes grandes (SP, Sul):**
- Proposta de plano anual com entrega periódica
- Argumento: *"A cada trimestre você recebe X mercadoria. Desconto de Y%. Frete único."*

---

### 5. Implementação Técnica

**Pagamento recorrente:**
- **ASA (banco digital):** Cobra o cartão de crédito do cliente mês a mês (ou trimestre a trimestre) sem comprometer o limite inteiro. Diferente de parcelamento — é recorrência real.
- **Boleto:** Para quem não usa cartão — funciona com aporte manual periódico.

**CRM iPro:**
- Tag `clube-tartar-ativo` para identificar assinantes
- Pipeline de controle de recorrência (avisar quando crédito está baixo, renovação automática)

**Landing page (sugerida):**
- Página simples explicando o modelo
- CTA: *"Quero entrar no Clube Tartar"* → abre conversa no WhatsApp comercial

---

## Decisões tomadas na reunião

| Decisão | Por quê |
|---|---|
| B2B como foco exclusivo | Volume e estabilidade de pedido justificam o modelo |
| Crédito livre (sem kit fixo) | Kit fixo é inviável operacionalmente — muda todo mês por cliente |
| Trimestral como período padrão | Evita fragmentação de ticket médio e dilui frete |
| Descartar B2C por ora | 10% sobre 2 garrafinhas não motiva adesão |

---

## Hipóteses a validar

| Hipótese | Como validar |
|---|---|
| Desconto de 10–15% é sustentável na margem | Simulação interna pela Tartar |
| Clientes regulares vão querer formalizar recorrência | Teste de disparo para 20–30 clientes |
| ASA suporta o modelo de crédito pré-pago | Verificar com Leonardo |
| Trimestral é aceito pelos clientes (não só pela Tartar) | Perguntar diretamente em conversa de venda |

---

## Perguntas em aberto

1. **Margem:** Qual o percentual de desconto sustentável? (10%? 15%? Varia por produto?)
2. **Frete fora de Campo Grande:** Clube funciona para clientes distantes ou só vale para locais?
3. **Nome:** "Clube Tartar" é o nome final ou precisa de refinamento?
4. **Comunicação:** Como diferenciar a mensagem para clientes ativos vs. inativos?
5. **Integração:** O ASA consegue funcionar como sistema de crédito ou precisa de outro sistema?

---

## Próximos passos priorizados

| # | Ação | Responsável | Urgência |
|---|---|---|---|
| 1 | Validar margem de desconto sustentável (10–15%) | Renato / financeiro Tartar | Alta — desbloqueia tudo |
| 2 | Decidir período padrão: mensal vs. trimestral | Renato + Raphael | Alta |
| 3 | Mapear clientes que já compram regularmente no CRM | Renato | Alta |
| 4 | Criar disparo WhatsApp para apresentar o clube | Leonardo | Média |
| 5 | Avaliar integração com ASA ou plataforma de recorrência | Leonardo | Média |

---

## Apêndice — IDs do ideation.json

| ID | Tipo | Título resumido |
|---|---|---|
| I1 | idea | Mecânica do crédito pré-pago |
| I2 | idea | Período trimestral como padrão |
| I3 | idea | Flexibilidade de SKU |
| I4 | idea | Funil cliente novo |
| I5 | idea | Recorrência via ASA |
| I6 | idea | Landing page |
| I7 | idea | Redes grandes / plano anual |
| I8 | idea | Desconto por quantidade (hamburguerias) |
| Q1 | question | Percentual de desconto sustentável |
| Q2 | question | Integração com modelo de frete |
| Q3 | question | Funciona fora de Campo Grande? |
| Q4 | question | Comunicação ativos vs. inativos |
| A1–A5 | action | Ver tabela de próximos passos acima |

---

*Gerado por @muse — ideation-to-docs-squad*
*Fonte: ideation.json | clube-tartar-2026-02-24*
