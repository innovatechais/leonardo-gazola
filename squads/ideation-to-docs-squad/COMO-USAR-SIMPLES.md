# Como Usar - Guia Simples (Para Leigos)

## 🎯 O Que Você Precisa Fazer

**Apenas 2 passos:**

1. **Rode o comando** (gera tudo automaticamente)
2. **Importe o SVG no Figma** (1 clique)

---

## 📝 Passo 1: Rodar o Pipeline

```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md
```

**Pronto!** O agente gera automaticamente:
- ✅ Todos os documentos
- ✅ Board visual (SVG)
- ✅ Tudo em `docs/ideation/ideation-2026-02-17/`

---

## 🎨 Passo 2: Importar no Figma (1 Clique)

1. **Abra o Figma**: https://www.figma.com
2. **Crie um novo board**: File → New → FigJam (ou qualquer tipo)
3. **Importe o SVG**: 
   - Vá em **File** → **Import** (ou arraste o arquivo)
   - Escolha: `docs/ideation/ideation-2026-02-17/board.svg`
4. **Pronto!** O board aparece automaticamente! 🎉

---

## 🔄 Quer 100% Automático? (Opcional)

Se quiser que apareça **automaticamente no Figma** sem importar manualmente:

### Opção A: Use Make.com (Mais Simples)

1. Crie conta grátis: https://www.make.com
2. Crie um cenário:
   - Trigger: Webhook
   - Ação: Figma → Import SVG
3. Me passe a URL do webhook
4. Eu configuro tudo para você!

### Opção B: Me Passe Sua API Key do Figma

1. Acesse: https://www.figma.com/developers/api#access-tokens
2. Clique em "Generate new token"
3. Copie o token
4. Me passe aqui
5. Eu conecto tudo automaticamente!

---

## ❓ Dúvidas?

**P: Preciso saber programar?**
R: Não! Só rodar o comando e importar o SVG.

**P: Funciona sem internet?**
R: O pipeline funciona offline. Só precisa de internet para importar no Figma.

**P: Posso editar depois?**
R: Sim! O SVG importado fica totalmente editável no Figma.

**P: E se eu quiser automatizar 100%?**
R: Me passe sua API key do Figma ou URL do webhook do Make.com, e eu configuro tudo!

---

## 🚀 Próximo Passo

Teste agora:

```text
@ideation-orchestrator
*run-full-pipeline --session test --source ./sua-transcricao.md
```

Depois, importe o SVG no Figma. Se quiser automatizar, me avise!
