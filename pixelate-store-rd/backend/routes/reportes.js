const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

/**
 * GET /api/admin/reportes/datos
 * Obtiene datos de reportes y estadísticas
 */
router.get('/datos', adminAuth, async (req, res) => {
  try {
    const { inicio, fin } = req.query;

    // Filtro de fechas (opcional)
    let filtroFecha = {};
    if (inicio && fin) {
      filtroFecha = {
        createdAt: {
          $gte: new Date(inicio),
          $lte: new Date(fin),
        },
      };
    }

    // Obtener pedidos
    const pedidos = await Order.find(filtroFecha);

    // Calcular metrícas
    const ventasTotal = pedidos.reduce((sum, p) => sum + (p.total || 0), 0);
    const pedidosTotal = pedidos.length;

    // Ventas por día (últimos 7 días)
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);

    const ventasDiarias = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fecha.setHours(0, 0, 0, 0);

      const proximodia = new Date(fecha);
      proximodia.setDate(proximodia.getDate() + 1);

      const pedidosDia = pedidos.filter(p => {
        const pFecha = new Date(p.createdAt);
        return pFecha >= fecha && pFecha < proximodia;
      });

      ventasDiarias.push({
        fecha: fecha.toLocaleDateString('es-ES', { weekday: 'short' }).slice(0, 3),
        ventas: pedidosDia.reduce((sum, p) => sum + (p.total || 0), 0),
        pedidos: pedidosDia.length,
      });
    }

    // Productos más vendidos
    const productoStats = {};
    pedidos.forEach(pedido => {
      pedido.items?.forEach(item => {
        if (!productoStats[item.productoId]) {
          productoStats[item.productoId] = { nombre: item.nombre, ventas: 0 };
        }
        productoStats[item.productoId].ventas += item.cantidad;
      });
    });

    const productosTop = Object.values(productoStats)
      .sort((a, b) => b.ventas - a.ventas)
      .slice(0, 5);

    // Estado de pedidos
    const estadoPedidos = [
      { nombre: 'Completado', value: pedidos.filter(p => p.estado === 'completado').length },
      { nombre: 'En Tránsito', value: pedidos.filter(p => p.estado === 'en_transito').length },
      { nombre: 'Pendiente', value: pedidos.filter(p => p.estado === 'pendiente').length },
    ];

    // Clientes únicos
    const clientesActivos = await User.countDocuments({ rol: 'cliente' });

    res.json({
      ventasTotal,
      ventasHoy: ventasDiarias[ventasDiarias.length - 1]?.ventas || 0,
      pedidosTotal,
      pedidosPendientes: estadoPedidos.find(e => e.nombre === 'Pendiente')?.value || 0,
      productosVendidos: Object.values(productoStats).reduce((sum, p) => sum + p.ventas, 0),
      clientesActivos,
      ventasDiarias,
      productosTop,
      estadoPedidos,
    });
  } catch (error) {
    console.error('Error en reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});

/**
 * GET /api/admin/reportes/resumen
 * Obtiene resumen rápido
 */
router.get('/resumen', adminAuth, async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const ventasHoy = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: hoy, $lt: mañana },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      ventasHoy: ventasHoy[0]?.total || 0,
      pedidosHoy: ventasHoy[0]?.count || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
});

module.exports = router;
