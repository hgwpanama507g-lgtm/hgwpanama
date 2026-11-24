import express from 'express';
import { createServer as createViteServer } from 'vite';
import { registerServerApi } from './server/index';

async function startServer() {
  const app = express();
  const port = 3000;

  // Register API routes first
  registerServerApi(app);

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
