// Minimal static preview server for meandyou.de — no dependencies.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4322;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

async function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  let fp = path.join(ROOT, p);
  try {
    const s = await stat(fp);
    if (s.isDirectory()) fp = path.join(fp, 'index.html');
    return fp;
  } catch {
    if (!path.extname(fp)) {
      const withHtml = fp + '.html';
      try {
        await stat(withHtml);
        return withHtml;
      } catch {}
      const idx = path.join(ROOT, p, 'index.html');
      try {
        await stat(idx);
        return idx;
      } catch {}
    }
    return null;
  }
}

http.createServer(async (req, res) => {
  const fp = await resolve(req.url);
  if (!fp) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 — Seite nicht gefunden</h1>');
    return;
  }
  try {
    const body = await readFile(fp);
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(fp)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('500 Server Error');
  }
}).listen(PORT, () => console.log(`me&you Preview → http://localhost:${PORT}/`));
