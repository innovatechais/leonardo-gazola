# Task: create-image-prompt

## Descrição
Gerar prompt otimizado para criação de imagem com IA + copy do texto sobreposto + legenda completa para publicação. Compatível com Midjourney, DALL-E 3, Ideogram, Adobe Firefly e Stable Diffusion.

## Input Obrigatório
- `cliente` — nome do cliente
- `tema` — assunto da imagem
- `formato` — feed | stories | thumbnail | banner
- `ferramenta` — midjourney | dalle | ideogram | firefly | auto
- Design system do cliente (carregado via @design-guardian)

## Output Esperado
- Prompt principal pronto para colar na ferramenta de IA
- Negative prompt
- 2-3 variações de prompt
- Especificações de texto sobreposto (se aplicável)
- Legenda completa com hashtags e CTA

## Pré-condições
- Design system do cliente carregado via @design-guardian (*load {cliente})
- Objetivo do post definido (engajamento | conversão | autoridade | institucional)

## Processo

### Passo 1 — Carregar Design System
```
@design-guardian *load {cliente}
→ Extrair: paleta de cores, mood visual, estilo (fotorrealista|ilustrativo|etc), referências
```

### Passo 2 — Definir Conceito Visual
Antes de escrever o prompt, definir:
1. **Elemento central** da imagem (pessoa, produto, ambiente, conceito abstrato)
2. **Composição** (enquadramento: close up | médio | aberto | flat lay)
3. **Lighting** (natural | studio | dramatic | soft | golden hour)
4. **Estilo** (fotorrealista | editorial | minimalista | ilustração | 3D | flat design)
5. **Mood** (alinhado ao tom visual do design system)

### Passo 3 — Escrever o Prompt

**Estrutura do prompt (ordem importa):**
```
[SUJEITO PRINCIPAL], [AÇÃO/POSIÇÃO], [AMBIENTE/CONTEXTO],
[ESTILO FOTOGRÁFICO/ARTÍSTICO], [LIGHTING],
[COR DOMINANTE alinhada ao design system],
[QUALIDADE: professional photography, 8k, high detail, etc]
```

**Por ferramenta:**

**Midjourney:**
```
[prompt em inglês] --ar [ratio] --v 6.1 --style raw
ratio por formato: feed=4:5, stories=9:16, thumbnail=16:9, banner=16:6
```

**DALL-E 3:**
```
Prompt em inglês, linguagem natural, instrução direta.
Adicionar: "no text in image" se não quiser texto na imagem.
Adicionar: "photorealistic" ou "illustration style" conforme design system.
```

**Ideogram (usar quando precisa de TEXTO legível na imagem):**
```
Prompt em inglês + usar a função de Text dentro da plataforma para o texto.
Especificar: "clean minimal design, [cor de fundo], [cor de texto]"
```

**Adobe Firefly:**
```
Prompt em inglês, indicar: "commercial use safe, no brand logos"
Usar Reference Image para manter consistência visual com design system.
```

### Passo 4 — Negative Prompt
Sempre incluir:
```
Evitar: blurry, low quality, distorted, extra fingers, text errors,
watermark, logo, artificial look, oversaturated, [específico do cliente]
```

### Passo 5 — Texto Sobreposto (se aplicável)
```
Headline: [máx 5 palavras — impactante, legível]
Subtítulo: [complemento opcional — máx 10 palavras]
Posição: topo | centro | rodapé | lateral
Fonte: [do design system]
Cor do texto: [hex do design system — garantir contraste]
Fundo do texto: sem | overlay semi-transparente | caixa de cor
```

### Passo 6 — Legenda de Publicação
```
Caption: [3-5 linhas — começa com frase de impacto, desenvolve, termina com CTA]
Hashtags: 10-20 (mix de: nicho específico + médios + amplos)
CTA: [comentário pedido | link na bio | salve | compartilhe]
```

### Passo 7 — Quality Gate
- [ ] Prompt descreve claramente o que deve aparecer na imagem?
- [ ] Estilo visual está alinhado com o design system do cliente?
- [ ] Aspect ratio está correto para o formato/plataforma?
- [ ] Negative prompt previne erros comuns?
- [ ] Texto sobreposto (se houver) está legível e conciso?
- [ ] Legenda adequada ao tom do cliente?

## Critérios de Aceitação
- Prompt tem alta probabilidade de gerar imagem útil na primeira tentativa
- Visual resultante será consistente com identidade do cliente
- Copy e legenda adequadas ao objetivo e ICP do cliente
- Negativo prompt previne os principais erros da ferramenta escolhida

## Tempo Estimado
10-20 minutos por imagem (3 variações)
