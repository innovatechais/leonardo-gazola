# Engenharia Reversa dos Squads AIOS + Agenda de Pesquisa
### Mapa de Assets Necessários para Replicar os Squads dos Criadores

> **Status:** Mapeamento — 2026-02-23
> **Gerado por:** Muse (ideation-to-docs-squad)
> **Fontes:** `docs/aios/ideias-para-copiar.md` · `docs/aios/o-que-e-aios.md`
> **Contexto:** Os squads dos criadores (Alan, Pedro, Thiago) não estão disponíveis prontos. A arquitetura AIOS é a mesma para todos — o que diferencia cada squad é o **combustível**: os dados, documentos e conhecimento que alimentam cada agente.

---

## O Princípio da Engenharia Reversa

A arquitetura AIOS é open source e idêntica para todos. O que cada criador tem de diferente não é o framework — é o **conteúdo que alimenta os agentes**. Portanto, para replicar qualquer squad:

```
Squad dos criadores = Arquitetura AIOS + Assets proprietários deles

Para replicar:
  → Identificar quais assets alimentam cada squad
  → Coletar/criar esses assets com as suas próprias informações
  → Plugar na mesma arquitetura
  → Squad funcional com a sua realidade
```

---

## Mapa de Engenharia Reversa — Squads Prioritários

### 🔥 Squad 1: CopyChief Squad (Alta Prioridade)
*Baseado no Squad de Copywriters do Alan Nicolas*

**O que o squad faz:**
Gera copy completa para qualquer formato (anúncio, landing page, email, VSL, script) usando o estilo dos maiores copywriters da história, orquestrados por um agente-chefe.

**Como funciona a arquitetura:**
```
ICP Document → CopyChief (analisa + decide copywriter)
→ Copywriter especialista (Gary Halbert, Dan Kennedy, etc.)
→ Checklist de triggers (Sugerman)
→ Revisão de bullet proofs
→ Mecanismo único (Todd Brown)
→ Output final
```

**Assets necessários para montar a SUA versão:**

| Asset | O que é | Como obter |
|---|---|---|
| **ICP Document (40+ páginas)** | Perfil completo do cliente ideal: quem é, o que sente, o que quer, o que teme, vocabulário, objeções, desejos | Entrevistas com clientes, reviews, pesquisa de mercado → isso é o Nível 0 da SCA |
| **Swipe files do seu nicho** | Exemplos de copy que funcionou no seu mercado — anúncios, páginas, emails de referência | Coletar manualmente dos concorrentes e referências |
| **Frameworks dos copywriters** | Os modelos mentais de cada copywriter extraídos dos livros/cursos | ETL dos livros e cursos dos copywriters relevantes |
| **Contexto do seu produto/oferta** | O que você vende, para quem, por quanto, qual o mecanismo único | Sales Intelligence Library (Nível 0 da SCA) |
| **Checklists de qualidade** | Critérios para avaliar se uma copy está boa | Criar baseado nos frameworks dos copywriters escolhidos |

**Copywriters mais relevantes para o seu nicho:**
*(A definir após pesquisa — ver Agenda de Pesquisa abaixo)*

---

### 🔥 Squad 2: Squad Comercial (Alta Prioridade)
*Baseado no Squad Comercial do Thiago Finchi (Vera, Scott, Closer, CFO, CRO, Conselho)*

**O que o squad faz:**
Opera toda a máquina comercial: monitora pipeline, analisa tráfego, orienta closers em tempo real, monitora financeiro, toma decisões estratégicas em situações de crise.

**Como funciona a arquitetura:**
```
AIOS Master aciona squad →
  CMO (Vera) orquestra →
  Media Buyer (Scott) analisa tráfego →
  Closer orienta vendedor em tempo real →
  CFO monitora CAC/LTV →
  CRO sugere otimizações →
  Conselho decide estratégia
```

**Assets necessários para montar a SUA versão:**

| Asset | O que é | Como obter |
|---|---|---|
| **Dados do pipeline/CRM** | Número de leads, conversão por etapa, tempo de ciclo | Conectar CRM via MCP |
| **Benchmarks do seu negócio** | CAC aceitável, LTV médio, ROAS mínimo, ticket médio | Extrair do histórico de vendas |
| **Frameworks de vendas** | Scripts, metodologias, objeções e respostas para o seu mercado | Pesquisa + cursos do seu nicho |
| **Framework do Closer** | Metodologia de fechamento (Hormozi, ou outro) adaptada para a sua oferta | ETL do conteúdo relevante |
| **Contexto financeiro** | Metas, custos fixos, margens, projeções | Documentar internamente |
| **Regras de decisão** | Quando cortar uma campanha, quando escalar, quando mudar a oferta | Definir com base na sua experiência e nos frameworks absorvidos |

---

### Squad 3: Sistema de Conhecimento Absorvido
*Baseado no Sistema de Conhecimento do Thiago Finchi (2.000+ horas de especialistas)*

**O que o squad faz:**
Disponibiliza o conhecimento dos maiores especialistas do mundo para todos os agentes do sistema. Ao invés de respostas genéricas da IA, cada agente responde com o que um especialista específico responderia.

**Assets necessários:**

| Asset | O que é | Como obter |
|---|---|---|
| **Lista de especialistas do seu nicho** | Os 5-10 maiores nomes que você quer absorver | *Ver Agenda de Pesquisa* |
| **Conteúdo público dos especialistas** | YouTube, podcasts, livros, cursos | ETL por especialista |
| **Frameworks extraídos** | Modelos mentais, regras de decisão, vocabulário, heurísticas de cada especialista | Processamento via IA após ETL |
| **Estrutura de conhecimento** | Como organizar o conhecimento por tema para ser acessado pelos agentes | Definir taxonomia |

---

### Squad 4: Clone de Especialista
*Baseado no Sistema de Clonagem do Alan Nicolas*

**O que é:**
Agente que pensa e decide como uma pessoa específica. Pode ser um copywriter, um estrategista, um especialista da área, ou o próprio dono do negócio.

**Processo para criar:**
```
1. Definir quem → qual especialista resolve qual problema
2. Coletar conteúdo → YouTube, Instagram, livros, cursos
3. ETL → extrair frameworks, vocabulário, estilo de decisão
4. Estruturar → arquivos de conhecimento por categoria
5. Testar → comparar output com o estilo real da pessoa
6. Ajustar → calibrar até ficar coerente
```

**Clones prioritários para o seu caso:**
*(A definir após pesquisa — ver Agenda de Pesquisa abaixo)*

---

### Squad 5: Fluxo Ideia → Produto → Lançamento
*Baseado no fluxo da live dos criadores*

**O que faz:**
Pega uma ideia descrita em texto livre e produz um documento de produto completo (landing page, dobras de copy, onboarding), distribuindo tasks para os agentes executarem.

**Assets necessários:**

| Asset | O que é | Como obter |
|---|---|---|
| **Contexto da empresa** | O que a empresa é, qual o posicionamento, qual o histórico | Sales Intelligence Library (Nível 0 da SCA) |
| **Templates de produto** | Estrutura padrão de uma landing page, de um lançamento, de um funil | Pesquisa + frameworks do nicho |
| **Critérios de qualidade** | O que define uma boa página, um bom funil, uma boa oferta | Baseado nos frameworks de copywriting e conversão |

---

## Conexão com a Sales Content Architecture (SCA)

Os squads acima e a SCA não são coisas separadas — **eles são a mesma coisa em camadas diferentes:**

```
SCA Nível 0 — Sales Intelligence Library
  = o combustível de TODOS os squads acima
  = ICP Document + oferta + dores + objeções + diferenciais + contexto do produto

SCA Nível 1 — Modular Messaging Blocks
  = o que o CopyChief Squad produz como blocos reutilizáveis
  = copy organizada por formato, comprimento e contexto

SCA Nível 2 — Outputs Montados
  = o que o Squad Comercial, o Clone, e o Fluxo Ideia→Produto montam
  = landing page, deck, script, anúncio, email sequence
```

**Conclusão prática:** construir o Nível 0 da SCA (Sales Intelligence Library) é a primeira tarefa — ela alimenta todos os squads ao mesmo tempo.

---

## Agenda de Pesquisa — O Que Precisa Ser Pesquisado

Esta seção é um **lembrete de pesquisas futuras** que precisam ser feitas para alimentar os squads acima. Os agentes do AIOS farão esse mapeamento — está documentado aqui para não se perder.

---

### 📌 Pesquisa 1: Copywriters Relevantes para o Nicho

**Objetivo:** Identificar quais copywriters/especialistas de copy têm o estilo e os frameworks mais aplicáveis ao nicho específico.

**Perguntas a responder:**
- Quais copywriters têm histórico de sucesso no meu nicho?
- Quais estilos de copy funcionam melhor com o perfil do meu público?
- Quais frameworks de headline, oferta, mecanismo único e urgência são mais eficazes?

**Fontes para pesquisar:**
- Biblioteca pessoal no Obsidian (Leonardo tem materiais próprios)
- Swipe files de campanhas que funcionaram no nicho
- Transcrições de cursos/aulas guardadas

**Output esperado:** Lista dos 5-10 copywriters/frameworks prioritários para o CopyChief Squad

---

### 📌 Pesquisa 2: Modelos de Venda para o Nicho

**Objetivo:** Mapear os modelos, frameworks e metodologias de vendas mais eficazes para o mercado específico.

**O que mapear:**
- Frameworks de landing page que funcionam (ex: o que o mentor ensinou — já existe transcrição guardada)
- Modelos de apresentação de alto impacto (slides, VSL, webinário)
- Frameworks de proposta e fechamento
- Estruturas de funil comprovadas no nicho

**Fontes para pesquisar:**
- Scripts de landing page já salvos no Obsidian
- Transcrições de aulas de mentores guardadas
- Referências de páginas e funis de sucesso no nicho
- Frameworks públicos (DotCom Secrets, Expert Secrets, etc.)

**Output esperado:** Biblioteca de frameworks de venda para alimentar o Squad Comercial e o Fluxo Ideia→Lançamento

---

### 📌 Pesquisa 3: Especialistas para Clonar

**Objetivo:** Identificar quais mentes precisam estar no sistema — como clones ou como base de conhecimento absorvido.

**Categorias de especialistas a mapear:**
- Copy e persuasão (para o CopyChief Squad)
- Vendas e fechamento (para o Squad Comercial)
- Estratégia de negócio e marketing (para o Conselho)
- Especialistas específicos do nicho

**Para cada especialista identificado:**
- Qual problema ele resolve melhor?
- Qual conteúdo público existe (YouTube, podcast, livro)?
- Quanto conteúdo há disponível para ETL?

**Output esperado:** Lista de 10-15 especialistas com prioridade de clonagem e fontes de ETL mapeadas

---

### 📌 Pesquisa 4: Assets do Obsidian para Aproveitar

**Objetivo:** Inventariar o que já existe salvo no Obsidian e que pode alimentar os squads diretamente.

**O que procurar:**
- Scripts e frameworks de landing page guardados
- Transcrições de aulas e cursos de mentores
- Swipe files de copy coletados
- Materiais de formação e treinamento
- Pesquisas e referências de mercado

**Output esperado:** Inventário do material existente, mapeado por onde encaixa na SCA (Nível 0, 1 ou 2)

---

## Nota Final — Por Que os Squads Precisam de Mim

> "A IA amplifica o que você coloca nela. Amplificar bosta continua sendo bosta. Precisa de processo e repertório." — Pedro Valério

Os squads AIOS não funcionam sem combustível proprietário. A diferença entre um CopyChief genérico e um CopyChief de $300M em vendas está nos frameworks alimentados, nos swipe files do nicho, no ICP detalhado, no conhecimento absorvido.

**A sequência correta:**

```
1. Construir o Nível 0 da SCA (Sales Intelligence Library)
   → isso alimenta TODOS os squads ao mesmo tempo

2. Fazer as pesquisas mapeadas acima
   → copywriters do nicho, modelos de venda, especialistas para clonar

3. Inventariar o Obsidian
   → aproveitar o que já existe em vez de criar do zero

4. Montar o CopyChief Squad primeiro
   → maior alavancagem para qualquer coisa comercial

5. Montar o Squad Comercial
   → operar a máquina de vendas com inteligência

6. Expandir incrementalmente
   → um squad por vez, validando antes de avançar
```

---

> *Documento gerado por Muse (ideation-to-docs-squad) — Synkra AIOS*
> *Sessão: sca-ideation-2026-02-23*
