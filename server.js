const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HTTP_PORT = 5080;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

function handleRequest(req, res) {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(BASE_DIR, reqPath);
  if (reqPath === '/pricing' || reqPath === '/pricing.html') {
    filePath = path.join(BASE_DIR, 'packages.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Security check: ensure path is within BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client side routing if needed
      const fallbackPath = path.join(BASE_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, data) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

const keyPath = path.join(BASE_DIR, 'key.pem');
const certPath = path.join(BASE_DIR, 'cert.pem');

let hasSSL = fs.existsSync(keyPath) && fs.existsSync(certPath);

if (hasSSL) {
  const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  // Secure HTTPS Server on PORT (5000)
  const httpsServer = https.createServer(sslOptions, handleRequest);

  // If a browser sends plain HTTP to the HTTPS port, automatically redirect to https://
  httpsServer.on('clientError', (err, socket) => {
    if (err.code === 'ERR_SSL_WRONG_VERSION_NUMBER' || (err.message && err.message.includes('wrong version number'))) {
      const redirectUrl = `https://192.168.1.21:${PORT}/`;
      const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head><body style="font-family:system-ui,sans-serif;padding:3rem;text-align:center;background:#F6F3EC;color:#1F3630;"><h2>🔒 Upgrading to Secure HTTPS...</h2><p>Redirecting to <a href="${redirectUrl}" style="color:#9E3F1C;font-weight:bold;">${redirectUrl}</a></p></body></html>`;
      socket.end(`HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: ${Buffer.byteLength(html)}\r\nConnection: close\r\n\r\n${html}`);
      return;
    }
    socket.destroy();
  });

  httpsServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Global Mahanshi Builders [SECURE HTTPS] running at:`);
    console.log(`  - Local:   https://localhost:${PORT}/`);
    console.log(`  - Network: https://192.168.1.21:${PORT}/`);
  });

  // Optional HTTP redirect server on port 5080
  const httpServer = http.createServer((req, res) => {
    const host = req.headers.host ? req.headers.host.split(':')[0] : '192.168.1.21';
    res.writeHead(301, { 'Location': `https://${host}:${PORT}${req.url}` });
    res.end();
  });

  httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log(`HTTP redirect listener on port ${HTTP_PORT} -> redirects to HTTPS :${PORT}`);
  });

} else {
  // Plain HTTP fallback
  const server = http.createServer(handleRequest);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Global Mahanshi Builders (HTTP) running at http://localhost:${PORT}/`);
  });
}
