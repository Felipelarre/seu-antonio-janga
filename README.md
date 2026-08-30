# Seu Antônio Janga — site

Site institucional do Seu Antônio Janga (bar e petiscaria, Janga, Paulista - PE).
Reconstruído do zero em 2026. HTML5 + CSS3 + JavaScript puro, sem frameworks e
sem etapa de build.

## Estrutura

```
/index.html            Página única (hero, experiência, cardápio-prévia,
                       história, equipe, depoimentos, reservas, contato)
/cardapio.html         Cardápio completo (29 itens) com filtro e busca
/site.webmanifest      PWA manifest
/assets/
  css/styles.css       Sistema visual completo
  css/cardapio.css     Complemento da página de cardápio
  js/app.js            Preloader, nav, scroll, reveal, contadores, carrossel,
                       FAQ, status de horário, formulário de reserva
  js/cardapio.js       Filtro por categoria + busca
  img/favicon.svg      Favicon novo
  fotos/               fotos reais (site anterior + novas do cliente), comprimidas
  fotos/_panfletos/    panfletos do cliente (não usados no site — têm texto/preço)
  images/favicon/      Ícones .ico/.png (fallback, herdados)
  images/logo/         Logotipo
/site-antigo/          Site anterior preservado na íntegra (não é publicado)
/DIRECAO-VISUAL.md     Direção de arte travada
/ACESSIBILIDADE.md     Checklist WCAG do site novo
/SEO-PERFORMANCE.md    Checklist de SEO, performance e segurança
/BRIEFING.md           Briefing do projeto (artefato de processo)
```

## Rodar localmente

Qualquer servidor estático na raiz do projeto, por exemplo:

```
npx serve .
# ou
python -m http.server 8000
```

Abrir `http://localhost:8000`.

## Publicação

Site 100% estático — publique a raiz do projeto (menos `site-antigo/`) em
qualquer host estático (Netlify, Vercel, GitHub Pages, hospedagem comum).
Não há variáveis de ambiente nem segredos.

## Dados reais usados

Nome, endereço, telefone/WhatsApp, Instagram, horários, equipe, FAQ, cardápio
e preços vêm do site anterior e do Google Business. As 5 avaliações exibidas
são as que já constavam na home antiga, creditadas ao Google. Nada foi
inventado.

## Pendências antes de publicar

1. **Horário de domingo** — o site assume fechamento às 23h (tabela de contato
   do site antigo). O briefing citava 23h59. Confirmar com o Google Business e
   ajustar em `index.html` (tabela `.hours-table`, o `openingHoursSpecification`
   do JSON-LD e o rodapé).
2. **Imagens** — todas as fotos em `assets/fotos/` já foram comprimidas (JPEG,
   ≤ 1200 px, ≤ ~205 KB cada; `width`/`height` e `loading="lazy"` aplicados,
   sem CLS). Ganho extra possível: gerar versões WebP/AVIF e servir via
   `<picture>` (alvo hero < 90 KB, demais < 60 KB).
3. **Itens de cardápio novos** — Coração de Galinha, Camarão ao Alho e Óleo,
   Tábua de Frios, Picanha na Chapa e os dois Burguers Seu Antônio foram
   adicionados a partir das fotos e do panfleto enviados. Confirmar nomes e
   descrições com a casa.
4. **"Terça do Caranguejo"** — o panfleto em `assets/fotos/_panfletos/09.png`
   anuncia uma promoção de terça que conflita com a "Terça do Rock" citada no
   site. O texto atual mantém a Terça do Rock; ajustar quando o cliente
   esclarecer.
5. **Favicon** — `favicon.svg` novo já referenciado. Os `.ico`/`.png` continuam
   sendo a marca antiga. Gerar os novos com um designer se quiser padronizar.
6. **Domínio nas metatags** — as URLs canônicas e Open Graph usam
   `https://www.seuantoniojanga.com.br/`. Ajustar se o domínio final for outro.
7. **Avaliações** — revisar se os 5 depoimentos seguem atuais; considerar
   linkar o perfil do Google.

## Acessibilidade e SEO

Ver `ACESSIBILIDADE.md` e `SEO-PERFORMANCE.md`.
