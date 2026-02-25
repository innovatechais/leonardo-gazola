# Creative Studio Workflow

Workflow de produção de conteúdo visual com IA — do briefing ao criativo publicável.

---

## Visão Geral

```
BRIEFING (cliente + objetivo + plataforma)
      ↓
@studio-director (Pixel) — orquestra
      ↓
@design-guardian (Base) — carrega design system
      ↓
  ┌───────────────────────────────┐
  │        Qual formato?          │
  ├──────────┬──────────┬─────────┤
  ▼          ▼          ▼         ▼
Carrossel  Imagem    Vídeo   Campanha
  ↓          ↓          ↓     completa
@carousel @image-  @video-   (todos)
-creator  prompter prompter
  ↓          ↓          ↓
  └────────────────────┘
            ↓
Quality Gate (Pixel revisa)
            ↓
Aprovação humana
            ↓
@content-processor → Trello → Zapier → Publicado
```

---

## Fluxo 1: Carrossel

```
ENTRADA: Briefing (cliente + tema + plataforma)
      ↓
Pixel: @studio-director *brief {cliente} {tema} {plataforma}
      ↓
Base: @design-guardian *load {cliente}
  └─ Design system carregado (cores, fontes, tom)
      ↓
Lâmina: @carousel-creator *create-carousel {cliente} {tema} {plataforma}
  ├─ Define framework de narrativa
  ├─ Escreve slide a slide (função + headline + copy + visual)
  └─ Especificações de produção (Canva/Figma)
      ↓
Quality Gate:
  ✓ Gancho do slide 1 para o scroll?
  ✓ Design system respeitado?
  ✓ CTA claro no final?
      ↓
SAÍDA: Documento de carrossel pronto para produção no Canva/Figma
      ↓
Fluxo pega: @content-processor → card Trello criado
```

---

## Fluxo 2: Imagem / Post Estático

```
ENTRADA: Briefing (cliente + tema + formato + ferramenta)
      ↓
Pixel: @studio-director *image {cliente} {tema} {formato}
      ↓
Base: @design-guardian *load {cliente}
      ↓
Lens: @image-prompter *create-image-prompt {cliente} {tema} {formato} {ferramenta}
  ├─ Prompt principal (3 variações)
  ├─ Negative prompt
  ├─ Texto sobreposto (se aplicável)
  └─ Legenda completa com hashtags
      ↓
HUMANO: Cola prompt na ferramenta (Midjourney/DALL-E/Ideogram)
      ↓
Quality Gate:
  ✓ Imagem coerente com design system?
  ✓ Texto sobreposto legível?
  ✓ Copy adequada ao ICP?
      ↓
SAÍDA: Imagem gerada + legenda prontos para publicar
      ↓
@content-processor → card Trello → Zapier agenda
```

---

## Fluxo 3: Vídeo / Reels

```
ENTRADA: Briefing (cliente + tema + duração + plataforma + ferramenta)
      ↓
Pixel: @studio-director *video {cliente} {tema} {duração}
      ↓
Base: @design-guardian *load {cliente}
      ↓
Cena: @video-prompter *create-video-prompt {cliente} {tema} {duração} {plataforma} {ferramenta}
  ├─ Gancho (0-3 segundos) — definido primeiro para validação
  ├─ Roteiro completo com timecode
  ├─ Prompts IA cena a cena (se ferramenta ≠ human)
  ├─ B-roll, trilha, voz
  └─ Legenda nativa + caption de publicação
      ↓
[Se ferramenta de IA]: Cola prompts no Runway/Kling/Pika
[Se gravado por humano]: Roteiro entregue para gravação
      ↓
Quality Gate:
  ✓ Gancho é irresistível?
  ✓ Legenda nativa funciona sem áudio?
  ✓ Uma mensagem central clara?
      ↓
SAÍDA: Vídeo produzido + caption pronto para publicar
      ↓
@content-processor → card Trello → Zapier agenda
```

---

## Fluxo 4: Campanha Completa

```
ENTRADA: Briefing de campanha (cliente + tema central + canais + período)
      ↓
Pixel: @studio-director *full-campaign {cliente} {tema}
      ↓
Base: @design-guardian *load {cliente}
      ↓
Pixel distribui em paralelo:
  ├─ Lâmina → carrossel educativo
  ├─ Lens → 2-3 posts estáticos (variações do tema)
  └─ Cena → 1 vídeo/reel principal
      ↓
Pixel: @studio-director *review {cliente} all
  ↓ Verifica coerência entre formatos (mesma linguagem visual + mensagem)
      ↓
Aprovação humana do lote completo
      ↓
@content-processor → cards Trello para semana inteira → Zapier agenda
```

---

## Configuração Inicial de Novo Cliente

```
PRIMEIRO USO (antes de qualquer produção):
      ↓
Base: @design-guardian *define {novo-cliente}
  └─ Elicitation interativa:
      ├─ Paleta de cores
      ├─ Tipografia
      ├─ Tom visual e mood
      ├─ Tom de comunicação e ICP
      ├─ Regras visuais (sempre/nunca)
      └─ Ferramentas preferidas
      ↓
Design system salvo em data/design-system.md
      ↓
Pronto para produção criativa
```

---

## Tabela de Referência Rápida

| O que fazer | Agente | Comando |
|------------|--------|---------|
| Iniciar produção criativa | Pixel | `@studio-director *brief {cliente} {objetivo} {plataforma}` |
| Definir design system novo cliente | Base | `@design-guardian *define {cliente}` |
| Carregar design system | Base | `@design-guardian *load {cliente}` |
| Criar carrossel | Lâmina | `@carousel-creator *create-carousel {cliente} {tema} {plataforma}` |
| Criar imagem/post | Lens | `@image-prompter *create-image-prompt {cliente} {tema} {formato} {ferramenta}` |
| Criar vídeo/reels | Cena | `@video-prompter *create-video-prompt {cliente} {tema} {duração} {plataforma}` |
| Campanha completa | Pixel | `@studio-director *full-campaign {cliente} {tema}` |
| Revisar qualidade visual | Pixel | `@studio-director *review {cliente} {tipo}` |
| Agendar conteúdo criado | Fluxo | `@content-processor *process-content-batch {cliente}` |

---

## Integração com Content Pipeline Workflow

O Creative Studio entrega criativos prontos para o `content-pipeline-workflow.md` existente:

```
Creative Studio (cria) → Content Pipeline (agenda e publica)

@studio-director (Pixel)     →     @content-processor (Fluxo)
Entrega: criativo pronto            Recebe: arquivo + legenda + data sugerida
                                    Cria: card Trello → Zapier agenda
                                    
@carousel-creator (Lâmina)   →     @sop-guardian (Normas)
Entrega: documento de carrossel     Verifica: conformidade com SOP do cliente
                                    
@studio-director (Pixel)     →     @client-reporter (Relator)
Log: criativos produzidos           Inclui: no relatório semanal ao cliente
```
