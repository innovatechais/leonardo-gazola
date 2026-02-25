# Ideias para Copiar dos Criadores do AIOS

**Fonte:** Live Alan Nicolas, Pedro Valério e Thiago Finchi (inovatec-2026-02-17)
**Criado em:** 2026-02-18

> Este documento mapeia tudo que os criadores do AIOS usam nas próprias empresas — squads, agentes, clones, fluxos e automações — que vale replicar.

---

## 1. Squads de Alan Nicolas

Alan é ex-designer, ex-desenvolvedor, criador de conteúdo e professor. Seus squads são voltados para criação, marketing e produção de conteúdo.

### 1.1 Squad de Copywriters (🔥 Alta prioridade)

**O que é:** Squad com os maiores copywriters da história, cada um com DNA extraído de livros, cursos e materiais pagos.

**Agentes incluídos:**
- Ben Settle (e-mail marketing)
- Gary Halbert (copy emocional, storytelling)
- Frank Kern (copy de alto ticket, cohort)
- Stefan George
- Jim Roots
- Todd Brown (mecanismo único, urgência)
- Claude Hopkins (fundamentos de copy)
- David Ogilvy (copy sofisticada, B2B)
- Clayton Makepeace (bullet proofs, copy de resposta direta)
- John Carlton (copy agressiva, vendas diretas)
- Andre Chaperon (e-mail soap opera)
- Gary Bencivenga (copywriting científico)
- **Ry Schwartz** (especialista em cohorts — +$300M vendidos)
- Dan Kennedy (urgência, No BS)

**Como funciona:**
- `CopyChief` — agente-chefe que conhece todos os outros e decide quem chamar para cada tarefa
- Tasks compartilhadas: criar ad (Meta Feed, Stories, Google Search, Display, YouTube, TikTok, LinkedIn)
- Cada copywriter tem: swipe files, frameworks, checklists de qualidade, tom de voz documentado
- ICP de 40+ páginas alimenta o contexto antes de qualquer geração

**Workflow de copy:**
```
ICP (documento) → CopyChief (analisa) → copywriter especialista (draft) 
→ checklist de triggers (Sugerman) → revisão de bullet proofs (Gary Halbert)
→ mecanismo único (Todd Brown) → output final
```

**Como criar um clone de copywriter:**
1. Extrair conteúdo público (livros, cursos, swipe files, blog)
2. ETL: organizar em frameworks, estilo, vocabulário
3. Definir tasks que aquele copywriter faz melhor
4. Criar checklists com critérios de qualidade do estilo dele

**Custo estimado de criação:** ~$5.000 em tokens de API (para extrair e treinar todos os copywriters)

---

### 1.2 Squad de Web Design / Design System

**O que é:** Agente clonado do Brad Frost (criador do Atomic Design), especializado em criar interfaces e design systems.

**Agentes:**
- `Brad` — UX/UI design, criação de páginas, design system
- Design System tokens (cores, tipografia, espaçamentos, ícones, componentes)

**O que cria em minutos:**
- Landing pages completas (online, com infraestrutura)
- Páginas que parecem feitas por designer de R$15-20k/mês
- Interfaces web a partir de descrição em linguagem natural

**Exemplo real da live:**
> "Meu primo é músico. Eu quero que o site pareça que está dançando."
> → Página criada em 15 minutos, publicada, com animações.

**Como criar:**
1. Definir o design system do seu projeto (cores, fonte, espaçamentos, componentes)
2. Usar o agente `@ux-design-expert` (Uma) como base
3. Alimentar com seu design system como contexto permanente
4. O agente reutiliza os tokens em cada nova página — mantém consistência

---

### 1.3 Squad de Transcrição → Conteúdo → Página

**O que é:** Fluxo automático que pega qualquer live/aula e transforma em página publicada.

**Fluxo:**
```
Live gravada
  → Whisper (transcrição local, sem custo)
    → Copywriters (reescrevem, ajustam blocos)
      → Designer (formata, monta layout)
        → Dev (testa)
          → DevOps (deploy automático)
            → Página online publicada
```

**Custo:** ~$3 de API por página

**Resultado:** Página de resumo de live com design profissional, publicada automaticamente após cada live.

**Como implementar:**
1. Instalar Whisper localmente
2. Criar task "transcrever" → input: arquivo de áudio/vídeo, output: `.txt` com timestamps
3. Criar task "resumir e formatar" → copywriter reescreve por blocos
4. Criar task "criar página" → designer monta com design system
5. Criar task "deploy" → DevOps publica via Vercel/Netlify

**Hack de velocidade de transcrição:** Aumentar velocidade do áudio para 2x antes de transcrever → 3x mais qualidade no resultado do Whisper.

---

### 1.4 Sistema de Clonagem de Pessoas

**O que é:** Processo para criar um clone de qualquer pessoa pública a partir do conteúdo dela.

**Como funciona:**
1. Ingestão de dados (ETL): YouTube, Instagram, podcasts, cursos pagos, livros
2. IA extrai o "DNA" da pessoa: modelos mentais, heurísticas de decisão, tom de voz, vocabulário, histórias recorrentes, crenças, frameworks
3. Tudo documentado em arquivos de conhecimento dentro do agente
4. Clone funcional: pensa e decide como a pessoa

**Exemplos de clones que Alan criou:**
- Clone do Thiago Finchi (estilo, voz, estratégia de marketing)
- Clone do Pedro Valério (processos, arquitetura de sistemas)
- 24 copywriters históricos
- Clone de Gary Halbert específico para headlines
- Clone de Ry Schwartz específico para cohorts

**Para criar um clone:**
```
1. Definir quem → qual especialista resolve qual problema
2. Coletar conteúdo → YouTube, Instagram, livros, cursos
3. ETL → extrair frameworks, vocabulário, estilo de decisão
4. Estruturar → arquivos de conhecimento por categoria
5. Testar → comparar output com o estilo real da pessoa
6. Ajustar → calibrar até ficar coerente
```

---

### 1.5 Arena de Debate entre Clones

**O que é:** Interface onde você seleciona 2+ clones para debaterem um tema, cada um com seu framework cognitivo.

**Como usar:**
- Selecionar 2-3 especialistas (ex: Pedro Valério + Jesus + Naval Ravikant)
- Definir o tema de debate
- Definir o framework de interação (como eles trocam argumentos)
- Assistir o debate com as visões cruzadas de cada um

**Para que serve:**
- Validar uma ideia sob múltiplas perspectivas filosóficas/estratégicas
- Tomar decisões difíceis ouvindo "a melhor versão" de cada especialista
- Estudar como diferentes frameworks abordam o mesmo problema

---

### 1.6 Jarvis Pessoal (Sistema de Comando por Voz/Texto)

**O que é:** Assistente conectado a todos os agentes, que executa comandos em tempo real durante calls, lives e o dia a dia.

**Como funciona:**
- Durante lives ou calls, Alan usa `@alannicholas` como gatilho de comando
- A IA monitora a transcrição em tempo real
- Quando detecta o gatilho + um comando, aciona o agente correto automaticamente
- Ex: "[@alannicholas] criar uma landing page para Jonas com tema musical" → agente de design executa

**Capacidades:**
- Acessa todos os agentes e squads
- Lê contexto de todo o sistema (calendário, CRM, planilhas)
- Toma decisões operacionais baseadas no perfil e preferências do dono
- Sugere proativamente próximas ações

**Stack técnica:**
- Claude Code como base
- Whisper para transcrição em tempo real
- MCPs para conexão com ferramentas externas

---

### 1.7 Resumidor de Livros Pessoal

**O que é:** App próprio que cria resumos estruturados de livros com extração de frameworks e prompts.

**Funcionalidades:**
- Modo sépia, white paper, dark mode
- Extração de todos os frameworks do livro
- Geração de prompts baseados nos frameworks
- Uso dos livros como base de conhecimento para outros squads

**Como criar:** Tarefa de 2 dias — 1 dia para o frontend, 1 dia para o sistema de ingestão de livros.

---

## 2. Squads de Pedro Valério

Pedro é CEO de agência de performance criativa. Seus squads são voltados para operação, qualidade e escala com times humanos.

### 2.1 Sistema de Gestão de Projetos com IA

**O que é:** Integração entre agentes e ClickUp para que toda a gestão de projetos aconteça automaticamente.

**O que é automatizado:**
- Criação de tasks no backlog por voz (áudio no WhatsApp → task no ClickUp)
- Placeholders de criativos criados automaticamente ao iniciar um projeto
- Estrutura de pastas gerada (material bruto, edição, aprovado)
- Notificações automáticas entre membros do time
- E-mails integrados ao projeto
- Notas fiscais vinculadas automaticamente

**Agente principal:** `Wall` (COO da Allfluence) — conhece toda a empresa, agenda, prioridades e cria tasks enquanto Pedro trabalha ou dorme.

**Como criar:**
1. Conectar ClickUp via API como MCP
2. Criar agente com acesso ao ClickUp
3. Definir tasks de gestão: criar projeto, criar placeholders, criar backlog, notificar time
4. Treinar o agente com os padrões de nomenclatura da empresa

---

### 2.2 Journey Log + Dashboard de Self-Learning

**O que é:** Registro automático do histórico de cada task, usado para análise de desempenho e melhoria contínua.

**O que registra:**
- Quem fez cada mudança de status
- Quantas vezes a task voltou para revisão
- Por qual motivo voltou (cliente, qualidade interna, etc.)
- Tempo entre cada etapa

**O que gera:**
- Dashboard de saúde visual (verde = mudança de status, amarelo = atenção)
- Resumo automático ao final de cada projeto: "50% das tasks que voltaram foi por legenda"
- Identificação de gargalos por processo, por cliente, por tipo de criativo

**Como criar:**
1. Criar campo `journey_log` em cada task do ClickUp
2. Criar agente que registra automaticamente cada mudança de status
3. Criar agente analista que processa logs e gera dashboard
4. Usar Gemini para análise de padrões nos logs

---

### 2.3 Squad de Criação de Criativos com IA

**Fluxo completo:**
```
Briefing
  → Análise de briefing (agente)
    → Benchmarking criativo (agente de pesquisa)
      → Geração de conceito (agente criativo)
        → Aprovação interna (quality gate)
          → Entrega ao cliente (portal)
            → Aprovação do cliente
              → Geração de legenda (Gemini + Grok)
                → Postagem via Playwright (sem API, sem ban)
```

**Automação de legendas:**
- Input: vídeo aprovado + regras de legenda do cliente
- Processo: Gemini analisa o vídeo → extrai contexto → Grok gera legenda específica
- Output: legenda pronta, específica para aquele vídeo, no formato do cliente
- Resultado: eliminou 6 gaps de comunicação no processo anterior

**Automação de analytics:**
- FFmpeg extrai prints dos criativos
- IA lê as métricas dos prints (views, comments, engagement)
- Normaliza dados de Instagram e TikTok em nomenclatura única
- Gera dashboard consolidado automaticamente

---

### 2.4 Squad de Mapeamento de Processos (OpsMapper)

**O que é:** Agente que mapeia automaticamente processos da empresa e os transforma em documentação e tasks no ClickUp.

**Fluxo:**
```
Descrição verbal do processo
  → Discovery process (agente arquiteto)
    → Create process (agente de criação)
      → Arquitetura documentada
        → Implementação no ClickUp
```

**Resultado:** Processo mapeado, documentado, com tasks claras para cada etapa, pronto para ser executado por humanos ou agentes.

---

## 3. Squads de Thiago Finchi

Thiago é especialista em marketing, vendas e negócios de alto ticket. Seus squads são voltados para operação comercial e tomada de decisão estratégica.

### 3.1 Squad Comercial Completo (🔥 Alta prioridade)

**Agentes:**
| Agente | Papel |
|--------|-------|
| **Vera (CMO)** | Orquestra todo o time de vendas. Monitora pipeline, CRM, todos os canais. Delega e cobra os demais agentes. |
| **Scott (Media Buyer)** | Gestão de tráfego pago. Analisa connect rate, custo de lead, performance. Conectado ao Meta via MCP. |
| **Ad Midas** | Especialista em performance de anúncios. Corrige problemas de CPL. |
| **Pixel Agent** | Monitora pixel, eventos de conversão, qualidade do tracking. |
| **BDR** | Outbound. Prospecta listas, faz primeiro contato. |
| **Closer** | Guiado por frameworks do melhor closer do Alex Hormozi. Orienta o closer humano em tempo real. |
| **CFO** | Monitora métricas financeiras, CAC, LTV, caixa. Conectado às planilhas via MCP. |
| **CRO** | Marketing e conversão. Monitora funil completo. Conectado à plataforma de vendas. |
| **Conselho** | Board estratégico com as melhores mentes absorvidas. Toma decisões de alto nível. |

**Workflow de crise (exemplo real da live):**
```
Problema: campanha com ROAS de 0.96, queimando R$18k/dia

AIOS Master aciona squad → 
  Scott analisa CPL (3x acima do benchmark) →
  Ad Midas identifica desalinhamento promessa vs. criativo →
  Closer: 32 leads, 16 com objeção de formato (não preço) →
  CFO: CAC de R$62k, situação crítica →
  CRO: propõe webinário para aquecimento →
  Conselho sintetiza →
  Veredito: "não matar a campanha, problema é oferta, não tráfego"
```

**Resultado:** Decisão em minutos, com profundidade de um board executivo completo.

---

### 3.2 Sistema de Conhecimento Absorvido

**O que é:** Biblioteca de conhecimento de 12+ especialistas mundiais de marketing e vendas, absorvida e disponível para todos os agentes.

**Conteúdo absorvido:** Mais de 2.000 horas de conteúdo pago (~$500k investidos), incluindo:
- Frameworks de oferta (Alex Hormozi)
- Estratégia de growth (Peter Thiel)
- Gestão financeira (CFO frameworks)
- Funis de venda
- Gestão de tráfego avançada

**Como os agentes usam:**
- Ao tomar uma decisão, o agente acessa o conhecimento relevante para aquele tema
- Ele não responde com o ChatGPT genérico — ele responde com o que um especialista específico responderia
- Ex: pergunta sobre CAC → CFO usa o framework do melhor CFO que Thiago absorveu

**Para criar:**
1. Listar os 5-10 maiores especialistas da sua área
2. Coletar todo conteúdo público (YouTube, podcasts, livros, cursos)
3. ETL: extrair frameworks, princípios, regras de decisão
4. Estruturar como base de conhecimento por tema
5. Conectar aos agentes relevantes via sistema de memória

---

## 4. Fluxos Específicos para Copiar

### 4.1 Fluxo: Ideia → Produto → Lançamento

```
Ideia (texto livre)
  → AIOS Master analisa contexto da empresa
    → Gera documento de produto (landing pages, dobras, copy, onboarding)
      → Distribui tasks: design, copy, infra, vendas
        → Agentes executam 95% das tasks
          → Humano revisa e aprova
```

### 4.2 Fluxo: Live → Conteúdo → Distribuição

```
Live gravada
  → Whisper transcreve (local, gratuito)
    → Transcrição em 2x → 3x mais qualidade
      → Timestamps marcados por assunto
        → Copywriter reescreve em blocos
          → Designer cria página
            → DevOps publica
              → Criadores de carrossel geram posts
                → Playwright posta (sem API, sem ban)
```

### 4.3 Fluxo: Call com Cliente → Projeto Estruturado

```
Gravação da call
  → Transcrição (Whisper)
    → Extração de insights, necessidades, expectativas
      → Criação de briefing estruturado
        → Criação de projeto no ClickUp
          → Tasks distribuídas aos agentes
            → Placeholders criados
              → Time notificado
```

### 4.4 Fluxo: Clone de Especialista

```
Identificar especialista
  → Coletar todo conteúdo público (YouTube + Instagram + podcasts + livros)
    → ETL: processar, estruturar, extrair frameworks
      → Criar arquivos de conhecimento (estilos, heurísticas, vocabulário, casos)
        → Criar agente com acesso aos arquivos
          → Testar com cenários reais
            → Calibrar até ficar coerente com a pessoa
```

### 4.5 Fluxo: Análise de Sentimento de Audiência em Tempo Real

```
Live ao vivo
  → MCP Playwright abre a página da live
    → Agente lê comentários em tempo real
      → Análise de sentimento (% empolgados, % com objeção)
        → Categoriza objeções (técnica, preço, confiança, etc.)
          → Relatório em tempo real para o apresentador
            → Agentes respondem comentários com a voz do apresentador
```

---

## 5. Hacks Técnicos Extraídos da Live

| Hack | Como fazer |
|------|-----------|
| **Transcrição gratuita** | Whisper instalado localmente — sem custo de API, sem limites |
| **2x = 3x qualidade** | Acelerar áudio para 2x antes de transcrever aumenta 3x a qualidade do Whisper |
| **Postagem sem ban** | Usar Playwright (browser automation) em vez de API para postar em redes sociais — parece humano, não leva ban nem penalização de alcance |
| **Economizar 95% do Claude Code** | Usar Supabase + DBSage para roteamento inteligente de contexto |
| **Escalar sem contratar** | Um squad de 3 agentes (designer + dev + devops) substitui uma equipe de 5 pessoas |
| **Quality Gate** | Definir threshold de aprovação em cada task — output abaixo do threshold não avança |
| **Prompt Injection com arroba** | Usar `@seunome` durante lives/calls como gatilho — a IA executa comandos embutidos na conversa |
| **ETL de concorrente** | Capturar o sistema de qualquer software (login + tela) e criar PRD completo via agente — base para recriar qualquer produto |

---

## 6. Lista de Agentes Prioritários para Criar

Ordenados por impacto estimado:

1. **CopyChief Squad** — maior alavancagem para qualquer negócio que precisa de copy
2. **Gerenciador de Projetos com ClickUp** — automatiza gestão operacional
3. **Clone do especialista da sua área** — absorver as melhores mentes relevantes para você
4. **Squad Comercial (BDR + Closer + CFO + CMO)** — operação de vendas automatizada
5. **Fluxo Live → Página** — reutilizar cada conteúdo criado como página publicada
6. **Journey Log + Dashboard** — self-learning automático do processo
7. **Gerenciador de Inbox (e-mail + WhatsApp)** — triagem automática, zero backlog
8. **Análise de Sentimento de Audiência** — feedback em tempo real durante lives
9. **Design System Agent** — consistência visual em todos os projetos
10. **Clone pessoal (você mesmo)** — escalar sua própria forma de pensar e decidir

---

## 7. Reflexões dos Criadores (Para Guiar Implementação)

> "Comecei com um squad e uma tarefa. Quando você domina uma coisa, a próxima necessidade de muito valor surge na sua frente." — Pedro Valério

> "Não tente automatizar tudo de uma vez. Valide uma task. Passe para a próxima." — Pedro Valério

> "A maioria das tasks que te deixam cansado são determinísticas. Não precisam de IA cara, precisam de um script." — Pedro Valério

> "A IA amplifica o que você coloca nela. Amplificar bosta continua sendo bosta. Precisa de processo e repertório." — Pedro Valério

> "Eu uso IA para diminuir o número de cliques que um colaborador dá durante o trabalho dele." — Pedro Valério

> "O que o Pedro fez foi entender: ao invés de tentar substituir uma pessoa inteira, substitua os handoffs entre as pessoas." — Thiago Finchi

> "Você não vai mais falar com a IA como fala no ChatGPT. Você vai ter agentes que tomam decisões operacionais e vão lá fazer." — Thiago Finchi

> "Por que você não pega aquela mente inteira decupada e coloca em cima de um agente para ele construir o seu sistema de gestão?" — Thiago Finchi

> "Se tu não entende de processo, tu pode ser o pica da IA. Não vai funcionar. Quem não fatura bem, não tem processo." — Alan Nicolas
