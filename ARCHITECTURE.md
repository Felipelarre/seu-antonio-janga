# Arquitetura

## Páginas

| Página | Papel |
|---|---|
| `index.html` | Página única. Todas as seções institucionais + prévia de cardápio + formulário de reserva + contato/FAQ. Navegação por âncoras. |
| `cardapio.html` | Cardápio completo. Reusa `styles.css`, adiciona `cardapio.css` e `cardapio.js`. |

Não há mais páginas separadas de "sobre", "reservas" e "contato": o conteúdo
foi absorvido pela página única.

## CSS

- `assets/css/styles.css` — reset, tokens (custom properties), tipografia,
  utilitários, todos os componentes e blocos, motion/reveal, media queries.
  Um arquivo só, para minimizar requisições.
- `assets/css/cardapio.css` — hero de página, barra de filtros fixa, grades e
  linhas de itens do cardápio, estado vazio.

Seções claras recebem a classe `.section--paper`; a cor de texto é resolvida
por token, não por override espalhado.

## JavaScript

Progressive enhancement. O HTML é utilizável sem JS (o `<html>` recebe a
classe `js` via script inline; só então os elementos `[data-reveal]` começam
ocultos). GSAP é opcional.

`assets/js/app.js` (IIFE, sem dependências obrigatórias):

- **Preloader** — remove no `load` (+ rede de segurança de 4s).
- **Header** — estado `is-stuck` no scroll; fixo em páginas sem hero.
- **Menu mobile** — painel lateral, backdrop, Esc, foco no primeiro link.
- **Scroll suave** — âncoras `[data-scroll]` com compensação do header e foco
  na seção de destino.
- **Scrollspy** — `IntersectionObserver` marca o link ativo.
- **Reveal** — `IntersectionObserver` adiciona `is-in`; fallback imediato se
  `prefers-reduced-motion` ou sem IO.
- **Parallax do hero** — só se `window.gsap` existir e o usuário não pediu
  redução de movimento.
- **Contadores** — animação com `requestAnimationFrame`, dispara na viewport.
- **Status de horário** — tabela `SCHEDULE` (Seg–Sex 16–24, Sáb 12–24,
  Dom 12–23). Preenche a pill do hero e marca o dia atual na tabela de contato.
- **Carrossel de depoimentos** — `transform: translateX`; autoplay 6,5s com
  pausa em hover/foco/aba oculta; setas, teclado (←/→), arrasto (pointer),
  indicadores.
- **FAQ** — acordeão de um item por vez, anima `height`, atualiza `aria-expanded`.
- **Formulário de reserva** — máscara leve de telefone, chips de ocasião,
  comanda-preview ao vivo, validação em `submit` e no `blur` de campos já
  inválidos, mensagem de status com `aria-live`. O envio abre
  `https://wa.me/55819...` com o texto montado. Nada é gravado.

`assets/js/cardapio.js`:

- Índice de busca por item (`data-search` + texto, sem acento).
- Filtro por categoria (abas `role="tab"`), busca com debounce de 120ms.
- A busca varre o cardápio inteiro e ignora o filtro ativo.
- Esconde categorias e subtítulos sem itens visíveis; estado vazio global.
- Suporte a `#ancora` vinda de outra página.

## Dados

Todo o conteúdo é estático no HTML. Não há API, banco nem backend. O único
"processamento" é a montagem da URL do WhatsApp no cliente.

## Terceiros

- Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) com `preconnect`.
- GSAP + ScrollTrigger via `cdnjs.cloudflare.com`, com `defer`.
- `<iframe>` do Google Maps (embed), `loading="lazy"`.

Nenhum script de analytics ou rastreamento.
