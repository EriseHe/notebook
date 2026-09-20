import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { within } from './content.mjs';
import { normalizeBasePath } from './build.mjs';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
};

export async function startServer({ outputDir, basePath = '/notebook/', port = 4173 }) {
  const base = normalizeBasePath(basePath);
  const server = http.createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
      }
      const raw = request.url.split('?')[0];
      if (raw === '/' && base !== '/') {
        response.writeHead(302, { Location: base }).end();
        return;
      }
      if (raw === base.slice(0, -1)) {
        response.writeHead(301, { Location: base }).end();
        return;
      }
      let pathname;
      try {
        pathname = decodeURIComponent(raw);
      } catch {
        response.writeHead(400).end('Malformed URL');
        return;
      }
      if (!pathname.startsWith(base)) {
        response.writeHead(404).end('Not found');
        return;
      }
      const relative = pathname.slice(base.length);
      if (
        relative.split(/[\\/]/).some((part) => part.startsWith('.')) ||
        relative.includes('\0') ||
        relative.includes('\\')
      ) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      let target = path.resolve(outputDir, relative || 'index.html');
      if (!within(outputDir, target)) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      let stat = await fs.stat(target).catch(() => null);
      if (stat?.isDirectory()) {
        if (!raw.endsWith('/')) {
          response.writeHead(301, { Location: raw + '/' }).end();
          return;
        }
        target = path.join(target, 'index.html');
        stat = await fs.stat(target).catch(() => null);
      }
      if (!stat?.isFile()) {
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(
          request.method === 'HEAD'
            ? ''
            : await fs.readFile(path.join(outputDir, '404.html')).catch(() => 'Not found'),
        );
        return;
      }
      const real = await fs.realpath(target);
      if (!within(outputDir, real)) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      response.writeHead(200, {
        'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream',
        'Content-Length': stat.size,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? '' : await fs.readFile(target));
    } catch (error) {
      response.writeHead(500).end('Preview error');
      console.error(error.message);
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return {
    server,
    url: `http://127.0.0.1:${server.address().port}${base}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
