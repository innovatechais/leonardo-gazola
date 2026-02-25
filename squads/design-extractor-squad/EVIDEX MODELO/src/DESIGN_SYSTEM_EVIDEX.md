# Design System Evidex
## Guia Completo de Estética para Aplicação Web

---

## 🎨 PALETA DE CORES PRINCIPAL

### Cores Primárias (Identidade Evidex)
```
Amarelo Neon: #D4FF00
Azul Marinho: #0A2540
Azul Marinho Escuro (variação): #01203f
```

### Cores Secundárias
```
Branco: #FFFFFF
Cinza Claro: #F5F5F0
Cinza Médio: #9B9B9B
Preto: #1A1A1A
```

### Uso das Cores

**Amarelo Neon (#D4FF00):**
- Elementos de destaque e CTAs principais
- Badges e tarjas de títulos
- Fundos de botões primários
- Acentos visuais importantes
- Efeito glow em textos importantes: `text-shadow: 0 0 20px rgba(212, 255, 0, 0.3)`

**Azul Marinho (#0A2540):**
- Texto principal sobre fundos claros
- Fundos de seções escuras
- Texto em botões amarelos
- Ícones e elementos estruturais

**Variação Azul (#01203f):**
- Fundos com gradiente junto com #0A2540
- Cards em fundos escuros
- Stats e métricas

---

## 📝 TIPOGRAFIA

### Tamanhos

**Títulos Principais (H1 - Headlines):**
```
text-8xl  (96px)
```

**Subtítulos (H2):**
```
text-6xl  (60px)
```

**Texto Grande (H3):**
```
text-4xl  (36px)
```

**Parágrafos Principais:**
```
text-3xl  (30px)
```

**Parágrafos Secundários:**
```
text-xl   (20px)
```

**Texto Normal:**
```
text-lg   (18px)
text-base (16px)
```

### Pesos de Fonte
```
Normal:   font-normal  (400)
Médio:    font-medium  (500)
Negrito:  font-bold    (700)
```

### Line-Height
```
Títulos:    leading-[1.1]      (apertado, impactante)
Texto:      leading-relaxed    (espaçamento confortável)
```

---

## 🎭 COMPONENTES E PADRÕES

### 1. TARJAS DE TÍTULO (Title Badges)

**Estilo padrão para títulos de seção:**
```html
<span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
  Seu Título Aqui
</span>
```

**Características:**
- Fundo amarelo neon
- Texto azul marinho
- Padding: px-6 py-3
- Bordas arredondadas: rounded-2xl
- Sombra: shadow-lg

---

### 2. CARDS

#### Card Padrão (Fundo Claro)
```html
<div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#D4FF00] hover:-translate-y-2 transition-all duration-300">
  <!-- Conteúdo -->
</div>
```

**Características:**
- Gradiente sutil cinza → branco
- Bordas muito arredondadas: rounded-3xl
- Padding: p-8
- Borda padrão cinza, muda para amarelo no hover
- Animação de elevação no hover

#### Card Glassmorphism (Sobre Fundo Escuro)
```html
<div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border-2 border-white/20 shadow-2xl">
  <!-- Conteúdo -->
</div>
```

**Características:**
- Fundo translúcido: bg-white/10
- Desfoque de fundo: backdrop-blur-md
- Borda translúcida: border-white/20
- Padding: p-10
- Sombra intensa: shadow-2xl

#### Card de Destaque (Amarelo)
```html
<div className="bg-gradient-to-br from-[#D4FF00] to-[#D4FF00]/80 rounded-3xl p-10 border-4 border-white shadow-2xl">
  <!-- Conteúdo -->
</div>
```

**Características:**
- Gradiente amarelo para criar profundidade
- Borda branca mais grossa: border-4
- Padding: p-10
- Sombra intensa

---

### 3. BOTÕES

#### Botão Primário (CTA Principal)
```html
<button className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-xl shadow-lg hover:shadow-xl font-medium">
  <span>Texto do Botão</span>
  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
</button>
```

**Características:**
- Totalmente arredondado: rounded-full
- Fundo amarelo, texto azul
- Ícone com animação de movimento no hover
- Escala aumenta 5% no hover
- Padding: px-12 py-5
- Tamanho texto: text-xl

#### Botão Secundário (Outline)
```html
<button className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-all text-xl">
  <Icon className="w-6 h-6" />
  <span>Texto do Botão</span>
</button>
```

**Características:**
- Outline azul marinho
- Inverte cores no hover (fundo azul, texto branco)
- Mesmo tamanho e formato do primário

---

### 4. BADGES E TAGS

#### Badge de Status/Categoria
```html
<div className="inline-flex items-center gap-2 bg-[#0A2540] text-[#D4FF00] px-5 py-2 rounded-full text-base font-bold shadow-lg">
  <Icon className="w-5 h-5" />
  TEXTO
</div>
```

#### Badge Colorido (Alerta/Status)
```html
<div className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-full text-base font-bold shadow-lg">
  <TrendingDown className="w-5 h-5" />
  MODELO TRADICIONAL
</div>
```

---

### 5. SEÇÕES E LAYOUTS

#### Seção com Fundo Claro
```html
<section className="relative py-32 bg-white overflow-hidden">
  <div className="container mx-auto max-w-7xl px-8">
    <!-- Conteúdo -->
  </div>
</section>
```

#### Seção com Gradiente Escuro
```html
<section className="relative py-32 bg-gradient-to-br from-[#0A2540] via-[#01203f] to-[#0A2540] overflow-hidden">
  <!-- Background Pattern (Opcional) -->
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle, #D4FF00 1px, transparent 1px)',
      backgroundSize: '50px 50px'
    }}></div>
  </div>
  
  <div className="container mx-auto max-w-7xl px-8 relative z-10">
    <!-- Conteúdo -->
  </div>
</section>
```

**Características:**
- Padding vertical: py-32
- Container centralizado com largura máxima: max-w-7xl
- Padding horizontal: px-8
- Pattern de fundo com pontilhado amarelo sutil (opcional)

#### Seção com Gradiente Claro
```html
<section className="relative pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
  <!-- Conteúdo -->
</section>
```

---

### 6. ÍCONES

**Padrão de Ícones com Fundo Gradiente:**
```html
<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
  <Icon className="w-10 h-10 text-white" strokeWidth={2} />
</div>
```

**Variações de Cor (Gradientes):**
```
Verde:    from-green-500 to-emerald-600
Azul:     from-blue-500 to-indigo-600
Roxo:     from-purple-500 to-violet-600
Laranja:  from-amber-500 to-orange-600
Vermelho: from-red-500 to-rose-600
Ciano:    from-cyan-500 to-teal-600
```

**Tamanhos de Ícones:**
```
Pequeno:  w-5 h-5
Médio:    w-6 h-6
Grande:   w-10 h-10
Extra:    w-12 h-12
```

---

### 7. STATS E MÉTRICAS

**Card de Estatística (Sobre Fundo Escuro):**
```html
<div className="bg-[#01203f] rounded-2xl p-6 shadow-lg border border-gray-100">
  <div className="text-5xl font-bold text-[#D4FF00] mb-2" 
       style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}>
    30s
  </div>
  <div className="text-white text-lg">
    Do Canhoto ao Faturamento
  </div>
</div>
```

**Características:**
- Número grande (text-5xl) com efeito glow amarelo
- Fundo azul escuro
- Bordas arredondadas: rounded-2xl
- Texto descritivo branco

**Card de Métrica (Fundo Colorido):**
```html
<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
  <div className="text-4xl font-bold text-green-600 mb-2">-90%</div>
  <p className="text-gray-700 font-medium">Redução de Custos</p>
</div>
```

---

### 8. HEADER (Navegação)

**Estilo Glassmorphism Flutuante:**
```html
<header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
  <nav className="relative rounded-2xl backdrop-blur-2xl bg-white/70 border border-white/20 shadow-2xl shadow-black/5">
    <div className="px-6 py-4">
      <!-- Conteúdo -->
    </div>
  </nav>
</header>
```

**Características:**
- Posição fixa no topo
- Centralizado horizontalmente
- Largura 95% da tela (max-w-6xl)
- Fundo translúcido com blur forte
- Bordas arredondadas: rounded-2xl
- Sombra sutil

**Links de Navegação:**
```html
<a className="px-4 py-2 rounded-xl text-gray-600 hover:text-[#0A2540] hover:bg-[#D4FF00]/20 transition-all font-medium">
  Link
</a>
```

---

### 9. EFEITOS E ANIMAÇÕES

#### Transições Padrão
```css
transition-all duration-300
```

#### Hover Effects Comuns
```css
/* Elevação */
hover:-translate-y-2

/* Escala */
hover:scale-105

/* Movimento de Ícone */
group-hover:translate-x-1

/* Mudança de Borda */
border-gray-100 hover:border-[#D4FF00]

/* Mudança de Sombra */
shadow-lg hover:shadow-2xl
```

#### Animações Especiais
```css
/* Pulso (para badges de destaque) */
animate-pulse

/* Rotação (para badges decorativos) */
rotate-12
```

---

### 10. SOMBRAS E PROFUNDIDADE

**Hierarquia de Sombras:**
```
Leve:     shadow-sm
Normal:   shadow-lg
Intensa:  shadow-2xl
Custom:   shadow-black/5 (sutilíssima)
```

**Box Shadows Inline (para efeitos especiais):**
```css
/* Glow Amarelo em Texto */
style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}
```

---

### 11. BORDAS E ARREDONDAMENTOS

**Padrões de Border Radius:**
```
Pequeno:  rounded-xl   (12px)
Médio:    rounded-2xl  (16px)
Grande:   rounded-3xl  (24px)
Completo: rounded-full (999px)
```

**Espessura de Bordas:**
```
Fina:     border     (1px)
Normal:   border-2   (2px)
Grossa:   border-4   (4px)
```

---

### 12. ESPAÇAMENTO

**Padding de Seções (Vertical):**
```
Padrão:   py-32
Topo:     pt-32
Rodapé:   pb-24
```

**Padding de Componentes:**
```
Pequeno:  p-6
Médio:    p-8
Grande:   p-10 ou p-12
```

**Gap entre Elementos:**
```
Pequeno:  gap-4
Médio:    gap-6 ou gap-8
Grande:   gap-12
```

**Margens de Seção (Bottom):**
```
Pequeno:  mb-8
Médio:    mb-16
Grande:   mb-20 ou mb-24
```

---

### 13. GRID E LAYOUTS

**Grid Padrão (Cards):**
```html
<div className="grid grid-cols-3 gap-8">
  <!-- Cards -->
</div>
```

**Grid de Comparação (2 Colunas):**
```html
<div className="grid grid-cols-2 gap-12">
  <!-- Conteúdo -->
</div>
```

**Larguras Máximas:**
```
Texto:    max-w-4xl
Conteúdo: max-w-6xl
Full:     max-w-7xl
```

---

### 14. GLASSMORPHISM (Efeito Vidro)

**Receita Completa:**
```html
<div className="backdrop-blur-md bg-white/10 border border-white/20">
  <!-- Conteúdo -->
</div>
```

**Variações:**
```
Blur Leve:   backdrop-blur-sm
Blur Médio:  backdrop-blur-md
Blur Forte:  backdrop-blur-2xl

Opacidade Fundo:
- Muito sutil:  bg-white/5
- Sutil:        bg-white/10
- Visível:      bg-white/70
```

---

### 15. BACKGROUNDS E PADRÕES

#### Gradiente de Seção Escura
```css
bg-gradient-to-br from-[#0A2540] via-[#01203f] to-[#0A2540]
```

#### Gradiente de Seção Clara
```css
bg-gradient-to-b from-gray-50 to-white
```

#### Pattern de Fundo (Pontilhado)
```html
<div className="absolute inset-0 opacity-5">
  <div className="absolute inset-0" style={{
    backgroundImage: 'radial-gradient(circle, #D4FF00 1px, transparent 1px)',
    backgroundSize: '50px 50px'
  }}></div>
</div>
```

#### Overlay de Imagem
```html
<div className="absolute inset-0 z-0">
  <img src="..." className="w-full h-full object-cover opacity-10" />
  <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white"></div>
</div>
```

---

### 16. CORES DE TEXTO

**Hierarquia de Cinzas (Sobre Fundo Claro):**
```
Título:      text-[#0A2540]    (azul marinho)
Texto:       text-gray-700
Secundário:  text-gray-600
Terciário:   text-gray-500
```

**Sobre Fundo Escuro:**
```
Título:      text-white
Destaque:    text-[#D4FF00]
Texto:       text-white/80
Secundário:  text-white/70
```

**Sobre Fundo Amarelo:**
```
Todos os textos: text-[#0A2540]
Secundário:      text-[#0A2540]/70 ou /80
```

---

## 🎯 PRINCÍPIOS DE DESIGN

### 1. **Contraste Forte**
Sempre use amarelo neon (#D4FF00) com azul marinho (#0A2540) para máximo impacto visual.

### 2. **Hierarquia Clara**
Use tarjas amarelas para destacar títulos principais. Mantenha consistência no tamanho das fontes.

### 3. **Espaçamento Generoso**
Não tenha medo de usar padding e margin grandes. Respire.

### 4. **Transições Suaves**
Sempre adicione `transition-all` ou `transition-colors` para mudanças de estado.

### 5. **Glassmorphism em Fundos Escuros**
Use `backdrop-blur` e transparência para criar profundidade.

### 6. **Bordas Generosamente Arredondadas**
Prefira `rounded-2xl` ou `rounded-3xl` ao invés de `rounded-lg`.

### 7. **Sombras para Profundidade**
Use `shadow-lg` ou `shadow-2xl` em elementos importantes.

---

## 📋 CHECKLIST DE APLICAÇÃO

Ao criar um novo componente, certifique-se de:

- [ ] Usar cores da paleta oficial (#D4FF00 e #0A2540)
- [ ] Incluir transições em elementos interativos
- [ ] Usar `rounded-2xl` ou `rounded-3xl` em cards
- [ ] Adicionar sombras apropriadas
- [ ] Garantir padding generoso (mínimo p-6 em cards)
- [ ] Testar hover states em botões e links
- [ ] Usar glassmorphism em overlays e modals
- [ ] Adicionar efeito glow em textos amarelos importantes
- [ ] Manter hierarquia visual clara

---

## 🚀 EXEMPLO COMPLETO DE SEÇÃO

```html
<section className="relative py-32 bg-gradient-to-br from-[#0A2540] via-[#01203f] to-[#0A2540] overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle, #D4FF00 1px, transparent 1px)',
      backgroundSize: '50px 50px'
    }}></div>
  </div>

  <div className="container mx-auto max-w-7xl px-8 relative z-10">
    {/* Header */}
    <div className="text-center mb-20">
      <h2 className="text-6xl tracking-tight mb-6 leading-[1.1]">
        <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
          Título da Seção
        </span>
      </h2>
      <p className="text-2xl text-white/80 max-w-4xl mx-auto mt-6">
        Descrição da seção aqui
      </p>
    </div>

    {/* Conteúdo */}
    <div className="grid grid-cols-3 gap-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border-2 border-white/20 shadow-2xl">
        {/* Card conteúdo */}
      </div>
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <button className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-xl shadow-lg font-medium">
        <span>Call to Action</span>
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</section>
```

---

## 💡 DICAS FINAIS

1. **Sempre priorize o amarelo neon para CTAs e elementos que precisam de atenção**
2. **Use gradientes sutis para adicionar profundidade sem poluir**
3. **Glassmorphism funciona melhor sobre fundos escuros ou imagens**
4. **Mantenha consistência: se um card tem rounded-3xl, todos devem ter**
5. **O efeito glow amarelo (`textShadow`) deve ser usado com moderação**
6. **Alterne fundos claros e escuros entre seções para criar ritmo visual**
7. **Padding generoso = design profissional e respirável**
8. **Todas as animações devem ser sutis e rápidas (300ms)**

---

**Este documento contém toda a estética Evidex pronta para ser replicada. Cole e adapte conforme necessário!** 🎨✨
