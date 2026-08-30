// Build de publicação: monta dist/ apenas com o que vai para o ar.
// Fica de fora: site-antigo/, docs .md, panfletos e imagens não usadas.
import { cpSync, rmSync, mkdirSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');

for (const f of ['index.html', 'cardapio.html', 'site.webmanifest', 'robots.txt', 'sitemap.xml']) {
  try { cpSync(f, `dist/${f}`); } catch { /* opcional */ }
}
cpSync('assets', 'dist/assets', { recursive: true });

const prune = [
  'dist/assets/fotos/_panfletos',
  'dist/assets/fotos/caranguejo-ao-molho.jpg',
  'dist/assets/fotos/drink-cremoso-caneca.jpg',
  'dist/assets/images/comida',
  'dist/assets/images/drinks',
  'dist/assets/images/hero',
  'dist/assets/images/sobre',
  'dist/assets/images/placeholder.svg',
  'dist/assets/images/logo/logo-seu-antonio.png',
];
for (const p of prune) rmSync(p, { recursive: true, force: true });

console.log('build ok — dist/ pronto');
