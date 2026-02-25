# Configurar Figma - Passo a Passo

## ✅ Você já tem:
- Client ID: `Y6pON6ISZqJKe0yTjbC3Tk`
- Client Secret: `F4gmvDs33CbyyAEMfransC4Unlm1d4`

## 📋 Próximo Passo: Obter Access Token

A API do Figma precisa de um **Access Token** para funcionar. Você tem 2 opções:

### Opção 1: Import Manual (Mais Simples - Recomendado!)

**Não precisa de token!** Só importar o SVG:

1. Rode o pipeline:
```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md
```

2. Importe no Figma:
   - Abra Figma
   - File → New → FigJam
   - File → Import
   - Escolha: `docs/ideation/ideation-2026-02-17/board.svg`
   - Pronto! 🎉

### Opção 2: Automático (Precisa de Access Token)

Para aparecer **automaticamente no Figma**, você precisa de um Access Token:

1. **Configure as credenciais** (já salvei para você):
```bash
export FIGMA_CLIENT_ID="Y6pON6ISZqJKe0yTjbC3Tk"
export FIGMA_CLIENT_SECRET="F4gmvDs33CbyyAEMfransC4Unlm1d4"
```

2. **Obtenha o Access Token**:
   - Acesse: https://www.figma.com/oauth
   - Use seu Client ID: `Y6pON6ISZqJKe0yTjbC3Tk`
   - Autorize o app
   - Copie o Access Token retornado

3. **Configure o token**:
```bash
export FIGMA_ACCESS_TOKEN="cole_o_token_aqui"
```

4. **Rode com push automático**:
```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md --auto-push-figma
```

---

## ⚠️ Limitação Importante

A API REST do Figma **não permite criar files diretamente**. Ela é principalmente para leitura.

**Mas isso não é problema!** Você pode:
- Importar o SVG manualmente (1 clique, funciona perfeitamente)
- Ou usar um plugin do Figma que importa automaticamente

---

## 🚀 Recomendação

**Use a Opção 1 (Import Manual)** - é mais simples e funciona imediatamente!

O SVG gerado é perfeito e fica totalmente editável no Figma, igual ao exemplo do seu amigo.

---

## 💡 Próximo Passo

Teste agora:

```text
@ideation-orchestrator
*run-full-pipeline --session test --source ./sua-transcricao.md
```

Depois, importe o SVG no Figma. Se quiser automatizar depois, me avise e eu ajudo a obter o Access Token!
