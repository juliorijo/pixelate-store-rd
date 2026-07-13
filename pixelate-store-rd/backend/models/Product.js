const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    precioOriginal: {
      type: Number,
      default: null, // Para mostrar descuentos
    },
    categoria: {
      type: String,
      enum: ['Cámaras', 'Lentes', 'Accesorios', 'Trípodes'],
      required: [true, 'La categoría es requerida'],
    },
    marca: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    imagen: {
      type: String, // Ruta del archivo o URL
      required: true,
    },
    imagenes: [String], // Galería de imágenes adicionales
    especificaciones: {
      type: Map,
      of: String, // Ejemplo: { "Sensor": "Full Frame", "Megapíxeles": "45" }
      default: new Map(),
    },
    descuento: {
      type: Number,
      default: 0, // Porcentaje de descuento
      min: 0,
      max: 100,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    calificacion: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numeroResenas: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
