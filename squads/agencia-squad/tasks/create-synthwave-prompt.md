# create-synthwave-prompt

**Status:** Ready
**Agent:** image-prompter (Lens)
**Squad:** agencia-squad

---

## Purpose

Gerar prompts otimizados para Midjourney/DALL-E/Ideogram que criam imagens no estilo **Synthwave/Vaporwave** com paletas de cores customizáveis.

## Input

```yaml
style_variant:
  - "synthwave-classic" # Tons rosados, azuis, laranjas
  - "cyberpunk-neon" # Tons verde-neon, magenta, ciano
  - "retrowave-sunset" # Tons quentes: coral, ouro, roxo
  - "dark-synthwave" # Tons escuros: azul escuro, magenta, preto
  - "custom" # Paleta personalizada pelo usuário

color_palette:
  primary: "string" # Ex: hot pink, coral, electric blue
  secondary: "string" # Ex: purple, cyan, gold
  tertiary: "string" # Ex: dark blue, black, magenta
  accent: "string" # Ex: neon green, orange, silver

scene_elements:
  setting: "string" # Ex: futuristic house, sports car, empty highway, beach, city skyline
  mood: "string" # Ex: nostalgic, cyberpunk, dreamy, dramatic
  architecture_style: "string" # Ex: modernist, minimalist, brutalist, retro-futuristic
  additional_objects: "array" # Ex: ["palm trees", "parked car", "neon signs"]

composition:
  perspective: "string" # Ex: wide angle, cinematic, overhead
  time_of_day: "string" # Ex: sunset, dusk, night, dawn
  lighting: "string" # Ex: dramatic backlighting, neon glow, golden hour
```

## Process

### Step 1: Analyze Color Palette
- Se `style_variant` = preset, carregar cores padrão
- Se `style_variant` = custom, validar cores fornecidas
- Garantir contraste adequado entre primary/secondary/tertiary

### Step 2: Build Scene Description
Combinar elementos:
- Setting + architecture_style + mood
- Exemplo: "futuristic minimalist house with cyberpunk mood"

### Step 3: Define Visual Style Tags
Adicionar tags sintwave/vaporwave:
- "synthwave aesthetic"
- "retro-futuristic"
- "80s inspired"
- "vaporwave vibes"
- "neon-lit"
- "cinematic lighting"

### Step 4: Construct Midjourney Prompt

Estrutura (ordem importa):
```
[SCENE DESCRIPTION]
[COLOR PALETTE INSTRUCTION]
[STYLE TAGS]
[COMPOSITION/LIGHTING]
[ART DIRECTION]
--ar [ASPECT_RATIO]
--s [STYLE_WEIGHT, default 100]
--q [QUALITY, default high]
```

### Step 5: Generate Alternative Prompts
Criar 3 variações:
1. Versão longa (detalhada, para mais controle)
2. Versão média (balanceada)
3. Versão curta (essencial, para rapidez)

## Output

```yaml
metadata:
  style: "string" # Ex: synthwave-classic
  color_palette:
    primary: "string"
    secondary: "string"
    tertiary: "string"
    accent: "string"
  setting: "string"
  estimated_vibe: "string"

prompts:
  detailed:
    midjourney: "string"
    dalle: "string"
    ideogram: "string"

  balanced:
    midjourney: "string"
    dalle: "string"
    ideogram: "string"

  quick:
    midjourney: "string"
    dalle: "string"
    ideogram: "string"

color_hex_codes:
  primary: "#XXXXXX"
  secondary: "#XXXXXX"
  tertiary: "#XXXXXX"
  accent: "#XXXXXX"

tips:
  - "Tip 1 for best results"
  - "Tip 2 for color accuracy"
  - "Tip 3 for composition"
```

## Presets

### synthwave-classic
```yaml
primary: "hot pink"
secondary: "electric blue"
tertiary: "dark blue"
accent: "neon orange"
hex:
  primary: "#FF10F0"
  secondary: "#00D9FF"
  tertiary: "#0A0E27"
  accent: "#FF6B35"
```

### cyberpunk-neon
```yaml
primary: "lime green"
secondary: "magenta"
tertiary: "dark gray"
accent: "cyan"
hex:
  primary: "#39FF14"
  secondary: "#FF10F0"
  tertiary: "#1A1A1A"
  accent: "#00FFFF"
```

### retrowave-sunset
```yaml
primary: "coral pink"
secondary: "lavender"
tertiary: "dark purple"
accent: "gold"
hex:
  primary: "#FF7F50"
  secondary: "#E6E6FA"
  tertiary: "#2D0052"
  accent: "#FFD700"
```

### dark-synthwave
```yaml
primary: "royal blue"
secondary: "hot magenta"
tertiary: "charcoal"
accent: "silver"
hex:
  primary: "#4169E1"
  secondary: "#FF1493"
  tertiary: "#36454F"
  accent: "#C0C0C0"
```

## Example Usage

```bash
# Classic Synthwave House
@image-prompter *create-synthwave-prompt
  --style synthwave-classic
  --setting "futuristic minimalist house"
  --mood "nostalgic cyberpunk"
  --elements "palm trees, sports car, neon signs"
  --perspective "wide angle cinematic"
  --time-of-day "sunset"

# Custom Color Palette
@image-prompter *create-synthwave-prompt
  --style custom
  --primary "deep purple"
  --secondary "electric yellow"
  --tertiary "black"
  --accent "cyan"
  --setting "empty highway"
  --mood "dreamlike"
```

## Quality Gate

✅ Cores validadas (contraste > 40%)
✅ Prompts otimizados para cada plataforma (MJ, DALL-E, Ideogram)
✅ Variações (detailed/balanced/quick) fornecidas
✅ Hex codes precisos
✅ 3+ tips para resultados melhores

---

**Author:** Leonardo Gazola
**Last Updated:** 2026-02-19
