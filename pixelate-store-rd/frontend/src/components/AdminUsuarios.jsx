import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { FiEdit2, FiTrash2, FiUser, FiMail, FiPhone } from 'react-icons/fi';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { showSuccess, showError, showInfo } = useToast();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      // Aquí llamarías a un endpoint de API para obtener usuarios
      // Por ahora usamos datos de demostración
      setUsuarios([]);
      showInfo('Módulo de usuarios en construcción');
    } catch (err) {
      showError('Error al cargar usuarios');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-dark flex items-center gap-2">
            <FiUser size={32} className="text-accent" />
            Gestión de Usuarios
          </h2>
          <p className="text-dark/70 text-sm mt-1">Administra los clientes registrados</p>
        </div>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 backdrop-blur-sm border border-accent/50 transform hover:scale-105"
        >
          ➕ Nuevo Usuario
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-dark mb-4">Agregar Usuario</h3>
          <form className="space-y-4">
            <div>
              <label className="text-dark font-semibold">Nombre</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Nombre completo" />
            </div>
            <div>
              <label className="text-dark font-semibold">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="email@ejemplo.com" />
            </div>
            <div>
              <label className="text-dark font-semibold">Teléfono</label>
              <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="+1 234 5678" />
            </div>
            <button type="submit" className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent-dark transition">
              Guardar Usuario
            </button>
          </form>
        </div>
      )}

      {/* Lista */}
      {cargando ? (
        <div className="flex justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
        </div>
      ) : usuarios.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-dark text-lg">No hay usuarios registrados aún</p>
        </div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-3 text-left text-dark font-bold">Nombre</th>
                <th className="px-6 py-3 text-left text-dark font-bold">Email</th>
                <th className="px-6 py-3 text-left text-dark font-bold">Teléfono</th>
                <th className="px-6 py-3 text-center text-dark font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="px-6 py-3 text-dark">{usuario.nombre}</td>
                  <td className="px-6 py-3 text-dark">{usuario.email}</td>
                  <td className="px-6 py-3 text-dark">{usuario.telefono || 'N/A'}</td>
                  <td className="px-6 py-3 text-center">
                    <button className="text-blue-500 hover:text-blue-700 inline-block mr-3">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;
