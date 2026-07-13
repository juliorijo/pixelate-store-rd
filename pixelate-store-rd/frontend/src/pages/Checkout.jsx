import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { pedidosAPI } from '../utils/api';
import { IMPUESTO, COSTO_DELIVERY, METODOS_PAGO } from '../utils/constants';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [showEntregaInfo, setShowEntregaInfo] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: METODOS_PAGO.EFECTIVO,
    notas: '',
  });

  if (items.length === 0) {
    return (
      <div className="pt-20 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-6">Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/productos')}
            className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600"
          >
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const impuesto = subtotal * IMPUESTO;
  const totalConImpuesto = subtotal + impuesto + COSTO_DELIVERY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcesando(true);

    try {
      // Validar campos requeridos
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion || !formData.ciudad) {
        setError('Por favor completa todos los campos requeridos');
        setProcesando(false);
        return;
      }

      // Preparar datos del pedido
      const pedido = {
        ...formData,
        items: items.map(item => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
        })),
      };

      // Enviar pedido
      const response = await pedidosAPI.crear(pedido);

      // Mostrar información de entrega
      setShowEntregaInfo(true);

      // Limpiar carrito
      setTimeout(() => {
        clearCart();

        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate(`/pedido/${response.data.pedido._id}`);
        }, 3000);
      }, 2000);

    } catch (err) {
      console.error('Error en checkout:', err);
      setError(err.response?.data?.error || 'Error al procesar el pedido. Intenta nuevamente.');
      setProcesando(false);
    }
  };

  // Si se muestra la información de entrega
  if (showEntregaInfo) {
    const ahora = new Date();
    const hora = ahora.getHours();
    const tipoEntrega = hora < 14 ? 'Entrega el mismo día' : 'Entrega al día siguiente';

    return (
      <div className="pt-20 bg-primary min-h-screen flex items-center justify-center px-4">
        <div className="bg-secondary p-8 rounded-lg text-center max-w-md">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h1 className="text-3xl font-bold text-green-400 mb-4">¡Pedido Confirmado!</h1>
          <p className="text-gray-300 mb-6">Tu pedido ha sido recibido correctamente</p>

          <div className="bg-primary p-4 rounded mb-6">
            <p className="text-white text-lg font-bold mb-2">
              {tipoEntrega}
            </p>
            <p className="text-gray-300 text-sm">
              {hora < 14 
                ? 'Tu pedido llegará entre las 4:00 PM y 6:00 PM' 
                : 'Tu pedido llegará mañana entre las 9:00 AM y 11:00 AM'}
            </p>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Total pagado: <span className="text-accent font-bold">RD$ {totalConImpuesto.toFixed(2)}</span>
          </p>

          <p className="text-gray-400 text-xs">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-primary min-h-screen pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-600 text-white p-4 rounded">
                {error}
              </div>
            )}

            {/* Información de envío */}
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-white font-bold text-lg mb-4">Información de Envío</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo *"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="col-span-2 px-4 py-2 bg-primary text-white rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-2 px-4 py-2 bg-primary text-white rounded"
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono *"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="px-4 py-2 bg-primary text-white rounded"
                />
                <input
                  type="text"
                  name="codigoPostal"
                  placeholder="Código postal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="px-4 py-2 bg-primary text-white rounded"
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección *"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="col-span-2 px-4 py-2 bg-primary text-white rounded"
                />
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad *"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="col-span-2 px-4 py-2 bg-primary text-white rounded"
                />
              </div>

              <textarea
                name="notas"
                placeholder="Notas especiales (opcional)"
                value={formData.notas}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-primary text-white rounded"
                rows="3"
              ></textarea>
            </div>

            {/* Método de pago */}
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-white font-bold text-lg mb-4">Método de Pago</h2>

              <div className="space-y-3">
                <label className="flex items-center bg-primary p-4 rounded cursor-pointer hover:bg-gray-800 transition">
                  <input
                    type="radio"
                    name="metodoPago"
                    value={METODOS_PAGO.EFECTIVO}
                    checked={formData.metodoPago === METODOS_PAGO.EFECTIVO}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="text-white">
                    💵 Efectivo contra entrega
                  </span>
                </label>

                <label className="flex items-center bg-primary p-4 rounded cursor-pointer hover:bg-gray-800 transition">
                  <input
                    type="radio"
                    name="metodoPago"
                    value={METODOS_PAGO.TRANSFERENCIA}
                    checked={formData.metodoPago === METODOS_PAGO.TRANSFERENCIA}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="text-white">
                    🏦 Transferencia bancaria
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={procesando}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-600"
            >
              {procesando ? 'Procesando...' : 'Confirmar Pedido 🎉'}
            </button>
          </form>

          {/* Resumen del pedido */}
          <div className="bg-secondary p-6 rounded-lg h-fit">
            <h2 className="text-white font-bold text-lg mb-6">Resumen del Pedido</h2>

            {/* Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto border-b border-gray-700 pb-6">
              {items.map(item => (
                <div key={item.productoId} className="flex justify-between text-gray-300 text-sm">
                  <span>{item.nombre} x{item.cantidad}</span>
                  <span>RD$ {(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totales */}
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
                <span className="text-green-400">GRATIS</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-white font-bold">Total:</span>
              <span className="text-accent font-bold text-2xl">RD$ {totalConImpuesto.toFixed(2)}</span>
            </div>

            {/* Información de entrega */}
            <div className="bg-primary p-4 rounded text-center">
              <p className="text-yellow-400 font-bold mb-2">
                {new Date().getHours() < 14 ? '✅ Entrega Hoy' : '📅 Entrega Mañana'}
              </p>
              <p className="text-gray-300 text-xs">
                {new Date().getHours() < 14
                  ? 'Entre 4:00 PM - 6:00 PM'
                  : 'Entre 9:00 AM - 11:00 AM'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
