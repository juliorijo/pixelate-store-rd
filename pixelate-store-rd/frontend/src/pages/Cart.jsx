import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { IMPUESTO, COSTO_DELIVERY } from '../utils/constants';

const Cart = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const subtotal = items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const impuesto = subtotal * IMPUESTO;
  const total = subtotal + impuesto + COSTO_DELIVERY;

  if (items.length === 0) {
    return (
      <div className="pt-20 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Carrito Vacío</h1>
          <p className="text-gray-300 mb-8">No hay productos en tu carrito aún</p>
          <button
            onClick={() => navigate('/productos')}
            className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition"
          >
            Ir al Catálogo →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-primary min-h-screen pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Mi Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.productoId} item={item} />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="bg-secondary p-6 rounded-lg h-fit">
            <h2 className="text-white font-bold text-xl mb-6">Resumen</h2>

            <div className="space-y-3 mb-6 border-b border-gray-700 pb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>RD$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>ITBIS (18%):</span>
                <span>RD$ {impuesto.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Delivery:</span>
                <span className="text-green-400 font-semibold">GRATIS 🎉</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-white">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-2xl text-accent">RD$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition mb-3"
            >
              Proceder al Checkout →
            </button>

            <button
              onClick={() => navigate('/productos')}
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition mb-3"
            >
              Continuar Comprando
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Vaciar Carrito 🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
