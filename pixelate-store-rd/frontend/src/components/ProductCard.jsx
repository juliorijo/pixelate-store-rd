import React, { useState, useCallback, useMemo } from 'react';

const ProductCard = ({ producto, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memorizar precio para evitar recálculos innecesarios
  const precioConDescuento = useMemo(() => {
    return producto.descuento > 0
      ? producto.precio * (1 - producto.descuento / 100)
      : producto.precio;
  }, [producto.precio, producto.descuento]);

  // Callback memoizado para agregar al carrito
  const handleAddToCart = useCallback(() => {
    onAddToCart(producto);
  }, [producto, onAddToCart]);

  // Callback memoizado para manejar error de imagen
  const handleImageError = useCallback((e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
  }, []);

  // Callback memoizado cuando la imagen carga
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div className="group glass-card-hover h-full flex flex-col">
      {/* Imagen */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-dark/50 to-dark/20">
        <img
          src={`http://localhost:5002${producto.imagen}`}
          alt={producto.nombre}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-110 transition duration-300 ${
            imageLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-dark/20 to-dark/50 animate-pulse" />
        )}
        {producto.descuento > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-accent-dark text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm border border-accent/50">
            -{producto.descuento}%
          </div>
        )}
        {producto.destacado && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-dark px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            ⭐ Destacado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col h-full">
        {/* Categoría */}
        <p className="text-accent font-semibold text-xs uppercase tracking-wide">{producto.categoria}</p>

        {/* Nombre */}
        <h3 className="text-dark font-bold text-lg mt-2 line-clamp-2 flex-1">
          {producto.nombre}
        </h3>

        {/* Marca */}
        <p className="text-dark/60 text-sm mt-1">{producto.marca}</p>

        {/* Descripción corta */}
        <p className="text-dark/70 text-sm mt-2 line-clamp-2 flex-1">
          {producto.descripcion}
        </p>

        {/* Stock */}
        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs font-semibold uppercase ${
            producto.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
          </span>
          {producto.calificacion > 0 && (
            <span className="text-yellow-500 text-sm font-semibold">
              ⭐ {producto.calificacion.toFixed(1)}
            </span>
          )}
        </div>

        {/* Precio */}
        <div className="mt-4 border-t border-white/20 pt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-accent font-bold text-2xl">
              RD$ {precioConDescuento.toFixed(2)}
            </span>
            {producto.descuento > 0 && (
              <span className="text-dark/50 text-xs line-through">
                RD$ {producto.precio.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={producto.stock === 0}
          className={`w-full mt-4 py-3 rounded-lg font-semibold transition transform ${
            producto.stock > 0
              ? 'bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95 backdrop-blur-sm border border-accent/50'
              : 'bg-gray-400/50 text-gray-600 cursor-not-allowed backdrop-blur-sm'
          }`}
        >
          {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
};

// Memoizar para evitar re-renders innecesarios
const MemoizedProductCard = React.memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.producto.id === nextProps.producto.id &&
    prevProps.producto.stock === nextProps.producto.stock &&
    prevProps.producto.precio === nextProps.producto.precio &&
    prevProps.producto.descuento === nextProps.producto.descuento
  );
});

export default MemoizedProductCard;
