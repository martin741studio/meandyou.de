// ============================================================
//  Deploy meandyou.de via FTP — without downtime.
//  Reads .env (copy from .env.example). Run: node deploy.mjs
//  Uploads in place: assets first, pages next, .htaccess last.
// ============================================================
import * as ftp from 'basic-ftp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// tiny .env loader (no dotenv dependency)
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const HOST = process.env.FTP_HOST;
const USER = process.env.FTP_USER;
const PASS = process.env.FTP_PASS;
const REMOTE = process.env.FTP_REMOTE_DIR || '/';
const SECURE = process.env.FTP_SECURE === 'true';

const PROTECT = new Set(['cgi-bin', '.well-known', 'error_log']);
const EXCLUDE = new Set(['.git', '.env', '.env.example', 'node_modules', 'deploy.mjs', 'serve.mjs', 'package.json', 'package-lock.json', 'README.md', 'CLAUDE.md', 'README.txt', '.DS_Store']);

if (!HOST || !USER || !PASS) {
  console.error('Missing FTP creds. Copy .env.example to .env and fill FTP_HOST / FTP_USER / FTP_PASS.');
  process.exit(1);
}

function walk(dir, base = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE.has(e.name)) continue;
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
}

const rank = f => (f === '.htaccess' ? 3 : f.endsWith('.html') ? 2 : 1);
const files = walk(ROOT).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

if (!files.includes('index.html')) {
  console.error('index.html is missing. Deploy stopped.');
  process.exit(1);
}

async function deploy() {
  const client = new ftp.Client(60000);
  try {
    await client.access({ host: HOST, user: USER, password: PASS, secure: SECURE });
    console.log(`Connected → ${HOST}  (remote: ${REMOTE})`);
    await client.ensureDir(REMOTE);

    for (const rel of files) {
      const src = path.join(ROOT, rel);
      const remoteDir = path.posix.join(REMOTE, path.posix.dirname(rel));
      if (remoteDir !== REMOTE) await client.ensureDir(remoteDir);
      await client.uploadFrom(src, path.posix.join(REMOTE, rel));
    }
    console.log(`  uploaded ${files.length} files`);
    console.log(`✅ Deployed me&you → ${HOST}`);
  } catch (err) {
    console.error('FTP Deploy failed:', err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
