# BRIEFING — Seu Antônio Janga
## Refatoração Completa | Nova Experiência Digital

---

## 1. VISÃO GERAL

**Cliente:** Seu Antônio Janga  
**Categoria:** Bar e Petiscaria de Bairro (Familiar)  
**Localização:** Janga, Paulista - PE  
**Objetivo:** Reconstruir o site como projeto novo — não repaginação. Melhorar conversão (reservas, contato), comunicar acolhimento e qualidade regional.  

---

## 2. CONCEITO CRIATIVO

### Tema Central: **"Acolhimento Cotemporâneo"**

O Seu Antônio não é apenas um bar. É um espaço onde:
- **Tradição culinária nordestina** encontra **execução moderna**
- **Adultos relaxam** enquanto **crianças brincam** sem preocupação
- **Música ao vivo** cria atmosfera, não distrai
- **Comida regional** é celebrada como arte, não como petisco genérico

**Promessa ao visitante:** *"Um lugar onde você é bem-vindo de verdade — sua comida é honesta, seu tempo é valioso, sua família é segura."*

---

## 3. PÚBLICO-ALVO

1. **Casais jovens** (25-40 anos) procurando bar com qualidade
2. **Famílias** (30-50 anos) que querem sair sem deixar filhos em casa
3. **Turistas** (Recife/região) buscando experiência gastronômica "de verdade"
4. **Grupos de amigos** procurando lugar descontraído mas sofisticado
5. **Profissionais** saindo do trabalho (happy hour / drinks depois do expediente)

---

## 4. DIFERENCIAIS ÚNICOS (PROPOSIÇÃO DE VALOR)

| Diferencial | Atual | Novo |
|---|---|---|
| **Culinária** | Receitas nordestinas (caranguejo, caldinho) | **Culinária regional com filosofia declarada** |
| **Drinks** | Coquetelaria autoral | **Coquetelaria seasonal + story por drink** |
| **Música** | Ao vivo 7 dias | **Calendário de artistas / programação visual** |
| **Espaço Kids** | Climatizado com monitoras | **Zona dedicada: kids lounge com atividades mapeadas** |
| **Atendimento** | Mencionado implicitamente | **Destaque explícito: "acolhimento é nosso principal ingrediente"** |

---

## 5. ARQUITETURA DE NAVEGAÇÃO (NOVO FLUXO)

### Estrutura: **Single-Page + Âncoras** (não múltiplos HTMLs)

Sections (na ordem de descoberta natural):
1. **Hero Imersivo** — Impacto visual, convite ao acolhimento
2. **Diferenciais (3 blocos)** — Culinária | Drinks | Experiência (música + kids)
3. **Cardápio Preview** — 3-4 pratos principais (call-to-action: "Ver menu completo")
4. **Depoimentos** — 3-4 clientes reais (com fotos, rating)
5. **Experiência (fotos + sensação)** — Galeria / ambiente
6. **Reservar / Contato** — Formulários + mapa
7. **Rodapé** — Horários, endereço, social

**Por quê single-page?**
- Conversão: usuário não "sai" do contexto
- Performance: carregar tudo uma vez, scroll rápido
- Mobile: menos cliques até CTA
- Moderno: sente-se como app, não site "velinho"

---

## 6. DIREÇÃO VISUAL

### Conceito: **"Moderno Acolhedor"** (Warm Contemporary)

#### Paleta de Cores

**Primária:**
- `#1A1410` (Café profundo, não puro preto) — backgrounds, texto pesado
- `#F5EFE0` (Creme quente, quase off-white) — backgrounds, texto claro

**Secundária:**
- `#C44536` (Vermelho terroso, "Pernambucano") — accents, CTAs, highlights
- `#8B6F47` (Marrom cálido, "Madeira local") — divisores, cards, profundidade

**Accent / Elevation:**
- `#D4A574` (Ocre claro) — hover states, badges, elevations
- `#2A2420` (Cinza quente, "Carvão") — texto secundário, borders

#### Tipografia

**Display (Headlines):**
- Fonte: **Playfair Display** (elegância + peso, remete a bares clássicos)
- Uso: H1, H2, nomes de pratos

**Body (Copy):**
- Fonte: **Inter** (legibilidade moderna, neutra)
- Uso: parágrafos, descrições, labels

**Accent (CTAs, Números):**
- Fonte: **JetBrains Mono** (monoespacial, técnica, bar/dados)
- Uso: preços, quantities, "R$", horários

#### Elementos Visuais

- **Bordas:** Sutis (1-2px), arredondadas (8-12px radius)
- **Sombras:** Soft, elevação discreta (não dura)
- **Espaçamento:** Generoso, respira confiança
- **Ícones:** Simples, traço fino (2px)
- **Imagens:** Fotografias reais (profundidade, não stock genérico)

#### Elemento-Assinatura do Novo Design

**"Selo de Acolhimento"** — Um badge circular que aparece em momentos-chave:
- Próximo ao hero
- Depoimentos
- Diferenciais
- Badges de pratos ("Mais Pedido", "Seasonal", "Recomendação da Casa")

Design: círculo com borda dupla, ícone central (coração, estrela, etc.), tipografia em arco

---

## 7. CONVERSÃO & CTAs

**Meta:** Aumentar reservas e contato respecto ao site atual

**CTAs Principais:**
1. **"Reservar Mesa"** — Botão flutuante (mobile) + na seção de contato (desktop)
2. **"Ver Cardápio Completo"** — Link para página `/cardapio.html` ou modal (a decidir)
3. **"Chamar no WhatsApp"** — Link inteligente com contexto (já preenchido)

**Fluxo de Conversão:**
- Desktop: Hero → scroll seções → "Reservar" fixo no header
- Mobile: Hero → scroll → "Reservar" flutuante (FAB)

---

## 8. PERFORMANCE & SEO

**SEO Local:**
- Title único por página (se multi-page) ou meta dinâmico (single-page)
- Schema.org: `LocalBusiness` + `Restaurant` + `AggregateRating`
- H1 único, H2-H3 hierarquia clara
- Keywords: "bar Paulista", "petiscaria Janga", "drinks Pernambuco", "música ao vivo"

**Performance:**
- Imagens: otimizadas (<100KB por item)
- Lazy loading: fotos abaixo do fold
- Fonts: Google Fonts carregam com `<link rel="preconnect">`
- JS: GSAP via CDN com fallback

**Segurança:**
- Sem secrets no código
- Formulários: validação frontend + backend (se houver)
- GDPR/LGPD: aviso de coleta de dados nos formulários

---

## 9. ANIMAÇÕES & MOTION

**Filosofia:** Movimento com propósito (não gratuito)

**Momentos de animação:**
1. **Hero:** fade-in suave, parallax leve na imagem
2. **Seções:** reveal ao scroll (fade + translateY)
3. **Cards:** hover elevation, shadow expansion
4. **CTAs:** pulse, scale, ou glow subtle
5. **Carrossel (depoimentos):** transição suave, indicators animados
6. **Loader:** marca do site girando, com transição suave ao conteúdo

**Respeita:** `prefers-reduced-motion` (desliga tudo se usuário pediu)

---

## 10. ACESSIBILIDADE

- WCAG 2.1 AA (mínimo)
- Contraste: 4.5:1 (texto normal), 3:1 (texto grande)
- Botões: 44x44px mínimo (mobile touch)
- ARIA: labels, roles, live regions conforme necessário
- Formulários: labels `<label for="">`, validação acessível
- Imagens: alt text descritivo (não "imagem de comida", mas "camarão empanado crocante com molho tártaro")

---

## 11. CONTEÚDO REUTILIZÁVEL (DO SITE ATUAL)

### Fatos & Números
- Nome: Seu Antônio Janga ✓
- Endereço: Av. Dr. Cláudio José Gueiros Leite, 2306, Janga, Paulista - PE 53437-000 ✓
- Telefone: +55 81 97903-9543 ✓
- Rating: 4,5★ com 164 avaliações ✓
- Horários: Seg-Sex 16:00-23:59, Sab-Dom 12:00-23:59 ✓

### Fotos
- Hero (fachada): `/assets/images/hero/hero-seu-antonio-janga.jpg` ✓
- Pratos: `/assets/images/comida/` ✓
- Drinks: `/assets/images/drinks/` ✓
- Sobre/Ambiente: `/assets/images/sobre/` ✓
- Logo: `/assets/images/logo/` ✓

### Textos Institucionais
- Missão: "Lugar Onde Todo Mundo Cabe" ✓
- Pilares: Acolhimento, Excelência, Inclusão, Tradição ✓
- Copy do hero: "Comida de afeto, mesa de bar e energia contagiante" ✓

### Cardápio
- 24 itens em 5 categorias (petiscos, drinks, doces, refeições) ✓

---

## 12. CHECKLIST PRÉ-CODIFICAÇÃO

- [x] Conceito criativo definido: "Acolhimento Cotemporâneo"
- [x] Paleta visual aprovada: Café profundo + Creme quente + Vermelho terroso
- [x] Tipografia escolhida: Playfair Display + Inter + JetBrains Mono
- [x] Arquitetura de navegação: Single-page com 7 seções
- [x] CTAs claros: Reservar, Ver Cardápio, WhatsApp
- [x] Fotos e conteúdo validados
- [ ] Skills de direção visual + accessibility audit + anti-template pronto
- [ ] Código pronto

---

## 13. PRÓXIMOS PASSOS

1. **Codificar HTML** com nova estrutura (single-page)
2. **CSS + Design System** (tokens, componentes reutilizáveis)
3. **JavaScript** (carrossel, formulários, validação, WhatsApp)
4. **Animações** (GSAP + motion design)
5. **Teste anti-template** (parece novo? ou "repaginada"?)
6. **Acessibilidade** (audit completo)
7. **Refinamento** (polish pass)

---

**Versão:** 1.0  
**Data:** 2026-08-30  
**Status:** Pronto para codificação
