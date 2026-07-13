import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { FiBarChart2, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const AdminReportes = () => {
  const [reportes, setReportes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { showInfo } = useToast();

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      setCargando(true);
      // Aquí llamarías a endpoints de reportes
      setReportes({
        ventasTotal: 15250,
        ventasHoy: 450,
        pedidosTotal: 45,
        pedidosPendientes: 8,
        productosVendidos: 156,
        clientesActivos: 23,
      });
      showInfo('Datos de demostración cargados');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h2 className="text-3xl font-bold text-dark flex items-center gap-2">
          <FiBarChart2 size={32} className="text-accent" />
          Reportes y Estadísticas
        </h2>
        <p className="text-dark/70 text-sm mt-1">Análisis de ventas y rendimiento</p>
      </div>

      {cargando ? (
        <div className="flex justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
        </div>
      ) : reportes ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Ventas Total */}
          <div className="glass-card p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark/70 text-sm font-semibold">Ventas Totales</p>
                <h3 className="text-3xl font-bold text-dark mt-2">RD$ {reportes.ventasTotal.toLocaleString()}</h3>
              </div>
              <FiDollarSign size={32} className="text-green-500 opacity-50" />
            </div>
          </div>

          {/* Card: Ventas Hoy */}
          <div className="glass-card p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark/70 text-sm font-semibold">Ventas Hoy</p>
                <h3 className="text-3xl font-bold text-dark mt-2">RD$ {reportes.ventasHoy.toLocaleString()}</h3>
              </div>
              <FiTrendingUp size={32} className="text-blue-500 opacity-50" />
            </div>
          </div>

          {/* Card: Pedidos Total */}
          <div className="glass-card p-6 border-l-4 border-purple-500">
            <div>
              <p className="text-dark/70 text-sm font-semibold">Pedidos Totales</p>
              <h3 className="text-3xl font-bold text-dark mt-2">{reportes.pedidosTotal}</h3>
              <p className="text-accent text-sm mt-2">{reportes.pedidosPendientes} pendientes</p>
            </div>
          </div>

          {/* Card: Productos Vendidos */}
          <div className="glass-card p-6 border-l-4 border-yellow-500">
            <div>
              <p className="text-dark/70 text-sm font-semibold">Productos Vendidos</p>
              <h3 className="text-3xl font-bold text-dark mt-2">{reportes.productosVendidos}</h3>
            </div>
          </div>

          {/* Card: Clientes Activos */}
          <div className="glass-card p-6 border-l-4 border-pink-500">
            <div>
              <p className="text-dark/70 text-sm font-semibold">Clientes Activos</p>
              <h3 className="text-3xl font-bold text-dark mt-2">{reportes.clientesActivos}</h3>
            </div>
          </div>

          {/* Card: Ticket Promedio */}
          <div className="glass-card p-6 border-l-4 border-orange-500">
            <div>
              <p className="text-dark/70 text-sm font-semibold">Ticket Promedio</p>
              <h3 className="text-3xl font-bold text-dark mt-2">
                RD$ {Math.round(reportes.ventasTotal / reportes.pedidosTotal)}
              </h3>
            </div>
          </div>
        </div>
      ) : null}

      {/* Gráfico simulado */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Tendencia de Ventas (7 últimos días)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 78, 90, 85, 92, 88, 95].map((value, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-accent to-accent-light rounded-t-lg" style={{ height: `${value}%` }}>
              <span className="text-xs text-dark font-bold flex justify-center mt-2">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReportes;
