# Design System dos Clientes — Agência Squad

> Este arquivo é a fonte única de verdade visual para todos os clientes.
> Mantido pelo @design-guardian (Base). Atualizar via: `@design-guardian *update {cliente} {elemento}`

---

## Como Usar

1. Ativar `@design-guardian *load {cliente}` antes de qualquer produção criativa
2. Se o cliente não existir aqui, usar `@design-guardian *define {cliente}` para criar
3. Nunca produzir conteúdo visual sem design system definido

---

## Template — Adicionar Novo Cliente

```
## [NOME DO CLIENTE]

### Identidade Visual
- **Logo:** [link ou descrição]
- **Slogan:** [se houver]

### Paleta de Cores
| Token | Hex | Uso |
|-------|-----|-----|
| Primária | #XXXXXX | CTAs, headlines, elementos de destaque |
| Secundária | #XXXXXX | Bordas, detalhes, ícones |
| Fundo principal | #XXXXXX | Fundo da maioria dos posts |
| Fundo alternativo | #XXXXXX | Variação de fundo |
| Texto principal | #XXXXXX | Textos corridos e subtítulos |
| Texto sobre primária | #XXXXXX | Texto em fundos coloridos |

### Tipografia
| Uso | Fonte | Peso | Tamanho (feed) |
|-----|-------|------|----------------|
| Headline | [fonte] | Bold/700 | 40-56px |
| Subtítulo | [fonte] | SemiBold/600 | 28-36px |
| Corpo | [fonte] | Regular/400 | 20-24px |
| Legenda | [fonte] | Regular/400 | 16-18px |

> Fontes gratuitas recomendadas: Google Fonts
> Fontes pagas (se aplicável): [liste aqui]

### Tom Visual
- **Estilo geral:** [minimalista | bold | editorial | orgânico | tech | premium | popular | etc]
- **Mood em 3 palavras:** [palavra1] · [palavra2] · [palavra3]
- **Referências visuais:** [perfis/marcas de referência no Instagram ou Pinterest]
- **Fotografias:** [fotorrealista | ilustração | 3D | flat design | misto]

### Tom de Comunicação
- **Voz:** [formal | informal | técnica | acessível | inspiracional | direta]
- **Pessoa:** [1ª pessoa | 2ª pessoa | 3ª pessoa]
- **Emojis:** [sim — quais tipos | raramente | não]
- **Gírias:** [sim | não]
- **ICP (público-alvo):** [descrição breve do público]

### Regras Visuais
**SEMPRE:**
- [regra 1 — ex: "sempre usar logo no canto inferior direito"]
- [regra 2 — ex: "headline sempre em caixa alta"]

**NUNCA:**
- [regra 1 — ex: "nunca usar fundo branco puro"]
- [regra 2 — ex: "nunca misturar mais de 3 cores por post"]

### Formatos Ativos
| Formato | Dimensões | Frequência |
|---------|-----------|-----------|
| Feed quadrado | 1080x1080 | [X/semana] |
| Feed vertical | 1080x1350 | [X/semana] |
| Stories | 1080x1920 | [X/dia] |
| Reels | 1080x1920 | [X/semana] |
| Carrossel | 1080x1080 | [X/semana] |

### Ferramentas de Produção
- **Design:** [Canva | Figma | Adobe Express | outro]
- **Imagem AI:** [Midjourney | DALL-E | Ideogram | Firefly | outro]
- **Vídeo AI:** [Runway | Kling | Pika | outro]
- **Edição de vídeo:** [CapCut | Premiere | DaVinci | outro]

### Componentes Padrão
- **Capa de carrossel:** [descrição do layout padrão]
- **Slide de dados/estatísticas:** [como exibir números]
- **Slide de citação:** [estilo de aspas, fundo, fonte]
- **Tela final de CTA:** [o que sempre aparece no último slide]

### Histórico de Atualizações
| Data | Elemento | Mudança | Motivo |
|------|----------|---------|--------|
| [data] | [elemento] | [o que mudou] | [por que] |
```

---

## Clientes Ativos

> Copie o template acima e preencha para cada cliente abaixo.
> Após definir, ative com: `@design-guardian *load {cliente}`

---

<!-- INÍCIO DOS CLIENTES — Adicionar abaixo -->

<!-- EXEMPLO PREENCHIDO (remover quando adicionar clientes reais) -->
<!--
## EXEMPLO LTDA

### Identidade Visual
- Logo: Logotipo minimalista, letra E estilizada, sem fundo
- Slogan: "Simples. Direto. Eficiente."

### Paleta de Cores
| Token | Hex | Uso |
|-------|-----|-----|
| Primária | #1A1A2E | CTAs, headlines |
| Secundária | #E94560 | Destaques, bordas |
| Fundo principal | #F5F5F5 | Fundo dos posts |
| Texto principal | #333333 | Textos corridos |
| Texto sobre primária | #FFFFFF | Texto em fundos escuros |

### Tipografia
| Uso | Fonte | Peso | Tamanho |
|-----|-------|------|---------|
| Headline | Montserrat | Bold | 48px |
| Corpo | Inter | Regular | 22px |

### Tom Visual
- Estilo geral: minimalista + premium
- Mood: limpo · direto · moderno
- Referências: @apple, @stripe no Instagram
- Fotografias: fotorrealista

### Tom de Comunicação
- Voz: direta, sem enrolação
- Pessoa: 2ª pessoa (você)
- Emojis: raramente (só ✅ e →)
- ICP: empreendedores 30-45 anos, renda média-alta
-->

---

## Notas de Operação para @design-guardian

- Ao receber `*load {cliente}`, carregar a seção completa do cliente e repassar como contexto para o agente criador
- Ao receber `*define {cliente}`, conduzir elicitation interativa perguntando cada campo do template
- Ao receber `*update {cliente} {elemento}`, editar apenas o campo solicitado e registrar no histórico
- Se cliente não encontrado: bloquear produção e avisar `@studio-director (Pixel)` para definir o design system primeiro
