/**
 * Baixa imagens públicas do site chinelosdabela.com.br para public/images/bela/
 *
 * Inclui ficheiros blog-* (mesmas URLs da listagem / conteúdo em chinelosdabela.com.br/blog).
 * Comando: npm run download:bela
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images', 'bela');

const FILES = [
  ['logo-primary.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/02/Chinelos-da-Bela-primary-lowq.png'],
  ['logo-white.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/02/Chinelos-da-Bela-White-Low-Quality.png'],
  ['hero-fireworks.jpg', 'https://chinelosdabela.com.br/wp-content/uploads/2023/02/fireworks-scaled.jpg'],
  /* Casamento: o site usa public/images/bela/prod-casamento.png (foto local). Fallback Unsplash: */
  [
    'prod-casamento.jpg',
    'https://images.unsplash.com/photo-1718997534125-052b2ff48cd0?auto=format&fit=crop&w=1400&q=85',
  ],
  /* Formatura: beca + confete — Unsplash (Eben Kassaye), licença Unsplash */
  [
    'prod-formatura.jpg',
    'https://images.unsplash.com/photo-1643297654395-d6375d07215c?auto=format&fit=crop&w=1400&q=85',
  ],
  /* Corporativo: plateia diversa, evento descontraído — Unsplash (Carlos Gil), licença Unsplash */
  [
    'prod-corporativo.jpg',
    'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?auto=format&fit=crop&w=1600&q=88',
  ],
  /* 15 anos: o site usa public/images/bela/prod-festa15.png (foto local). Fallback Unsplash: */
  [
    'prod-festa15.jpg',
    'https://images.unsplash.com/photo-1763959944507-696ac03bf309?auto=format&fit=crop&w=1600&q=88',
  ],
  ['destaque-havaianas.webp', 'https://chinelosdabela.com.br/wp-content/uploads/2022/01/event8-home-pic5.webp'],
  ['sobre-equipe.webp', 'https://chinelosdabela.com.br/wp-content/uploads/2022/01/event8-about-pic4.webp'],
  ['time-qualificado.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/timequalificado_chinelosdabela.png'],
  [
    'coracao-3d-chinelos-bela.png',
    'https://chinelosdabela.com.br/wp-content/uploads/2023/03/Coracao-3D-Chinelos-da-Bela-600-%C3%97-600px.png',
  ],
  ['cliente-1.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/1.png'],
  ['cliente-2.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/2.png'],
  ['cliente-3.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/3.png'],
  ['cliente-4.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/4.png'],
  /* Página /depoimentos — galeria 6 fotos (mesmas URLs do site oficial) */
  ['depoimentos-pagina-1.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/1-2.png'],
  ['depoimentos-pagina-2.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/2-2.png'],
  ['depoimentos-pagina-3.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/3-2.png'],
  ['depoimentos-pagina-4.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/4-2.png'],
  ['depoimentos-pagina-5.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/5.png'],
  ['depoimentos-pagina-6.png', 'https://chinelosdabela.com.br/wp-content/uploads/2023/03/6.png'],
  /* Fotos reais de chinelos/havaianas personalizados (páginas de produto — 2024) */
  ['real-havaianas.jpg', 'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-havaianas-personalizadas.jpg'],
  ['real-casamento.jpeg', 'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-personalizados-para-casamento.jpeg'],
  ['real-formatura.png', 'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-personalizados-para-formatura.png'],
  ['real-brindes.png', 'https://chinelosdabela.com.br/wp-content/uploads/2024/05/brindes-corporativos.png'],
  ['real-festa15.png', 'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-personalizados-para-festa-15-anos.png'],
  /* Blog — mesmas capas que blog-articles.ts / grelha do blog oficial (960×720) */
  [
    'blog-porque-casamento.jpg',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/04/chinelosdabela-clientes_356397038_994155941765994_8880973340313046906_n_1080-1-960x720.jpg',
  ],
  [
    'blog-chinelos-casamento-artigo.jpg',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/04/chinelosdabela-clientes_429772902_18296708434145722_437139836720742249_n_1080-1-960x720.jpg',
  ],
  [
    'blog-havaianas.jpg',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-havaianas-personalizadas.jpg',
  ],
  [
    'blog-formatura.png',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-personalizados-para-formatura.png',
  ],
  [
    'blog-festa-15-anos.png',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/05/chinelos-personalizados-para-festa-15-anos.png',
  ],
  [
    'blog-brindes-corporativos.png',
    'https://chinelosdabela.com.br/wp-content/uploads/2024/05/brindes-corporativos.png',
  ],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          reject(new Error(`${res.statusCode} ${url}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

fs.mkdirSync(OUT, { recursive: true });
for (const [name, url] of FILES) {
  const dest = path.join(OUT, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
    console.log('skip', name);
    continue;
  }
  try {
    await download(url, dest);
    console.log('ok', name);
  } catch (e) {
    console.error('fail', name, e.message);
  }
}
