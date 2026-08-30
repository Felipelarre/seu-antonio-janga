# Changelog

## Ajustes de conteúdo — 2026-08-30 (2)

### Preços removidos
- Todos os valores em R$ saíram do site, a pedido do dono (mudam com frequência).
  Nomes, descrições e fotos dos pratos foram mantidos.
- `index.html`: os 4 cards da prévia de cardápio perderam o `R$`; o layout do
  título (`.dish-body h3`) deixou de ser flex nome-vs-preço.
- `cardapio.html`: 29 preços removidos (cards e linhas de lista); `.mrow` deixou
  de ter coluna de preço e virou bloco simples; nota de rodapé passou de
  "Preços sujeitos a alteração" para "Cardápio sujeito a alterações"; metatags
  ajustadas ("Peça na mesa os valores do dia").
- CTA da home mudou de "Consultar cardápio completo com preços" para
  "Ver o cardápio completo".

### Fotos novas do cliente
13 imagens novas em `assets/fotos/`, otimizadas (JPEG mozjpeg, ≤ 1200 px,
75–82 de qualidade; nenhuma passa de ~205 KB). Distribuição:
- **Nova seção "Galeria / Um pedaço do Janga"** na home (04/07), entre Equipe e
  Depoimentos: balcão/Negroni, picanha na chapa, espetinhos, cervejas no balde,
  pastéis e camarão ao alho e óleo. As seções seguintes foram renumeradas
  (05/07, 06/07, 07/07).
- **História (home):** troca da foto do caranguejo por uma mais viva
  (`caranguejo-na-mesa.jpg`).
- **Prévia de cardápio (home):** nova foto do camarão empanado.
- **Página de cardápio:** novas fotos + itens — Coração de Galinha, Camarão ao
  Alho e Óleo, Tábua de Frios (petiscos); Negroni promovido a card com foto do
  balcão; Picanha na Chapa (refeições). Contadores atualizados
  (Petiscos 14 · Drinks 12 · Doces 4 · Refeições 6 · Total 36).
- **Itens de texto adicionados a partir do panfleto do cliente:** Burguer Seu
  Antônio Artesanal e Burguer Seu Antônio Bacon Artesanal (sem foto usável).
- **`.feature-row`** passou de `auto-fit` para `auto-fill` para um card isolado
  não esticar na largura toda.

### Não aplicado / a confirmar com o cliente
- Panfleto "Terça do Caranguejo" (`assets/fotos/_panfletos/09.png`) traz uma
  promoção de terça que **conflita com a "Terça do Rock"** já divulgada no site
  antigo. Mantida a Terça do Rock; o cliente precisa dizer se convivem ou se uma
  substituiu a outra.
- Panfletos (burgers e caranguejo) foram movidos para `assets/fotos/_panfletos/`
  e **não** são usados como imagem (têm texto/preço embutidos).
- `assets/fotos/drink-cremoso-caneca.jpg` ficou sem uso (caneca de marca destoa
  da paleta) — disponível se o cliente quiser.
- Nomes e descrições dos 5 itens novos (4 petiscos/refeições + 2 burgers) são
  inferidos das fotos e do panfleto; confirmar com a casa.

---

## Reconstrução completa — 2026-08-30

Site reconstruído do zero. **Nenhum código, CSS, HTML, layout, paleta ou
tipografia do site anterior foi reaproveitado.** Do material antigo foram
mantidos apenas: fatos verificáveis (nome, endereço, telefone, horários,
equipe, FAQ), o cardápio com preços, as 9 fotos reais e as 5 avaliações
reais do Google que já constavam na página inicial.

### Nova arquitetura

- **Single-page** (`index.html`) com navegação por âncoras: Início · Experiência ·
  Cardápio (prévia) · História · Equipe · Depoimentos · Reservas · Contato.
- **`cardapio.html`** — cardápio completo (29 itens) com filtro por categoria e busca.
- As antigas páginas `sobre.html`, `reservas.html` e `contato.html` foram
  incorporadas como seções da página única.

### Nova direção visual ("Janga à noite")

- Paleta: café profundo `#14100C` · creme papel `#F4EBDD` · laranja dendê `#E8722E` (CTA) ·
  verde-garrafa `#3B5D4E` · dourado `#C9A24B`.
- Tipografia: Playfair Display (títulos) · Inter (corpo) · JetBrains Mono (preços, rótulos, horários).
- Elemento-assinatura: numeração de seção em monoespaçada (`01 / 06`) e a
  "comanda digital" perfurada no formulário de reserva.
- Detalhes em `DIRECAO-VISUAL.md`.

### Implementação

- HTML5 + CSS3 + JavaScript puro. Sem frameworks.
- GSAP + ScrollTrigger via CDN, **opcionais**: o site funciona sem eles.
- Preloader com a onda se desenhando; respeita `prefers-reduced-motion`.
- Favicon novo em SVG (`assets/img/favicon.svg`); PNG/ICO antigos mantidos como fallback.
- Reveal ao scroll via IntersectionObserver; parallax leve do hero via GSAP.
- Carrossel de depoimentos com autoplay, teclado, arrasto e pausa no hover/foco.
- Formulário de reserva com validação em tempo real, comanda-preview ao vivo,
  consentimento LGPD e envio via link do WhatsApp (nada é gravado em servidor).
- Status "aberto agora / fechado" calculado a partir dos horários reais.

### SEO / performance / segurança

- `title` e `meta description` únicos por página; H1 único; hierarquia H2/H3.
- Schema.org `BarOrPub` + `AggregateRating` (só com dados reais) e `Menu`.
- Open Graph / Twitter Card.
- `width`/`height` em todas as imagens (evita CLS); `loading="lazy"` abaixo da dobra;
  `preload` + `fetchpriority="high"` na imagem do hero.
- Nenhuma chave/segredo no código. Nenhum script de rastreamento adicionado.

### Backup

- Site anterior preservado integralmente em `site-antigo/` (HTML, CSS, JS e o
  rascunho `index_novo.html`, mais os relatórios antigos em `site-antigo/docs/`).

### Pendências para o cliente (ver README.md)

- Confirmar horário de fechamento de domingo (23h assumido; briefing citava 23h59).
- Comprimir as 9 fotos (idealmente para WebP) antes de publicar — sem ferramenta
  de imagem neste ambiente.
- Gerar `.ico`/PNG do favicon novo com um designer, se quiser abandonar a marca atual.
- Revisar se as 5 avaliações do Google seguem atuais.

---

## Refatoração de manutenção - 2026-08-28 (site anterior, agora em `site-antigo/`)

### Refatorado

- Scripts globais e de página passaram a usar escopo mais explícito com `const` e `let` onde os valores não são reatribuídos.
- Busca do cardápio passou a usar `includes()` e validação segura do hash inicial.
- Estado do menu mobile foi centralizado para reagir corretamente à troca entre mobile e desktop.
- Lightbox passou a preservar o foco do elemento que o abriu.

### Adicionado

- `defer` nos scripts externos e locais para reduzir bloqueio do parsing HTML.
- `aria-controls` nos toggles de navegação e perguntas do FAQ.
- IDs automáticos nos painéis de resposta do FAQ.
- `loading="lazy"` nas imagens secundárias fora do primeiro viewport.
- `ARCHITECTURE.md` com estrutura e fluxo de dados.
- Recomendações de otimização de imagens no `README.md`.

### Removido

- Timeout inline duplicado do loader nas páginas. O comportamento agora fica sob responsabilidade do `main.js`.

### Corrigido

- Botões de navegação e FAQ receberam `type="button"`, evitando submissões acidentais em contextos de formulário.
- O menu não fica semanticamente oculto após a janela voltar para desktop.

### Preservado

- Identidade visual, conteúdo, URLs, classes CSS, integrações WhatsApp e funcionalidades existentes.
