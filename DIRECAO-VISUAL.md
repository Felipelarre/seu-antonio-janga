# Direção visual — "Janga à noite"

Direção travada para a reconstrução de 2026. Independente da identidade do
site anterior (que era escuro + âmbar) e do briefing (que propunha vermelho
terroso). O objetivo foi um bar de bairro litorâneo que abre à noite: quente,
acolhedor, com capricho, sem parecer boteco genérico nem fine dining frio.

## Conceito

O Janga é litoral norte de Pernambuco. O bar funciona das 16h à meia-noite,
com música ao vivo e brisa de mar. A direção traduz isso em: fundo cor de
café quase preto (a noite), creme de papel (a comanda, o guardanapo),
laranja dendê (o pôr do sol, o tempero) e verde-garrafa (a bebida, a folha).

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#14100C` | fundo principal (escuro, quente) |
| `--ink-2` | `#1E1813` | superfícies elevadas, seções alternadas |
| `--cream` | `#F4EBDD` | texto sobre escuro, fundos claros |
| `--cream-dim` | `#C4B4A0` | texto secundário sobre escuro |
| `--paper` / `--paper-2` | `#FBF6EC` / `#F1E7D6` | seções claras (história, números) |
| `--paper-ink` | `#291F19` | texto sobre fundo claro |
| `--dende` | `#E8722E` | **CTA primário**, destaques, ícones |
| `--dende-deep` | `#C1571C` | preços e links sobre fundo claro |
| `--garrafa` | `#3B5D4E` | faixa de CTA, chips, detalhes |
| `--ouro` | `#C9A24B` | selos, estrelas de avaliação |
| `--wa` | `#1FA855` | apenas ações de WhatsApp (reconhecimento) |

Contraste: texto principal e CTAs passam em AA (≥ 4,5:1). Botão dendê usa
texto `--ink` (≈ 6:1). Verde-garrafa com texto creme (≈ 6,5:1).

## Tipografia

- **Playfair Display** (700/800, itálico para ênfase) — títulos, nomes de pratos.
  Alto contraste, elegância de bar clássico. Diferente da Fraunces do site antigo.
- **Inter** (400–700) — corpo, descrições, formulários.
- **JetBrains Mono** (400–700) — preços, "R$", horários, rótulos de seção,
  numeração `01 / 06`. Remete à comanda/ticket.

## Elemento-assinatura

1. **Numeração de seção monoespaçada** — cada seção abre com `01 / 06 — Rótulo`,
   dando ritmo editorial e sensação de "roteiro da noite".
2. **Comanda digital** — o preview da reserva tem a borda superior serrilhada
   (picote de comanda) em dendê, com as linhas em monoespaçada e divisórias
   tracejadas.
3. **Selo circular tracejado** com a nota 4,5★ / 164 avaliações, em dourado.

Nada disso existia no site antigo (que usava borda picotada genérica) nem no
rascunho `index_novo.html` (que usava um "selo de acolhimento").

## Movimento

- Prioridade absoluta em `transform` e `opacity`.
- Preloader: a linha de horizonte/onda se desenha (`stroke-dashoffset`), depois
  transição suave de opacidade para o conteúdo.
- Reveal ao scroll: fade + deslocamento de 24px, com stagger nas grades.
- Parallax discreto (12%) na imagem do hero, só se o GSAP carregar.
- Carrossel e acordeão animam por `transform`/`height`.
- `prefers-reduced-motion: reduce` desliga tudo, mantém o conteúdo visível.

## Responsividade

Mobile-first no comportamento. Quebras principais em 560px, 940px.
Áreas de toque ≥ 44px (botões, chips, filtros, itens de menu, navegação).
Menu lateral deslizante no mobile, com backdrop e fechamento por Esc.
