import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { FiBarChart2, FiTrendingUp, FiDollarSign, FiDownload, FiFilter } from 'react-icons/fi';

const AdminReportes = () => {
  const [reportes, setReportes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [filtroFecha, setFiltroFecha] = useState({ inicio: '', fin: '' });
  const { showInfo, showSuccess, showError } = useToast();

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      setCargando(true);
      setReportes({
        ventasTotal: 15250,
        ventasHoy: 450,
        pedidosTotal: 45,
        pedidosPendientes: 8,
        productosVendidos: 156,
        clientesActivos: 23,
        ventasDiarias: [
          { fecha: 'Lun', ventas: 1200, pedidos: 8 },
          { fecha: 'Mar', ventas: 1500, pedidos: 10 },
          { fecha: 'Mié', ventas: 1800, pedidos: 12 },
          { fecha: 'Jue', ventas: 1300, pedidos: 9 },
          { fecha: 'Vie', ventas: 2100, pedidos: 14 },
          { fecha: 'Sab', ventas: 2500, pedidos: 16 },
          { fecha: 'Dom', ventas: 450, pedidos: 5 },
        ],
        productosTop: [
          { nombre: 'Canon EOS R5', ventas: 25 },
          { nombre: 'Sony A7IV', ventas: 18 },
          { nombre: 'Lente 24-70mm', ventas: 32 },
          { nombre: 'Trípode Premium', ventas: 15 },
          { nombre: 'Batería Extra', ventas: 45 },
        ],
        estadoPedidos: [
          { nombre: 'Completado', value: 28, color: '#10b981' },
          { nombre: 'En Tránsito', value: 12, color: '#3b82f6' },
          { nombre: 'Pendiente', value: 5, color: '#f59e0b' },
        ],
      });
      showInfo('Reportes cargados');
    } catch (error) {
      showError('Error al cargar reportes');
    } finally {
      setCargando(false);
    }
  };

  const exportarCSV = () => {
    try {
      const data = reportes.ventasDiarias.map(item => ({
        Fecha: item.fecha,
        Ventas: item.ventas,
        Pedidos: item.pedidos,
      }));
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `reportes_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      showSuccess('CSV exportado');
    } catch (error) {
      showError('Error exportar CSV');
    }
  };

  const exportarPDF = () => {
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text('Reporte Pixelate Store RD', 10, 10);
      pdf.setFontSize(10);
      let y = 20;
      pdf.text(`Ventas: RD$ ${reportes.ventasTotal}`, 10, y);
      y += 5;
      pdf.text(`Pedidos: ${reportes.pedidosTotal}`, 10, y);
      y += 10;
      const tableData = reportes.ventasDiarias.map(i => [i.fecha, i.ventas, i.pedidos]);
      pdf.autoTable({ head: [['Fecha', 'Ventas', 'Pedidos']], body: tableData, startY: y });
      pdf.save(`reportes_${new Date().toISOString().split('T')[0]}.pdf`);
      showSuccess('PDF exportado');
    } catch (error) {
      showError('Error exportar PDF');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-dark flex items-center gap-2">
            <FiBarChart2 size={32} className="text-accent" />
            Reportes y Estadísticas
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={exportarCSV} disabled={!reportes} className="px-4 py-2 bg-accent text-white rounded-lg">
            CSV
          </button>
          <button onClick={exportarPDF} disabled={!reportes} className="px-4 py-2 bg-accent text-white rounded-lg">
            PDF
          </button>
        </div>
      </div>

      {cargando ? (
        <div className="text-center">Cargando...</div>
      ) : reportes ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4">
              <p className="text-sm">Ventas Totales</p>
              <h3 className="text-2xl font-bold">RD$ {reportes.ventasTotal}</h3>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm">Pedidos</p>
              <h3 className="text-2xl font-bold">{reportes.pedidosTotal}</h3>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm">Clientes</p>
              <h3 className="text-2xl font-bold">{reportes.clientesActivos}</h3>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Ventas por Día</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportes.ventasDiarias}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Productos Top</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={reportes.productosTop} layout="vertical" margin={{ left: 150 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nombre" type="category" width={140} />
                  <Bar dataKey="ventas" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Estado Pedidos</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={reportes.estadoPedidos} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {reportes.estadoPedidos.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AdminReportes;
