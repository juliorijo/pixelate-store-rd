import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Eye, Package, Zap, Truck, Shield, CreditCard, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productosAPI } from '../utils/api';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductosDestacados();
  }, []);

  const cargarProductosDestacados = async () => {
    try {
      setCargando(true);
      const response = await productosAPI.obtenerDestacados();
      setProductosDestacados(response.data);
    } catch (err) {
      setError('Error al cargar productos destacados');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleAddToCart = (producto) => {
    addToCart(producto);
    showSuccess(`${producto.nombre} agregado al carrito`);
  };

  const categorias = [
    { icon: Camera, nombre: 'Cámaras', categoria: 'Cámaras' },
    { icon: Eye, nombre: 'Lentes', categoria: 'Lentes' },
    { icon: Package, nombre: 'Accesorios', categoria: 'Accesorios' },
    { icon: Zap, nombre: 'Iluminación', categoria: 'Iluminación' },
  ];

  const beneficios = [
    { icon: Truck, titulo: 'Entrega Rápida', desc: 'Envío el mismo día si compras antes de 2 PM' },
    { icon: Shield, titulo: 'Garantía Oficial', desc: 'Todos nuestros productos incluyen garantía completa' },
    { icon: CreditCard, titulo: 'Pago Seguro', desc: 'Múltiples métodos de pago disponibles' },
  ];

  return (
    <div className="pt-16 bg-primary min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-96 py-20 px-4 overflow-hidden">
        {/* Fondo con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary to-tertiary/10"></div>

        {/* Contenido Hero */}
        <div className="relative container mx-auto max-w-4xl text-center z-10">
          <div className="mb-6 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-4">
              Pixelate Store RD
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-3">
              Equipo fotográfico profesional para expertos
            </p>
            <p className="text-base text-text-muted">
              Cámaras • Lentes • Accesorios • Iluminación
            </p>
          </div>

          {/* Trust Badge */}
          <div className="inline-block mb-8 bg-accent/10 border border-accent/30 rounded-lg px-6 py-3">
            <p className="text-accent font-semibold text-sm">
              Envío el mismo día para pedidos antes de las 2 PM
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/productos')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Explorar Catálogo
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/productos?categoria=Cámaras')}
              className="btn-secondary"
            >
              Ver Ofertas
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-tertiary/50 border-y border-tertiary-light/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-3 md:border-r border-tertiary-light/30">
              <Shield size={24} className="text-accent" />
              <div className="text-left">
                <p className="text-text-primary font-bold">Garantía Oficial</p>
                <p className="text-text-secondary text-sm">Todos los productos protegidos</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:border-r border-tertiary-light/30">
              <Truck size={24} className="text-accent" />
              <div className="text-left">
                <p className="text-text-primary font-bold">Envío Rápido</p>
                <p className="text-text-secondary text-sm">Entrega el mismo día disponible</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CreditCard size={24} className="text-accent" />
              <div className="text-left">
                <p className="text-text-primary font-bold">Pago Seguro</p>
                <p className="text-text-secondary text-sm">Múltiples métodos de pago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-text-primary mb-12 text-center">
          Explora Nuestras Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorias.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.categoria}
                onClick={() => navigate(`/productos?categoria=${cat.categoria}`)}
                className="glass-card-hover p-8 text-center group"
              >
                <div className="mb-4 flex justify-center">
                  <Icon size={48} className="text-accent group-hover:text-accent-bright transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">{cat.nombre}</h3>
                <p className="text-text-secondary text-sm mt-2">Explorar colección</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Productos Destacados
            </h2>
            <p className="text-text-secondary">
              Las mejores ofertas en equipo fotográfico profesional
            </p>
          </div>

          {cargando ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="glass-card bg-error/10 border-error/30 text-text-primary rounded-lg p-6 text-center">
              <p>{error}</p>
            </div>
          ) : productosDestacados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosDestacados.map((producto) => (
                <ProductCard
                  key={producto._id}
                  producto={producto}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No hay productos destacados disponibles</p>
            </div>
          )}

          {/* Ver Más Button */}
          {productosDestacados.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/productos')}
                className="btn-secondary px-8 py-3"
              >
                Ver Todos los Productos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-tertiary/50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            ¿Por qué comprar con nosotros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficios.map((beneficio, idx) => {
              const Icon = beneficio.icon;
              return (
                <div key={idx} className="glass-card p-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-accent/20 rounded-full p-4">
                      <Icon size={32} className="text-accent" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 text-center">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-text-secondary text-center text-sm">
                    {beneficio.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-accent py-16 px-4">
        <div className="container mx-auto max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Suscríbete a Nuestro Newsletter
          </h2>
          <p className="text-white/80 mb-6">
            Recibe ofertas exclusivas y novedades de equipo fotográfico
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition"
            />
            <button className="btn-primary bg-accent-bright hover:bg-white text-accent px-6 py-3">
              Suscribir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
