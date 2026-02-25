# Content Pipeline Workflow

Workflow de produção de conteúdo para clientes de agência — do conteúdo bruto ao publicado.

---

## Fluxo Semanal

```
SEGUNDA
      ↓
Conteúdo bruto chega (vídeos, briefings, textos do cliente)
      ↓
@content-processor (*process-content-batch {cliente})
      ↓
[SOP do cliente carregado via @sop-guardian]
      ↓
Processamento: transcrição → categorização → card Trello → Zapier
      ↓
[Item precisa de aprovação?]
      ├── Sim → sinaliza para cliente aprovar
      └── Não → agendado automaticamente
      ↓
QUINTA/SEXTA
      ↓
@sop-guardian (*validate-sop-compliance {cliente}) — revisão de conformidade
      ↓
SEXTA
      ↓
@client-reporter (*generate-client-report {cliente}) — relatório semanal
      ↓
Relatório enviado para o cliente por WhatsApp/email
      ↓
PRÓXIMA SEMANA → reinicia
```

---

## Comandos por Atividade

| Atividade | Agente | Comando |
|----------|--------|---------|
| Processar lote de conteúdo | Fluxo | `@content-processor *process-content-batch` |
| Verificar SOP antes de executar | Normas | `@sop-guardian *check-compliance` |
| Gerar relatório semanal | Relator | `@client-reporter *generate-client-report` |
| Novo colaborador aprende o SOP | Normas | `@sop-guardian *get-sop {cliente}` |

---

## Clientes Ativos

| Cliente | Frequência | Canal Aprovação | Canal Relatório |
|---------|-----------|----------------|----------------|
| [Cliente 1] | [X posts/semana] | WhatsApp | WhatsApp |
| [Cliente 2] | [X posts/semana] | Trello | Email |

*(Atualizar conforme novos clientes forem adicionados)*
