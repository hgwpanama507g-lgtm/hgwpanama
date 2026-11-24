import express from 'express';
import chatHandler from './api/chat';

export function registerServerApi(app: express.Express) {
  app.use(express.json());
  app.post('/api/chat', chatHandler);
}
