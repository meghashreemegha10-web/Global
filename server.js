const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 5000;
const BASE_DIR = __dirname;
const DATA_DIR = path.join(BASE_DIR, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data folder and leads.json exist
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}
if (!fs.existsSync(LEADS_FILE)) {
  try { fs.writeFileSync(LEADS_FILE, '[]', 'utf8'); } catch (e) {}
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https:;"
};

function getCacheControl(ext) {
  if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.webm', '.woff2', '.woff', '.ico', '.pdf'].includes(ext)) {
    return 'public, max-age=2592000, immutable'; // 30 days
  }
  if (['.css', '.js'].includes(ext)) {
    return 'public, max-age=86400'; // 1 day
  }
  return 'no-cache';
}

const ipRateLimit = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 15; // 15 submissions per minute per IP
  let entry = ipRateLimit.get(ip);
  if (!entry || now - entry.resetTime > windowMs) {
    entry = { count: 1, resetTime: now };
    ipRateLimit.set(ip, entry);
    return false;
  }
  entry.count++;
  return entry.count > maxRequests;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function handleEnquiryApi(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
    return res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
  }

  // Cross-Origin / CSRF Validation
  const origin = req.headers.origin || req.headers.referer || '';
  if (origin) {
    try {
      const u = new URL(origin);
      const h = u.hostname.toLowerCase();
      const isAllowed = (
        h === 'localhost' ||
        h === '127.0.0.1' ||
        h === 'globalmahanshibuilders.com' ||
        h === 'www.globalmahanshibuilders.com' ||
        h.endsWith('.trycloudflare.com') ||
        h.endsWith('.vercel.app')
      );
      if (!isAllowed) {
        res.writeHead(403, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
        return res.end(JSON.stringify({ success: false, error: 'Cross-Origin Request Blocked' }));
      }
    } catch (e) {
      // Invalid URL format in header
    }
  }

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '60', ...SECURITY_HEADERS });
    return res.end(JSON.stringify({ success: false, error: 'Too Many Requests. Please wait a minute before submitting again.' }));
  }

  let body = '';
  let bodySize = 0;
  let aborted = false;
  const MAX_SIZE = 100 * 1024; // 100 KB limit to prevent memory DoS

  req.on('data', chunk => {
    if (aborted) return;
    bodySize += chunk.length;
    if (bodySize > MAX_SIZE) {
      aborted = true;
      res.writeHead(413, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
      res.end(JSON.stringify({ success: false, error: 'Payload Too Large' }));
      req.destroy();
      return;
    }
    body += chunk;
  });

  req.on('end', () => {
    if (aborted) return;
    try {
      const data = JSON.parse(body || '{}');
      const name = escapeHtml(String(data.name || '').trim().slice(0, 100));
      const mobile = String(data.mobile || '').replace(/[^\d+]/g, '').slice(0, 20);
      const interest = escapeHtml(String(data.interest || 'General Enquiry').trim().slice(0, 150));
      const visit = escapeHtml(String(data.visit || 'Not specified').trim().slice(0, 80));
      const message = escapeHtml(String(data.message || '').trim().slice(0, 1000));

      if (!name || !mobile || mobile.length < 7) {
        res.writeHead(400, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
        return res.end(JSON.stringify({ success: false, error: 'Valid name and mobile number are required.' }));
      }

      const newLead = {
        id: 'LEAD-' + Date.now().toString(36).toUpperCase(),
        name,
        mobile,
        interest,
        visit,
        message,
        source: escapeHtml(String(data.source || 'Website').slice(0, 100)),
        timestamp: new Date().toISOString()
      };

      let leads = [];
      try {
        if (fs.existsSync(LEADS_FILE)) {
          leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8') || '[]');
        }
      } catch (e) {
        leads = [];
      }

      leads.unshift(newLead);
      if (leads.length > 5000) leads = leads.slice(0, 5000);

      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');

      res.writeHead(200, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
      res.end(JSON.stringify({
        success: true,
        message: 'Enquiry received successfully. Our site engineers will reach out shortly.',
        lead_id: newLead.id
      }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
      res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
    }
  });
}

function handleRequest(req, res) {
  try {
    const rawUrl = (req.url || '/').split('?')[0];

    // Security Check: Null Byte Injection trapping
    if (rawUrl.includes('%00') || (req.url && req.url.includes('\0'))) {
      res.writeHead(400, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      return res.end('400 Bad Request: Null bytes not allowed');
    }

    // Safe URI decoding with error trapping
    let reqPath = '/';
    try {
      reqPath = decodeURI(rawUrl);
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      return res.end('400 Bad Request: Malformed URI');
    }

    if (reqPath.includes('\0')) {
      res.writeHead(400, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      return res.end('400 Bad Request: Null bytes not allowed');
    }

    // API Endpoints
    if (reqPath === '/api/enquiry') {
      return handleEnquiryApi(req, res);
    }

    // Security Check 1: Deny hidden dotfiles, internal data, scripts, and server code
    const lowerPath = reqPath.toLowerCase();
    if (
      lowerPath.includes('/.') ||
      lowerPath.startsWith('/data') ||
      lowerPath.endsWith('.ps1') ||
      lowerPath.endsWith('.bat') ||
      lowerPath.endsWith('.php') ||
      lowerPath.endsWith('.json') ||
      lowerPath.endsWith('.md') ||
      lowerPath.endsWith('.bak') ||
      lowerPath.endsWith('.old') ||
      lowerPath.endsWith('.swp') ||
      lowerPath.endsWith('.sql') ||
      lowerPath.endsWith('.log') ||
      lowerPath === '/server.js'
    ) {
      res.writeHead(403, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      return res.end('403 Forbidden: Access Denied');
    }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Clean URL aliases
  let targetRel = reqPath;
  if (reqPath === '/pricing' || reqPath === '/pricing.html') {
    targetRel = '/packages.html';
  }

  // Path resolution and strict directory breakout check
  let filePath = path.resolve(BASE_DIR, '.' + targetRel);

  // If path doesn't exist, check if appending .html works
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Ensure filePath stays strictly inside BASE_DIR
  if (!filePath.startsWith(BASE_DIR + path.sep) && filePath !== BASE_DIR) {
    res.writeHead(403, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA-style routing or 404
      const fallbackPath = path.join(BASE_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, data) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
          return res.end('404 Not Found');
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache',
          ...SECURITY_HEADERS
        });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const cacheHeader = getCacheControl(ext);

    // Support video seeking via HTTP 206 Partial Content
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunkSize = (end - start) + 1;
      const stream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Cache-Control': cacheHeader,
        ...SECURITY_HEADERS
      });
      stream.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Content-Length': stats.size,
      'Cache-Control': cacheHeader,
      ...SECURITY_HEADERS
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
  } catch (fatalErr) {
    console.error('Unhandled request error:', fatalErr);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      res.end('500 Internal Server Error');
    }
  }
}

function getNetworkIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer(handleRequest);

server.listen(PORT, '0.0.0.0', () => {
  const netIp = getNetworkIp();
  console.log(`\n==================================================`);
  console.log(`Global Mahanshi Builders server running securely at:`);
  console.log(`  - Local:   http://localhost:${PORT}/`);
  console.log(`  - Network: http://${netIp}:${PORT}/`);
  console.log(`  - API:     http://localhost:${PORT}/api/enquiry`);
  console.log(`==================================================\n`);
});
