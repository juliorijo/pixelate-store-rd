import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.productoId === action.payload.productoId);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productoId === action.payload.productoId
              ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.productoId !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productoId === action.payload.productoId
            ? { ...item, cantidad: action.payload.cantidad }
            : item
        ).filter(item => item.cantidad > 0),
      };

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    const cartGuardado = localStorage.getItem('cart');
    if (cartGuardado) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(cartGuardado) });
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (producto, cantidad = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productoId: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad,
      },
    });
  };

  const removeFromCart = (productoId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productoId });
  };

  const updateQuantity = (productoId, cantidad) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productoId, cantidad },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotal = () => {
    return state.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    items: state.items,
    total: getTotal(),
    itemCount: getItemCount(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
