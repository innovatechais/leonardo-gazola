# reuniao-intel-squad

Squad de inteligência de reunião — captura, formata e extrai o que importa.

## Os 3 Agentes

| Agente | Ícone | Papel | Quando usar |
|---|---|---|---|
| **@bilhete** | 🎫 | Captador em tempo real | Durante a reunião |
| **@nexo** | 📋 | Formatador de transcrição | Após MODO TRANSCRIÇÃO |
| **@faros** | 🔦 | Analista de inteligência | Com a transcrição formatada |

---

## Fluxo completo

```
DURANTE A REUNIÃO
@bilhete ← você vai soltando anotações, frases, ideias, decisões

QUANDO A TRANSCRIÇÃO ESTÁ DISPONÍVEL
[digite] MODO TRANSCRIÇÃO
→ Bilhete encerra a captura e exibe o bloco de notas final

FORMATAR A TRANSCRIÇÃO
@nexo ← cole a transcrição bruta (Google Meet, Zoom, Teams...)
→ Nexo devolve a transcrição formatada, limpa e estruturada

EXTRAIR INTELIGÊNCIA
@faros ← cole a transcrição formatada
→ Faros gera: action items, decisões, insights, substrates, alertas
```

---

## @bilhete — Captador de Notas

Recebe qualquer tipo de input e classifica automaticamente:

| Categoria | Ícone | Exemplo |
|---|---|---|
| AÇÃO | ✅ | "João vai enviar o contrato até sexta" |
| DECISÃO | 🔑 | "Ficou decidido que vamos com o plano B" |
| INSIGHT | 💡 | "Ideia: produto para o mercado 35+" |
| NOTA | 📌 | "Contexto: cliente está em expansão" |
| CITAÇÃO | 💬 | "Maria disse que o prazo é inegociável" |
| REFERÊNCIA | 📎 | "https://..." |
| NÚMERO | 🔢 | "Crescimento de 40% no trimestre" |

**Trigger especial:** Digitando **MODO TRANSCRIÇÃO**, Bilhete encerra a captura e entrega o bloco organizado.

**Comandos:**
- `*bloco` — ver notas por categoria
- `*cronologico` — ver em ordem de chegada
- `*status` — contagem por categoria
- `*exportar` — documento final

---

## @nexo — Formatador de Transcrição

Pega a transcrição bruta de qualquer ferramenta e entrega um documento limpo.

**O que faz:**
- Corrige ortografia e pontuação (sem alterar conteúdo)
- Identifica e formata falantes
- Organiza em parágrafos coesos
- Mantém timestamps
- Marca trechos ininteligíveis (não inventa)

**O que NÃO faz:** não resume, não interpreta, não omite nada.

**Comandos:**
- `*formatar` — iniciar formatação
- `*saida` — exibir documento completo
- `*stats` — palavras, parágrafos, falantes

---

## @faros — Analista de Inteligência

Lê a transcrição inteira e farejarou apenas o que passa no filtro de relevância.

**O que extrai:**

| Categoria | O que é |
|---|---|
| ✅ Action Items | Tarefas com responsável + prazo (se mencionado) |
| 🔑 Decisões | O que foi decidido + implicação |
| 💡 Insights | Percepções não-óbvias com valor prático |
| 🧱 Substrates | Matéria-prima para conteúdo, produto, copy |
| ⚠️ Alertas | Riscos com janela de urgência |
| 🔢 Números-Chave | Métricas que orientam decisão |

**Filtro:** Cada item passa pelo teste "Isso gera resultado? Alguém precisa agir? Isso cria algo valioso depois?"

**Comandos:**
- `*acoes` `*decisoes` `*insights` `*substrates` — categorias individuais
- `*completo` — relatório completo
- `*resumo-executivo` — 5 linhas do essencial
- `*exportar {categoria|completo}` — gerar documento exportável

---

## Uso independente

Cada agente funciona de forma independente. Você não precisa usar o fluxo completo:

- Só precisa organizar notas rápidas? → `@bilhete` standalone
- Só tem uma transcrição para formatar? → `@nexo` standalone
- Já tem uma transcrição formatada e quer insights? → `@faros` standalone

---

## Estrutura de arquivos

```
squads/reuniao-intel-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── bilhete.md       🎫 Captador
│   ├── nexo.md          📋 Formatador
│   └── faros.md         🔦 Analista
├── tasks/
│   ├── capturar-notas.md
│   ├── formatar-transcricao.md
│   └── extrair-insights.md
├── templates/
│   ├── notas-tmpl.md
│   ├── transcricao-tmpl.md
│   └── insights-tmpl.md
└── outputs/             (gerado durante uso)
```
