const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Función auxiliar para calcular tipo de entrega
const calcularTipoEntrega = () => {
  const ahora = new Date();
  const hora = ahora.getHours();

  // Si es antes de las 2:00 PM (14:00), entrega el mismo día
  if (hora < 14) {
    return 'mismo_dia';
  } else {
    return 'siguiente_dia';
  }
};

// Función para calcular fecha de entrega
const calcularFechaEntrega = () => {
  const ahora = new Date();
  const hora = ahora.getHours();
  let fechaEntrega = new Date(ahora);

  if (hora < 14) {
    // Mismo día - entre 4-6 PM
    fechaEntrega.setHours(16, 0, 0, 0);
  } else {
    // Siguiente día - entre 9-11 AM
    fechaEntrega.setDate(fechaEntrega.getDate() + 1);
    fechaEntrega.setHours(10, 0, 0, 0);
  }

  return fechaEntrega;
};

// Crear un nuevo pedido / Checkout
router.post('/', async (req, res) => {
  try {
    const { 
      nombre, 
      email, 
      telefono, 
      direccion, 
      ciudad, 
      codigoPostal,
      items,
      metodoPago,
      notas 
    } = req.body;

    // Validaciones
    if (!nombre || !email || !telefono || !direccion || !ciudad) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    if (!metodoPago || !['efectivo', 'transferencia'].includes(metodoPago)) {
      return res.status(400).json({ error: 'Método de pago inválido' });
    }

    // Procesar items y validar stock
    let subtotal = 0;
    const itemsProcesados = [];

    for (const item of items) {
      const producto = await Product.findById(item.productoId);

      if (!producto) {
        return res.status(404).json({ error: `Producto ${item.productoId} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ 
          error: `Stock insuficiente de ${producto.nombre}. Disponibles: ${producto.stock}` 
        });
      }

      const subtotalItem = producto.precio * item.cantidad;
      subtotal += subtotalItem;

      itemsProcesados.push({
        productoId: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad,
        subtotal: subtotalItem,
      });

      // Reducir stock
      producto.stock -= item.cantidad;
      await producto.save();
    }

    // Calcular impuesto (18% ITBIS en RD)
    const impuesto = subtotal * 0.18;
    const costoDelvery = 0; // En RD, usualmente el delivery es gratis
    const total = subtotal + impuesto + costoDelvery;

    // Calcular tipo de entrega y fecha
    const tipoEntrega = calcularTipoEntrega();
    const fechaEntrega = calcularFechaEntrega();

    // Crear el pedido
    const nuevoPedido = new Order({
      usuarioId: req.body.usuarioId || null,
      nombre,
      email,
      telefono,
      direccion,
      ciudad,
      codigoPostal: codigoPostal || '',
      items: itemsProcesados,
      subtotal,
      impuesto,
      costoDelvery,
      total,
      metodoPago,
      notas: notas || '',
      tipoEntrega,
      fechaEntrega,
      estado: 'pendiente',
    });

    await nuevoPedido.save();

    res.status(201).json({
      mensaje: 'Pedido creado exitosamente ✅',
      pedido: nuevoPedido,
      tipoEntrega: tipoEntrega === 'mismo_dia' ? 'Entrega el mismo día' : 'Entrega al día siguiente',
      fechaEntrega: fechaEntrega,
    });
  } catch (error) {
    console.error('Error en checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido por ID
router.get('/:id', async (req, res) => {
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

// Obtener pedidos por email del cliente
router.get('/email/:email', async (req, res) => {
  try {
    const pedidos = await Order.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
