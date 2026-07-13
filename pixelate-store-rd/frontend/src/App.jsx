import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Componentes
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Toast from './components/Toast';

// Páginas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Estilos
import './styles/tailwind.css';

const App = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Toast />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Catalog />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </Router>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
