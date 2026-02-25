# O que é o AIOS — Documentação Completa

**Fonte:** Live dos criadores — Alan Nicolas, Pedro Valério e Thiago Finchi (inovatec-2026-02-17)
**Criado em:** 2026-02-18

---

## 1. O que é o AIOS

**AIOS** (AI Operating System) é um framework open source que define como trabalhar com agentes de IA de forma estruturada, incremental e com padrão de qualidade humano. Também chamado de EOS, AOS ou iOS ao longo da live.

> "O AIOS são os cabrestos para a IA. Ele tira todos os infinitos caminhos possíveis que a IA pode tomar e deixa apenas o único caminho melhor, que já foi validado." — Pedro Valério

**O que ele resolve:** O problema central não é a IA em si — é que sem estrutura, a IA produz uma bagunça: documentos duplicados, contextos corrompidos, código que quebra a cada nova feature, outputs sem consistência. O AIOS é a arquitetura que resolve isso.

**Onde fica:** Claude Code (ferramenta da Anthropic), rodando no seu computador. Open source no GitHub. Gratuito.

**Quem criou:** Pedro Valério (CEO da Allfluence — maior agência de TikTok da América Latina), com colaboração de Alan Nicolas e depois Thiago Finchi.

---

## 2. O Princípio Central: Task-First

O insight que diferencia o AIOS de qualquer outra abordagem com IA:

> "Todo trabalho, sempre, é executado em tasks. Não existe nada além da task. A task é a unidade atômica. O que você muda é o executor."

### O que é uma Task

Uma task é a unidade mínima de trabalho. Ela obrigatoriamente tem:

| Campo | Descrição |
|-------|-----------|
| **Descrição** | O que precisa ser feito, com clareza |
| **Input** | O que entra (dados, documentos, parâmetros) |
| **Output** | O que sai (formato e conteúdo esperado) |
| **Pré-condições** | O que precisa estar pronto antes |
| **Checklist de qualidade** | Critérios para saber se está bom |
| **Executor** | Quem executa (humano, agente, clone ou worker) |
| **Critérios de aceitação** | O que define APROVADO vs REPROVADO |

### Os 4 Tipos de Executor

```
TASK
 │
 ├─ Requer criatividade/subjetividade?
 │   │
 │   └─ NÃO → Worker (script determinístico)
 │               └─ Precisa de API? → Worker com API / só script
 │
 └─ SIM → Requer julgamento humano?
           │
           └─ NÃO → Existe metodologia validada?
           │         ├─ SIM → Clone (mente de especialista)
           │         └─ NÃO → Agente genérico
           │
           └─ SIM → É decisão crítica (financeira, jurídica, estratégica)?
                     ├─ SIM → Humano (com responsabilização)
                     └─ NÃO → Clone ou Agente genérico
```

**80%+ das tarefas do dia a dia são determinísticas** — não precisam de IA sofisticada, só de um script que execute sempre igual. Isso era o que estava inacessível para não-programadores. O AIOS muda isso.

---

## 3. Os 4 Componentes do Sistema

### 3.1 Workers (Scripts Determinísticos)
Código que executa a mesma tarefa sempre, sem variação. Ex: mover arquivo, renomear pasta, buscar dados de API, gerar relatório. Antes exigia programador. Agora qualquer um cria via Claude Code.

### 3.2 Agentes
IA com system prompt + tasks + checklists + ferramentas. Cada agente tem:
- Uma persona definida (nome, papel, princípios)
- Um conjunto de tasks que sabe executar
- Ferramentas (MCPs) que pode usar
- Quality gates que impedem output ruim de passar

### 3.3 Clones
Agentes treinados na mente de uma pessoa específica. Para criar um clone:
1. **Ingestão de dados (ETL):** YouTube, Instagram, podcasts, cursos, livros da pessoa
2. **Processamento:** IA extrai DNA cognitivo (modelos mentais, heurísticas, frameworks, tom de voz)
3. **Estruturação:** Dados organizados em arquivos de conhecimento dentro do agente
4. **Resultado:** Agente que pensa e decide como aquela pessoa

### 3.4 Squads
Times de agentes trabalhando juntos. Um squad tem:
- **Agentes** com papéis definidos
- **Tasks** compartilhadas entre agentes
- **Workflows** de orquestração (quem chama quem, em que ordem)
- **Templates** reutilizáveis
- **Checklists** de qualidade
- **Dados** (base de conhecimento)

---

## 4. Conceitos Técnicos Fundamentais

### 4.1 Desenvolvimento Incremental
O AIOS é construído para crescer em camadas. Você não recomeça do zero — você valida uma task, passa para a próxima, valida, passa. A IA mantém registro de tudo que já existe e reutiliza em vez de criar do zero.

> "A cada ciclo de desenvolvimento no Lovable, adicionar uma nova feature é impossível de dar certo. O AIOS resolve isso com cabrestos: arquitetura que não deixa ir pelo caminho errado."

### 4.2 Sinapse
Sistema de gestão de prompt injection para manter contexto saudável. Resolve o principal problema de projetos longos com IA: o **doc rot** (podridão do contexto), onde o histórico acumulado começa a contaminar as respostas. Sinapse gerencia quais memórias entram em qual momento.

### 4.3 MCPs (Model Context Protocols)
Conexões do agente com ferramentas externas. Exemplos usados pelos criadores:
- `Playwright` — controla o browser (scraping, postagem em redes sociais sem ban)
- `ClickUp API` — gestão de projetos e tarefas
- `Meta API` — dados de performance de anúncios
- `Supabase` — banco de dados
- `GitHub` — repositório de código

### 4.4 ETL (Extract, Transform, Load)
Infraestrutura para ingerir dados de diversas fontes, tratar e organizar para consumo dos agentes. Essencial para criar clones e dashboards de dados.

### 4.5 LLM Router
Sistema que roteia chamadas de API para o modelo certo, dependendo da task. Exemplo: task de análise de imagem vai para Gemini, task de geração de copy vai para Claude Opus, task simples vai para modelo barato.

### 4.6 Journey Log
Registro automático de tudo que acontece em cada task: quem fez o quê, quando, quantas vezes voltou para revisão, por quê. Permite self-learning: ao final de um projeto, o agente analisa o log e identifica onde o processo falhou.

### 4.7 Quality Gate
Portão de qualidade que impede output abaixo de um threshold de passar para a próxima etapa. Cada task tem seus critérios de aprovação definidos no checklist.

---

## 5. Os 12 Agentes do AIOS Core

Quando você baixa o AIOS, recebe esses 12 agentes prontos:

| Agente | Nome | Papel |
|--------|------|-------|
| `@aios-master` | Orion | Orquestra tudo, cria/modifica componentes do framework |
| `@dev` | Dex | Implementa código, executa stories |
| `@qa` | Quinn | Revisão de qualidade, quality gates |
| `@architect` | Aria | Arquitetura de sistema, stack tecnológico, APIs |
| `@pm` | Morgan | PRDs, estratégia de produto, epics |
| `@po` | Pax | Backlog, priorização, histórias |
| `@sm` | River | Criação de user stories, sprint planning |
| `@analyst` | Atlas | Pesquisa de mercado, brainstorming, project brief |
| `@data-engineer` | Dara | Banco de dados, schemas, migrations, RLS |
| `@ux-design-expert` | Uma | UX research, design system, componentes atômicos |
| `@devops` | Gage | Git push, CI/CD, releases, deploy |
| `@squad-creator` | Craft | Criação e gestão de squads |

---

## 6. Como Usar o AIOS na Prática

### Fluxo Básico de Desenvolvimento

```
1. Ative um agente → ex: @pm
2. Descreva o que precisa → ex: "cria um PRD para X"
3. O agente executa a task → segue processo documentado
4. Quality gate valida → checklist de critérios
5. Se aprovado → passa para próximo agente
6. Se reprovado → retorna para correção
```

### Como Criar um Squad

```
1. Mapeie o processo → quais tasks existem no seu fluxo?
2. Para cada task, defina → input, output, critérios, executor
3. Use a árvore de decisão → humano/agente/clone/worker?
4. Crie os agentes → um por papel (ex: copywriter, designer, revisor)
5. Conecte via workflow → quem chama quem, em que ordem
6. Valide uma task por vez → não tente automatizar tudo de uma vez
7. Adicione a próxima task → incrementalmente
```

### Boas Práticas Extraídas da Live

- **Nunca conversar diretamente com a IA sem documentação.** Alimente com documentos (ICP, PRD, briefing) antes de pedir output.
- **Não começar com a ferramenta final.** Mapeie o processo primeiro, depois automatize.
- **Processo > Output.** Uma boa copy, página ou código começa com o processo certo de geração.
- **Especializar, não generalizar.** Um agente especialista em Gary Halbert > um agente genérico de copy.
- **Usar Playwright em vez de API para redes sociais.** Evita ban e penalização de alcance.
- **Worker para tarefas determinísticas.** Não use LLM cara para coisas que um script resolve igual.
- **Sinapse para projetos longos.** Controla o contexto para não corromper o histórico.

---

## 7. O que é Possível Construir

Exemplos diretos da live (coisas que os criadores construíram):

**Software completo em horas:**
- Área de membros completa (feed, trilhas, certificados com QR code) — 1 madrugada
- Sistema de formulários equivalente ao Tally — 4 horas
- Dashboard de BI com dados de múltiplas fontes — 2-3 horas
- Plataforma de comunidade equivalente ao Circle — 1-2 dias
- Resumidor de livros com modo sépia, dark mode, extração de frameworks — 2 dias
- Funil de vendas completo (landing page + checkout + upsell + CRM + automações) — 18 horas

**Automações de processo:**
- Transcrição de live → resumo → landing page publicada automaticamente
- Meeting transcrito → tasks criadas no ClickUp automaticamente
- Foto de canhoto no WhatsApp → validação por IA → resposta em segundos
- Print de criativo → leitura de métricas → dashboard atualizado
- Vídeo de criativo → extração de keyframes → troca de roupa por IA → volta editado

**Sistemas de copy e conteúdo:**
- Squad com os 20+ maiores copywriters da história, especializado por tarefa
- Clone de qualquer especialista a partir de conteúdo público
- Copy completa (VSL + landing page + email sequence + anúncios + stories) gerada do ICP

---

## 8. Ferramentas e Stack Técnica

| Ferramenta | Para que serve |
|------------|---------------|
| **Claude Code** | Interface principal do AIOS (tela preta) |
| **Anthropic API** | LLM principal (Claude Opus para tarefas complexas) |
| **Open Router** | Roteamento para outros modelos (DeepSeek, etc.) |
| **Whisper** | Transcrição de áudio/vídeo local, sem custo de API |
| **FFmpeg** | Processamento de vídeo (cortes, keyframes, velocidade) |
| **Playwright (MCP)** | Browser automation (scraping, post em redes sociais) |
| **NanoBanana** | Geração/substituição de imagens por IA |
| **Remotion** | Geração de vídeos programaticamente |
| **Gemini** | Análise de vídeo e imagem |
| **Grok** | Geração de legendas e conteúdo |
| **Eleven Labs** | Clonagem de voz |
| **ClickUp** | Gestão de projetos e tarefas |
| **Supabase** | Banco de dados |
| **GitHub** | Repositório do código e dos squads |
| **N8N / Make** | Automações complementares |

---

## 9. Para Agentes de IA: Como Operar no AIOS

> Esta seção é para referência do próprio agente de IA que ler este documento.

Ao trabalhar dentro de um projeto AIOS:

1. **Cada solicitação é uma task.** Identifique input, output esperado e critérios de qualidade antes de começar.
2. **Verifique se a task já existe.** O AIOS usa desenvolvimento incremental — reutilize antes de criar.
3. **Escolha o executor correto.** A maioria das tarefas repetitivas é determinística e deve ser um worker/script.
4. **Mantenha o contexto saudável.** Não acumule informação desnecessária. Limpe o contexto entre tasks não relacionadas.
5. **Quality gate antes de entregar.** Nunca marque uma task como concluída sem validar os critérios de aceitação.
6. **Documente o journey.** Registre o que foi feito, o que voltou para revisão e por quê — isso alimenta o self-learning.
7. **Respeite a hierarquia de agentes.** O AIOS Master orquestra. Especialistas executam. Não misture papéis.
8. **Não invente fora dos artefatos.** Se o PRD, story ou task não menciona, não assuma. Pergunte.

---

## 10. Referências

- **GitHub AIOS:** (link compartilhado na live — verificar atualização)
- **Criadores:** Alan Nicolas, Pedro Valério, Thiago Finchi
- **Empresa de Pedro:** Allfluence (maior agência TikTok da América Latina)
- **AIOS Pro:** versão paga futura com Sinapse, infraestrutura ETL, squads dos criadores, LLM Router próprio
- **Imersão presencial:** Florianópolis, 20 empresários, 2 dias + 90 dias acompanhamento
