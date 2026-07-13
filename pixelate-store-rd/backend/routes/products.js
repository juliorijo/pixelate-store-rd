const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔓 RUTAS PÚBLICAS

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { categoria, marca, precioMin, precioMax, buscar, pagina = 1, limite = 12 } = req.query;

    // Construcción de filtro
    let filtro = { activo: true };

    if (categoria) {
      filtro.categoria = categoria;
    }

    if (marca) {
      filtro.marca = marca;
    }

    if (buscar) {
      filtro.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { descripcion: { $regex: buscar, $options: 'i' } },
      ];
    }

    // Filtro de precio
    if (precioMin || precioMax) {
      filtro.precio = {};
      if (precioMin) filtro.precio.$gte = Number(precioMin);
      if (precioMax) filtro.precio.$lte = Number(precioMax);
    }

    // Paginación
    const skip = (Number(pagina) - 1) * Number(limite);

    const productos = await Product.find(filtro)
      .limit(Number(limite))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filtro);

    res.json({
      productos,
      total,
      paginas: Math.ceil(total / Number(limite)),
      paginaActual: Number(pagina),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos destacados
router.get('/destacados', async (req, res) => {
  try {
    const productos = await Product.find({ destacado: true, activo: true }).limit(8);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto || !producto.activo) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener categorías disponibles
router.get('/categorias/list', async (req, res) => {
  try {
    const categorias = await Product.distinct('categoria', { activo: true });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener marcas disponibles
router.get('/marcas/list', async (req, res) => {
  try {
    const marcas = await Product.distinct('marca', { activo: true });
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener rango de precios
router.get('/precios/rango', async (req, res) => {
  try {
    const precios = await Product.aggregate([
      { $match: { activo: true } },
      { $group: { _id: null, min: { $min: '$precio' }, max: { $max: '$precio' } } },
    ]);

    if (precios.length > 0) {
      res.json(precios[0]);
    } else {
      res.json({ min: 0, max: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
