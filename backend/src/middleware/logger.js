export function requestLogger(req, res, next) {
  if (req.method !== 'OPTIONS') {
    const now = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[${now}] ${ip} ${req.method} ${req.originalUrl}`);
  }
  next();
}
