# Sales Content Architecture (SCA)
### Pesquisa de Frameworks, Gap Identificado e Opções de Avanço

> **Status:** Mapeamento inicial — 2026-02-23
> **Gerado por:** Muse (ideation-to-docs-squad) com base em pesquisa web profunda
> **Contexto:** Documento gerado a partir de sessão de ideação sobre sistema de documentos em camadas para uso comercial

---

## O Problema

Existe uma necessidade clara de criar um sistema onde documentos primordiais (substratos) alimentam blocos de conteúdo modulares, que por sua vez geram outputs finais (páginas de venda, apresentações, scripts). O objetivo é que qualquer output possa ser montado de forma ágil, contextualizada e coerente, sem reinventar do zero a cada execução.

O foco inicial é comercial. A expansão para operacional e documentação geral da empresa vem depois.

```
Nível 0 — Substratos (documentos primordiais)
  └─ Dados base: oferta, dores, soluções, objeções, diferenciais, proposta de valor

Nível 1 — Blocos
  └─ Derivados dos substratos, modulares e reutilizáveis

Nível 2 — Outputs finais
  └─ Landing pages, apresentações, scripts, emails — montados a partir dos blocos
```

---

## O que Já Existe no Mercado

A pesquisa identificou que o raciocínio descrito não é intuição isolada — ele é validado por frameworks usados em indústrias sérias. Nenhum deles, porém, resolve o problema de ponta a ponta.

---

### 1. Atomic Content Design
**Origem:** Adaptado do Atomic Design de Brad Frost (UI/UX) para marketing de conteúdo.

**Como funciona:**
- Átomos → Moléculas → Organismos → Templates → Páginas
- Conteúdo é decomposto em unidades mínimas e recomposto em outputs maiores

**O que cobre:** Nível 1 → Nível 2 (blocos para outputs)
**O que falta:** Não define de onde vêm os blocos. Não há Nível 0 — a camada de inteligência e pesquisa que alimenta os átomos não existe no framework.

---

### 2. Message House / Messaging Hierarchy
**Origem:** Marketing B2B — estrutura a hierarquia de mensagens de uma empresa.

**Como funciona:**
- Telhado: mensagem guarda-chuva (proposta de valor central)
- Pilares: 3–5 eixos temáticos de suporte
- Fundação: proof points — dados, cases, evidências

**O que cobre:** Parcialmente o Nível 0 e Nível 1
**O que falta:** É um documento único e estático. Não há sistema de derivação de blocos, nem mecanismo para montar outputs a partir dos pilares. Sem rastreabilidade.

---

### 3. Modular Messaging Framework (GrokSpark)
**Origem:** Marketing B2B tech, para times que precisam escalar conteúdo com consistência.

**Como funciona:**
- Camada base: mensagens centrais (empresa, produto, benefícios, personas)
- Blocos: versões em 25, 50 e 100 palavras para diferentes canais
- Outputs: site, emails, ads, decks — montados a partir dos blocos

**O que cobre:** Nível 1 → Nível 2 (o mais operacional encontrado)
**O que falta:** Não define o Nível 0 (inteligência bruta, pesquisa de cliente, objeções reais). Sem rastreabilidade formal entre camadas.

---

### 4. Modular Content Farmacêutico (Pharma MLR)
**Origem:** Setor farmacêutico — necessidade regulatória de rastrear cada afirmação de marketing até uma evidência científica aprovada.

**Como funciona:**
- Claims Library (Nível 0): afirmações aprovadas com referências e evidências
- Módulos (Nível 1): blocos derivados das claims, com regras de combinação
- Assets (Nível 2): materiais finais com rastreabilidade completa

**O que cobre:** Os 3 níveis + rastreabilidade completa
**O que falta:** Processo rígido de compliance regulatório — o oposto da agilidade necessária em vendas. Não contempla pesquisa qualitativa (voz do cliente, entrevistas).

---

### 5. VoC + Ultimate Message Map (Copyhackers)
**Origem:** Metodologia de copywriting de conversão de Joanna Wiebe.

**Como funciona:**
- Pesquisa VoC: entrevistas, reviews, surveys — linguagem real dos clientes
- Ultimate Message Map (UMM): documento central onde a pesquisa é destilada em mensagens testáveis
- Copy: produzido a partir do UMM

**O que cobre:** A distinção entre pesquisa bruta (Nível 0) e mensagens destiladas (Nível 1) — único framework que trata pesquisa como documento separado e anterior ao conteúdo
**O que falta:** O UMM é monolítico, não um sistema de blocos reutilizáveis. Cada projeto começa do zero. Não é uma base de conhecimento organizacional persistente.

---

### 6. Sales Enablement Frameworks (Highspot, Seismic, Mike Kunkle)
**Origem:** Estruturação de material de apoio ao time de vendas.

**Como funciona:**
- Playbooks: processos, scripts, objeções e respostas
- Content Library: repositório de materiais prontos
- Delivery: entrega do conteúdo certo no momento certo do ciclo de venda

**O que cobre:** Organização e entrega de conteúdo (Nível 2)
**O que falta:** Não define como os blocos são criados. Repositório de documentos completos, não sistema de blocos granulares derivados de pesquisa.

---

## Mapa de Cobertura

| Framework | Nível 0 (Substratos) | Nível 1 (Blocos) | Nível 2 (Outputs) | Rastreabilidade |
|---|:---:|:---:|:---:|:---:|
| Atomic Content | ❌ | ✅ | ✅ | ❌ |
| Message House | 🔶 parcial | 🔶 parcial | ❌ | ❌ |
| Modular Messaging (GrokSpark) | ❌ | ✅ | ✅ | ❌ |
| **Pharma Modular Content** | ✅ | ✅ | ✅ | ✅ |
| VoC + UMM (Copyhackers) | ✅ | ✅ | ❌ | ❌ |
| Sales Enablement | ❌ | 🔶 parcial | ✅ | ❌ |

---

## O Gap

**Nenhum framework civil (fora da pharma) resolve os três níveis com rastreabilidade em contexto de vendas.**

Os três gaps específicos que nenhum framework resolve:

1. **Cadeia de derivação com rastreabilidade de ponta a ponta**
Não existe padrão que defina formalmente: este bloco deriva deste substrato específico, este output é composto destes blocos específicos.

2. **Nível 0 como sistema estruturado para vendas**
Nenhum framework trata dores mapeadas, objeções reais, voz do cliente e proposta de valor como documentos de primeira classe com estrutura formal. Eles existem como inputs informais para o processo criativo.

3. **Separação explícita entre inteligência e conteúdo**
Os frameworks existentes misturam pesquisa e conteúdo. O Nível 0 é um banco de *inteligência comercial estruturada*, não um banco de conteúdo — essa distinção não existe formalmente em nenhum framework de marketing.

---

## Recomendação

**Adaptar dois frameworks existentes e criar uma camada nova.**

```
Nível 0 — Sales Intelligence Library
  Modelo base: Claims Library (Pharma) adaptada para vendas
  Entidades:
    - Dores mapeadas (com citações reais de clientes)
    - Objeções + contra-argumentos validados
    - Diferenciais + provas concretas
    - Proposta de valor destilada
    - Contexto do público (perfil, vocabulário, medos, desejos)

Nível 1 — Modular Messaging Blocks
  Modelo base: GrokSpark / Contentful Modular Messaging
  Características:
    - Derivados explicitamente do Nível 0 (rastreabilidade)
    - Versões em múltiplos comprimentos (tweet, parágrafo, seção)
    - Organizados por contexto de uso (página, email, apresentação, script)

Nível 2 — Outputs Montados
  Modelo base: Atomic Content (composição)
  Exemplos: landing page, deck de vendas, script de chamada, proposta
  [A CRIAR DO ZERO: mecanismo de derivação e montagem com regras]
```

O nome mais preciso para o sistema completo — que ainda não existe com esse nome no mercado:

> **Sales Content Architecture (SCA)**

---

## Opções de Avanço

Dado que o foco inicial é comercial, existem três caminhos possíveis:

---

### Opção 1 — Mapear os substratos do zero (entrevista estruturada)
**Como funciona:** Sessão guiada com perguntas sobre a empresa, produto, público, dores, objeções e diferenciais. O resultado é o Nível 0 completo da SCA.
**Quando escolher:** Quando os documentos existentes estão desorganizados ou incompletos e vale começar limpo.
**Resultado entregue:** `sales-intelligence-library.md` — o substrato primordial.

---

### Opção 2 — Aproveitar o que já existe (ingestão dos markdowns atuais)
**Como funciona:** Os markdowns existentes (produto, oferta, dores, objeções, etc.) são enviados, analisados, encaixados e reorganizados na estrutura do Nível 0.
**Quando escolher:** Quando já há material relevante e o objetivo é organizar, não criar do zero.
**Resultado entregue:** Nível 0 estruturado a partir do material existente, com gaps sinalizados.

---

### Opção 3 — Definir a arquitetura completa primeiro
**Como funciona:** Antes de qualquer conteúdo, é desenhado o sistema completo: quais documentos existem em cada nível, como se chamam, como se relacionam, quais são os metadados de cada entidade, quais são as regras de derivação.
**Quando escolher:** Quando a prioridade é ter um sistema escalável e correto desde o início, mesmo que demore mais para chegar ao primeiro output.
**Resultado entregue:** Blueprint da SCA — mapa completo da arquitetura antes de qualquer execução.

---

> *Documento gerado por Muse (ideation-to-docs-squad) — Synkra AIOS*
> *Sessão: sca-ideation-2026-02-23*
