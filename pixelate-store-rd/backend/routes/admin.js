const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { adminAuth } = require('../middleware/auth');
const { upload, compressImages } = require('../middleware/upload');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// 🔒 TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN DE ADMIN

// ==================== PRODUCTOS ====================

// Crear nuevo producto
router.post('/productos', adminAuth, upload, compressImages, async (req, res) => {
  try {
    const { nombre, descripcion, precio, precioOriginal, categoria, marca, stock, especificaciones, descuento, destacado } = req.body;

    if (!nombre || !descripcion || !precio || !categoria || !marca) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    if (!req.files || !req.files.imagen || req.files.imagen.length === 0) {
      return res.status(400).json({ error: 'La imagen principal es requerida' });
    }

    const imagen = `/uploads/${req.files.imagen[0].filename}`;
    const imagenes = req.files.imagenes ? req.files.imagenes.map((f) => `/uploads/${f.filename}`) : [];

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio: Number(precio),
      precioOriginal: precioOriginal ? Number(precioOriginal) : null,
      categoria,
      marca,
      stock: Number(stock) || 0,
      imagen,
      imagenes,
      especificaciones: especificaciones ? JSON.parse(especificaciones) : {},
      descuento: Number(descuento) || 0,
      destacado: destacado === 'true' || destacado === true,
    });

    await nuevoProducto.save();

    res.status(201).json({
      mensaje: 'Producto creado exitosamente ✅',
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los productos (admin)
router.get('/productos', adminAuth, async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener producto por ID (admin)
router.get('/productos/:id', adminAuth, async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/productos/:id', adminAuth, upload, compressImages, async (req, res) => {
  try {
    const { nombre, descripcion, precio, precioOriginal, categoria, marca, stock, especificaciones, descuento, destacado, activo } = req.body;

    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar campos
    if (nombre) producto.nombre = nombre;
    if (descripcion) producto.descripcion = descripcion;
    if (precio) producto.precio = Number(precio);
    if (precioOriginal) producto.precioOriginal = Number(precioOriginal);
    if (categoria) producto.categoria = categoria;
    if (marca) producto.marca = marca;
    if (stock !== undefined) producto.stock = Number(stock);
    if (descuento !== undefined) producto.descuento = Number(descuento);
    if (destacado !== undefined) producto.destacado = destacado === 'true' || destacado === true;
    if (activo !== undefined) producto.activo = activo === 'true' || activo === true;
    if (especificaciones) producto.especificaciones = JSON.parse(especificaciones);

    // Manejar imagen principal
    if (req.files && req.files.imagen && req.files.imagen.length > 0) {
      // Eliminar imagen anterior si es local
      if (producto.imagen && producto.imagen.startsWith('/uploads/')) {
        const rutaAnterior = path.join(__dirname, '..', producto.imagen);
        if (fs.existsSync(rutaAnterior)) {
          fs.unlinkSync(rutaAnterior);
        }
      }
      producto.imagen = `/uploads/${req.files.imagen[0].filename}`;
    }

    // Manejar imágenes secundarias (agregar nuevas)
    if (req.files && req.files.imagenes && req.files.imagenes.length > 0) {
      const nuevasImagenes = req.files.imagenes.map((f) => `/uploads/${f.filename}`);
      producto.imagenes = [...(producto.imagenes || []), ...nuevasImagenes];

      // Limitar a máximo 5 imágenes totales
      if (producto.imagenes.length > 5) {
        // Eliminar las más antiguas localmente
        const imagenesToDelete = producto.imagenes.slice(0, producto.imagenes.length - 5);
        imagenesToDelete.forEach((img) => {
          if (img.startsWith('/uploads/')) {
            const rutaImg = path.join(__dirname, '..', img);
            if (fs.existsSync(rutaImg)) {
              fs.unlinkSync(rutaImg);
            }
          }
        });
        producto.imagenes = producto.imagenes.slice(-5);
      }
    }

    await producto.save();

    res.json({
      mensaje: 'Producto actualizado exitosamente ✅',
      producto,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
router.delete('/productos/:id', adminAuth, async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar imagen
    if (producto.imagen) {
      const ruta = path.join(__dirname, '..', producto.imagen);
      if (fs.existsSync(ruta)) {
        fs.unlinkSync(ruta);
      }
    }

    res.json({ mensaje: 'Producto eliminado exitosamente ✅' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PEDIDOS ====================

// Obtener todos los pedidos
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const { estado, desde, hasta } = req.query;
    let filtro = {};

    if (estado) filtro.estado = estado;
    if (desde || hasta) {
      filtro.createdAt = {};
      if (desde) filtro.createdAt.$gte = new Date(desde);
      if (hasta) filtro.createdAt.$lte = new Date(hasta);
    }

    const pedidos = await Order.find(filtro)
      .populate('items.productoId')
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener pedido por ID
router.get('/orders/:id', adminAuth, async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id).populate('items.productoId');

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado del pedido
router.put('/orders/:id/estado', adminAuth, async (req, res) => {
  try {
    const { estado, notasAdmin } = req.body;

    const estadosValidos = ['pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const pedido = await Order.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    if (notasAdmin) pedido.notasAdmin = notasAdmin;

    if (estado === 'confirmado' && !pedido.horaConfirmacion) {
      pedido.horaConfirmacion = new Date();
    }

    if (estado === 'entregado' && !pedido.horaEntrega) {
      pedido.horaEntrega = new Date();
    }

    await pedido.save();

    res.json({
      mensaje: 'Estado actualizado exitosamente ✅',
      pedido,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ESTADÍSTICAS ====================

// Obtener estadísticas del dashboard
router.get('/estadisticas/dashboard', adminAuth, async (req, res) => {
  try {
    const totalProductos = await Product.countDocuments();
    const totalPedidos = await Order.countDocuments();
    const totalClientes = await User.countDocuments({ rol: 'usuario' });

    // Ingresos totales
    const ingresos = await Order.aggregate([
      { $match: { estado: { $in: ['confirmado', 'en_camino', 'entregado'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    // Pedidos por estado
    const pedidosPorEstado = await Order.aggregate([
      { $group: { _id: '$estado', cantidad: { $sum: 1 } } },
    ]);

    // Productos más vendidos
    const masVendidos = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.productoId', cantidad: { $sum: '$items.cantidad' }, ventas: { $sum: '$items.subtotal' } } },
      { $sort: { cantidad: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'producto' } },
    ]);

    res.json({
      totalProductos,
      totalPedidos,
      totalClientes,
      ingresosTotales: ingresos[0]?.total || 0,
      pedidosPorEstado,
      productosmasVendidos: masVendidos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
