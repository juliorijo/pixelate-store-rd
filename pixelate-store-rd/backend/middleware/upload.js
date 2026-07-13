const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

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

/**
 * Middleware de compresión de imágenes con Sharp
 * Comprime automáticamente después de subir
 * Reduce tamaño 80-90% manteniendo calidad
 */
const compressImages = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  try {
    // Comprimir imagen principal
    if (req.files.imagen && req.files.imagen.length > 0) {
      const mainImage = req.files.imagen[0];
      const mainPath = mainImage.path;

      // Comprimir a WebP (80% menor que JPG)
      await sharp(mainPath)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(mainPath + '.webp');

      // Guardar path optimizado
      req.files.imagen[0].path = mainPath + '.webp';
      req.files.imagen[0].filename = mainImage.filename + '.webp';
    }

    // Comprimir imágenes secundarias
    if (req.files.imagenes && req.files.imagenes.length > 0) {
      await Promise.all(
        req.files.imagenes.map(async (img) => {
          const imgPath = img.path;
          await sharp(imgPath)
            .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(imgPath + '.webp');

          // Guardar path optimizado
          img.path = imgPath + '.webp';
          img.filename = img.filename + '.webp';
        })
      );
    }

    next();
  } catch (error) {
    console.error('Error compressing images:', error);
    next(); // Continuar incluso si hay error
  }
};

// Exportar middleware que maneja 'imagen' (principal) e 'imagenes' (múltiples secundarias)
module.exports = {
  upload: upload.fields([
    { name: 'imagen', maxCount: 1 },      // Imagen principal
    { name: 'imagenes', maxCount: 5 },    // Hasta 5 imágenes adicionales
  ]),
  compressImages,
};
