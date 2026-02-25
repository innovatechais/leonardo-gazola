---
task: Context Sort
responsavel: "@context-switcher"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - dump_mental: Tudo o que está na cabeça de Leonardo (sem filtro)
Saida: |
  - contextos: Lista de contextos identificados com assuntos agrupados
  - contexto_agora: Qual contexto abre agora e por quê
  - fila: Demais contextos com data/gatilho de abertura sugerido
Checklist:
  - "[ ] Elicitar dump mental completo sem interromper"
  - "[ ] Identificar e nomear cada contexto"
  - "[ ] Agrupar assuntos por contexto"
  - "[ ] Avaliar urgência real vs. urgência percebida de cada contexto"
  - "[ ] Definir qual contexto abre agora"
  - "[ ] Definir fila com data/gatilho para os demais"
  - "[ ] Apresentar output organizado para validação de Leonardo"
---

# *context-sort — Separação de Contextos

Organiza o caos cognitivo em contextos distintos com fila de atenção definida.

## Elicitação

```
? Me joga tudo que está na cabeça — sem filtro, sem ordem.
  (Pode ser por voz ou texto)
```

Triagem escuta sem interromper. Só depois organiza.

## Contextos Padrão

| Contexto | Exemplos de assuntos |
|----------|---------------------|
| 🏗️ Innovatech Produto | Desenvolvimento, IA, integrações ERP, acurácia |
| 💰 Innovatech Investimento | Pitch, reuniões, due diligence, investidores |
| 📈 Innovatech Vendas | Prospects, pipeline, representantes, demos |
| 🛠️ Clientes Serviço | Automação Trello, conteúdo, funis externos |
| 👨‍👩‍👦 Pessoal/Família | Sócios, despesas, rotina, saúde, fé |

## Output Esperado

```
🗂️ Triagem — Contextos Identificados
[data]

📦 CONTEXTOS ENCONTRADOS

🏗️ INNOVATECH PRODUTO
- [assunto 1]
- [assunto 2]

💰 INNOVATECH INVESTIMENTO
- [assunto 1]

📈 INNOVATECH VENDAS
- [assunto 1]

🛠️ CLIENTES SERVIÇO
- [assunto 1]
- [assunto 2]

━━━━━━━━━━━━━━━━━━━━━━━━
ABRE AGORA: [contexto escolhido]
Por quê: [justificativa de urgência/importância]

FILA:
- [contexto 2] → abre [amanhã / depois da reunião / sexta]
- [contexto 3] → abre [semana que vem / quando X acontecer]
- [contexto 4] → abre [quando tiver energia para isso]

→ Passa para @daily-clarity com o contexto selecionado
```
