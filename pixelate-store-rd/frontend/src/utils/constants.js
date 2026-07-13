// Constantes de categorías
export const CATEGORIAS = ['Cámaras', 'Lentes', 'Accesorios', 'Trípodes'];

// Constantes de métodos de pago
export const METODOS_PAGO = {
  EFECTIVO: 'efectivo',
  TRANSFERENCIA: 'transferencia',
};

// Estados de pedidos
export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  CONFIRMADO: 'confirmado',
  PREPARANDO: 'preparando',
  EN_CAMINO: 'en_camino',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
};

// Etiquetas legibles de estados
export const ETIQUETAS_ESTADO = {
  pendiente: '⏳ Pendiente',
  confirmado: '✅ Confirmado',
  preparando: '📦 Preparando',
  en_camino: '🚚 En Camino',
  entregado: '✨ Entregado',
  cancelado: '❌ Cancelado',
};

// Colores de estados
export const COLORES_ESTADO = {
  pendiente: 'bg-yellow-500',
  confirmado: 'bg-blue-500',
  preparando: 'bg-purple-500',
  en_camino: 'bg-orange-500',
  entregado: 'bg-green-500',
  cancelado: 'bg-red-500',
};

// Impuesto por defecto (ITBIS RD: 18%)
export const IMPUESTO = 0.18;

// Costo de delivery (gratuito en RD)
export const COSTO_DELIVERY = 0;
