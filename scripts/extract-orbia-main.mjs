/**
 * Extrai <main> de page.html, reescreve assets para /reference/.../images/ e hrefs internos.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PAGES = [
  { dir: 'html-orbia-index-3.html', slug: 'index' },
  { dir: 'html-orbia-about.html', slug: 'about' },
  { dir: 'html-orbia-services.html', slug: 'services' },
  { dir: 'html-orbia-blog-grid.html', slug: 'blog-grid' },
  { dir: 'html-orbia-contact.html', slug: 'contact' },
];

function buildImageMap(images) {
  const map = new Map();
  for (const { file, url } of images) {
    try {
      const u = new URL(url);
      const p = u.pathname;
      const marker = '/assets/images/';
      const i = p.indexOf(marker);
      if (i === -1) continue;
      const rel = p.slice(i + marker.length);
      map.set(rel, file);
    } catch {
      /* ignore */
    }
  }
  return map;
}

function replaceAssets(html, map, refDir) {
  const prefix = `/reference/${refDir}/images/`;
  let out = html;
  for (const [rel, file] of map) {
    const esc = rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(`assets/images/${esc}`, 'g'), `${prefix}${file}`);
  }
  out = out.replace(/url\(&quot;assets\/images\/([^&]+)&quot;\)/g, (_, sub) => {
    const f = map.get(sub);
    return f ? `url(&quot;${prefix}${f}&quot;)` : `url(&quot;assets/images/${sub}&quot;)`;
  });
  out = out.replace(/url\("assets\/images\/([^"]+)"/g, (_, sub) => {
    const f = map.get(sub);
    return f ? `url("${prefix}${f}")` : `url("assets/images/${sub}")`;
  });
  out = out.replace(/data-src="assets\/images\/([^"]+)"/g, (_, sub) => {
    const f = map.get(sub);
    return f ? `data-src="${prefix}${f}"` : `data-src="assets/images/${sub}"`;
  });
  return out;
}

function replaceInternalLinks(html) {
  const rules = [
    [/href="index(-2|-3)?\.html"/g, 'href="/"'],
    [/href="about\.html"/g, 'href="/sobre"'],
    [/href="services\.html"/g, 'href="/servicos"'],
    [/href="service-details\.html"/g, 'href="/servicos"'],
    [/href="blog-grid\.html"/g, 'href="/blog"'],
    [/href="blog-standard\.html"/g, 'href="/blog"'],
    [/href="blog-details\.html"/g, 'href="/blog"'],
    [/href="contact\.html"/g, 'href="/contato"'],
    [/href="projects\.html"/g, 'href="/servicos"'],
    [/href="project-details\.html"/g, 'href="/servicos"'],
    [/href="team\.html"/g, 'href="/sobre"'],
    [/href="team-details\.html"/g, 'href="/sobre"'],
    [/href="pricing\.html"/g, 'href="/contato"'],
    [/href="faqs\.html"/g, 'href="/blog"'],
    [/href="404\.html"/g, 'href="/"'],
  ];
  let out = html;
  for (const [re, to] of rules) out = out.replace(re, to);
  return out;
}

/** Patches de texto PT por slug (trechos visíveis; HTML gigante do GSAP no h1 é substituído). */
function patchPortuguese(html, slug) {
  let out = html;
  if (slug === 'index') {
    out = out.replace(
      /<h1 class="text-anm"[\s\S]*?<\/h1>/,
      '<h1 class="text-anm">Havaianas Personalizadas que elevam branding e conforto no seu evento</h1>'
    );
    out = out.replace(
      /<span class="tag-line[^"]*"[^>]*>From concept To Image <\/span>/,
      '<span class="tag-line aos-init aos-animate" data-aos="fade-down" data-aos-duration="2000">Do conceito ao brinde memorável</span>'
    );
    out = out.replace(
      /<p data-aos="fade-up" data-aos-duration="2200"[^>]*>Web developers and marketers who[\s\S]*?websites,<\/p>/,
      '<p data-aos="fade-up" data-aos-duration="2200" class="aos-init aos-animate">Produzimos Havaianas Personalizadas para casamentos, corporativos e festas — com cores fiéis à sua marca e entrega no prazo do evento.</p>'
    );
    out = out.replace(/Get Started Now/g, 'Solicitar orçamento');
    out = out.replace(/Get A Quote/g, 'Pedir orçamento');
    out = out.replace(/Search here/g, 'Buscar');
  }
  if (slug === 'about') {
    out = out.replace(/<h1>About Us<\/h1>/, '<h1>Chinelos da Bela — quem somos</h1>');
    out = out.replace(/Get A Quote/g, 'Pedir orçamento');
  }
  if (slug === 'services') {
    out = out.replace(/<h1>Our Services<\/h1>/, '<h1>Havaianas Personalizadas para cada ocasião</h1>');
    out = out.replace(/Get A Quote/g, 'Pedir orçamento');
  }
  if (slug === 'blog-grid') {
    out = out.replace(/<h1>Our Blog<\/h1>/, '<h1>Blog — havaianas para eventos</h1>');
    out = out.replace(/Read More/g, 'Ler mais');
  }
  if (slug === 'contact') {
    out = out.replace(/<h1>Contact Us<\/h1>/, '<h1>Fale com a Chinelos da Bela</h1>');
    out = out.replace(/Get A Quote/g, 'Pedir orçamento');
    out = out.replace(/Enter Email Address/g, 'Seu e-mail');
  }
  out = out.replace(/Read More/g, 'Ler mais');
  out = out.replace(/Explore More/g, 'Saiba mais');
  out = out.replace(/Meet The Team/g, 'Conheça a equipe');
  out = out.replace(/Learn More/g, 'Saiba mais');
  out = out.replace(/Discover More/g, 'Saiba mais');
  out = out.replace(/Get Started Now/g, 'Começar agora');
  out = out.replace(/View All Price/g, 'Ver orçamentos');
  out = out.replace(/>Home</g, '>Início<');
  return out;
}

for (const { dir, slug } of PAGES) {
  const base = path.join(root, 'public', 'reference', dir);
  const pagePath = path.join(base, 'page.html');
  const images = JSON.parse(fs.readFileSync(path.join(base, 'images.json'), 'utf8'));
  const map = buildImageMap(images);
  let html = fs.readFileSync(pagePath, 'utf8');
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  if (!m) throw new Error(`Sem <main> em ${dir}`);
  let main = m[0];
  main = replaceAssets(main, map, dir);
  main = replaceInternalLinks(main);
  main = patchPortuguese(main, slug);
  const outDir = path.join(root, 'src', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `orbia-${slug}-main.html`), main, 'utf8');
  console.log(`Wrote orbia-${slug}-main.html`);
}
