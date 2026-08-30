# SEO, performance e segurança — site novo (2026)

## SEO

| Item | Estado |
|---|---|
| `title` único por página | ✅ index e cardapio |
| `meta description` única por página | ✅ |
| `<h1>` único e relevante | ✅ |
| Hierarquia H2/H3 | ✅ sem saltos |
| Canonical | ✅ ambas as páginas |
| Open Graph + Twitter Card | ✅ |
| Schema.org | ✅ `BarOrPub` + `AggregateRating` (4,5 / 164, dados reais) + `Menu` |
| NAP consistente (nome/endereço/telefone) | ✅ hero, contato, rodapé, schema, footer da cardapio |
| `openingHoursSpecification` | ✅ (ver pendência de domingo no README) |
| Palavras-chave locais | ✅ "bar Paulista PE", "petiscaria Janga", "música ao vivo", "Terça do Rock" — no conteúdo, não empilhadas |
| `sitemap.xml` / `robots.txt` | ⚠️ não incluídos — gerar na publicação |
| Idioma | ✅ `lang="pt-BR"` |

Comparação com o site anterior: o anterior tinha `BarOrPub`/`Restaurant` +
`AggregateRating` e boas metatags. O novo mantém tudo isso, com H1 único de
verdade (single-page), `Menu` schema e a mesma nota/contagem de avaliações.
Não há regressão de indexação esperada; as URLs `sobre.html`, `reservas.html`
e `contato.html` deixam de existir — **configurar redirecionamento 301** dessas
três para as âncoras equivalentes (`/#historia`, `/#reservas`, `/#contato`).

## Performance

| Item | Estado |
|---|---|
| `width`/`height` em todas as imagens | ✅ (sem CLS) |
| `loading="lazy"` abaixo da dobra | ✅ |
| `fetchpriority="high"` + `preload` no hero | ✅ |
| CSS | 1 arquivo `styles.css` (+ `cardapio.css` só na página de cardápio) |
| JS | `app.js` ~10 KB + `cardapio.js` ~3 KB, `defer`, sem dependências obrigatórias |
| GSAP | via CDN, `defer`, **opcional** (parallax e nada mais depende dele) |
| Fontes | `preconnect` + `display=swap`; 3 famílias, pesos enxutos |
| Sem render-blocking além de CSS/fontes | ✅ |

**Imagens:** todas as fotos em `assets/fotos/` foram comprimidas (JPEG mozjpeg,
≤ 1200 px, ≤ ~205 KB cada; hero ≈ 204 KB). Ganho extra possível: versões
WebP/AVIF servidas por `<picture>` (hero < 90 KB, demais < 60 KB). Sem CLS
(todas com `width`/`height`); abaixo da dobra tudo com `loading="lazy"`.

## Segurança e privacidade

| Item | Estado |
|---|---|
| Nenhuma chave/token/segredo no código | ✅ |
| Nenhum script de rastreamento/analytics | ✅ (nada foi adicionado) |
| Formulário de reserva | validação no cliente; **não grava nada** — monta uma mensagem e abre `wa.me`. Sem backend, sem cookies. |
| Aviso LGPD | ✅ checkbox de consentimento obrigatório + nota no rodapé sobre uso dos dados |
| `rel="noopener"` em links `target="_blank"` | ✅ |
| `X-Content-Type-Options`, `referrer` | ✅ via `<meta>` (idealmente reforçar por header do servidor) |
| CSP | ⚠️ não definido — recomenda-se um header CSP no host permitindo apenas
  `fonts.googleapis.com`, `fonts.gstatic.com`, `cdnjs.cloudflare.com` e
  `google.com/maps`. |

## Checklist de publicação

1. (Opcional) Gerar versões WebP/AVIF das fotos e servir via `<picture>`.
2. `sitemap.xml` + `robots.txt`.
3. Redirect 301: `/sobre.html` → `/#historia`, `/reservas.html` → `/#reservas`,
   `/contato.html` → `/#contato`, `/index_novo.html` → `/`.
4. Confirmar domínio nas metatags canônicas/OG.
5. Não publicar a pasta `site-antigo/`.
6. Headers de segurança (CSP, HSTS) no host.
7. Rodar Lighthouse no ambiente final.
