import React, { useState, useCallback, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import StarRating from './StarRating';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ producto, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showSuccess } = useToast();

  // Memorizar precio para evitar recálculos innecesarios
  const precioConDescuento = useMemo(() => {
    return producto.descuento > 0
      ? producto.precio * (1 - producto.descuento / 100)
      : producto.precio;
  }, [producto.precio, producto.descuento]);

  // Callback memoizado para agregar al carrito
  const handleAddToCart = useCallback(() => {
    onAddToCart(producto);
    showSuccess(`${producto.nombre} agregado al carrito`);
  }, [producto, onAddToCart, showSuccess]);

  // Callback memoizado para manejar error de imagen
  const handleImageError = useCallback((e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
  }, []);

  // Callback memoizado cuando la imagen carga
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Determinar si el stock es bajo
  const isLowStock = producto.stock > 0 && producto.stock <= 5;
  const isOutOfStock = producto.stock === 0;

  return (
    <div className="glass-card-hover flex flex-col h-full overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 md:h-56 bg-tertiary/50">
        <img
          src={`http://localhost:5002${producto.imagen}`}
          alt={producto.nombre}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-tertiary/50 via-tertiary/30 to-tertiary/50 animate-pulse" />
        )}

        {/* Discount Badge */}
        {producto.descuento > 0 && (
          <div className="absolute top-3 right-3 badge-accent">
            -{producto.descuento}%
          </div>
        )}

        {/* Low Stock Badge */}
        {isLowStock && (
          <div className="absolute top-3 left-3 badge-warning flex items-center gap-1">
            <AlertCircle size={14} />
            {producto.stock} disponibles
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold">Agotado</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Badge */}
        <div className="inline-block w-fit">
          <span className="text-accent font-semibold text-xs uppercase tracking-wide">
            {producto.categoria}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-base md:text-lg font-bold text-text-primary mt-2 line-clamp-2 flex-1">
          {producto.nombre}
        </h3>

        {/* Rating */}
        {producto.calificacion > 0 && (
          <div className="mt-2">
            <StarRating rating={producto.calificacion} size="sm" />
          </div>
        )}

        {/* Price Section */}
        <div className="mt-4 mb-3 border-t border-tertiary-light/30 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-accent font-bold text-2xl">
              RD$ {precioConDescuento.toFixed(2)}
            </span>
            {producto.descuento > 0 && (
              <span className="text-text-muted text-sm line-through">
                RD$ {producto.precio.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Info */}
        <div className="mb-4">
          <span className={`text-xs font-semibold uppercase ${
            isOutOfStock 
              ? 'text-error' 
              : isLowStock 
              ? 'text-warning' 
              : 'text-success'
          }`}>
            {isOutOfStock 
              ? 'Sin stock' 
              : isLowStock 
              ? `Solo ${producto.stock} disponibles` 
              : 'En stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
            isOutOfStock
              ? 'bg-tertiary/50 text-text-muted cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
};

// Memoizar para evitar re-renders innecesarios
const MemoizedProductCard = React.memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.producto._id === nextProps.producto._id &&
    prevProps.producto.stock === nextProps.producto.stock &&
    prevProps.producto.precio === nextProps.producto.precio &&
    prevProps.producto.descuento === nextProps.producto.descuento
  );
});

export default MemoizedProductCard;
