const crypto = require('crypto');

/**
 * Middleware CSRF simplificado
 * Valida que POST/PUT/DELETE requests incluyan X-CSRF-Token header
 * En producción, este token debería venir del servidor en GET /api/csrf-token
 */

const csrfTokens = new Map(); // Store tokens con expiración

// Generar token CSRF
const generateCSRFToken = (sessionId) => {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(token, {
    sessionId,
    createdAt: Date.now(),
    expiresIn: 60 * 60 * 1000 // 1 hora
  });
  return token;
};

// Middleware para validar CSRF
const validateCSRF = (req, res, next) => {
  // GET y OPTIONS no necesitan CSRF
  if (req.method === 'GET' || req.method === 'OPTIONS') {
    return next();
  }

  // Obtener token del header
  const token = req.headers['x-csrf-token'];

  if (!token) {
    return res.status(403).json({ error: 'CSRF token requerido' });
  }

  // Validar token
  const tokenData = csrfTokens.get(token);
  if (!tokenData) {
    return res.status(403).json({ error: 'CSRF token inválido' });
  }

  // Validar expiración
  if (Date.now() - tokenData.createdAt > tokenData.expiresIn) {
    csrfTokens.delete(token);
    return res.status(403).json({ error: 'CSRF token expirado' });
  }

  // Token válido - eliminar para uso único
  csrfTokens.delete(token);
  next();
};

// Ruta para obtener CSRF token
const getCsrfTokenRoute = (req, res) => {
  const sessionId = req.ip || 'unknown';
  const token = generateCSRFToken(sessionId);
  res.json({ csrfToken: token });
};

module.exports = {
  generateCSRFToken,
  validateCSRF,
  getCsrfTokenRoute
};
