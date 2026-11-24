import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../src/data/products';
import { HGW_DOCUMENTS } from '../src/data/documents';
import { knowledgeService } from '../src/services/knowledgeService';
import { getSeoMetadata, PRODUCT_SLUG_ALIASES, buildProductJsonLd } from '../src/data/seoMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateSitemap() {
  const BASE_URL = 'https://www.hgwpanama.com';
  const urls: string[] = [
    `${BASE_URL}/`,
    `${BASE_URL}/productos`,
    `${BASE_URL}/membresias`,
    `${BASE_URL}/oportunidad-de-negocio`,
    `${BASE_URL}/preregistro`,
    `${BASE_URL}/documentos`,
    `${BASE_URL}/oficinas`,
    `${BASE_URL}/informacion`,
    `${BASE_URL}/pastas-dentales`,
    `${BASE_URL}/contacto`,
    `${BASE_URL}/envios-y-devoluciones`,
    `${BASE_URL}/base-de-conocimiento`,
  ];

  // Products
  for (const p of PRODUCTS) {
    if (p.slug) {
      urls.push(`${BASE_URL}/producto/${p.slug}`);
    }
  }

  // Documents
  for (const d of HGW_DOCUMENTS) {
    if (d.slug) {
      urls.push(`${BASE_URL}/documentos/${d.slug}`);
    }
  }

  // Knowledge Base Articles
  const knowledgeArticles = knowledgeService.getAllArticles();
  for (const a of knowledgeArticles) {
    if (a.slug) {
      urls.push(`${BASE_URL}/base-de-conocimiento/${a.slug}`);
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');

  const distSitemapPath = path.resolve(DIST_DIR, 'sitemap.xml');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
  }

  console.log(`Generated sitemap.xml with ${urls.length} URLs in public/ and dist/!`);
}

function generatePages() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`Error: ${indexHtmlPath} does not exist. Run "vite build" first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Collect all routes
  const routes = new Set<string>();

  // Standard routes
  const standardRoutes = [
    '/',
    '/productos',
    '/catalogo',
    '/pastas-dentales',
    '/pastas',
    '/membresias',
    '/membresías',
    '/oportunidad-de-negocio',
    '/oportunidad',
    '/preregistro',
    '/pre-registro',
    '/documentos',
    '/documentos-pdf',
    '/oficinas',
    '/directorio-oficinas',
    '/informacion',
    '/propiedades',
    '/beneficios',
    '/ingredientes',
    '/contacto',
    '/envios-y-devoluciones',
    '/herramientas',
    '/base-de-conocimiento',
    '/base-conocimiento',
  ];

  for (const r of standardRoutes) {
    routes.add(r);
  }

  // Products routes
  for (const p of PRODUCTS) {
    if (p.slug) {
      routes.add(`/producto/${p.slug}`);
      routes.add(`/productos/${p.slug}`);
      routes.add(`/${p.slug}`);
    }
  }

  // Alias / Legacy routes for social share links
  for (const alias of Object.keys(PRODUCT_SLUG_ALIASES)) {
    routes.add(`/producto/${alias}`);
    routes.add(`/productos/${alias}`);
    routes.add(`/${alias}`);
  }

  // Documents routes
  for (const d of HGW_DOCUMENTS) {
    if (d.slug) {
      routes.add(`/documentos/${d.slug}`);
    }
  }

  // Knowledge Base articles routes (both slug and id for full backward-compatibility)
  const knowledgeArticles = knowledgeService.getAllArticles();
  for (const art of knowledgeArticles) {
    if (art.slug) {
      routes.add(`/base-de-conocimiento/${art.slug}`);
      routes.add(`/base-conocimiento/${art.slug}`);
    }
    if (art.id) {
      routes.add(`/base-de-conocimiento/${art.id}`);
      routes.add(`/base-conocimiento/${art.id}`);
    }
  }

  console.log(`Generating SEO pre-rendered HTML files for ${routes.size} routes...`);

  let count = 0;
  for (const route of routes) {
    const seo = getSeoMetadata(route);
    let html = baseHtml;

    // 1. Replace title
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${escapeHtml(seo.title)}</title>`);

    // 2. Replace description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/gi,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`
    );

    // 3. Replace canonical
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi,
      `<link rel="canonical" href="${escapeHtml(seo.url)}" />`
    );

    // 4. Replace OpenGraph tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:url" content="${escapeHtml(seo.url)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:image" content="${escapeHtml(seo.image)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:type" content="${escapeHtml(seo.type)}" />`
    );

    // 5. Replace Twitter tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`
    );

    // 6. Inject noindex meta tag when configured
    if (seo.noIndex) {
      html = html.replace(
        '</head>',
        `    <meta name="robots" content="noindex, nofollow" />\n  </head>`
      );
    }

    // 7. Inject Schema.org structured data if product
    const productJsonLdObj = buildProductJsonLd(seo);
    if (productJsonLdObj) {
      const productJsonLd = `\n    <script type="application/ld+json" id="product-jsonld">\n${JSON.stringify(productJsonLdObj, null, 2)}\n    </script>`;
      html = html.replace('</head>', `${productJsonLd}\n  </head>`);
    }

    // Determine target file
    if (route === '/') {
      // Overwrite main index.html with accurate root meta
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
    } else {
      // Target directory: dist/producto/trebol-coffee/index.html
      const targetDir = path.join(DIST_DIR, route.replace(/^\//, ''));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, html, 'utf-8');
    }
    count++;
  }

  console.log(`Successfully generated ${count} SEO pre-rendered pages with exact social share cards in dist/!`);

  // Generate and sync updated sitemap.xml
  generateSitemap();
}

generatePages();
