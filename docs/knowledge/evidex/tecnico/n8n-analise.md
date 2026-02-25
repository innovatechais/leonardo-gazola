# Análise de Migração: N8N → AIOS Evidex
**Workflow:** `[1] [PROD] Arilu-canhotos-LEITURA e VALIDAÇÃO`
**Analisado em:** 2026-02-18
**Status:** análise completa — aguardando aprovação para iniciar migração

---

## 1. O que o workflow faz (mapa completo)

### Fluxo geral

```
WhatsApp (motorista)
  → Webhook (recebe mensagem)
    → Identifica transportadora (por URL param)
      → Identifica tipo de mensagem: texto / imagem / áudio
        → Identifica motorista (por placa)
          → Processa canhoto (leitura IA)
            → Valida dados (carimbo, pedido, placa)
              → Confirma com motorista
                → Motorista corrige se necessário
                  → Grava no Supabase
                    → Limpa sessão (Redis)
```

---

## 2. Mapa de nós por responsabilidade

### 2.1 Entrada e roteamento
| Nó N8N | Função |
|--------|--------|
| `Webhook` | Recebe POST do WhatsApp (via WABA/iPro). URL contém `id-transportadora` e `ambiente` |
| `Edit Fields webhook` | Normaliza campos: Nome, Numero, Tipo, Grupo, ID_Empresa, Media_ID, Audio_ID, id_transportadora, ambiente |
| `busca infos da transportadora` | Busca config da transportadora no Supabase por `id-transportadora` |
| `filtro mensagens sem conteudo` | Filtra mensagens vazias/inválidas antes de processar |
| `Switch` | Roteamento por tipo: audio / texto / imagem |

### 2.2 Gestão de sessão (Redis)
| Nó N8N | Função | TTL |
|--------|--------|-----|
| `busca placa` | Busca placa do motorista pelo número (chave: `Numero-placa`) | — |
| `Registra placa` | Salva placa no Redis após identificação | 15 dias |
| `salvar canhoto` | Salva estado do canhoto em processamento | — |
| `buscar canhoto1/2` | Recupera estado do canhoto | — |
| `deletar canhoto/url/placa` | Limpa Redis após gravar no Supabase | — |
| `salva imagem base 64` | Armazena imagem temporariamente | — |
| `busca imagem base 64` | Recupera imagem para reprocessamento | — |
| `salva url para download imagem` | Armazena URL da imagem WABA | — |

### 2.3 Identificação do motorista
| Nó N8N | Função |
|--------|--------|
| `Placa encontrada` | Verifica se placa já está no Redis |
| `Qual a sua placa?` | Envia mensagem pedindo a placa |
| `digitou a placa?` | Agente IA: extrai placa do texto/áudio (formato ABC1234 ou ABC1D23) |
| `placa?` | If: placa válida e preenchida? |
| `supabase - validar placa` | Busca motorista no `historico-cargas` pela placa |
| `Registra placa` | Salva placa no Redis |
| `ja pode mandar o canhoto` | Mensagem: "agora pode mandar a foto" |
| `Não encontrei a placa` | Mensagem: placa não encontrada, tente novamente |

### 2.4 Processamento de áudio
| Nó N8N | Função |
|--------|--------|
| `Pega url audio waba` | GET Meta Graph API para URL do áudio |
| `Baixar Audio1` | Download do áudio com auth WABA |
| `audio openai1` | Transcrição: `gpt-4o-mini-transcribe` (multipart) |
| `rename to text` | Normaliza output da transcrição |
| `Audio sem ID` | Trata áudio sem Media_ID |
| `Não consigo escutar o áudio` | Mensagem de erro para áudio inválido |

### 2.5 Processamento de imagem
| Nó N8N | Função |
|--------|--------|
| `Pega url imagem waba` | GET Meta Graph API para URL da imagem |
| `Baixar imagem` | Download da imagem com auth WABA |
| `Extract from File` | Converte binário → base64 |
| `imagem sem media_ID` | Trata imagem sem Media_ID |
| `mande a imagem novamente` | Mensagem de erro |

### 2.6 Leitura do canhoto (IA)
| Nó N8N | Função |
|--------|--------|
| `JWT` / `get access token` | Autenticação para IA (provavelmente Gemini) |
| `rota [teste]?` | Switch: ambiente prod vs teste |
| `juntador` | Monta prompt com imagem base64 |
| `IA baratinha para ler imagem 3.0 flash` | **Gemini 1.5 Flash**: lê o canhoto — extrai pedido, carimbo, assinatura, data, empresa |
| `separa saída em variáveis` | Estrutura output da IA em campos |
| `Separa variáveis` | Extrai: `pedido_numero`, `carimbo_presente`, `assinatura_presente`, `data_entrega`, `empresa_carimbo` |

### 2.7 Validações de negócio
| Nó N8N | Função |
|--------|--------|
| `Carimbo presente?` | Se empresa exige carimbo e não tem → `Pedir Carimbo` |
| `Tem numero do pedido?` | Se não identificou número → pede ao motorista |
| `supabase - validar pedido` | Busca pedido no `historico-cargas` (pedido + placa) |
| `placas batem?` | Compara placa do Redis com placa do pedido no Supabase |
| `ipro - Placa não bate` | Mensagem de erro de inconsistência |
| `canhoto existe?` / `canhoto existe? 1` | Verifica duplicidade no Redis |
| `não precisa de carimbo?` | Switch: empresa exige ou não carimbo |

### 2.8 Confirmação e correção
| Nó N8N | Função |
|--------|--------|
| `Formatador` | Monta mensagem de confirmação com dados lidos |
| `Confirmar dados (com carimbo)` | Envia dados ao motorista para confirmar |
| `controle de qualidade` | Agente IA: motorista quer alterar algo? (Sim/Não) |
| `Necessita alteração` | Agente IA: detecta tipo de correção (placa, pedido, carimbo, assinatura) |
| `Precisa corrigir?` / `precisa corrigir?` | If: processa correção ou finaliza |
| `AI Agent1` | Agente IA: processa correções solicitadas pelo motorista |
| `Mudanças sensíveis?` | Switch: mudança crítica (pedido, carimbo, assinatura) vs normal |
| `Pecisa alterar a placa?` | If: motorista quer trocar a placa? |

### 2.9 Gravação final
| Nó N8N | Função |
|--------|--------|
| `supabase - PATCH pedido` | Atualiza registro com: `data_entrega`, `url_storage_supabase`, campos validados |
| `deletar canhoto` / `deletar url` / `deletar placa` | Limpa Redis |

---

## 3. Integrações identificadas

| Serviço | Como usa | Credencial |
|---------|----------|-----------|
| **Meta WABA (Graph API v20.0)** | Baixa imagem/áudio do WhatsApp | `waba_auth` da transportadora |
| **iPro** | Envia mensagens ao motorista | `ipro_url` + `ipro_auth` da transportadora |
| **Supabase** | Banco principal: `historico-cargas`, configs | API key + Bearer |
| **Redis (Hetzner)** | Sessão temporária: placa, canhoto, imagem | Credencial Redis |
| **OpenAI** | Transcrição de áudio (`gpt-4o-mini-transcribe`), agentes de texto (`gpt-5-mini`, `gpt-5.1`) | API key |
| **Gemini** | Leitura de imagem do canhoto (`gemini-1.5-flash`) | JWT + access token |

---

## 4. Problemas identificados no N8N atual

| Problema | Impacto | Solução AIOS |
|----------|---------|-------------|
| **Sessão em Redis sem TTL explícito em todos os nós** | Risco de dados órfãos acumulando | Worker com TTL uniforme e cleanup automático |
| **Credenciais hardcoded** (API keys expostas no JSON) | Risco de segurança crítico | Variáveis de ambiente isoladas por transportadora |
| **Lógica de placa duplicada** (Switch + If + agente fazendo a mesma coisa) | Manutenção complexa, custo desnecessário de tokens | Um único agente de identificação com quality gate |
| **Sem retry inteligente** na leitura da imagem | Falha silenciosa se Gemini retornar vazio | Retry com fallback para modelo alternativo |
| **Sem log de erros estruturado** | Impossível debugar problemas em produção | Journey log automático em cada etapa |
| **Multi-tenant hardcoded por credencial** | Difícil escalar para nova transportadora | Config centralizada no Supabase, lookup por `id-transportadora` |
| **Fluxo de correção complexo demais** | Motorista pode ficar em loop | Limite de tentativas + escalação para atendente humano |

---

## 5. Arquitetura proposta em AIOS

```
workers/evidex/
├── webhook-receiver.js        # Express server: recebe POST do WhatsApp
├── session-manager.js         # Gestão de sessão (substitui Redis direto)
├── message-router.js          # Roteamento: audio/texto/imagem
├── audio-transcriber.js       # Download + transcrição OpenAI
├── image-downloader.js        # Download imagem WABA
└── supabase-client.js         # Wrapper Supabase com retry

agents/evidex/
├── placa-identifier.md        # Agente: identifica placa do texto/áudio do motorista
├── canhoto-reader.md          # Agente: lê canhoto com Gemini (extrai campos)
├── quality-controller.md      # Agente: detecta se motorista quer corrigir
├── correction-processor.md    # Agente: processa correções solicitadas

tasks/evidex/
├── identify-driver.md         # Task: identificar motorista por placa
├── process-canhoto.md         # Task: ler e validar imagem do canhoto
├── confirm-and-save.md        # Task: confirmar com motorista e gravar
└── handle-correction.md       # Task: processar correção de dados

workflows/evidex/
└── canhoto-processing.yaml    # Workflow completo orquestrando todos os agentes
```

---

## 6. Plano de migração (incremental)

### Fase 1 — Infraestrutura (sem quebrar o N8N atual)
- [ ] Criar `workers/evidex/webhook-receiver.js` (Express server)
- [ ] Criar `workers/evidex/session-manager.js` (substitui Redis)
- [ ] Criar `workers/evidex/supabase-client.js` (wrapper com retry + logging)
- [ ] Configurar variáveis de ambiente seguras (sem hardcode)

### Fase 2 — Agentes core
- [ ] Criar agente `canhoto-reader` (Gemini) com quality gate
- [ ] Criar agente `placa-identifier` com validação de formato
- [ ] Criar agente `quality-controller` (detecta correções)
- [ ] Testar contra casos reais do Arilu

### Fase 3 — Tasks e workflow
- [ ] Criar task `process-canhoto` com journey log
- [ ] Criar workflow `canhoto-processing.yaml`
- [ ] Rodar em paralelo com N8N (shadow mode)
- [ ] Validar outputs identicos

### Fase 4 — Cutover
- [ ] Migrar webhook do N8N para AIOS
- [ ] Monitorar por 48h
- [ ] Desativar N8N

---

## 7. Otimizações planejadas

| Otimização | Benefício |
|-----------|-----------|
| **LLM Router**: Gemini para imagem, GPT-4o-mini para texto, GPT-3.5 para classificações simples | Redução de custo estimada: 40-60% |
| **Cache de configuração da transportadora** | Elimina 1 query Supabase por mensagem |
| **Journey log automático** | Self-learning: identifica onde o fluxo mais falha |
| **Limite de tentativas por sessão** | Evita motorista em loop infinito |
| **Escalação automática para humano** | Após 3 tentativas sem sucesso → notifica supervisor |
| **Supabase direto** (sem Redis para sessão) | Simplifica infraestrutura, mantém persistência |

---

*Próximo passo: aprovação → início da Fase 1*
