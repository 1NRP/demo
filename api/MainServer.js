#!/usr/bin/env deno run --allow-net --allow-read --allow-write --allow-env --env="./.env"

// vercel-deno@3.1.1

const CORS_ALLOWED_ORIGINS = ['https://1nrp.github.io']; // Allowed origins for CORS.
const PORT = 8000;
const FileTypes = { txt: 'text/plain', html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', ico: 'image/x-icon', svg: 'image/svg+xml', pdf: 'application/pdf', doc: 'application/msword', m3u8: 'application/vnd.apple.mpegurl', mp4: 'video/mp4', mp3: 'audio/mpeg', wav: 'audio/wav', mp3: 'audio/mpeg', ogg: 'audio/ogg', webm: 'video/webm', flv: 'video/x-flv' };

/*
 * The secret key for signing JWTs.
 * This key is generated on server start. For production, you should use a persistent,
 * securely stored key from an environment variable.
 */
const jwtSecretKey = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-256' },
  true, // Extractable.
  ['sign', 'verify'],
);

function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function CreateJWT(username) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // Expires in 2 hours
  };

  const encoder = new TextEncoder();
  const encodedHeader = base64urlEncode(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64urlEncode(encoder.encode(JSON.stringify(payload)));

  const signatureData = encoder.encode(`${encodedHeader}.${encodedPayload}`);
  const signature = await crypto.subtle.sign('HMAC', jwtSecretKey, signatureData);

  const encodedSignature = base64urlEncode(new Uint8Array(signature));

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

async function VerifyJWT(token) {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

    const signatureData = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const signature = Uint8Array.from(atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

    const isValid = await crypto.subtle.verify('HMAC', jwtSecretKey, signature, signatureData);
    if (!isValid) return null;

    const payload = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))));

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.log('Token expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}

function ParseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      if (parts) {
        const name = parts[1].trim();
        const value = parts[2].trim();
        cookies[name] = value;
      }
    });
  }
  return cookies;
}

function ProtectedRoute(Handler) {
  return async (req) => {
    const cookies = ParseCookies(req.headers.get('Cookie'));
    const token = cookies.jwt_token;

    if (!token) {
      return new Response('Unauthorized: Missing token', { status: 401 });
    }

    const payload = await VerifyJWT(token);
    if (!payload) {
      return new Response('Unauthorized: Invalid token', { status: 401 });
    }

    // Pass the request and the verified payload to the actual handler
    return Handler(req, payload);
  };
}

async function ServeStaticFile(FilePath) {
  try {
    const File = await Deno.readFile(FilePath);
    const type = FileTypes[ FilePath.split('.').pop() || 'html' ];
    return new Response(new Blob([File], { type }), {
      headers: { 'Content-Type': type },
    });
  } catch (error) {
    console.error(`Error serving ${FilePath}: `, error);
    return new Response('An Error Occurred While Serving The File Request.', { status: 500 });
  }
}

async function LoginHandler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  try {
    const { username, password } = await req.json();
    if ( Deno.env.get('USERNAME') === username && Deno.env.get('PASSWORD') === password ) {
      const token = await CreateJWT(username);
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Set-Cookie', `jwt_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`);
      return new Response(JSON.stringify({ success: true, message: 'Login successful' }), { headers });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

const Router = new Map();

const Route = (method, pathname, handler) => Router.set(`${method.toUpperCase()}:${pathname.toLowerCase()}`, handler);

import { DeleteLink, GetM3U8, GetLink, SaveLink, CheckIfExists, TgChannels, DatabaseDeletionPreventionCRONJob as CronJob, 
         CorsProxy, JSNotebook, SaveNote, DeleteNote, GetNote, BlobServer, FyersToken } from '../Functions.js';

Route('GET', '/', () => ServeStaticFile('../Index.html'));
Route('GET', '/upload.js', () => ServeStaticFile('../VercelUpload.js'));
Route('POST', '/login', LoginHandler); // Login route.
Route('GET', '/login', () => ServeStaticFile('../Login.html'));
Route('POST', '/deletelink', DeleteLink);
Route('GET', '/getm3u8', GetM3U8);
Route('GET', '/getlink', GetLink);
Route('POST', '/savelink', SaveLink);
Route('GET', '/kv-and-blob-database-deletion-prevention-cron-job', CronJob);
Route('POST', '/checklinkexistence', CheckIfExists);
Route('GET', '/tgchannels', TgChannels);
Route('GET', '/cors-proxy', CorsProxy);
Route('GET', '/jsnb', JSNotebook);
Route('POST', '/jsnb', JSNotebook);
Route('GET', '/blob', ProtectedRoute(() => ServeStaticFile('../Blob.html')));
Route('GET', '/fyerstoken', ProtectedRoute(FyersToken));
Route('POST', '/fyerstoken', ProtectedRoute(FyersToken));
Route('GET', '/getnote', ProtectedRoute(GetNote));
Route('POST', '/savenote', ProtectedRoute(SaveNote));
Route('POST', '/deletenote', ProtectedRoute(DeleteNote));
Route('GET', '/blobserver', ProtectedRoute(BlobServer));
Route('POST', '/blobserver', ProtectedRoute(BlobServer));

async function MainHandler(req) {
  const path = new URL(req.url).pathname;
  const method = req.method;

  // Handle CORS preflight (OPTIONS) requests.
  if (method === 'OPTIONS') {
    const origin = req.headers.get('Origin');
    if (origin && CORS_ALLOWED_ORIGINS.includes(origin)) {
      return new Response(null, {
        status: 204, // No Content
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
      });
    }
    return new Response(null, { status: 204 }); // Standard response for non-matching origins.
  }

  // Find and execute the route handler
  const Handler = Router.get(`${method}:${path.toLowerCase()}`);
  let response;

  if (Handler) {
    console.log(`HTTP Request Received: Method:${method}, Path: ${path}`);
    response = await Handler(req);
  } else {
    response = new Response('Not Found', { status: 404 });
  }

  // Add CORS headers to the actual response.
  const origin = req.headers.get('Origin');
  if (origin && CORS_ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

// console.log(`Deno Server Listening On http://0.0.0.0:${PORT}/`);
// Deno.serve({ port: PORT }, MainHandler);

// deno task run

export default MainHandler;


/*

{
  "name": "cloud-notes",
  "version": "1.0",
  "description": "A web app to store texts and files in Vercel KV & Blob storage.",
  "main": "mainServer.js",
  "type": "module",
  "scripts": {
    "start": "mainServer.js",
    "serve": "npm run serve"
  },
  "dependencies": {
    "@vercel/blob": "^0.27.1",
    "@vercel/kv": "^3.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "crypto": "^1.0.1",
    "express-basic-auth": "^1.2.1"
  },
  "devDependencies": {
    "esbuild": "^0.25.0",
    "serve": "^14.2.4",
    "vercel": "^28.0.0"
  },
  "engines": {
    "node": ">=20.x"
  }
}


*/