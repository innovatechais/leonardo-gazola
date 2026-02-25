# 🔍 Design Extractor Squad

Extrai design systems completos a partir de amostras visuais — URLs, screenshots ou imagens.

## Agentes

| Agente | Nome | Papel |
|--------|------|-------|
| `lens` | Lens 🔍 | Captura e analisa amostras visuais |
| `forge` | Forge ⚗️ | Gera tokens e design system completo |

## Inputs suportados

- **URL** — Captura screenshot e extrai CSS via Playwright + WebFetch
- **Imagem / Screenshot** — Análise visual multimodal
- **HTML/CSS local** — Extração direta de tokens do código

## Outputs gerados

- `{name}-design-system.html` — Página visual completa e deployável
- `{name}-tokens.css` — Variáveis CSS com nomenclatura semântica
- `{name}-tokens.json` — Tokens em formato W3C DTCG
- `{name}-extraction-report.md` — Relatório de análise

## Uso rápido

```
*full-pipeline https://stripe.com
*full-pipeline minha-referencia.png
*extract-url https://linear.app
*extract-image design-reference.png
```

## Ferramentas necessárias

- **Playwright MCP** — para captura de screenshots de URLs
- **WebFetch** — para leitura de HTML/CSS de sites
- **Multimodal (Claude)** — para análise visual de imagens
