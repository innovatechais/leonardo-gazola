---
task: Validate SOP Compliance
responsavel: "@sop-guardian"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cliente: Nome do cliente
  - acao: Descrição da ação executada ou a executar
  - tipo_validacao: pre_execucao | pos_execucao
Saida: |
  - resultado: Conforme / Não Conforme / Dúvida
  - desvios: Lista de desvios encontrados (se houver)
  - correcao: O que fazer para corrigir (se não conforme)
Checklist:
  - "[ ] Identificar cliente e carregar seu SOP"
  - "[ ] Identificar tipo de validação (antes ou depois da execução)"
  - "[ ] Verificar nomenclatura do card (se aplicável)"
  - "[ ] Verificar categoria correta"
  - "[ ] Verificar data de publicação (respeita calendário?)"
  - "[ ] Verificar tom e formato"
  - "[ ] Verificar necessidade de aprovação"
  - "[ ] Emitir resultado de conformidade"
  - "[ ] Registrar desvio se encontrado"
---

# *validate-sop-compliance — Validação de Conformidade com SOP

Verifica se uma ação segue o procedimento padrão do cliente.

## Elicitação

```
? Qual cliente?
? O que foi feito ou vai ser feito? (descreva a ação)
? É validação antes de fazer ou depois de já ter feito?
```

## Output Esperado

```
📖 Normas — Validação de SOP: {nome do cliente}
[data]

AÇÃO ANALISADA: [descrição da ação]
TIPO: [Pré-execução / Pós-execução]

━━━━━━━━━━━━━━━━━━━━━━━━
RESULTADO: ✅ CONFORME / ⚠️ DESVIO / ❌ NÃO CONFORME
━━━━━━━━━━━━━━━━━━━━━━━━

[Se conforme:]
→ Tudo em ordem. Pode prosseguir.

[Se desvio:]
DESVIOS ENCONTRADOS:
• [desvio 1] — Correto seria: [como deveria ser]
• [desvio 2] — Correto seria: [como deveria ser]

CORREÇÃO: [o que fazer para ajustar]
IMPACTO: [baixo/médio/alto]

[Se registrar desvio pós-execução:]
→ Desvio registrado no histórico do SOP de {cliente}
→ Alerta enviado para @client-reporter incluir nas observações
```
