import React from 'react';
import { useCart } from '../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-secondary p-4 rounded-lg flex gap-4 items-center">
      {/* Imagen */}
      <img
        src={`http://localhost:5000${item.imagen}`}
        alt={item.nombre}
        className="w-24 h-24 object-cover rounded"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/100?text=Sin+imagen';
        }}
      />

      {/* Información */}
      <div className="flex-1">
        <h4 className="text-white font-bold">{item.nombre}</h4>
        <p className="text-gray-400">RD$ {item.precio.toFixed(2)}</p>
      </div>

      {/* Cantidad */}
      <div className="flex items-center space-x-2 bg-primary rounded px-2 py-1">
        <button
          onClick={() => updateQuantity(item.productoId, item.cantidad - 1)}
          className="text-white hover:text-accent transition"
        >
          −
        </button>
        <span className="text-white font-semibold w-6 text-center">{item.cantidad}</span>
        <button
          onClick={() => updateQuantity(item.productoId, item.cantidad + 1)}
          className="text-white hover:text-accent transition"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-accent font-bold">RD$ {(item.precio * item.cantidad).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.productoId)}
          className="text-red-500 hover:text-red-400 text-sm mt-1 transition"
        >
          Eliminar 🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
