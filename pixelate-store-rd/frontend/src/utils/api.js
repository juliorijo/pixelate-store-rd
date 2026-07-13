import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== PRODUCTOS ====================

export const productosAPI = {
  obtenerTodos: (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.categoria) params.append('categoria', filtros.categoria);
    if (filtros.marca) params.append('marca', filtros.marca);
    if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) params.append('precioMax', filtros.precioMax);
    if (filtros.buscar) params.append('buscar', filtros.buscar);
    if (filtros.pagina) params.append('pagina', filtros.pagina);

    return api.get(`/products?${params.toString()}`);
  },
  obtenerDestacados: () => api.get('/products/destacados'),
  obtenerPorId: (id) => api.get(`/products/${id}`),
  obtenerCategorias: () => api.get('/products/categorias/list'),
  obtenerMarcas: () => api.get('/products/marcas/list'),
  obtenerRangoPrecios: () => api.get('/products/precios/rango'),
};

// ==================== PEDIDOS ====================

export const pedidosAPI = {
  crear: (datoPedido) => api.post('/orders', datoPedido),
  obtenerPorId: (id) => api.get(`/orders/${id}`),
  obtenerPorEmail: (email) => api.get(`/orders/email/${email}`),
};

// ==================== AUTENTICACIÓN ====================

export const authAPI = {
  loginAdmin: (email, contraseña) => api.post('/auth/login', { email, contraseña }),
  loginCliente: (email, contraseña) => api.post('/auth/cliente/login', { email, contraseña }),
  registroCliente: (datos) => api.post('/auth/cliente/registro', datos),
  verificarToken: () => api.post('/auth/verificar'),
};

// ==================== ADMINISTRADOR ====================

export const adminAPI = {
  crearProducto: (formData) => api.post('/admin/productos', formData),
  obtenerProductos: () => api.get('/admin/productos'),
  obtenerProductoPorId: (id) => api.get(`/admin/productos/${id}`),
  actualizarProducto: (id, formData) => api.put(`/admin/productos/${id}`, formData),
  eliminarProducto: (id) => api.delete(`/admin/productos/${id}`),
  obtenerPedidos: (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.estado) params.append('estado', filtros.estado);
    if (filtros.desde) params.append('desde', filtros.desde);
    if (filtros.hasta) params.append('hasta', filtros.hasta);

    return api.get(`/admin/orders?${params.toString()}`);
  },
  obtenerPedidoPorId: (id) => api.get(`/admin/orders/${id}`),
  actualizarEstadoPedido: (id, estado, notasAdmin) => 
    api.put(`/admin/orders/${id}/estado`, { estado, notasAdmin }),
  obtenerEstadisticas: () => api.get('/admin/estadisticas/dashboard'),
};

export default api;
