/**
 * Script de inicialización para Render
 * Ejecuta el seed de datos si la base de datos está vacía
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    console.log('🔧 Verificando estado de la base de datos...');

    // Conectar a MongoDB
    await connectDB();

    // Verificar si hay usuarios admin
    const adminCount = await User.countDocuments({ rol: 'admin' });

    if (adminCount === 0) {
      console.log('📦 Base de datos vacía. Ejecutando seed de datos...');

      // Ejecutar seed
      const adminUser = {
        nombre: 'Admin Pixelate',
        email: 'admin@pixelate.rd',
        contraseña: 'Admin123456',
        rol: 'admin'
      };

      const adminCreado = await User.create(adminUser);
      console.log('✅ Usuario admin creado:', adminCreado.email);

      // Agregar productos de ejemplo
      const productos = [
        {
          nombre: 'Cámara Canon EOS R5',
          descripcion: 'Cámara mirrorless profesional de Canon',
          precio: 3999,
          categoria: 'Cámaras',
          imagen: '/uploads/canon-r5.jpg',
          imagenes: []
        },
        {
          nombre: 'Lente Sony 70-200mm',
          descripcion: 'Lente teleobjetivo de alta calidad',
          precio: 1200,
          categoria: 'Lentes',
          imagen: '/uploads/sony-70-200.jpg',
          imagenes: []
        },
        {
          nombre: 'Trípode Manfrotto',
          descripcion: 'Trípode profesional estable',
          precio: 250,
          categoria: 'Accesorios',
          imagen: '/uploads/tripode.jpg',
          imagenes: []
        },
        {
          nombre: 'Mochila Peak Design',
          descripcion: 'Mochila fotográfica duradera',
          precio: 300,
          categoria: 'Accesorios',
          imagen: '/uploads/mochila.jpg',
          imagenes: []
        },
        {
          nombre: 'Filtro Polarizador 77mm',
          descripcion: 'Filtro para reducir reflejos',
          precio: 80,
          categoria: 'Accesorios',
          imagen: '/uploads/filtro.jpg',
          imagenes: []
        }
      ];

      const productosCreados = await Product.insertMany(productos);
      console.log(`✅ ${productosCreados.length} productos de ejemplo creados`);

      console.log('✨ Seed completado exitosamente');
    } else {
      console.log(`✅ Base de datos ya contiene ${adminCount} admin(es). Sin cambios.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error.message);
    process.exit(1);
  }
};

seedData();
