import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [loginType, setLoginType] = useState('admin'); // 'admin' o 'cliente'

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      let response;

      if (loginType === 'admin') {
        response = await authAPI.loginAdmin(email, contraseña);
      } else {
        response = await authAPI.loginCliente(email, contraseña);
      }

      // Guardar token y rol
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', loginType);
      localStorage.setItem('userName', response.data.usuario.nombre);

      // Redirigir
      if (loginType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo rojo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-dark to-accent-light opacity-95"></div>

      {/* Efecto glassmorphism en el fondo */}
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      {/* Contenido */}
      <div className="relative z-10 glass-card bg-white/90 p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="PIXELATE" className="h-20 w-auto" />
        </div>
        <p className="text-dark/70 text-center mb-8 font-semibold">Inicia sesión en tu cuenta</p>

        {/* Selector de tipo de login */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setLoginType('cliente')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              loginType === 'cliente'
                ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg'
                : 'bg-dark/10 text-dark hover:bg-dark/20'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              loginType === 'admin'
                ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg'
                : 'bg-dark/10 text-dark hover:bg-dark/20'
            }`}
          >
            Administrador
          </button>
        </div>

        {error && (
          <div className="bg-red-500/30 border-2 border-red-500 text-dark p-4 rounded-lg mb-4 text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-dark font-bold mb-2">📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition font-semibold"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-dark font-bold mb-2">🔐 Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition font-semibold"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {cargando ? '⏳ Cargando...' : '✅ Iniciar Sesión'}
          </button>
        </form>

        {loginType === 'cliente' && (
          <div className="mt-6 pt-6 border-t-2 border-dark/20">
            <p className="text-dark text-sm text-center mb-4 font-semibold">
              ¿No tienes cuenta?
            </p>
            <button
              onClick={() => navigate('/registro')}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition transform hover:scale-105"
            >
              ✨ Crear Cuenta
            </button>
          </div>
        )}

        {loginType === 'admin' && (
          <div className="mt-6 pt-6 border-t-2 border-dark/20">
            <p className="text-dark/80 text-xs text-center font-mono bg-dark/10 p-3 rounded-lg">
              <span className="font-bold block mb-2">📋 Credenciales de prueba:</span>
              📧 admin@pixelate.rd<br />
              🔐 Admin123456
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 bg-dark/20 hover:bg-dark/30 text-dark font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Login;
