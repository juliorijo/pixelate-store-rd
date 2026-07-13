require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { validateCSRF, getCsrfTokenRoute } = require('./middleware/csrf');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 12000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Conectar a la base de datos
connectDB();

// 🛡️ SEGURIDAD: Helmet para headers de seguridad
app.use(helmet({
  contentSecurityPolicy: false, // Ajustar si es necesario
  crossOriginEmbedderPolicy: false,
}));

// 🔒 Rate Limiting: Proteger contra brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máx 100 requests por IP por ventana
  message: 'Demasiadas solicitudes, intenta más tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting más estricto para login/auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Máx 5 intentos de login por IP en 15 min
  message: 'Demasiados intentos de login, intenta en 15 minutos',
  skipSuccessfulRequests: true, // No contar intentos exitosos
});

// Aplicar limiters globalmente
app.use(limiter);

// Configurar CORS según el entorno
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL,
        'https://pixelate-frontend.onrender.com',
        'https://pixelate-frontend-*.onrender.com'
      ].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 🔒 CSRF Token validation para POST/PUT/DELETE
app.use(validateCSRF);

// Ruta para obtener CSRF token (no requiere validación)
app.get('/api/csrf-token', getCsrfTokenRoute);

// Servir archivos estáticos (imágenes) con CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static(path.join(__dirname, 'uploads')));


// Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/reportes', require('./routes/reportes'));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend funcionando correctamente ✅' });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Pixelate Store RD - API Backend',
    version: '1.0.0',
    status: 'active'
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores general
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎥 Pixelate Store RD - Backend      ║
║   Servidor ejecutándose en:            ║
║   http://localhost:${PORT}                ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
module.exports.authLimiter = authLimiter;
