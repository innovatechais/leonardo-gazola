# Task: capturar-notas

## Objetivo

Processar cada input recebido durante uma reunião, classificar automaticamente e manter um bloco de notas estruturado em tempo real.

## Quando executar

Toda vez que qualquer mensagem for recebida enquanto o agente Bilhete estiver ativo — exceto comandos com prefixo `*`.

---

## Workflow

### PASSO 1 — Receber input

Aceitar qualquer texto sem filtro inicial. Pode ser:
- Uma palavra ("agendar João")
- Uma frase ("ficou decidido que vamos com o plano B")
- Um parágrafo inteiro com múltiplas informações
- Um link ou referência
- Um número ou métrica

### PASSO 2 — Verificar se é "MODO TRANSCRIÇÃO"

- Se o texto contém a frase "MODO TRANSCRIÇÃO" (case insensitive, com ou sem acento): **interromper captura → executar handoff** (ver seção Handoff abaixo)
- Se não: continuar para PASSO 3

### PASSO 3 — Classificar o conteúdo

Analisar o texto e determinar a categoria principal:

| Categoria | Ícone | Indicadores |
|---|---|---|
| NOTA | 📌 | Observação geral, contexto, informação sem ação |
| ACAO | ✅ | Verbo de compromisso, responsável explícito ou implícito |
| INSIGHT | 💡 | Ideia nova, percepção, oportunidade, "e se" |
| DECISAO | 🔑 | "Decidimos", "ficou", "vamos de", "aprovado" |
| CITACAO | 💬 | Atribuição a uma pessoa específica |
| REFERENCIA | 📎 | URL, nome de arquivo, documento, ferramenta |
| NUMERO | 🔢 | Métrica, meta, resultado, percentual, valor monetário |

**Regra de desempate:** Se o texto se encaixa em múltiplas categorias:
1. Registrar pela categoria de maior ação (ACAO > DECISAO > INSIGHT > NOTA)
2. Adicionar tag secundária entre colchetes se relevante

### PASSO 4 — Formatar e registrar

Adicionar ao bloco de notas com este formato:

```
[ícone] [CATEGORIA] | [timestamp interno - número sequencial]
[texto original preservado, com correção mínima de typos óbvios]
```

Exemplos:
```
✅ ACAO | #12
Fulano vai enviar o contrato até sexta

🔑 DECISAO | #13
Vamos usar o plano B para o lançamento

💡 INSIGHT | #14
O mercado de 35+ está subatendido nessa vertical
```

### PASSO 5 — Confirmar recebimento

Responder com **uma linha apenas**:
- `✅ AÇÃO registrada` → para ACAO
- `🔑 DECISÃO registrada` → para DECISAO
- `💡 INSIGHT capturado` → para INSIGHT
- `📌 Nota adicionada` → para NOTA
- `💬 Citação registrada` → para CITACAO
- `📎 Referência salva` → para REFERENCIA
- `🔢 Número registrado` → para NUMERO

**Nunca** fazer perguntas, pedir confirmação ou dar explicações durante captura.

---

## Handoff — MODO TRANSCRIÇÃO

Quando "MODO TRANSCRIÇÃO" for detectado:

```
🎫 Modo captura encerrado. [X] entradas registradas.

[exibir bloco completo organizado por categoria]

---
📋 Próximo passo: cole a transcrição da reunião e ative @nexo.
Depois use @faros para extrair o que importa da transcrição.
---
```

---

## Comando *bloco

Exibir o bloco de notas organizado por categoria:

```markdown
# 🎫 Bloco de Notas da Reunião

## ✅ Ações ([count])
- [lista de ações registradas]

## 🔑 Decisões ([count])
- [lista de decisões]

## 💡 Insights ([count])
- [lista de insights]

## 📌 Notas Gerais ([count])
- [lista de notas]

## 💬 Citações ([count])
- [lista de citações]

## 📎 Referências ([count])
- [lista de referências]

## 🔢 Números ([count])
- [lista de números]

---
Total: [X] entradas | Sessão ativa há [Y] entradas
```

---

## Notas de execução

- Manter dois registros em memória: **cronológico** (ordem de chegada) e **por categoria**
- Nunca perder uma entrada — em caso de ambiguidade, usar NOTA
- Não corrigir conteúdo, apenas erros de digitação óbvios (ex: "reuniao" → "reunião")
- Timestamps são sequenciais (#1, #2...) — não usar horário real (não disponível)
