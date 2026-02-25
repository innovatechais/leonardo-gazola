# Task: create-carousel

## Descrição
Criar carrossel completo para redes sociais: estrutura de slides, copy de cada lâmina, especificações visuais e instruções de formatação para Canva/Figma.

## Input Obrigatório
- `cliente` — nome do cliente
- `tema` — assunto ou objetivo do carrossel
- `plataforma` — instagram | linkedin | tiktok
- Design system do cliente (carregado via @design-guardian)

## Output Esperado
Documento completo de carrossel com:
- Quantidade de slides e framework de narrativa escolhido
- Cada slide com: função, headline, copy, descrição visual, specs do design system
- Slide de CTA ao final
- Instruções de produção (Canva/Figma)

## Pré-condições
- Design system do cliente carregado via @design-guardian (*load {cliente})
- Briefing com objetivo, tom e ICP definidos

## Processo

### Passo 1 — Carregar Design System
```
@design-guardian *load {cliente}
→ Confirmar: cores, tipografia, estilo visual disponíveis
```

### Passo 2 — Definir Estrutura
Escolher framework de narrativa mais adequado ao objetivo:

| Objetivo | Framework Recomendado |
|----------|----------------------|
| Educar | Lista de Valor (X motivos/dicas) |
| Converter | Problema → Agitação → Solução |
| Engajar | Antes/Depois |
| Institucional | Storytelling de marca |

Definir quantidade de slides:
- Instagram: 7-10 slides (algoritmo favorece 8-9)
- LinkedIn: 5-8 slides
- TikTok: 5-7 slides (formato mais rápido)

### Passo 3 — Escrever Slide a Slide

Para cada slide, definir obrigatoriamente:
1. **Função** na narrativa (gancho / contexto / desenvolvimento / virada / CTA)
2. **Headline** (máx 6-8 palavras)
3. **Copy** do corpo (se aplicável — máx 2-3 linhas)
4. **Elemento visual** (tipo + posição + cores do design system)
5. **Fundo** (cor ou gradiente do design system)

**Regras de copy por slide:**
- Slide 1 (gancho): headline que para o scroll + call para deslizar
- Slides de corpo: uma ideia por slide — se precisar de mais texto, cria mais um slide
- Slide final (CTA): ação clara + por que fazer agora

### Passo 4 — Especificações de Produção

Incluir ao final:
- **Dimensões** por plataforma (1080x1080 feed | 1080x1350 vertical)
- **Fontes** exatas do design system e tamanhos recomendados
- **Paleta** com hex das cores utilizadas
- **Instruções para Canva:** quais templates/elementos usar
- **Ordem de produção:** sequência para montar no Canva/Figma

### Passo 5 — Quality Gate
Antes de entregar, validar:
- [ ] Slide 1 é um gancho que faz parar o scroll?
- [ ] Cada slide tem função única e clara?
- [ ] Design system respeitado em todos os slides?
- [ ] Tem CTA claro no slide final?
- [ ] Copy está concisa? (sem texto em excesso por slide)
- [ ] Narrativa faz sentido lida do slide 1 ao último?

## Critérios de Aceitação
- Gancho do slide 1 tem potencial de parar o scroll
- Todos os slides respeitam o design system do cliente
- Copy está adequada ao tom e ICP do cliente
- CTA está claro e tem motivação para ação
- Especificações de produção são executáveis no Canva/Figma

## Tempo Estimado
15-30 minutos por carrossel
