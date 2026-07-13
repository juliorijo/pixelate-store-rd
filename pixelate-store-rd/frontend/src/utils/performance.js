/**
 * Performance optimizations for React components
 * - Memoization
 * - useCallback
 * - useMemo
 * - Code splitting
 */

export const MEMOIZATION_CONFIG = {
  // Solo rerenderizar si props específicas cambian
  propsAreEqual: (prevProps, nextProps) => {
    // Comparación profunda personalizada
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
};

/**
 * Debounce function para evitar llamadas excesivas a API
 */
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function para limitar llamadas
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Optimizar imágenes: retorna versiones comprimidas
 */
export const getOptimizedImageUrl = (url, size = 'medium') => {
  // En producción, esto sería un servicio de optimización de imágenes
  const sizes = {
    thumbnail: `${url}?w=150&h=150&fit=crop`,
    small: `${url}?w=300&h=300&fit=crop`,
    medium: `${url}?w=600&h=600&fit=crop`,
    large: `${url}?w=1200&fit=crop`,
  };
  return sizes[size] || url;
};

/**
 * Lazy loading component wrapper
 */
export const lazyLoad = (component) => {
  return component; // Retorna el componente para ser usado con React.lazy()
};
