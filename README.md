# timesmkt3 v4.5

**timesmkt3** â€” sistema de automacao de conteudo para marketing digital usando agentes de IA coordenados por um bot Telegram.

O sistema pesquisa, cria narrativa, gera imagens, produz videos, adapta copy para cada plataforma e publica â€” tudo automatizado com aprovacoes humanas em cada etapa.

> **VisÃ£o geral do sistema (pÃºblico)** â†’ [`doc/sistema.md`](doc/sistema.md)
> Arquitetura tecnica completa â†’ [`CLAUDE.md`](CLAUDE.md)
> Fluxo detalhado â†’ [`doc/fluxo-pipeline-v4.md`](doc/fluxo-pipeline-v4.md)

---

## Pipeline â€” 5 Estagios

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  STAGE 1 â€” Brief & Narrativa                           â”‚
â”‚  Research Agent (Tavily)                                â”‚
â”‚  Creative Director â†’ creative_brief.json                â”‚
â”‚  Copywriter â†’ narrative.json                            â”‚
â”‚  [APROVACAO]                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  STAGE 2 â€” Imagens                                      â”‚
â”‚  Se fonte=api: gera imagens (KIE/Pollinations)          â”‚
â”‚  Ad Creative Designer (Claude + Playwright)             â”‚
â”‚  â†’ ads/*.png (carousel + stories)                       â”‚
â”‚  [APROVACAO]                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  STAGE 3 â€” Video                                        â”‚
â”‚  Quick: slideshow 10-20s (sempre roda)                  â”‚
â”‚  Pro: 30-70s cinematografico (sob demanda)              â”‚
â”‚    Narracao â†’ Photography Dir â†’ Scene Plan â†’ Render     â”‚
â”‚  [APROVACAO]                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  STAGE 4 â€” Plataformas                                  â”‚
â”‚  Instagram/YouTube/TikTok/Facebook/Threads/LinkedIn     â”‚
â”‚  [APROVACAO]                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  STAGE 5 â€” Distribuicao                                 â”‚
â”‚  Upload Supabase â†’ Publish MD â†’ Posting                 â”‚
â”‚  [APROVACAO FINAL]                                      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Agentes

| # | Agente | Funcao | Stage |
|---|---|---|---|
| 1 | Research Agent | Pesquisa tendencias, concorrentes, audiencia via Tavily | 1 |
| 2 | Diretor Criativo | Define angulo estrategico + direcao visual | 1 |
| 3 | Copywriter | Cria narrativa central da campanha | 1 |
| 4 | Ad Creative Designer | Cria imagens estaticas (HTML -> PNG via Playwright) | 2 |
| 5 | Video Quick | Slideshow rapido com imagens do Designer (10-20s) | 3 |
| 6 | Video Pro | Producao profissional: rascunho -> aprovacao -> final (30-60s) | 3 |
| 7 | Instagram Agent | Carousel + stories + reels + captions | 4 |
| 8 | YouTube Agent | Titulo SEO + descricao + tags + shorts | 4 |
| 9 | TikTok Agent | Video curto 9:16 + caption + hook 2s | 4 |
| 10 | Facebook Agent | Feed + stories + reels + video 16:9 | 4 |
| 11 | Threads Agent | Posts conversacionais (max 500 chars) | 4 |
| 12 | LinkedIn Agent | Post profissional + carousel PDF | 4 |
| 13 | Distribution Agent | Guardar + agendar + publicar | 5 |

---

## Como Funciona

| Componente | Papel |
|---|---|
| **Bot Telegram** (`telegram/bot.js`) | Controlador â€” recebe instrucoes, gerencia aprovacoes, avanca etapas |
| **Orchestrator** (`pipeline/orchestrator.js`) | Enfileira jobs no BullMQ por etapa |
| **Worker** (`pipeline/worker.js`) | Executa agentes via Claude CLI |
| **Agentes** | Especialistas â€” cada um le seu SKILL.md + knowledge files |
| **Agente Revisor** | Aprovador automatico (modo "agente") |

Cada agente roda como subprocess Claude (`claude -p <prompt> --dangerously-skip-permissions`). O bot spawna o worker, escuta sinais no stdout e avanca o pipeline.

---

## Modos de Aprovacao

Cada etapa pode ter um modo independente:

| Modo | Comportamento |
|---|---|
| `humano` | Pausa e espera resposta no Telegram **(padrao)** |
| `agente` | Agente Revisor avalia e decide automaticamente |
| `auto` | Avanca sem interacao |

```
Pipeline rapido      -> todas "auto", notificacoes: false
Pipeline monitorado  -> todas "agente", notificacoes: true
Distribuicao segura  -> stages 1-4 "auto", stage 5 "humano"
```

Configurar via `/modos <etapa> <modo>` no Telegram ou no payload.

---

## Fontes de Imagem

| Valor | Alias | Comportamento |
|---|---|---|
| `api` | â€” | Provider de IA do .env (IMAGE_PROVIDER) ou do payload |
| `free` | `gratis` | Banco de imagens gratis (FREE_IMAGE_PROVIDER: pexels, unsplash, pixabay) |
| `brand` | `marca` | Imagens de assets/ e imgs/ do projeto |
| `folder` | `pasta` | Pasta especifica via image_folder no payload |

Classificacao automatica:
- **banner** â€” imagem com texto/logo (nunca recorta, so letterbox)
- **clip** â€” arquivo de video (usa direto como fonte)
- **raw** â€” foto limpa (aplica Ken Burns: zoom, pan, drift)

---

## Video Quick vs Pro

| | Quick (default) | Pro (sob demanda) |
|---|---|---|
| Relacao | Independentes â€” podem rodar juntos na mesma campanha | Independentes â€” podem rodar juntos na mesma campanha |
| Trigger | Sempre roda (skip_video para pular) | `video_mode: 'pro'` no payload |
| Duracao | 10-20s | 30-60s |
| Imagens | Usa PNGs do Designer (ads/) | Usa imgs/ (raw API) e assets/ (marca) â€” nunca ads/ |
| Narracao | Opcional | Obrigatoria |
| Musica | Opcional | Sim |
| Fluxo | Direto | Rascunho -> aprovacao -> final |
| Texto | Topo ou centro (nunca em baixo) | Topo ou centro (nunca em baixo) |

---

## Toggle Simples / Premium

Dois agentes suportam modo simples (rapido) e premium (qualidade maxima):

| Agente | Simples (default) | Premium |
|---|---|---|
| Photography Director | Sonnet + arquivos injetados (~1-2min) | Opus + le 8 arquivos (~5-8min) |
| Scene Plan | Sonnet + photo plan injetado (~1-2min) | Opus + prompt extenso completo (~5-8min) |

Comandos no briefing:
- `foto simples` / `foto premium` â€” controla o Photography Director
- `videoplan simples` / `videoplan premium` â€” controla o Scene Plan

---

## Plataformas

Agentes de plataforma (Stage 4) adaptam a narrativa para cada rede. So rodam as plataformas em `platform_targets`.

| Plataforma | Imagem | Video | Texto |
|---|---|---|---|
| Instagram | carousel 1:1 + stories 9:16 | reels 9:16 | caption + hashtags |
| YouTube | thumbnail 16:9 | video 16:9 + shorts 9:16 | titulo + descricao + tags |
| TikTok | â€” | video 9:16 | caption curto |
| Facebook | feed 1:1/16:9 + stories 9:16 | video 16:9 + reels 9:16 | post longo |
| Threads | opcional | â€” | post 500 chars |
| LinkedIn | 1200x627 | â€” | post profissional |

Cada agente pode pedir retrabalho (`rework_needed`, `video_format_request`) se o formato visual nao atende.

---

## Distribuicao (Stage 5)

O Distribution Agent tem 3 responsabilidades:

1. **Guardar** â€” upload midia para Supabase, gera `media_urls.json`
2. **Agendar** â€” monta calendario unificado, gera Publish MD
3. **Publicar** â€” detecta APIs no .env, publica ou marca como manual

A publicacao so executa quando o usuario referencia o Publish MD pelo nome.

| Plataforma | API | Status |
|---|---|---|
| Instagram | Graph API | Implementado |
| YouTube | Data API (OAuth) | Implementado |
| Threads | graph.threads.net | Implementado |
| Facebook | Graph API | Placeholder |
| TikTok | Content Posting API | Placeholder |
| LinkedIn | Marketing API | Placeholder |

---

## Providers de Midia

O sistema escolhe automaticamente baseado nas API keys configuradas.

### Imagens

| Provider | Custo | Tipo |
|---|---|---|
| **Kie.ai Z-Image** | ~$0.004/img | Geracao por IA (padrao) |
| **Pollinations.ai** | Gratis | Geracao por IA (FLUX Schnell) |
| DALL-E 3 | ~$0.04/img | Geracao por IA |
| Stability AI | ~$0.003/img | Geracao por IA |
| **Pexels** | Gratis | Fotos stock |
| Unsplash | Gratis | Fotos stock |
| Pixabay | Gratis | Fotos + audio + musica |

### Narracao (TTS)

| Provider | Custo | Qualidade |
|---|---|---|
| **ElevenLabs** | $0.30/1k chars | Excelente |
| **Fish Audio (Bella)** | plano starter | Narracao storytelling |
| MiniMax | ~$0.01/1k chars | Alta |
| **Piper (local)** | Gratis | Boa |

O fluxo de fallback tenta vozes de TTS na ordem `ElevenLabs â†’ Fish Audio (Bella) â†’ MiniMax â†’ Piper`. Quando o ElevenLabs nÃ£o estÃ¡ disponÃ­vel ele jÃ¡ aciona a Fish, que usa a voz Bella por padrÃ£o â€” bastam `FISH_AUDIO_API_KEY` e o texto em pt-BR para ter uma narraÃ§Ã£o narrativa limpa.

MiniMax:
- `MINIMAX_API_KEY` e `MINIMAX_GROUP_ID`
- obter em: `https://platform.minimax.io/user-center/basic-information`

#### Vozes ElevenLabs (default: rachel)

| Voz | Estilo | Uso recomendado |
|---|---|---|
| `rachel` | Calorosa, emocional (F) | Campanhas emocionais, storytelling **(padrao)** |
| `bella` | Amigavel, clara (F) | Produto, tutorial |
| `domi` | Forte, confiante (F) | Empoderamento, lancamentos |
| `antoni` | Profissional (M) | Corporativo, B2B |
| `josh` | Profundo, quente (M) | Luxo, premium |
| `arnold` | Energetico, ousado (M) | Promocoes, urgencia |

### Selecao automatica

```
Imagem -> Kie.ai -> Pollinations -> DALL-E -> Pexels (fallback gratis)
Voz    -> ElevenLabs -> Fish Audio (Bella) -> MiniMax -> Piper (fallback local)
Musica -> Pixabay (gratis) ou Suno/ElevenLabs (pago)
```

Verificar: `npm run media:status`

---

## Efeitos de Video

### Camera

| Efeito | Uso automatico |
|---|---|
| `push-in` | Hooks, impacto |
| `pull-out` | Revelacoes |
| `ken-burns-in` / `out` | Produto, flashbacks |
| `pan-left` / `right` / `up` / `down` | Narrativa |
| `drift` | Emocional |
| `parallax-zoom` | Dinamico |
| `breathe` | CTAs |

### Texto

| Animacao | Uso automatico |
|---|---|
| `blur-in` | Hooks |
| `slide-up` / `down` | Produto |
| `per-word` | Conexao |
| `punch-in` | Reveals |
| `typewriter` | Flashbacks |
| `bounce-in` | CTAs |

---

## Regras de Texto sobre Imagens

1. **Analisar a imagem antes** de posicionar texto
2. **Nunca cobrir rostos** â€” texto so em areas livres
3. **Texto deve caber no frame** â€” padding 40px, overflow hidden
4. **Gradientes localizados** â€” so na zona do texto, opacidade 0.4-0.7

| Imagem com... | Onde colocar texto |
|---|---|
| Pessoas no centro | Rodape ou topo |
| Pessoas na esquerda | Direita |
| Produto no centro | Topo ou rodape |
| Texto ja na imagem | Nao duplicar |

---

## DireÃ§Ã£o Visual dos Ads â€” Quem Decide o "Formato"

O visual de cada campanha (paleta, mood, tipografia, estilo fotogrÃ¡fico) Ã© decidido em **duas etapas em cadeia**, sem nenhum parÃ¢metro fixo no payload por padrÃ£o:

### 1) Creative Director gera o `visual_direction`

`skills/creative-director/SKILL.md` lÃª o `research_brief.md` e produz `creative/creative_brief.json` contendo o bloco `visual_direction`:

```json
"visual_direction": {
  "mood": "Ã­ntimo e caloroso",
  "dominant_colors": ["#F5C47A", "#FF8C5A", "#0099FF"],
  "accent_colors": ["#FFD700"],
  "photography_style": "retratos emocionais, close-ups de mÃ£os...",
  "typography_mood": "serif elegante com hierarquia clara",
  "key_visual_metaphor": "abraÃ§o como ato de cuidado"
}
```

Esse bloco **Ã© o que define o formato visual da campanha**. O agente decide pelo tema â€” por isso campanhas de temas distintos (ex.: `c0093-seis_chapeus` dark+azul vs. `c0098-dias_das_maes` Ã¢mbar+coral) saem com identidades muito diferentes.

### 2) Ad Creative Designer renderiza seguindo o brief

`skills/ad-creative-designer/SKILL.md` lÃª o `creative_brief.json` e produz `ads/layout.json` + HTML/CSS/PNG. Tem liberdade total na estrutura do JSON e no design â€” por isso atÃ© a **shape do `layout.json`** difere entre campanhas (alguns tÃªm `typography`, outros tÃªm `concept`+`accent_color`, etc.).

### Override manual via cockpit (UI v3.4+)

Quando vocÃª precisar **forÃ§ar consistÃªncia visual entre campanhas** (ex.: lote de 90 vÃ­deos que precisam ter a mesma identidade), o Gerador (`/gerador` no cockpit) tem o accordion **"DireÃ§Ã£o visual (override do Creative Director)"** com os campos:

| Campo no form | Vai para o payload | Efeito |
|---|---|---|
| Layout type | `visual_direction_override.ad_layout_type` | `auto` / `product_focus` / `split` / `lifestyle` |
| Mood / atmosfera | `visual_direction_override.mood` | sobrescreve o mood escolhido pelo agente |
| Cores dominantes | `visual_direction_override.dominant_colors` (array) | hex separados por vÃ­rgula |
| Cores de acento | `visual_direction_override.accent_colors` (array) | hex separados por vÃ­rgula |
| Photography style | `visual_direction_override.photography_style` | string longa |
| Typography mood | `visual_direction_override.typography_mood` | string curta |

Vazio = agente decide. Preenchido = vira chave `visual_direction_override` no payload da campanha.

> âš ï¸ **Importante:** o `visual_direction_override` hoje Ã© gravado no payload mas o pipeline ainda **nÃ£o consome esses campos automaticamente**. Para que o override tenha efeito, Ã© preciso ajustar `skills/creative-director/SKILL.md` para mesclar `payload.visual_direction_override` no `creative_brief.visual_direction` como hard constraint (sobrescrevendo a decisÃ£o do agente). Esse hook fica do lado do skill â€” a UI jÃ¡ entrega os dados prontos no payload.

---

## Supabase

Usado **apenas como Storage** para hospedar midia das campanhas. Sem tabelas no banco.

```
Upload (ads/*.png + video/*.mp4) -> Supabase Storage -> media_urls.json -> APIs de publicacao
```

Configuracao:
1. Criar bucket `campaign-uploads` marcado como publico
2. No `.env`: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`

---

## Estrutura do Projeto

```
timesmkt3/
â”œâ”€â”€ prj/                             # Projetos (um por cliente/marca)
â”‚   â””â”€â”€ <projeto>/
â”‚       â”œâ”€â”€ assets/                  # Fotos e midia da marca
â”‚       â”œâ”€â”€ imgs/                    # Imagens de campanha
â”‚       â”‚   â””â”€â”€ banners/             # Banners (nunca recortados)
â”‚       â”œâ”€â”€ knowledge/               # brand_identity.md, product_campaign.md, platform_guidelines.md
â”‚       â””â”€â”€ outputs/
â”‚           â””â”€â”€ <campanha>/
â”‚               â”œâ”€â”€ creative/        # creative_brief.json/.md
â”‚               â”œâ”€â”€ copy/            # narrative.json/.md
â”‚               â”œâ”€â”€ ads/             # layout.json, HTMLs, PNGs
â”‚               â”œâ”€â”€ video/           # scene plans, MP4s
â”‚               â”œâ”€â”€ platforms/       # instagram.json, youtube.json, etc.
â”‚               â”œâ”€â”€ audio/           # narracoes geradas
â”‚               â”œâ”€â”€ imgs/            # imagens geradas via API
â”‚               â”œâ”€â”€ logs/            # log por agente
â”‚               â”œâ”€â”€ media_urls.json  # URLs publicas do Supabase
â”‚               â””â”€â”€ Publish *.md     # guia de publicacao
â”‚
â”œâ”€â”€ pipeline/
â”‚   â”œâ”€â”€ orchestrator.js              # Enfileira jobs no BullMQ (5 stages)
â”‚   â”œâ”€â”€ worker.js                    # Executa agentes via Claude CLI
â”‚   â”œâ”€â”€ render-video-ffmpeg.js       # Renderiza video com ffmpeg
â”‚   â”œâ”€â”€ render-video.js              # Renderiza video com Remotion (qualidade profissional)
â”‚   â”œâ”€â”€ generate-image-kie.js        # Geracao de imagens via KIE API
â”‚   â”œâ”€â”€ generate-image-pollinations.js # Geracao de imagens via Pollinations
â”‚   â”œâ”€â”€ generate-audio.js            # Narracao via ElevenLabs
â”‚   â”œâ”€â”€ supabase-upload.js           # Upload para Supabase Storage
â”‚   â”œâ”€â”€ publish_now.js               # Publicacao generica em todas as plataformas
â”‚   â”œâ”€â”€ queues.js / redis.js         # Configuracao BullMQ + Redis
â”‚   â””â”€â”€ payloads/                    # JSONs de campanha de exemplo
â”‚
â”œâ”€â”€ telegram/
â”‚   â”œâ”€â”€ bot.js                       # Comandos, fluxo, aprovacoes
â”‚   â”œâ”€â”€ session.js                   # Sessao por chat
â”‚   â”œâ”€â”€ formatter.js                 # Formatacao de mensagens
â”‚   â”œâ”€â”€ media.js                     # Envio de midia
â”‚   â””â”€â”€ config.js                    # Configuracao
â”‚
â”œâ”€â”€ skills/                          # Specs dos agentes (SKILL.md cada)
â”œâ”€â”€ media/                           # Modulo multi-provider
â”œâ”€â”€ remotion-ad/                     # Projeto Remotion
â”œâ”€â”€ doc/                             # Documentacao
â”œâ”€â”€ .env.example                     # Template de variaveis
â””â”€â”€ CLAUDE.md                        # Documentacao tecnica da arquitetura
```

---

## Comandos do Bot

| Comando | Funcao |
|---|---|
| `/campanha <nome>` | Inicia pipeline completo |
| `/projetos` | Lista projetos |
| `/projeto <nome>` | Seleciona projeto ativo |
| `/status` | Status do pipeline com fases detalhadas |
| `/outputs` | Lista campanhas geradas |
| `/relatorio <campanha>` | Resumo + inventario de arquivos |
| `/enviar <campanha> [tipo]` | Recebe arquivos (imagens, videos, audio, copy, tudo) |
| `/modos [etapa] [humano\|agente\|auto]` | Configura modos de aprovacao |
| `/rerun <campanha> [stage]` | Reprocessa stages (mostra config antes de rodar) |
| `/loterun <c1,c2,...> <etapas>` | Rerun em sÃ©rie para vÃ¡rias campanhas |
| `/continue <campanha>` | Continua campanha de onde parou |
| `/cancel` | Cancela pipeline ativo |
| `/aprovar` | Re-verifica aprovacoes pendentes |
| `/lote` | Ajuda de lotes |
| `/lotequick <ativos\|todos\|campanhas ...> [qtd] fonte <tipo> [modo <enxuto\|normal>]` | Batch quick |
| `/lotecontinue <batch_id>` | Retoma lote apÃ³s erro |
| `/import <campanhas> <origem>` | Copia assets para `imports/` |

### Painel de Briefing

Ao iniciar campanha, o bot mostra tabela de config:

```
Config       Atual         Opcoes
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  Fonte imgs brand          brand / api / free / screenshot
  Provider   KIE            kie / pollinations
  Modelo     Z-Image        z-image / flux / flux-2 / seedream
  Quick      sim            sim / sem quick
  Pro        nao            pro
  Narrador   rachel         rachel / bella / domi / antoni / josh / arnold
  Duracao    60s            30 / 60
  Estilo     inema_hightech inema_hightech / 01_hero_film
  Dir.Foto   simples        simples / premium
  Scene plan simples        simples / premium
  Fundo quick escuro        escuro / blur
  Idioma     pt-BR          pt-BR / en
  Aprovacao  humano         humano / auto
  Notif      on             on / off
```

Digite o comando para alterar (ex: `pro`, `narrador bella`, `modelo flux`). `sim` para rodar, `nao` para cancelar.

### /rerun â€” Reprocessar Etapas

```bash
/rerun c0038 3 pro              # refazer video pro
/rerun c0038 2 api              # refazer imagens com API
/rerun c0038 imagens api        # mesmo caso, usando alias
/rerun c0038 3 pro cleanplan    # limpar planos e refazer
/rerun c0038 3 pro cleanall     # limpar tudo (plan+img+audio)
```

### /lotequick â€” Batch Quick

Comando:

```text
/lotequick <ativos|todos|campanhas ...> [qtd] fonte <tipo> [modo <enxuto|normal>]
```

Exemplos:

```text
/lotequick ativos 10 fonte solido #0D0D0D modo enxuto
/lotequick todos 5 fonte brand modo normal
/lotequick campanhas c2,c44,c45 fonte solido #0D0D0D modo enxuto
/lotequick c2,c44,c45 fonte brand modo normal
```

Regras:

- `ativos` usa apenas campanhas nÃ£o arquivadas
- `todos` inclui arquivadas
- `campanhas ...` e lista explÃ­cita respeitam os IDs informados, mesmo se estiverem arquivados
- `fonte solido #0D0D0D` gera slides tipogrÃ¡ficos via `ad_creative_designer`; depois o `video_quick` usa esses PNGs
- `modo enxuto` usa quick otimizado para lote
- `modo normal` usa o quick completo
- O lote grava manifesto e estado em `prj/<projeto>/imports/<batch>/`
- Os vÃ­deos finais continuam na campanha original e tambÃ©m sÃ£o copiados para `imports/<batch>/videos/`

Flags: `cleanplan`, `cleanimg`, `cleanaudio`, `cleanall`

### /loterun â€” Rerun em SÃ©rie (mÃºltiplas campanhas)

Aplica a mesma operaÃ§Ã£o do `/rerun` em vÃ¡rias campanhas, uma por vez. Ãštil para gerar vÃ¡rios vÃ­deos Pro, re-renderizar imagens em lote, ou refazer plataformas para muitas campanhas.

Comando:

```text
/loterun <c1,c2,...> <etapas> [flags]
```

Aceita lista (`c1,c2,c3`) ou range (`c1-c5`). Etapas e flags seguem exatamente a sintaxe do `/rerun`.

Exemplos:

```text
/loterun c10,c11,c12 video pro template data_story
/loterun c20-c25 imagens api
/loterun c1,c2,c3 video pro template gatilhos cleanall
/loterun c40,c41,c42 plataformas
```

Comportamento:

- ConfirmaÃ§Ã£o `sim`/`nÃ£o` antes de iniciar (mostra a lista de campanhas + config da primeira)
- Roda **em sÃ©rie** (uma por vez, aguarda a anterior terminar)
- NotificaÃ§Ãµes de progresso: `â–¶ N/total` / `âœ… N/total` / `âŒ N/total`
- Se uma falhar, **segue para a prÃ³xima** por padrÃ£o
- Resumo no final: `Lote rerun concluÃ­do â€” X/Y OK. Falhas: ...`

Tambem e possivel ajustar a fonte antes de confirmar com `sim`:

```text
/rerun c0038 imagens
fonte api
sim
```

Outros exemplos:

```text
fonte pasta prj/inema/imgs/site
fonte screenshot https://inema.com.br https://app.inema.club
fonte brand
```

---

## Templates Standalone (Factory CLI)

VÃ­deos autorais INEMA gerados via scripts CLI dedicados â€” **nÃ£o passam pelo bot/pipeline**. Rodam diretos no terminal e usam config prÃ³pria em `config/profissoes-30.js` (90 profissÃµes cadastradas).

| Template | Script render | Formato | DuraÃ§Ã£o | Mensagem |
|---|---|---|---|---|
| **CriaProf** | `render-criaprof.js <slug>` | 1:1 1080Ã—1080 | 45s | Jornada infÃ¢ncia â†’ profissional ("desde crianÃ§a ela sabia") |
| **GERTRAN** | `render-gertran.js <slug>` | 9:16 1080Ã—1920 | 31s | "VocÃª sempre se adaptou. FaÃ§a de novo com IA." (pÃºblico 35+) |
| **CriaProf-CTA** | `render-criaprof-cta-916.js <slug> <prof\|generic>` | 9:16 1080Ã—1920 | 37s | Hook forte 0-3s + jornada + CTA pesado 33-37s |

### Como rodar

**Uma profissÃ£o (ambos templates antigos):**
```bash
node batch-profissoes.js fisioterapeuta
```
Pipeline completo (~3.4 min): gen imgs (50 CriaProf + 20 nostalgia GERTRAN) â†’ TTS Chatterbox bella â†’ Whisper word-level â†’ render dos 2 vÃ­deos.

**Lote (criaprof + gertran):**
```bash
node batch-profissoes.js all                    # todas 90
node batch-profissoes.js new                    # sÃ³ faltantes
node batch-profissoes.js fisio,medica,dentista  # CSV
```

**CriaProf-CTA (3Âº template, 9:16 com hook + CTA):**
```bash
node batch-criaprof-cta.js <slug>              # gera ambas variantes (prof + generic)
node batch-criaprof-cta.js all                 # 90 Ã— 2 = 180 vÃ­deos
```
Variantes:
- `prof` â€” hook customizado por profissÃ£o (`FISIOTERAPIA / MUDOU. E AGORA?`)
- `generic` â€” hook genÃ©rico (`SUA PROFISSÃƒO / MUDOU. E AGORA?`)

Reaproveita as 50 imgs CriaProf existentes; gera narraÃ§Ã£o nova com prefix `"A {profissÃ£o} mudou. E agora?"` entrando forte em t=0.

**CriaProf-CTA com A/B testing narrativo (v1-v5):**
```bash
# Gerar TTS + whisper para uma profissÃ£o em 5 estilos Ã— 2 variantes
node gen-narrations-multi.js fisioterapeuta

# Renderizar versÃ£o especÃ­fica
node render-criaprof-cta-916.js fisioterapeuta prof 3
# â†’ prj/inema/videos/criaprof-cta-916/.../fisioterapeuta-cta-prof-v3-32s.mp4
```

6 estilos narrativos para audience self-select â€” o hook Ã© sempre `"{PROFISSÃƒO} MUDOU. E AGORA?"`:

| VersÃ£o | Estilo | Abertura | Trilha |
|---|---|---|---|
| v0 | Original cronolÃ³gica | narraÃ§Ã£o padrÃ£o criaprof | pad ambient (freesound 569920) |
| v1 | MemÃ³ria nostÃ¡lgica | "VocÃª lembra quando tudo era manual?" | violÃ£o fingerpicking acÃºstico (CC0) |
| v2 | Confidente conversacional | "Lembra como tudo era diferente quando vocÃª comeÃ§ou?" | lo-fi jazz warm (CC0) |
| v3 | ProvocaÃ§Ã£o direta | "Pensa rÃ¡pido: quantas vezes essa profissÃ£o mudou?" | percussÃ£o cinematic build (CC-BY) |
| v4 | Intimista contagem | "VocÃª consegue lembrar quantas vezes essa profissÃ£o se reinventou?" | orchestral warm strings (CC-BY) |
| v5 | RevelaÃ§Ã£o | "E se eu te disser que vocÃª jÃ¡ viveu isso antes?" | bgm_v1 cinematogrÃ¡fico |

As narraÃ§Ãµes v1-v5 sÃ£o geradas via template engine por categoria de profissÃ£o (`config/profissoes-narrations-multi.js` â€” `getNarration(slug, version)`). A trilha muda automaticamente por versÃ£o via `getMusicForVariantAndVersion(variant, version)`.

Nomenclatura dos arquivos com versÃ£o: `<slug>-cta-<variant>-v<N>-<dur>s.mp4`.
DistribuiÃ§Ã£o planejada: YouTube Shorts â€” audience self-select por estilo de narrativa.

### Outputs

```
prj/inema/videos/criaprof/<slug>_<date>/video/<slug>-30s.mp4
prj/inema/videos/gertran/<slug>_<date>/video/gertran-<slug>-31s.mp4
prj/inema/videos/criaprof-cta-916/<slug>_<date>/video/<slug>-cta-{prof|generic}-37s.mp4
prj/inema/videos/criaprof-cta-916/<slug>_<date>/video/<slug>-cta-{prof|generic}-v{1-5}-<dur>s.mp4
```

### Adicionar nova profissÃ£o

Editar `config/profissoes-30.js` (ou `profissoes-extras.js` / `profissoes-extras-3.js`) com slug + character + props + narraÃ§Ãµes + hook + nostalgia. Para CTA-916, adicionar mapping em `config/profissoes-cta.js` (`noun` + `prefix`).

> **Estes templates nÃ£o estÃ£o integrados ao bot Telegram.** Para vÃ­deos via bot use o pipeline normal (`/campanha`) com `worker-video-quick.js` / `worker-video-pro.js`.

---

## Comecando do Zero

### 1. Instalar

```bash
npm install
cd remotion-ad && npm install && cd ..
npx playwright install chromium
```

### 2. Redis

```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

### 3. Configurar .env

```bash
cp .env.example .env
```

Minimo:
```
TAVILY_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Recomendados:
```
IMAGE_PROVIDER=kie         # ou pollinations (gratis)
KIE_API_KEY=               # se IMAGE_PROVIDER=kie
PEXELS_API_KEY=            # fotos stock gratis
ELEVENLABS_API_KEY=        # narracao de video
FISH_AUDIO_API_KEY=        # fallback Bella para storytelling em PT-BR
```

Publicacao:
```
INSTAGRAM_ACCOUNT_ID=
INSTAGRAM_ACCESS_TOKEN=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=
THREADS_USER_ID=
THREADS_ACCESS_TOKEN=
```

### 4. Rodar o bot (PM2)

```bash
# Iniciar via ecosystem
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# Reiniciar (apos alterar bot.js ou worker.js)
pm2 restart ecosystem.config.cjs

# Ver status / logs
pm2 list
pm2 logs timesmkt3-bot --lines 30
pm2 logs timesmkt3-worker --lines 30

# Limpar tudo
pm2 delete all
```

Atalho para ambiente local completo:

```bash
./startlocal.sh
```

O script:
- valida `.env`
- instala dependencias se faltarem
- garante o container `redis`
- inicia ou reinicia `timesmkt3-bot` e `timesmkt3-worker` no PM2 sem duplicar processos

Depois no Telegram: `/campanha minha_campanha`

Deploy de VPS mais direto em [deploy/DEPLOY.md](./deploy/DEPLOY.md).

### 5. Teste Guiado No Telegram

Teste simples do fluxo com fallback de pesquisa:

```text
/campanha teste_local --platforms instagram --images 2 --videos 0 --img-source brand --skip-research
```

Quando o bot enviar a confirmaÃ§Ã£o, responder:

```text
sim
```

Validar:
- stage 1 avanÃ§a mesmo com `skip_research`
- o sistema gera `research_results.json` e `creative_brief.json` simulados
- a campanha segue para imagens sem travar no monitor

Teste mais forte para validar mÃºltiplos skips:

```text
/campanha teste_skips --platforms instagram,threads --images 2 --videos 1 --skip-research --skip-image
```

Validar:
- stage 1 nÃ£o trava
- stage 2 gera fallback de `skip_image`
- `video_quick` nÃ£o roda sem `ads` reais
- plataformas continuam com os artefatos simulados

Para acompanhar localmente:

```bash
npx pm2 logs timesmkt3-bot --lines 100
npx pm2 logs timesmkt3-worker --lines 100
```

Teste do lote quick:

```text
/lotequick campanhas c2,c44,c45 fonte solido #0D0D0D modo enxuto
```

Validar:
- o bot mostra `Modo: enxuto`
- campanhas explÃ­citas sÃ£o respeitadas
- no `solid`, o `Ad Creative Designer` roda antes do `Video Quick`
- o manifesto do lote Ã© salvo em `imports/` com `command_text`, `quick_mode`, `source_spec` e `selected_campaigns`

### 5.1 Timeout de aprovacao e retomada

Quando uma etapa exige aprovacao e a resposta nao chega dentro do prazo:

- a tentativa atual da etapa expira
- o job antigo nao e reativado por aprovacao tardia
- o fluxo nao fica preso esperando indefinidamente

Se a aprovacao chegar depois do timeout, o bot informa que ela expirou e que o fluxo ja seguiu adiante.

Para retomar depois:

```text
/continue c0042
```

Ou para refazer uma etapa especifica:

```text
/rerun c0042 video quick
```

### 6. Rodar pipeline manualmente

```bash
# Enfileirar com payload
node pipeline/orchestrator.js --file pipeline/payloads/coldbrew_demo.json
```

### 7. Publicar manualmente

```bash
# Dry run (sem publicar de verdade)
node pipeline/publish_now.js prj/inema/outputs/pascoa_2026-04-20 --dry-run

# Publicar
node pipeline/publish_now.js prj/inema/outputs/pascoa_2026-04-20
```

### 7. Ver providers ativos

```bash
npm run media:status
```

---

## Problemas Comuns

| Problema | Solucao |
|---|---|
| `npm install` falha | Instalar Node.js v18+ |
| Playwright nao renderiza | `npx playwright install chromium` |
| Redis nao conecta | `docker run -d --name redis -p 6379:6379 redis:alpine` |
| Remotion falha | `cd remotion-ad && npm install` |
| ElevenLabs 401 | Verificar key e permissoes em elevenlabs.io |
| Video sai igual ao template | Passar scene_plan.json como argumento no render-video.js |
| Texto sobre rosto | Seguir regras de posicionamento (analisar imagem antes) |
| Instagram token expirado | Renovar a cada 60 dias |
| Aprovacao expirou | Retomar com `/continue CAMPANHA` ou `/rerun CAMPANHA ETAPA` |

---

## Roadmap v5

- ~~Fila multi-campanha por chat no Telegram~~ â€” entregue parcialmente via `/loterun` (sÃ©rie) e `/lotequick` (batch quick). Falta: fila realmente paralela entre chats.
- Status por campanha: `/status` listando mais de uma campanha ativa ou enfileirada no mesmo chat.
- AprovaÃ§Ãµes por campanha: respostas de aprovacao, `/continue`, `/rerun` e `/cancel` sempre vinculadas explicitamente a uma campanha, sem confundir contextos.
- Publicacao em fila de producao para clips `yt-pub-lives`: permitir enfileirar clips para processamento e publicacao ordenada nesse destino.
- Suporte a OpenRouter no v5: permitir usar OpenRouter no lugar do Claude para os agentes do pipeline (sem mexer no v4), habilitando `/model` com aliases `qwen36`, `qwen35` e `qwen25` e apontando para o `OPENROUTER_BASE_URL`/`OPENROUTER_API_KEY` configurados no `.env`.
- Garantia de Ã¡udio em Stage 3: renderizadores quick/pro vÃ£o falhar explicitamente quando a narraÃ§Ã£o exigida estiver ausente para que o bot reporte o erro em vez de entregar vÃ­deos silenciosos.

---

## Documentacao

| Documento | Conteudo |
|---|---|
| **[doc/sistema.md](doc/sistema.md)** | **VisÃ£o geral pÃºblica â€” comece por aqui** |
| [CLAUDE.md](CLAUDE.md) | Arquitetura tecnica completa + versionamento + operaÃ§Ã£o |
| [doc/resumo-projeto.md](doc/resumo-projeto.md) | Resumo do projeto |
| [doc/pipeline-aprovacoes.md](doc/pipeline-aprovacoes.md) | Pipeline e fluxo de aprovacoes |
| [doc/agentes-criacao.md](doc/agentes-criacao.md) | Agentes de criacao (stages 1-3) |
| [doc/agentes-distribuicao.md](doc/agentes-distribuicao.md) | Agentes de plataforma e distribuicao (stages 4-5) |
| [doc/video-pro-pipeline-completo.md](doc/video-pro-pipeline-completo.md) | Video Pro â€” pipeline completo |
| [doc/import-worker-campanhas.md](doc/import-worker-campanhas.md) | Comando `/import` â€” lotes de assets |
| [doc/modulos.md](doc/modulos.md) | Mapa de todos os mÃ³dulos (`pipeline/` e `skills/`) |
| [skills/video-art-direction/SKILL.md](skills/video-art-direction/SKILL.md) | Video Art Direction â€” 12 presets de estilo visual |

---

Projeto adaptado da comunidade INEMA TDS - Marca Arckhe