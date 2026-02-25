# Task: create-video-prompt

## Descrição
Criar roteiro completo + prompts de IA cena a cena para vídeos curtos (Reels, Shorts, TikTok).
Entrega: roteiro com timecode, prompts para Runway/Kling/Pika, B-roll, legenda e caption.

## Input Obrigatório
- `cliente` — nome do cliente
- `tema` — assunto do vídeo
- `duração` — 15s | 30s | 60s | 90s
- `plataforma` — reels | tiktok | shorts | todos
- `ferramenta` — runway | kling | pika | luma | sora | human (gravado por humano)
- Design system do cliente (carregado via @design-guardian)

## Output Esperado
- Roteiro completo com timecode e narração/legenda nativa
- Prompt IA para cada cena (se ferramenta de IA)
- Sugestões de B-roll, trilha e voz
- Legenda de vídeo nativa (para exibir durante o vídeo)
- Caption completo para publicação com hashtags e CTA

## Pré-condições
- Design system do cliente carregado via @design-guardian (*load {cliente})
- Objetivo do vídeo definido (engajamento | conversão | educação | viral)

## Processo

### Passo 1 — Carregar Design System
```
@design-guardian *load {cliente}
→ Extrair: estilo visual, mood, cores, tom de comunicação
```

### Passo 2 — Definir Gancho (0:00 - 0:03)
**O gancho é o elemento mais crítico do vídeo.** Os primeiros 3 segundos determinam se alguém fica.

Tipos de gancho (escolher o mais adequado ao tema):

| Tipo | Como funciona | Exemplo |
|------|--------------|---------|
| Pergunta chocante | Abre com uma questão que gera curiosidade | "Você sabia que 90% das empresas erram nisso?" |
| Afirmação controversa | Frase que vai contra o senso comum | "Trabalhar mais não te deixa rico." |
| Text on screen | Texto grande e direto no vídeo | "3 erros que custam dinheiro" |
| Visual impactante | Cena visualmente surpreendente | Imagem inesperada + trilha que prende |
| Revelação imediata | Começa mostrando o resultado | "Olha o que aconteceu quando eu..." |

### Passo 3 — Estrutura por Duração

**15 segundos:**
```
0:00-0:03 → Gancho
0:03-0:10 → Desenvolvimento (1 ideia central)
0:10-0:15 → CTA rápido
```

**30 segundos:**
```
0:00-0:03 → Gancho
0:03-0:08 → Contexto / problema
0:08-0:22 → Desenvolvimento (2-3 pontos)
0:22-0:30 → CTA
```

**60 segundos:**
```
0:00-0:03 → Gancho
0:03-0:10 → Setup / contexto
0:10-0:45 → Corpo (4-6 cenas de desenvolvimento)
0:45-0:55 → Virada / conclusão
0:55-1:00 → CTA
```

### Passo 4 — Escrever Roteiro Cena a Cena

Para cada cena, definir:
```
CENA [n] — [nome da cena] — [0:XX-0:XX]
─────────────────────────────
Narração/Legenda nativa: "[texto exato — o que é falado ou aparece na tela]"
Visual: [descrição detalhada do que aparece na tela]
Transição: corte seco | fade | zoom in/out | whip pan
```

**Regras de ritmo por plataforma:**
- TikTok: corte a cada 2-3 segundos (ritmo agressivo)
- Reels: corte a cada 3-5 segundos
- Shorts: corte a cada 2-4 segundos
- LinkedIn: corte a cada 4-7 segundos (mais pausado)

### Passo 5 — Prompts de IA por Cena (se ferramenta de IA)

Para cada cena, escrever prompt específico:

**Runway Gen-3:**
```
[English] Cinematic shot of [descrição], [movimento de câmera: slow pan left|dolly in|static],
[lighting], [mood], photorealistic, 4K, [estilo visual do design system]
Duration: [3-5|8-10] seconds
```

**Kling AI:**
```
[English] [sujeito] [ação específica], [ambiente], [estilo],
[movement: subtle|dynamic|still], [camera: close up|medium|wide]
```

**Pika:**
```
[English] [descrição cena], [efeito: zoom in|pan|none],
[estilo: cinematic|anime|3D|natural]
```

### Passo 6 — Produção

```
B-ROLL SUGERIDO:
[lista de imagens/cenas de apoio para intercalar com o conteúdo principal]

TRILHA:
Mood: [empolgante|sutil|emocional|urgente|inspirador]
BPM: [80-100 relaxado | 120-140 dinâmico | 140+ energético]
Estilo: [lo-fi|pop|electronic|cinematic|acoustic]
Referência: [músicas/artistas que combinam]

VOZ (se narração):
Tom: [conversacional|autoridade|narrativo|empolgante]
Ritmo: [rápido|médio|pausado]
```

### Passo 7 — Legendas e Caption

**Legenda nativa do vídeo (on-screen text):**
```
- Cada linha legível em menos de 2 segundos
- Fonte do design system
- Cor com alto contraste para fundo claro E escuro
- Máx 3-4 palavras por frame se for animada
```

**Caption para publicação:**
```
Linha 1: [frase de impacto — 1 linha que para o scroll no feed]
[quebra de linha]
Desenvolvimento: [2-4 linhas contextualizando]
[quebra de linha]
CTA: [o que fazer depois de assistir]
[quebra de linha]
Hashtags: [20-30 para TikTok | 5-15 para Reels/Shorts]
```

### Passo 8 — Quality Gate
- [ ] Gancho dos primeiros 3 segundos é irresistível?
- [ ] Ritmo de corte está adequado para a plataforma?
- [ ] Uma mensagem central clara no vídeo inteiro?
- [ ] Legenda nativa funciona sem áudio?
- [ ] Design system respeitado no estilo visual?
- [ ] CTA claro e motivador no final?
- [ ] Caption começa com frase forte?

## Critérios de Aceitação
- Gancho tem alto potencial de retenção nos primeiros 3 segundos
- Roteiro tem uma narrativa clara e coesa
- Prompts de IA são específicos o suficiente para gerar cenas coerentes
- Legenda nativa funciona sem som
- Caption adequado ao tom e plataforma do cliente

## Tempo Estimado
20-40 minutos por vídeo (incluindo roteiro completo + prompts)
