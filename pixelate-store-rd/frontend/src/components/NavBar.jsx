import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Menu, X, Settings, LogOut } from 'lucide-react';

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
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-primary/95 border-b border-tertiary-light/30 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition group">
            <img src="/images/logo.png" alt="PIXELATE" className="h-10 w-auto" />
            <span className="text-text-primary font-bold text-lg hidden sm:inline group-hover:text-accent transition">
              Pixelate
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-text-secondary hover:text-accent transition font-medium text-sm"
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className="text-text-secondary hover:text-accent transition font-medium text-sm"
            >
              Catálogo
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-accent font-bold text-sm hover:text-accent-bright transition flex items-center gap-2"
              >
                <Settings size={18} />
                Admin
              </Link>
            )}
            {!isAdmin && (
              <button
                onClick={() => navigate('/login')}
                className="text-text-secondary hover:text-accent transition font-medium text-sm"
              >
                Ingreso
              </button>
            )}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="text-text-secondary hover:text-error transition font-medium text-sm flex items-center gap-2"
              >
                <LogOut size={18} />
                Salir
              </button>
            )}
          </div>

          {/* Right Section - Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Link */}
            <Link 
              to="/carrito" 
              className="relative text-text-secondary hover:text-accent transition p-2 hover:bg-tertiary/50 rounded-lg"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text-primary hover:text-accent transition p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-tertiary/50 border-t border-tertiary-light/30 py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-text-secondary hover:text-accent hover:bg-tertiary/50 rounded transition"
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-text-secondary hover:text-accent hover:bg-tertiary/50 rounded transition"
            >
              Catálogo
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-accent font-bold hover:bg-tertiary/50 rounded transition flex items-center gap-2"
              >
                <Settings size={18} />
                Admin
              </Link>
            )}
            {!isAdmin && (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-accent hover:bg-tertiary/50 rounded transition"
              >
                Ingreso
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-error hover:bg-error/10 rounded transition flex items-center gap-2"
              >
                <LogOut size={18} />
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
