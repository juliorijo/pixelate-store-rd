import React from 'react';
import { Mail, Phone, MapPin, Clock, Heart, Camera, Share2, Send, Lock, CreditCard, Truck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-tertiary-light/30">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="PIXELATE" className="h-8 w-auto" />
              <h3 className="text-lg font-bold text-text-primary">Pixelate Store</h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Tienda especializada en equipo fotográfico profesional de la más alta calidad.
            </p>
            {/* Trust Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Lock size={16} className="text-accent" />
                <span>Sitio seguro SSL</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <CreditCard size={16} className="text-accent" />
                <span>Pago seguro verificado</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Truck size={16} className="text-accent" />
                <span>Envío confiable</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-base font-bold text-text-primary mb-4">Categorías</h4>
            <ul className="space-y-2">
              <li><a href="/productos?categoria=Cámaras" className="text-text-secondary hover:text-accent transition text-sm">Cámaras</a></li>
              <li><a href="/productos?categoria=Lentes" className="text-text-secondary hover:text-accent transition text-sm">Lentes</a></li>
              <li><a href="/productos?categoria=Accesorios" className="text-text-secondary hover:text-accent transition text-sm">Accesorios</a></li>
              <li><a href="/productos?categoria=Iluminación" className="text-text-secondary hover:text-accent transition text-sm">Iluminación</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold text-text-primary mb-4">Servicio</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-accent transition text-sm">Sobre Nosotros</a></li>
              <li><a href="#" className="text-text-secondary hover:text-accent transition text-sm">Envío Información</a></li>
              <li><a href="#" className="text-text-secondary hover:text-accent transition text-sm">Política de Devoluciones</a></li>
              <li><a href="#" className="text-text-secondary hover:text-accent transition text-sm">Soporte Técnico</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base font-bold text-text-primary mb-4">Soporte</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <span>+1 (809) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@pixelate.rd" className="hover:text-accent transition">
                  info@pixelate.rd
                </a>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <span>Santo Domingo, RD</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Clock size={16} className="text-accent flex-shrink-0" />
                <span>Lun-Vie: 9am-6pm</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-base font-bold text-text-primary mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tertiary/50 hover:bg-accent/20 text-accent p-3 rounded-lg transition"
                aria-label="Facebook"
              >
                <Heart size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tertiary/50 hover:bg-accent/20 text-accent p-3 rounded-lg transition"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tertiary/50 hover:bg-accent/20 text-accent p-3 rounded-lg transition"
                aria-label="Twitter"
              >
                <Share2 size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tertiary/50 hover:bg-accent/20 text-accent p-3 rounded-lg transition"
                aria-label="YouTube"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-tertiary-light/30 mb-8" />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <p className="text-text-secondary text-sm">
              © {currentYear} Pixelate Store RD. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
            <a href="#" className="text-text-secondary hover:text-accent transition text-sm">
              Política de Privacidad
            </a>
            <span className="text-tertiary-light hidden md:inline">•</span>
            <a href="#" className="text-text-secondary hover:text-accent transition text-sm">
              Términos y Condiciones
            </a>
            <span className="text-tertiary-light hidden md:inline">•</span>
            <a href="#" className="text-text-secondary hover:text-accent transition text-sm">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
