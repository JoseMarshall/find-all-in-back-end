import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import setupMiddleware from './middleware';
import setupRoutes from './routes';

const app = express();
setupMiddleware(app);
setupRoutes(app);

export const io = new Server(createServer(app));

export default app;
