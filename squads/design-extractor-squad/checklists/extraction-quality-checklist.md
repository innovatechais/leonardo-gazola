# Extraction Quality Checklist

## Lens — Análise

- [ ] Cores: mínimo 6 tokens identificados (bg, surface, text, accent, success, error)
- [ ] Tipografia: família de fonte identificada corretamente
- [ ] Tipografia: pelo menos 3 tamanhos na escala
- [ ] Espaçamento: grid base identificado (4 ou 8px)
- [ ] Componentes: pelo menos 3 componentes identificados
- [ ] Análise feita com amostra real (não suposta)
- [ ] Valores exatos (hex, px, rem) — não aproximados

## Forge — Build

- [ ] Tokens com nomenclatura semântica (não valores diretos)
- [ ] Arquivo HTML auto-contido (sem dependências externas não documentadas)
- [ ] Todas as seções do design system presentes
- [ ] Componentes visualmente fiéis à amostra
- [ ] Tokens CSS válidos e funcionais
- [ ] JSON tokens em formato W3C DTCG válido
- [ ] Página renderiza corretamente em 375px e 1440px

## Geral

- [ ] Relatório de extração gerado
- [ ] Arquivos salvos no caminho correto (`outputs/`)
- [ ] Usuário notificado sobre o que foi extraído
- [ ] Ambiguidades documentadas no relatório
