import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { Hono } from 'hono';

import { hmac } from './hmac';

const app = new Hono();

app.get("/", (ctx) =>  hmac(ctx) );

const port = 3000;

serve({ fetch: app.fetch, port: port });
console.log(`Server started on http://localhost:${port}. Press Ctrl+C to stop.`);
