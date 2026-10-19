/**
 * Lenny Face Pro - Universal Server & Handler
 * Works both as:
 * 1. Standalone Node.js HTTP server (node server.js) for local development
 * 2. Vercel Serverless Function handler (module.exports = (req, res))
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const PORT = process.env.PORT || 3001;

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
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('500 Internal Server Error: ' + err.message);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable'
    });
    res.end(data);
  });
}

function handleRequest(req, res) {
  try {
    let reqUrl = req.url || '/';
    let reqPath = decodeURI(reqUrl.split('?')[0]);
    if (reqPath === '/' || !reqPath) reqPath = '/index.html';

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
    const trimmed = filePath.replace(/[/\\]+$/, '');
    const htmlPath = trimmed + '.html';
    if (fs.existsSync(htmlPath)) {
      return serveFile(res, htmlPath);
    }

    // Check directory with index.html
    const dirIndex = path.join(trimmed, 'index.html');
    if (fs.existsSync(dirIndex)) {
      return serveFile(res, dirIndex);
    }

    // Fallback to index.html for root or SPA
    const rootIndex = path.join(ROOT_DIR, 'index.html');
    if (fs.existsSync(rootIndex)) {
      return serveFile(res, rootIndex);
    }

    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end('<h1>404 Not Found</h1>');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Server Error: ' + err.message);
  }
}

const server = http.createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`✨ Lenny Face Pro Server running at http://localhost:${PORT}`);
  });
}

module.exports = handleRequest;
module.exports.default = handleRequest;
