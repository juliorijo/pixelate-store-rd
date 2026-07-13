require('dotenv').config();
const mongoose = require('mongoose');
// Ajustar rutas relativas desde la carpeta scripts
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/db');

const productosEjemplo = [
  {
    nombre: 'Canon EOS R5',
    descripcion: 'Cámara mirrorless full-frame profesional con 45 megapíxeles',
    precio: 4500,
    categoria: 'Cámaras',
    marca: 'Canon',
    stock: 5,
    imagen: '/uploads/canon-eos-r5.jpg',
    especificaciones: {
      'Sensor': 'Full-frame',
      'Megapíxeles': '45MP',
      'Video': '8K',
      'Velocidad': '12fps'
    },
    descuento: 10,
    destacado: true,
  },
  {
    nombre: 'Sony Alpha 7 IV',
    descripcion: 'Cámara mirrorless con sensor Exmor R de 61MP',
    precio: 3999,
    categoria: 'Cámaras',
    marca: 'Sony',
    stock: 8,
    imagen: '/uploads/sony-a7iv.jpg',
    especificaciones: {
      'Sensor': 'Full-frame',
      'Megapíxeles': '61MP',
      'Video': '4K 60fps',
      'Velocidad': '10fps'
    },
    destacado: true,
  },
  {
    nombre: 'Nikon D850',
    descripcion: 'Cámara DSLR profesional con sensor de 45.7MP',
    precio: 3297,
    categoria: 'Cámaras',
    marca: 'Nikon',
    stock: 4,
    imagen: '/uploads/nikon-d850.jpg',
    especificaciones: {
      'Sensor': 'Full-frame',
      'Megapíxeles': '45.7MP',
      'Video': '4K',
      'Velocidad': '7fps'
    },
    destacado: false,
  },
  {
    nombre: 'Canon RF 24-105mm f/4L IS USM',
    descripcion: 'Lente zoom estándar versátil con estabilización de imagen',
    precio: 1500,
    categoria: 'Lentes',
    marca: 'Canon',
    stock: 12,
    imagen: '/uploads/canon-rf-24-105.jpg',
    especificaciones: {
      'Rango focal': '24-105mm',
      'Apertura': 'f/4',
      'Estabilización': 'Sí',
      'Tipo': 'Zoom'
    },
    descuento: 5,
    destacado: true,
  },
  {
    nombre: 'Sony FE 70-200mm f/2.8 GM OSS',
    descripcion: 'Telefoto profesional con apertura f/2.8 constante',
    precio: 2598,
    categoria: 'Lentes',
    marca: 'Sony',
    stock: 6,
    imagen: '/uploads/sony-fe-70-200.jpg',
    especificaciones: {
      'Rango focal': '70-200mm',
      'Apertura': 'f/2.8',
      'Estabilización': 'Sí',
      'Tipo': 'Telefoto'
    },
    destacado: false,
  },
  {
    nombre: 'Nikon AF-S Nikkor 85mm f/1.8G',
    descripcion: 'Lente prime de 85mm ideal para retratos',
    precio: 449,
    categoria: 'Lentes',
    marca: 'Nikon',
    stock: 15,
    imagen: '/uploads/nikon-85mm.jpg',
    especificaciones: {
      'Focal': '85mm',
      'Apertura': 'f/1.8',
      'Tipo': 'Prime',
      'Uso': 'Retratos'
    },
    destacado: true,
  },
  {
    nombre: 'Trípode Manfrotto 055XPRO3',
    descripcion: 'Trípode profesional de aluminio con cabezal de bola',
    precio: 399,
    categoria: 'Trípodes',
    marca: 'Manfrotto',
    stock: 20,
    imagen: '/uploads/manfrotto-tripod.jpg',
    especificaciones: {
      'Material': 'Aluminio',
      'Altura máx': '1.7m',
      'Peso': '2.2kg',
      'Carga': '4kg'
    },
    destacado: false,
  },
  {
    nombre: 'Filtro Polarizador Circular 77mm',
    descripcion: 'Filtro polarizador para reducir reflejos y mejorar colores',
    precio: 89,
    categoria: 'Accesorios',
    marca: 'B+W',
    stock: 30,
    imagen: '/uploads/polarizing-filter.jpg',
    especificaciones: {
      'Diámetro': '77mm',
      'Tipo': 'Polarizador',
      'Material': 'Cristal óptico',
      'Recubrimiento': 'Multicapa'
    },
    descuento: 15,
    destacado: false,
  },
  {
    nombre: 'Batería Grip Canon EOS R5',
    descripcion: 'Empuñadura de batería para Canon EOS R5 con 2 baterías',
    precio: 299,
    categoria: 'Accesorios',
    marca: 'Canon',
    stock: 10,
    imagen: '/uploads/battery-grip.jpg',
    especificaciones: {
      'Compatible': 'Canon EOS R5',
      'Baterías': '2 incluidas',
      'Material': 'Plástico reforzado',
      'Peso': '320g'
    },
    destacado: false,
  },
  {
    nombre: 'Mochila Lowepro Whistler BP 450 AW',
    descripcion: 'Mochila profesional resistente al clima para equipo fotográfico',
    precio: 189,
    categoria: 'Accesorios',
    marca: 'Lowepro',
    stock: 14,
    imagen: '/uploads/lowepro-backpack.jpg',
    especificaciones: {
      'Capacidad': '17L',
      'Resistencia': 'Impermeable',
      'Compartimentos': 'Múltiples',
      'Material': 'Poliéster'
    },
    destacado: true,
  },
];

const adminEjemplo = {
  nombre: 'Administrador Pixelate',
  email: 'admin@pixelate.rd',
  contraseña: 'Admin123456', // Será hasheada automáticamente
  telefono: '+1-809-xxx-xxxx',
  direccion: 'Santo Domingo, RD',
  ciudad: 'Santo Domingo',
  rol: 'admin',
};

const seed = async () => {
  try {
    console.log('🌱 Iniciando seed de datos...');

    await connectDB();

    // Limpiar colecciones existentes
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Colecciones limpias');

    // Insertar productos
    const productosInsertados = await Product.insertMany(productosEjemplo);
    console.log(`✅ ${productosInsertados.length} productos insertados`);

    // Insertar admin
    const adminCreado = await User.create(adminEjemplo);
    console.log(`✅ Usuario admin creado`);

    console.log(`
╔═════════════════════════════════════════╗
║   🌱 Seed completado exitosamente ✅    ║
╠═════════════════════════════════════════╣
║   Productos: ${productosInsertados.length} 🎥                    ║
║   Usuarios: 1 admin 👤                  ║
╠═════════════════════════════════════════╣
║   Credenciales Admin:                   ║
║   Email: admin@pixelate.rd              ║
║   Contraseña: Admin123456              ║
╚═════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
};

seed();
