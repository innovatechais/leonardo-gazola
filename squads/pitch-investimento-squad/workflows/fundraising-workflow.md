# Fundraising Workflow

Workflow completo do processo de captação de R$ 1.000.000 por 20% de equity para a Innovatech.

---

## Fluxo Principal

```
INVESTIDOR IDENTIFICADO
      ↓
@investor-researcher (*pre-meeting-prep {investidor})
      ↓
[Briefing: perfil, fit, 5 pontos de atenção, perguntas prováveis]
      ↓
@pitch-coach (*pitch-simulation {perfil do investidor})
      ↓
[Simulação e feedback]
      ↓
[Leonardo pronto?]
      ├── Não → ajustar narrativa e repetir simulação
      └── Sim → REUNIÃO REAL
      ↓
REUNIÃO ACONTECE
      ↓
[Objeção levantada?]
      └── Sim → @objection-handler (*objection-drill {objeção})
      ↓
[Investidor solicitou documento?]
      └── Sim → @due-diligence-guardian (*investor-request {documento})
      ↓
FOLLOW-UP PÓS-REUNIÃO
      ↓
[Nova reunião agendada?]
      └── Sim → reinicia o ciclo com contexto atualizado
```

---

## Comandos por Fase

| Fase | Agente | Comando |
|------|--------|---------|
| Pesquisar investidor | Scout | `@investor-researcher *pre-meeting-prep {nome}` |
| Treinar pitch | Mentor | `@pitch-coach *pitch-simulation` |
| Preparar objeções | Escudo | `@objection-handler *objection-drill {objeção}` |
| Verificar documentos | Arquivo | `@due-diligence-guardian *document-status` |

---

## Métricas do Round

| Métrica | Meta |
|---------|------|
| Reuniões por semana | 2-3 |
| Taxa de 2ª reunião | > 50% |
| Documentos prontos | 100% antes de qualquer reunião avançada |
| Prazo para fechar | Máximo 90 dias |
