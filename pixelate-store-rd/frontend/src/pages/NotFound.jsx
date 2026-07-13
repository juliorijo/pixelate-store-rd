import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 bg-primary min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Página no encontrada</h1>
        <p className="text-gray-300 mb-8">La página que buscas no existe</p>
        <button
          onClick={() => navigate('/')}
          className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
