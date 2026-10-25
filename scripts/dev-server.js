import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const dirFlagIndex = args.indexOf('--dir');
const serveSubdir = dirFlagIndex !== -1 && args[dirFlagIndex + 1] ? args[dirFlagIndex + 1] : '.';
const portFlagIndex = args.indexOf('--port');
const requestedPort = portFlagIndex !== -1 && args[portFlagIndex + 1]
  ? Number(args[portFlagIndex + 1])
  : Number(process.env.PORT || 4173);

const publicRoot = path.resolve(rootDir, serveSubdir);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let urlPath = decodeURIComponent(parsedUrl.pathname);
    if (urlPath === '/') {
      urlPath = '/index.html';
    }

    const safePath = path.normalize(path.join(publicRoot, urlPath));
    if (!safePath.startsWith(publicRoot)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden');
      return;
    }

    if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(safePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    res.end(content);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`500 Internal Server Error: ${err.message}`);
  }
});

server.listen(requestedPort, '127.0.0.1', () => {
  console.log(`Periodic Table server running at http://127.0.0.1:${requestedPort} (serving ${publicRoot})`);
});
