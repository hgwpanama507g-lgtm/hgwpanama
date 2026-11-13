import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { getSeoMetadata } from './src/data/seoMetadata';

function seoHtmlPlugin(): Plugin {
  return {
    name: 'seo-html-plugin',
    transformIndexHtml(html, ctx) {
      const pathname = ctx.originalUrl || ctx.path || '/';
      const cleanPath = pathname.split('?')[0].split('#')[0];
      const seo = getSeoMetadata(cleanPath);

      let result = html;
      result = result.replace(/<title>.*?<\/title>/gi, `<title>${seo.title}</title>`);
      result = result.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/gi,
        `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`
      );
      result = result.replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi,
        `<link rel="canonical" href="${seo.url}" />`
      );
      result = result.replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi,
        `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
      );
      result = result.replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi,
        `<meta property="og:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
      );
      result = result.replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi,
        `<meta property="og:url" content="${seo.url}" />`
      );
      result = result.replace(
        /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi,
        `<meta property="og:image" content="${seo.image}" />`
      );
      result = result.replace(
        /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/gi,
        `<meta property="og:type" content="${seo.type}" />`
      );
      result = result.replace(
        /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi,
        `<meta name="twitter:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
      );
      result = result.replace(
        /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi,
        `<meta name="twitter:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
      );
      result = result.replace(
        /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi,
        `<meta name="twitter:image" content="${seo.image}" />`
      );
      return result;
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoHtmlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
