/**
 * Lenny Face Pro - High Performance Local Dev Server
 * Supports clean URLs, gzip/deflate, proper MIME types & CORS
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(ROOT_DIR, reqPath);

  // If file exists directly
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        return serveFile(res, indexFile);
      }
    } else {
      return serveFile(res, filePath);
    }
  }

  // Check clean URL (.html extension)
  const htmlPath = filePath + '.html';
  if (fs.existsSync(htmlPath)) {
    return serveFile(res, htmlPath);
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>404 Not Found - Lenny Face Pro</title></head>
    <body style="font-family:sans-serif; text-align:center; padding: 4rem; background:#090d16; color:#fff;">
      <h1 style="font-size:3rem;">(ノ_<。) 404</h1>
      <p>Page Not Found</p>
      <p><a href="/" style="color:#06b6d4;">Return to Home</a></p>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`✨ Lenny Face Pro Server running at http://localhost:${PORT}`);
});
