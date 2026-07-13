import React from 'react';

const Footer = () => {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Fondo glassmorphism con degradado rojo */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light opacity-90 backdrop-blur-3xl"></div>

      {/* Contenido con efecto glass */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Sobre nosotros */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎥 Pixelate Store</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Tienda especializada en cámaras, lentes y accesorios fotográficos de calidad profesional.
            </p>
          </div>

          {/* Servicios */}
          <div className="glass-card p-6">
            <h4 className="text-white font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white transition">📦 Entrega el mismo día</li>
              <li className="hover:text-white transition">🛡️ Garantía oficial</li>
              <li className="hover:text-white transition">💳 Múltiples métodos de pago</li>
              <li className="hover:text-white transition">🔧 Soporte técnico</li>
            </ul>
          </div>

          {/* Categorías */}
          <div className="glass-card p-6">
            <h4 className="text-white font-bold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/productos?categoria=Cámaras" className="text-white/80 hover:text-white transition">Cámaras</a></li>
              <li><a href="/productos?categoria=Lentes" className="text-white/80 hover:text-white transition">Lentes</a></li>
              <li><a href="/productos?categoria=Accesorios" className="text-white/80 hover:text-white transition">Accesorios</a></li>
              <li><a href="/productos?categoria=Trípodes" className="text-white/80 hover:text-white transition">Trípodes</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="glass-card p-6">
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📞 +1 (809) 123-4567</li>
              <li>📧 info@pixelate.rd</li>
              <li>📍 Santo Domingo, RD</li>
              <li>⏰ Lun-Vie: 9am-6pm</li>
            </ul>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-white/70 hover:text-white transition text-2xl hover:scale-110">📘</a>
            <a href="#" className="text-white/70 hover:text-white transition text-2xl hover:scale-110">📷</a>
            <a href="#" className="text-white/70 hover:text-white transition text-2xl hover:scale-110">🐦</a>
            <a href="#" className="text-white/70 hover:text-white transition text-2xl hover:scale-110">💬</a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-white/70">
            <p>© 2024 Pixelate Store RD. Todos los derechos reservados. 🎥</p>
            <p className="mt-2">
              <a href="#" className="hover:text-white transition">Política de privacidad</a> | 
              <a href="#" className="hover:text-white transition"> Términos y condiciones</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
