---
workflow: Full Funnel Workflow
id: full-funnel-workflow
version: 1.0.0
description: |
  Workflow completo do squad: desde mineração de oferta até otimização de campanha ativa.
  Cobre as 4 fases: Research → Copy → Launch → Optimize.
---

# Full Funnel Workflow — ClickBank + Google Ads

## Visão Geral

```
FASE 1: Research    → @offer-research-analyst (Rex)
FASE 2: Copy        → @funnel-copywriter (Nova)
FASE 3: Launch      → Humano (sobe campanha no Google Ads)
FASE 4: Optimize    → @metrics-optimization-analyst (Flux)
```

---

## FASE 1 — Research (Rex)

**Objetivo:** Identificar oferta com score >= 70 para avançar

```
@offer-research-analyst
*mine-offers {nicho}
→ Lista de candidatas

*score-offer {top-pick}
→ Score detalhado

*competitor-analysis {nicho}
→ Mapa de anúncios ativos

*opportunity-report {oferta-aprovada}
→ Brief completo para Nova
```

**Gate:** Score >= 70 → Avançar para Fase 2
**Gate:** Score < 70 → Voltar para *mine-offers com novo filtro

---

## FASE 2 — Copy (Nova)

**Objetivo:** Funil completo pronto para subir

**Input:** Opportunity Report de Rex

```
@funnel-copywriter
*avatar-profile {nicho}
→ Perfil do avatar comprador

*write-presell {oferta}
→ Presell page (PT e/ou EN)

*write-ad-copy {oferta} {keywords}
→ 15 headlines + 4 descriptions (RSA)

*write-email-sequence {oferta} 5
→ Sequência de 5 emails

*ab-variants headline
→ 3 variações de headline para teste A/B
```

**Entregáveis:**
- [ ] Presell page finalizada
- [ ] Ad copy RSA (headlines + descriptions)
- [ ] Sequência de email (5 emails)
- [ ] Variações A/B definidas

---

## FASE 3 — Launch (Humano)

**Responsável:** Usuário

**Checklist de subida:**
- [ ] Criar campanha Search no Google Ads
- [ ] Configurar conversões (ClickBank pixel ou redirect tracking)
- [ ] Subir presell page no domínio
- [ ] Configurar RSA com copy de Nova
- [ ] Definir orçamento diário inicial (recomendado: 2-3× CPC estimado × 10 cliques)
- [ ] Ativar campanha em modo limitado (horário restrito primeiro)
- [ ] Aguardar 48-72h para dados suficientes

---

## FASE 4 — Optimize (Flux)

**Trigger:** 48-72h de dados ou gasto mínimo de 50 cliques

```
@metrics-optimization-analyst
*analyze-campaign {dados}
→ KPIs vs benchmarks + alertas

*funnel-audit {funil}
→ Gargalo identificado

*quality-score-audit {campanha}
→ Diagnóstico QS

*optimization-plan {campanha}
→ Plano de ação priorizado
```

**Loop de otimização:**
```
Flux analisa → identifica gargalo →
  CTR baixo → Nova revisa ad copy →
  CVR presell baixo → Nova revisa hook/story →
  CVR LP baixo → Rex busca oferta alternativa →
  ROAS negativo → Flux ajusta bids/segmentação →
→ Re-analisa após 48h
```

---

## Status de Campanha

| Fase | Status | Próxima Ação |
|------|--------|-------------|
| Research | ✅ Completa | Iniciar Copy |
| Copy | ✅ Completa | Launch |
| Launch | ⏳ Aguardando | Subir campanha |
| Optimize | 🔄 Em loop | Continuar até ROAS >= 150% |
