# Acessibilidade — site novo (2026)

Alvo: WCAG 2.1 AA. Revisão manual do código reconstruído.

## Aprovado

- `lang="pt-BR"` nas duas páginas.
- Link "pular para o conteúdo" como primeiro elemento focável.
- Um único `<h1>` por página; hierarquia `h2` (seções) → `h3` (cards) sem saltos.
- Marcos semânticos: `header`, `main`, `footer`, `nav` com `aria-label`; cada
  `<section>` com `aria-labelledby` apontando para o seu título.
- Imagens: `alt` descritivo e específico nas fotos ("Porção de camarão empanado
  crocante com molho tártaro"); `alt=""` no logotipo (decorativo, com texto ao lado).
- Todos os campos de formulário com `<label for>`. Erros de validação exibidos
  em texto e associados via `aria-describedby` + `aria-invalid` (definidos por JS).
- Mensagens de status do formulário em `role="status"` / `aria-live="polite"`.
- Botão do menu mobile: `aria-controls`, `aria-expanded` e `aria-label` que
  alterna entre "Abrir menu" e "Fechar menu". Fecha com `Esc` e devolve o foco.
- FAQ: `<button type="button">` com `aria-expanded`; um item aberto por vez.
- Carrossel de depoimentos: navegável por Tab, setas ←/→, arrasto e indicadores;
  autoplay pausa em `hover`, `focus` e quando a aba fica oculta; cada card
  `role="group"`.
- `:focus-visible` com contorno de 2px em dendê e `outline-offset`.
- Áreas de toque ≥ 44px: `.btn`, `.chip`, `.menu-filter`, itens de navegação
  mobile, botões do carrossel; indicadores do carrossel têm área de 26px.
- `prefers-reduced-motion: reduce` desliga preloader animado, parallax, reveal,
  autoplay do carrossel, pulsos e transições — o conteúdo permanece visível.
- Contraste (texto sobre fundo):
  - creme `#F4EBDD` sobre café `#14100C` — ~15:1
  - creme-dim `#C4B4A0` sobre café — ~8:1
  - dendê `#E8722E` (rótulos, links) sobre café — ~6,2:1
  - texto `#291F19` sobre papel `#FBF6EC` — ~13:1
  - preço `#A84C14` sobre papel — ~5,1:1
  - texto do botão (`#14100C` sobre `#E8722E`) — ~6:1
  - texto branco sobre verde-garrafa `#3B5D4E` — ~6,5:1
- Site utilizável sem JavaScript: o conteúdo só é ocultado para animação quando
  a classe `js` está presente no `<html>`.

## Limitações conhecidas / a validar em teste real

- O carrossel usa `role="tablist"`/`role="tab"` nos indicadores sem
  `tabpanel` correspondente. Funciona com leitores de tela, mas um teste com
  NVDA/VoiceOver é recomendado; alternativa seria trocar por botões simples
  com `aria-label`.
- Slides inativos do carrossel recebem `aria-hidden="true"`. Como não há
  elementos focáveis dentro dos cards, não há armadilha de foco.
- O texto sobre a foto do hero depende de um gradiente de escurecimento. Foi
  reforçado um scrim lateral, mas o contraste real varia com a imagem — se a
  foto do hero for trocada, revalidar.
- `iframe` do Google Maps: tem `title`, mas o conteúdo interno é de terceiros.
- Faltou teste com zoom de 200% e navegação 100% por teclado em dispositivo
  real (só foi possível revisão de código e captura headless neste ambiente).

## Recomendações

1. Rodar Lighthouse / axe DevTools no ambiente publicado.
2. Teste manual com leitor de tela no formulário de reserva e no carrossel.
3. Verificar o contraste final do hero após qualquer troca de foto.
