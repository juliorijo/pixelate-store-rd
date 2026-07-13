const rateLimit = require('express-rate-limit');

// Global limiter: 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máx 100 requests por IP por ventana
  message: 'Demasiadas solicitudes, intenta más tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth limiter: 5 login attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Máx 5 intentos de login por IP en 15 min
  message: 'Demasiados intentos de login, intenta en 15 minutos',
  skipSuccessfulRequests: true, // No contar intentos exitosos
});

module.exports = {
  globalLimiter,
  authLimiter,
};
