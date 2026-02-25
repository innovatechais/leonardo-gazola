# Agência Squad

Squad completo de agência: operações de conteúdo + estúdio criativo visual com IA. Objetivo: produção e publicação de conteúdo 100% independente da presença de Leonardo.

---

## Serviços Operados

| Serviço | Ferramentas | Status |
|---------|------------|--------|
| Automação de postagem | Trello + Zapier | Ativo |
| Gestão de conteúdo redes sociais | Varia por cliente | Ativo |
| Criação de carrosseis com IA | Canva/Figma + design system | ✅ Novo |
| Geração de imagens com IA | Midjourney/DALL-E/Ideogram | ✅ Novo |
| Criação de vídeos/reels com IA | Runway/Kling/Pika | ✅ Novo |
| Gestão de design system por cliente | data/design-system.md | ✅ Novo |

---

## Agentes

### Gestor/Orquestrador

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🎯 Gestor Orquestrador | Maestro | **PONTO DE ENTRADA** — Conversa com você e delega para equipe certa | `@agency-orchestrator` |

### Operações

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| ⚡ Processador de Conteúdo | Fluxo | Recebe conteúdo bruto → Trello → Zapier | `@content-processor` |
| 📊 Relator de Clientes | Relator | Relatório semanal para o cliente | `@client-reporter` |
| 📖 Guardião dos SOPs | Normas | Mantém e valida SOPs por cliente | `@sop-guardian` |

### Content Studio (Criação Visual com IA)

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🎬 Diretor Criativo | Pixel | Orquestra toda produção visual — ponto de entrada | `@studio-director` |
| 🎨 Guardião do Design | Base | Mantém design system por cliente (cores, fontes, tom) | `@design-guardian` |
| 📐 Criador de Carrosseis | Lâmina | Carrosseis: estrutura de slides + copy + specs visuais | `@carousel-creator` |
| 🔭 Gerador de Imagens | Lens | Prompts AI para imagens + texto sobreposto + legenda | `@image-prompter` |
| 🎞️ Criador de Vídeos | Cena | Roteiro + prompts Runway/Kling/Pika + legenda nativa | `@video-prompter` |

---

## Workflows

### Content Pipeline (Operações)
```
Conteúdo bruto chega → Fluxo processa → Normas valida → Relator reporta
```

### Creative Studio (Produção Visual)
```
Briefing → Pixel (orquestra) → Base (design system)
  → Lâmina (carrossel) | Lens (imagem) | Cena (vídeo)
    → Aprovação humana → Fluxo (Trello → Zapier → Publicado)
```

---

## Início Rápido

```
# ── ENTRADA PRINCIPAL: USE MAESTRO ────────────────────
# Fale com Maestro sobre o que você precisa (conversa natural)
@agency-orchestrator *demanda

# Exemplos rápidos:
@agency-orchestrator *demanda conteúdo
@agency-orchestrator *demanda relatório
@agency-orchestrator *demanda criativo

# ── OU DIRECIONE PARA AGENTES ESPECÍFICOS ──────────────
# Processar lote de conteúdo
@content-processor *process-content-batch {cliente}

# Gerar relatório semanal
@client-reporter *generate-client-report {cliente}

# Definir design system do cliente
@design-guardian *define {cliente}

# Criar carrossel
@studio-director *carousel {cliente} {tema}

# Criar imagem para feed
@studio-director *image {cliente} {tema} feed

# Criar vídeo/reels
@studio-director *video {cliente} {tema} 30s

# Campanha completa (carrossel + imagem + vídeo)
@studio-director *full-campaign {cliente} {tema da campanha}
```

---

## Estrutura do Squad

```
agencia-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── agency-orchestrator.md    🎯 Maestro (NOVO — PONTO DE ENTRADA)
│   ├── content-processor.md      ⚡ Fluxo
│   ├── client-reporter.md        📊 Relator
│   ├── sop-guardian.md           📖 Normas
│   ├── studio-director.md        🎬 Pixel
│   ├── design-guardian.md        🎨 Base
│   ├── carousel-creator.md       📐 Lâmina
│   ├── image-prompter.md         🔭 Lens
│   └── video-prompter.md         🎞️ Cena
├── tasks/
│   ├── process-content-batch.md
│   ├── generate-client-report.md
│   ├── validate-sop-compliance.md
│   ├── create-carousel.md
│   ├── create-image-prompt.md
│   └── create-video-prompt.md
├── workflows/
│   ├── content-pipeline-workflow.md
│   └── creative-studio-workflow.md
├── data/
│   ├── clients-sops.md
│   └── design-system.md
├── checklists/
├── templates/
└── config/
```
