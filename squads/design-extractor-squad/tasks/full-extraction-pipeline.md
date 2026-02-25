# Task: full-extraction-pipeline

**ID:** full-extraction-pipeline
**Agent:** Lens → Forge
**elicit:** true
**Input:** URL, imagem ou arquivo HTML
**Output:** Design system completo (HTML + CSS tokens + JSON + relatório)

---

## Objetivo

Pipeline completo de extração de design system a partir de qualquer amostra visual.
Executa análise com Lens e construção com Forge em sequência.

---

## Pré-condições

- Input fornecido (URL, imagem ou HTML local)
- Playwright MCP disponível (para URLs)
- Capacidade multimodal ativa (para imagens)

---

## Etapas

### FASE 1 — Elicitação (Lens)

**[elicit]** Perguntar ao usuário:

```
🔍 Lens — Extração de Design System

Qual é a sua amostra visual?

1. URL de um site (ex: https://stripe.com)
2. Imagem / screenshot (forneça o caminho)
3. Arquivo HTML/CSS local (forneça o caminho)
4. Descrição visual (descreva o que quer replicar)

Qual nome dar ao design system extraído?
(ex: "stripe", "airbnb", "meu-projeto")
```

---

### FASE 2 — Captura (Lens)

**Se URL:**
- Usar Playwright para screenshot em viewport 1440px e 390px (mobile)
- Usar WebFetch para obter o HTML/CSS fonte
- Extrair todas as CSS custom properties e variáveis

**Se imagem:**
- Analisar visualmente com capacidade multimodal
- Identificar cores dominantes, fontes, espaçamentos visíveis

**Se HTML local:**
- Ler o arquivo
- Extrair todas as declarações CSS

---

### FASE 3 — Análise (Lens)

Analisar sistematicamente:

1. **Cores** — identificar no mínimo:
   - Background principal e superfícies
   - Cor de texto primária e secundária
   - Accent/destaque principal
   - Estados (sucesso, erro, alerta)

2. **Tipografia** — identificar:
   - Família(s) de fonte
   - Escala de tamanhos usada
   - Pesos recorrentes

3. **Espaçamento** — identificar:
   - Grid base (4px? 8px?)
   - Padding interno de componentes
   - Gaps entre elementos

4. **Componentes** — listar os tipos identificados

5. **Efeitos** — sombras, blur, gradientes, bordas

**Output desta fase:** arquivo `{name}-analysis.json`

---

### FASE 4 — Geração de Tokens (Forge)

A partir da análise:
- Nomear tokens com convenção semântica
- Gerar `{name}-tokens.css` com variáveis CSS
- Gerar `{name}-tokens.json` em formato W3C DTCG

---

### FASE 5 — Construção do Design System (Forge)

Gerar `{name}-design-system.html` com:
- Página única auto-contida
- Seções: Cores, Tipografia, Espaçamento, Efeitos, Componentes, Tokens
- Componentes fiéis ao extraído
- CSS e JS inline
- Navegação por sidebar ou tabs

---

### FASE 6 — Relatório

Gerar `{name}-extraction-report.md` com:
- Fonte analisada
- Tokens identificados (quantidade)
- Componentes extraídos
- Decisões de interpretação (onde houve ambiguidade)
- Recomendações de uso

---

### FASE 7 — Handoff

Apresentar ao usuário:
```
✅ Extração concluída — {name} Design System

📁 Arquivos gerados em outputs/:
  → {name}-design-system.html  (abrir no browser)
  → {name}-tokens.css          (importar no projeto)
  → {name}-tokens.json         (W3C DTCG)
  → {name}-extraction-report.md

🎨 Resumo:
  Cores:       {n} tokens
  Tipografia:  {n} tokens
  Espaçamento: {n} tokens
  Componentes: {n} identificados

Quer que eu faça o deploy online?
```

---

## Pós-condições

- Todos os arquivos salvos em `outputs/`
- Relatório gerado
- Usuário notificado sobre próximos passos (deploy opcional)
