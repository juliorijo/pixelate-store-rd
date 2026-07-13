import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productosAPI } from '../utils/api';
import { useCart } from '../hooks/useCart';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
    // Mostrar notificación (podrías usar una librería como react-toastify)
    alert(`${producto.nombre} agregado al carrito ✅`);
  };

  return (
    <div className="pt-16 bg-primary min-h-screen">
      {/* Banner Hero con Glassmorphism */}
      <div className="relative min-h-96 py-20 px-4 overflow-hidden">
        {/* Fondo con gradiente y blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent-light opacity-10"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>

        {/* Contenido */}
        <div className="relative container mx-auto text-center z-10">
          <div className="inline-block backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-6 mb-6 hover:bg-white/15 transition">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
              🎥 Pixelate Store RD
            </h1>
            <p className="text-xl text-white/80 mb-2">
              Tu tienda especializada en fotografía profesional
            </p>
            <p className="text-sm text-white/60">Cámaras • Lentes • Accesorios • Equipamiento</p>
          </div>

          <div className="backdrop-blur-md bg-green-500/80 border border-green-400/30 text-white px-8 py-4 rounded-2xl inline-block font-bold text-lg mb-8 animate-pulse shadow-lg shadow-green-500/20">
            🚚 ENTREGA EL MISMO DÍA (Antes de 2:00 PM)
          </div>

          <button
            onClick={() => navigate('/productos')}
            className="bg-gradient-to-r from-accent to-accent-dark hover:shadow-2xl hover:shadow-accent/40 text-white px-10 py-4 rounded-2xl font-bold hover:scale-110 transition transform text-lg backdrop-blur-sm border border-accent/50"
          >
            Explorar Catálogo →
          </button>
        </div>
      </div>

      {/* Categorías destacadas con Glassmorphism */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-dark mb-12 text-center">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: '📷', nombre: 'Cámaras', categoria: 'Cámaras' },
            { emoji: '🔭', nombre: 'Lentes', categoria: 'Lentes' },
            { emoji: '🎯', nombre: 'Accesorios', categoria: 'Accesorios' },
            { emoji: '📐', nombre: 'Iluminación', categoria: 'Iluminación' },
          ].map((cat) => (
            <button
              key={cat.categoria}
              onClick={() => navigate(`/productos?categoria=${cat.categoria}`)}
              className="group relative backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 hover:border-accent/50 p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative z-10">
                <span className="text-5xl block mb-4 group-hover:scale-125 transition duration-300">{cat.emoji}</span>
                <p className="text-dark font-bold text-lg">{cat.nombre}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Productos destacados con Glassmorphism */}
      <div className="relative min-h-96 py-16 px-4 overflow-hidden">
        {/* Fondo con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5"></div>

        <div className="relative container mx-auto z-10">
          <h2 className="text-4xl font-bold text-dark mb-12 text-center">
            ⭐ Productos Destacados
          </h2>

          {cargando ? (
            <div className="text-center text-dark/70">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="backdrop-blur-md bg-red-500/20 border border-red-500/30 text-dark rounded-2xl p-6 text-center">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosDestacados.map((producto) => (
                <ProductCard
                  key={producto._id}
                  producto={producto}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Beneficios */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          ¿Por qué comprar con nosotros?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { emoji: '🚚', titulo: 'Entrega Rápida', desc: 'Mismo día si compras antes de 2 PM' },
            { emoji: '🛡️', titulo: 'Garantía Oficial', desc: 'Todos nuestros productos con garantía' },
            { emoji: '💳', titulo: 'Fácil Pago', desc: 'Efectivo contra entrega o transferencia' },
          ].map((beneficio, idx) => (
            <div key={idx} className="bg-secondary p-6 rounded-lg text-center">
              <span className="text-4xl block mb-3">{beneficio.emoji}</span>
              <h3 className="text-white font-bold text-lg mb-2">{beneficio.titulo}</h3>
              <p className="text-gray-300">{beneficio.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-accent py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-white mb-6">Recibe ofertas exclusivas y novedades fotográficas</p>
          <div className="flex justify-center gap-2">
            <input
              type="email"
              placeholder="Tu email..."
              className="px-4 py-2 rounded flex-1 max-w-xs"
            />
            <button className="bg-secondary text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
