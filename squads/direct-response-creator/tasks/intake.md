# Task: intake

**Agente responsável:** Rex  
**Posição no pipeline:** 1 de 12  
**Dependências:** nenhuma  
**Próxima task:** run-parasita

---

## Objetivo

Receber o material de entrada do usuário, normalizar o texto, identificar o tipo de input e criar o arquivo de contexto do produto em `outputs/{slug}.md`.

---

## Input esperado

O usuário fornece **texto escrito** de qualquer um destes formatos:
- Página de vendas (HTML copiado ou texto limpo)
- Transcrição de vídeo/VSL
- Script de vídeo
- Email de vendas
- Briefing escrito pelo usuário
- Combinação de fontes

---

## Processo

### Passo 1 — Receber e normalizar o texto

Ao receber o texto, fazer:
1. Remover tags HTML residuais se existirem
2. Identificar e separar seções distintas (caso haja múltiplas fontes)
3. Estimar tamanho: contar parágrafos/linhas para avaliar riqueza do material

### Passo 2 — Elicitar informações de mercado (elicit=true)

Perguntar ao usuário:

```
Recebi o material. Antes de começar a análise, preciso de 2 informações:

1. Qual é o mercado-alvo deste produto?
   [1] Brasil — público geral (PT-BR Massa)
   [2] Brasil — público premium/executivo (PT-BR Premium)
   [3] Estados Unidos — Direct Response agressivo (EN-US Direct)
   [4] Estados Unidos — Info Products / Coaching (EN-US Info)
   [5] América Latina — Espanhol (ES-LATAM)
   [6] Outro — me descreva o mercado

2. Você tem um nome ou slug para este produto? (ex: "tonin-slim", "money-method")
   (Deixe em branco para eu gerar automaticamente)
```

### Passo 3 — Criar o arquivo de contexto

Copiar o template de `templates/context-tmpl.md` para `outputs/{slug}.md` e preencher:
- `{Product Name}` com o nome/slug fornecido ou gerado
- `{market}` com o mercado selecionado
- `{language}` com o idioma do mercado
- `{profile}` com o código do perfil (ex: `pt-br-massa`)
- `{date}` com a data atual
- `{status}` com `INTAKE`
- **Seção 1 — Input:** colar o texto normalizado

### Passo 4 — Confirmar e fazer handoff

Apresentar ao usuário:
```
✅ Intake concluído
Produto: {slug}
Mercado: {mercado} | Perfil: {profile}
Material: {X} parágrafos / ~{Y} palavras
Arquivo criado: outputs/{slug}.md

Próximo passo: *analyze (análise Parasita)
```

---

## Output

- Arquivo `outputs/{slug}.md` criado com Seção 1 preenchida
- Meta do arquivo atualizada com mercado, idioma e perfil

---

## Flags de qualidade

- Se o material tiver menos de 200 palavras → avisar: "Material muito curto — a análise pode ser superficial. Você tem mais conteúdo para adicionar?"
- Se o idioma do material for diferente do mercado selecionado → sinalizar e confirmar com usuário
