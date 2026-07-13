import React, { useEffect } from 'react';

const WhatsAppButton = () => {
  const numeroWhatsApp = '18091234567'; // Número de la tienda en RD
  const mensaje = 'Hola, me gustaría saber más sobre tus productos 📸';

  return (
    <a
      href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition transform hover:scale-110 z-40"
      title="Contactar por WhatsApp"
    >
      <span className="text-3xl">💬</span>
    </a>
  );
};

export default WhatsAppButton;
