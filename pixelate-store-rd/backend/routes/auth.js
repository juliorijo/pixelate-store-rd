const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generar JWT
const generarToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Login de administrador
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario con select de contraseña
    const usuario = await User.findOne({ email, rol: 'admin' }).select('+contraseña');

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const contraseñaValida = await usuario.compararContraseña(contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generarToken(usuario._id, 'admin');

    res.json({
      mensaje: 'Inicio de sesión exitoso ✅',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: 'admin',
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login de cliente
router.post('/cliente/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuario = await User.findOne({ email }).select('+contraseña');

    if (!usuario || usuario.rol !== 'usuario') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const contraseñaValida = await usuario.compararContraseña(contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario._id, 'usuario');

    res.json({
      mensaje: 'Inicio de sesión exitoso ✅',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: 'usuario',
      },
    });
  } catch (error) {
    console.error('Error en login de cliente:', error);
    res.status(500).json({ error: error.message });
  }
});

// Registrar nuevo cliente
router.post('/cliente/registro', async (req, res) => {
  try {
    const { nombre, email, contraseña, telefono, direccion, ciudad } = req.body;

    if (!nombre || !email || !contraseña || !telefono || !direccion || !ciudad) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      contraseña,
      telefono,
      direccion,
      ciudad,
      rol: 'usuario',
    });

    await nuevoUsuario.save();

    // Generar token automáticamente
    const token = generarToken(nuevoUsuario._id, 'usuario');

    res.status(201).json({
      mensaje: 'Registro exitoso ✅',
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: 'usuario',
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verificar token
router.post('/verificar', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ valido: false, error: 'No hay token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valido: true, userId: decoded.userId, role: decoded.role });
  } catch (error) {
    res.status(401).json({ valido: false, error: 'Token inválido' });
  }
});

module.exports = router;
