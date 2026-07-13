import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import { ETIQUETAS_ESTADO, COLORES_ESTADO } from '../utils/constants';
import AdminProductos from '../components/AdminProductos';

const Admin = () => {
  const navigate = useNavigate();
  const [estadisticas, setEstadisticas] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [notasAdmin, setNotasAdmin] = useState('');

  useEffect(() => {
    verificarAutenticacion();
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      cargarEstadisticas();
    } else if (activeTab === 'pedidos') {
      cargarPedidos();
    }
  }, [activeTab]);

  const verificarAutenticacion = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'admin') {
      navigate('/login');
    }
  };

  const cargarEstadisticas = async () => {
    try {
      setCargando(true);
      const response = await adminAPI.obtenerEstadisticas();
      setEstadisticas(response.data);
    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cargarPedidos = async () => {
    try {
      setCargando(true);
      const response = await adminAPI.obtenerPedidos();
      setPedidos(response.data);
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleActualizarEstado = async () => {
    if (!nuevoEstado) {
      alert('Selecciona un estado');
      return;
    }

    try {
      await adminAPI.actualizarEstadoPedido(
        pedidoSeleccionado._id,
        nuevoEstado,
        notasAdmin
      );
      alert('Pedido actualizado ✅');
      setPedidoSeleccionado(null);
      setNuevoEstado('');
      setNotasAdmin('');
      cargarPedidos();
    } catch (err) {
      alert('Error al actualizar pedido');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent/5">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Encabezado */}
        <div className="glass-card p-8 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-dark">🎚️ Panel de Administrador</h1>
            <p className="text-dark/70 text-sm mt-2">Bienvenido, {localStorage.getItem('userName')}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition backdrop-blur-sm border border-red-600/50"
          >
            🚪 Cerrar Sesión
          </button>
        </div>

        {error && (
          <div className="glass-card bg-red-500/30 border-red-500/50 text-dark p-4 mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 glass-card p-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'text-dark hover:bg-white/20'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
              activeTab === 'pedidos'
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'text-dark hover:bg-white/20'
            }`}
          >
            📦 Pedidos
          </button>
          <button
            onClick={() => setActiveTab('productos')}
            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
              activeTab === 'productos'
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'text-dark hover:bg-white/20'
            }`}
          >
            🎥 Productos
          </button>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            {cargando ? (
              <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin">
                  <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
                </div>
              </div>
            ) : estadisticas ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="text-dark/70 text-sm font-semibold mb-2">📸 Productos</p>
                  <p className="text-4xl font-bold text-accent">{estadisticas.totalProductos}</p>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="text-dark/70 text-sm font-semibold mb-2">📦 Pedidos</p>
                  <p className="text-4xl font-bold text-accent">{estadisticas.totalPedidos}</p>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="text-dark/70 text-sm font-semibold mb-2">👥 Clientes</p>
                  <p className="text-4xl font-bold text-accent">{estadisticas.totalClientes}</p>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="text-dark/70 text-sm font-semibold mb-2">💰 Ingresos</p>
                  <p className="text-3xl font-bold text-accent">RD$ {estadisticas.ingresosTotales?.toFixed(2) || '0'}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de pedidos */}
            <div className="lg:col-span-2">
              {cargando ? (
                <div className="flex justify-center items-center min-h-96">
                  <div className="animate-spin">
                    <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
                  </div>
                </div>
              ) : pedidos.length === 0 ? (
                <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-8 text-center">
                  <p className="text-dark font-semibold">No hay pedidos aún</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pedidos.map((pedido) => (
                    <button
                      key={pedido._id}
                      onClick={() => {
                        setPedidoSeleccionado(pedido);
                        setNuevoEstado(pedido.estado);
                        setNotasAdmin(pedido.notasAdmin || '');
                      }}
                      className={`w-full p-4 rounded-lg text-left transition backdrop-blur-md border ${
                        pedidoSeleccionado?._id === pedido._id
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-white/40 border-white/20 text-dark hover:border-accent/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{pedido.numeroPedido}</p>
                          <p className="text-sm opacity-70">{pedido.nombre}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-bold text-white ${COLORES_ESTADO[pedido.estado]}`}>
                          {ETIQUETAS_ESTADO[pedido.estado]}
                        </span>
                      </div>
                      <p className="text-sm opacity-70 mt-2">Total: RD$ {pedido.total.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detalles del pedido */}
            {pedidoSeleccionado && (
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-dark mb-4">📋 Detalles</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-white/20">
                  <div>
                    <p className="text-dark/70 text-sm font-semibold">Número</p>
                    <p className="text-dark font-semibold">{pedidoSeleccionado.numeroPedido}</p>
                  </div>

                  <div>
                    <p className="text-dark/70 text-sm font-semibold">Cliente</p>
                    <p className="text-dark font-semibold">{pedidoSeleccionado.nombre}</p>
                    <p className="text-dark/70 text-sm">{pedidoSeleccionado.email}</p>
                  </div>

                  <div>
                    <p className="text-dark/70 text-sm font-semibold">Entrega</p>
                    <p className="text-dark font-semibold">{pedidoSeleccionado.direccion}</p>
                  </div>

                  <div>
                    <p className="text-dark/70 text-sm font-semibold">Total</p>
                    <p className="text-accent font-bold text-xl">RD$ {pedidoSeleccionado.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-dark/70 text-sm font-semibold block mb-2">Cambiar Estado</label>
                    <select
                      value={nuevoEstado}
                      onChange={(e) => setNuevoEstado(e.target.value)}
                      className="w-full px-3 py-2 bg-white/80 text-dark rounded-lg border-2 border-accent/30 focus:border-accent outline-none transition backdrop-blur-sm"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="preparando">Preparando</option>
                      <option value="en_camino">En Camino</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-dark/70 text-sm font-semibold block mb-2">Notas</label>
                    <textarea
                      value={notasAdmin}
                      onChange={(e) => setNotasAdmin(e.target.value)}
                      className="w-full px-3 py-2 bg-white/80 text-dark rounded-lg border-2 border-accent/30 focus:border-accent outline-none transition backdrop-blur-sm"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    onClick={handleActualizarEstado}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-2 rounded-lg font-bold transition hover:shadow-lg"
                  >
                    💾 Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Productos */}
        {activeTab === 'productos' && <AdminProductos />}
      </div>
    </div>
  );
};

export default Admin;
