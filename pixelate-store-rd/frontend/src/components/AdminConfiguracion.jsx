import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { FiSettings, FiSave } from 'react-icons/fi';

const AdminConfiguracion = () => {
  const { showSuccess, showError } = useToast();
  const [config, setConfig] = useState({
    nombreTienda: 'Pixelate Store RD',
    email: 'contacto@pixelate.rd',
    telefono: '+1 (809) 123-4567',
    horarioApertura: '09:00',
    horarioCierre: '18:00',
    direccion: 'Santo Domingo, República Dominicana',
    whatsapp: '+1 (809) 123-4567',
    descripcion: 'Tienda de cámaras, lentes y accesorios fotográficos',
  });

  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      // Aquí guardarías en la base de datos
      setTimeout(() => {
        showSuccess('Configuración guardada exitosamente');
        setEnviando(false);
      }, 500);
    } catch (err) {
      showError('Error al guardar configuración');
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h2 className="text-3xl font-bold text-dark flex items-center gap-2">
          <FiSettings size={32} className="text-accent" />
          Configuración de la Tienda
        </h2>
        <p className="text-dark/70 text-sm mt-1">Administra los datos de tu negocio</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleGuardar} className="glass-card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre de Tienda */}
          <div>
            <label className="block text-dark font-semibold mb-2">Nombre de Tienda</label>
            <input
              type="text"
              name="nombreTienda"
              value={config.nombreTienda}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              placeholder="Nombre de tu tienda"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-dark font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={config.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              placeholder="contacto@tienda.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-dark font-semibold mb-2">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={config.telefono}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              placeholder="+1 (809) 123-4567"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-dark font-semibold mb-2">WhatsApp</label>
            <input
              type="tel"
              name="whatsapp"
              value={config.whatsapp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              placeholder="+1 (809) 123-4567"
            />
          </div>

          {/* Hora Apertura */}
          <div>
            <label className="block text-dark font-semibold mb-2">Horario Apertura</label>
            <input
              type="time"
              name="horarioApertura"
              value={config.horarioApertura}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          {/* Hora Cierre */}
          <div>
            <label className="block text-dark font-semibold mb-2">Horario Cierre</label>
            <input
              type="time"
              name="horarioCierre"
              value={config.horarioCierre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-dark font-semibold mb-2">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={config.direccion}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            placeholder="Tu dirección"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-dark font-semibold mb-2">Descripción de la Tienda</label>
          <textarea
            name="descripcion"
            value={config.descripcion}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent resize-none"
            placeholder="Describe tu negocio..."
          />
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white py-3 rounded-xl font-bold transition-all duration-300 backdrop-blur-sm border border-accent/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FiSave size={20} />
          {enviando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>

      {/* Sección de Riesgo */}
      <div className="glass-card p-6 border-l-4 border-red-500">
        <h3 className="text-xl font-bold text-red-600 mb-3">Zona de Riesgo</h3>
        <p className="text-dark/70 mb-4">Acciones irreversibles</p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
          Resetear Base de Datos
        </button>
      </div>
    </div>
  );
};

export default AdminConfiguracion;
