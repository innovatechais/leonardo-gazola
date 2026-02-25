# Como Obter Token do Figma (2 minutos)

## Passo a Passo Simples

### 1. Acesse a página de tokens

Abra no navegador:
```
https://www.figma.com/developers/api#access-tokens
```

### 2. Faça login

Se não estiver logado, faça login com sua conta Figma.

### 3. Gere um novo token

1. Clique no botão **"Generate new token"**
2. Dê um nome (ex: "AIOS Ideation Squad")
3. Clique em **"Generate token"**
4. **COPIE O TOKEN** (você só verá uma vez!)

### 4. Configure no projeto

Abra o terminal e rode:

```bash
export FIGMA_ACCESS_TOKEN="cole_seu_token_aqui"
```

Para salvar permanentemente (recomendado):

```bash
echo 'export FIGMA_ACCESS_TOKEN="cole_seu_token_aqui"' >> ~/.zshrc
source ~/.zshrc
```

Ou crie um arquivo `.env.local` na raiz do projeto:

```bash
echo 'FIGMA_ACCESS_TOKEN="cole_seu_token_aqui"' > .env.local
```

### 5. Teste

```bash
node squads/ideation-to-docs-squad/scripts/push-figma-direct.js --session test --dry-run
```

Se aparecer "✅ Token válido!", está funcionando!

---

## Nota Importante

⚠️ **A API REST do Figma não permite criar files diretamente.**

Mas você pode:
- **Importar o SVG manualmente** (1 clique, funciona perfeitamente)
- **Usar automação** (Make/Zapier) para criar automaticamente (veja SETUP-FIGMA-AUTOMATION.md)

O token serve para:
- Validar sua conta
- Ler dados do Figma
- Usar em automações futuras

---

## Próximo Passo

Depois de configurar o token, rode:

```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md
```

O SVG será gerado automaticamente. Depois, importe no Figma (1 clique) ou configure a automação para ser 100% automático.
