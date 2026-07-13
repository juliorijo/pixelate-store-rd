import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-gradient-to-r from-primary/80 via-primary/80 to-primary/70 border-b border-white/10 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <img src="/images/logo.png" alt="PIXELATE" className="h-10 w-auto" />
            <span className="text-white font-bold text-lg hidden sm:inline">Pixelate</span>
          </Link>

          {/* Menu de escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Inicio</Link>
            <Link to="/productos" className="text-gray-300 hover:text-white transition">Productos</Link>
            {isAdmin && (
              <Link to="/admin" className="text-accent font-semibold hover:text-blue-400 transition">Admin</Link>
            )}
            {!isAdmin && (
              <button
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </button>
            )}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Salir
              </button>
            )}
          </div>

          {/* Carrito */}
          <div className="flex items-center space-x-4">
            <Link to="/carrito" className="relative text-white hover:text-accent transition">
              <FiShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Menu móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu móvil expandido */}
        {isOpen && (
          <div className="md:hidden bg-secondary border-t border-gray-700 py-4 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-white py-2">Inicio</Link>
            <Link to="/productos" className="block text-gray-300 hover:text-white py-2">Productos</Link>
            {isAdmin && (
              <Link to="/admin" className="block text-accent font-semibold py-2">Admin</Link>
            )}
            {!isAdmin && (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="block text-gray-300 hover:text-white py-2"
              >
                Login
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Salir
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
