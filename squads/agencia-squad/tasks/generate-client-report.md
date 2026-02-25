---
task: Generate Client Report
responsavel: "@client-reporter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cliente: Nome do cliente
  - periodo: semana (default) | mes
  - canal_envio: whatsapp | email | ambos
Saida: |
  - relatorio: Relatório formatado e pronto para enviar sem edição
Checklist:
  - "[ ] Identificar cliente e período"
  - "[ ] Coletar dados do log de @content-processor"
  - "[ ] Listar publicações da semana"
  - "[ ] Listar agendamentos da próxima semana"
  - "[ ] Listar pendentes de aprovação"
  - "[ ] Listar o que está em produção"
  - "[ ] Formatar para o canal de envio"
  - "[ ] Confirmar que está pronto para enviar sem edição"
---

# *generate-client-report — Relatório Semanal para Cliente

Gera relatório formatado e pronto para enviar sem edição adicional.

## Elicitação

```
? Qual cliente?
? Período: semana atual ou outro?
? Canal: WhatsApp / Email / Ambos?
```

## Output Esperado (formato WhatsApp)

```
📊 RELATÓRIO SEMANAL — {NOME DO CLIENTE}
Semana: [DD/MM] a [DD/MM/AAAA]

✅ *PUBLICADOS ESSA SEMANA* ([N])
• [Tipo] — "[tema]" — [plataforma] — [data]
• [Tipo] — "[tema]" — [plataforma] — [data]

📅 *PRÓXIMA SEMANA* ([N] agendados)
• [Tipo] — "[tema]" — [plataforma] — [data prevista]

⏳ *AGUARDANDO APROVAÇÃO* ([N])
• "[tema]" — aguardando desde [data]
  ↳ Aprovação via [WhatsApp/Trello/email]

📌 *EM PRODUÇÃO*
• [descrição breve do que está sendo preparado]

---
Qualquer dúvida, é só me chamar! 😊
```
