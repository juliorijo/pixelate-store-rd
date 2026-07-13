const multer = require('multer');
const path = require('path');

// Configurar dónde guardar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtrar archivos: solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)'), false);
  }
};

// Crear middleware de multer con soporte para múltiples campos
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por archivo
  fileFilter: fileFilter,
});

// Exportar middleware que maneja 'imagen' (principal) e 'imagenes' (múltiples secundarias)
module.exports = upload.fields([
  { name: 'imagen', maxCount: 1 },      // Imagen principal
  { name: 'imagenes', maxCount: 5 },    // Hasta 5 imágenes adicionales
]);
