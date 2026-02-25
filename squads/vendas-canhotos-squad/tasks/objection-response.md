---
task: Objection Response
responsavel: "@sales-trainer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - objecao: A objeção específica do prospect
  - contexto_prospect: Perfil da empresa (transportadora, indústria, etc.)
  - momento: durante_demo | por_whatsapp | por_email | apos_proposta
Saida: |
  - resposta_primaria: Resposta recomendada calibrada para transportes BR
  - resposta_alternativa: Variação para contexto diferente
  - follow_up: Próxima pergunta para redirecionar a conversa
Checklist:
  - "[ ] Identificar a objeção e classificar (preço/urgência/técnica/confiança)"
  - "[ ] Adaptar resposta para o setor de transportes"
  - "[ ] Usar linguagem do dono de transportadora (reais, dias, motorista)"
  - "[ ] Incluir dado real da Innovatech quando aplicável"
  - "[ ] Formular pergunta de redirecionamento"
  - "[ ] Adaptar formato para o canal (WhatsApp/email/ao vivo)"
---

# *objection-response — Resposta a Objeções de Prospects

Respostas calibradas para objeções do setor de transportes brasileiro.

## Output Esperado

```
🏋️ Coach — Objeção: "{objeção}"
Contexto: [tipo de empresa] | Momento: [canal]

━━━━━━━━━━━━━━━━━━━━━━━━
RESPOSTA PRIMÁRIA
━━━━━━━━━━━━━━━━━━━━━━━━
"[Resposta em linguagem de transportadora — direta, em reais, sem jargão tech]"

━━━━━━━━━━━━━━━━━━━━━━━━
RESPOSTA ALTERNATIVA
━━━━━━━━━━━━━━━━━━━━━━━━
"[Variação para perfil mais técnico ou decisor diferente]"

━━━━━━━━━━━━━━━━━━━━━━━━
PERGUNTA DE REDIRECIONAMENTO
━━━━━━━━━━━━━━━━━━━━━━━━
"[Pergunta para devolver o controle da conversa e qualificar melhor]"

DICA PARA ESSE CANAL
[Como adaptar a resposta para WhatsApp / email / ao vivo]
```

## Banco de Objeções Mais Comuns (Transportes)

| Objeção | Categoria |
|---------|----------|
| "É caro" | Preço |
| "Deixa eu pensar" | Urgência |
| "Já temos sistema" | Necessidade |
| "Minha equipe não vai usar" | Adoção |
| "WhatsApp é muito informal" | Confiança |
| "E se a IA errar?" | Técnica |
| "Precisamos apresentar para o sócio" | Autoridade |
| "Agora não é a hora" | Timing |
