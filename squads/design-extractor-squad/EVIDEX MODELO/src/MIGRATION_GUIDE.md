# 🚀 Guia de Migração - Estrutura de Rotas iPro

## ✅ O que foi feito

### 1. **Sistema de Rotas Criado** ✅ ATUALIZADO
- `/` → **Página de Vendas** (Sales.tsx) - Domínio principal
- `/institucional` → **Página Institucional** (Institutional.tsx)

### 2. **Estrutura de Pastas**
```
├── pages/
│   ├── Institutional.tsx  ✅ Criado
│   └── Sales.tsx           ✅ Criado
├── components/
│   ├── shared/
│   │   ├── Header.tsx      ✅ Criado (com suporte a ambas as páginas)
│   │   └── Footer.tsx      ✅ Criado
│   ├── institutional/
│   │   ├── Hero.tsx        ✅ Criado
│   │   ├── AboutSolution.tsx ✅ Criado
│   │   ├── HowItWorks.tsx  ⏳ Precisa copiar
│   │   ├── Modules.tsx     ⏳ Precisa copiar
│   │   ├── VideoDemo.tsx   ⏳ Precisa copiar
│   │   ├── Technology.tsx  ⏳ Precisa copiar
│   │   └── Integrations.tsx ⏳ Precisa copiar
│   └── sales/
│       ├── HeroSales.tsx   ⏳ Precisa criar
│       ├── Benefits.tsx    ⏳ Precisa criar
│       ├── SocialProof.tsx ⏳ Precisa criar
│       ├── Pricing.tsx     ⏳ Precisa criar
│       ├── FAQ.tsx         ⏳ Precisa criar
│       └── FinalCTA.tsx    ⏳ Precisa criar
```

### 3. **App.tsx**
- ✅ Atualizado com router simples
- ✅ Suporte a navegação client-side
- ✅ Preserva scroll position

## 📋 Próximos Passos

### Passo 1: Copiar Componentes Institucionais Restantes
Os arquivos abaixo precisam ser copiados de `/components/` para `/components/institutional/`:
- HowItWorks.tsx
- Modules.tsx
- VideoDemo.tsx
- Technology.tsx
- Integrations.tsx

**Ação**: Simplesmente copiar os arquivos e não modificar os imports internos (já funcionam).

### Passo 2: Criar Componentes de Vendas
Criar os componentes da página de vendas em `/components/sales/`:
- **HeroSales.tsx** - Hero com CTA forte e timer de urgência
- **Benefits.tsx** - Benefícios transformacionais (antes/depois)
- **SocialProof.tsx** - Depoimentos e casos de sucesso
- **Pricing.tsx** - Tabela de preços com planos
- **FAQ.tsx** - Perguntas frequentes
- **FinalCTA.tsx** - Última chance + garantia

### Passo 3: Limpar Arquivos Antigos (Opcional)
Após confirmar que tudo funciona, pode deletar:
- /components/Header.tsx (substituído por /components/shared/Header.tsx)
- /components/Footer.tsx (substituído por /components/shared/Footer.tsx)
- /components/Hero.tsx (movido para /components/institutional/Hero.tsx)
- /components/AboutSolution.tsx (movido para /components/institutional/AboutSolution.tsx)
- Etc...

## 🎯 Status Atual

✅ **FUNCIONANDO:**
- Sistema de rotas (`/` e `/institucional`)
- Header adaptativo (detecta modo vendas/institucional)
- Footer compartilhado
- ThemeProvider (dark/light mode)

⏳ **PENDENTE:**
- Copiar componentes institucionais restantes
- Criar componentes de vendas
- Testar navegação entre páginas
- Limpar arquivos antigos

## 🚨 Importante

Os arquivos originais em `/components/` ainda estão lá. Não delete nada antes de testar!

## 📝 Copy de Vendas vs Institucional

### Institucional (atual)
- Tom: Informativo, educativo
- Foco: Features e funcionalidades
- CTA: "Saiba mais", "Explorar"

### Vendas (criar)
- Tom: Persuasivo, urgente
- Foco: Benefícios e transformação
- CTA: "Comece agora", "Garantir vaga"
- Elementos: Prova social, preços, garantias, escassez
