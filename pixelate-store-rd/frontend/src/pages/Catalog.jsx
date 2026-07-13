import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productosAPI } from '../utils/api';
import { CATEGORIAS } from '../utils/constants';
import { useCart } from '../hooks/useCart';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [marca, setMarca] = useState(searchParams.get('marca') || '');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [buscar, setBuscar] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [rangoPrecios, setRangoPrecios] = useState({ min: 0, max: 0 });
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    cargarDatos();
  }, [categoria, marca, precioMin, precioMax, buscar, pagina]);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      // Cargar productos
      const productoRes = await productosAPI.obtenerTodos({
        categoria: categoria || undefined,
        marca: marca || undefined,
        precioMin: precioMin || undefined,
        precioMax: precioMax || undefined,
        buscar: buscar || undefined,
        pagina: pagina,
      });

      setProductos(productoRes.data.productos);
      setTotalPaginas(productoRes.data.paginas);

      // Cargar marcas
      const marcasRes = await productosAPI.obtenerMarcas();
      setMarcas(marcasRes.data);

      // Cargar rango de precios
      const preciosRes = await productosAPI.obtenerRangoPrecios();
      setRangoPrecios(preciosRes.data);

    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleAddToCart = (producto) => {
    addToCart(producto);
    alert(`${producto.nombre} agregado al carrito ✅`);
  };

  const limpiarFiltros = () => {
    setCategoria('');
    setMarca('');
    setPrecioMin('');
    setPrecioMax('');
    setBuscar('');
    setPagina(1);
  };

  return (
    <div className="pt-20 bg-primary min-h-screen pb-12">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Catálogo de Productos</h1>
          <p className="text-gray-300">Encuentra el equipo fotográfico perfecto para ti</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de filtros */}
          <div className="bg-secondary p-6 rounded-lg h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg">Filtros</h2>
              <button
                onClick={limpiarFiltros}
                className="text-accent text-sm hover:underline"
              >
                Limpiar
              </button>
            </div>

            {/* Búsqueda */}
            <div className="mb-6">
              <label className="text-gray-300 font-semibold block mb-2">Buscar</label>
              <input
                type="text"
                placeholder="Nombre, marca..."
                value={buscar}
                onChange={(e) => {
                  setBuscar(e.target.value);
                  setPagina(1);
                }}
                className="w-full px-3 py-2 bg-primary rounded text-white text-sm"
              />
            </div>

            {/* Categorías */}
            <div className="mb-6">
              <label className="text-gray-300 font-semibold block mb-3">Categoría</label>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCategoria('');
                    setPagina(1);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded text-sm ${
                    categoria === '' 
                      ? 'bg-accent text-white' 
                      : 'text-gray-300 hover:bg-primary'
                  }`}
                >
                  Todas
                </button>
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoria(cat);
                      setPagina(1);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      categoria === cat 
                        ? 'bg-accent text-white' 
                        : 'text-gray-300 hover:bg-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Marca */}
            <div className="mb-6">
              <label className="text-gray-300 font-semibold block mb-3">Marca</label>
              <select
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  setPagina(1);
                }}
                className="w-full px-3 py-2 bg-primary text-white rounded text-sm"
              >
                <option value="">Todas las marcas</option>
                {marcas.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <label className="text-gray-300 font-semibold block mb-3">Rango de Precio</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Mín"
                  value={precioMin}
                  onChange={(e) => {
                    setPrecioMin(e.target.value);
                    setPagina(1);
                  }}
                  className="w-full px-3 py-2 bg-primary text-white rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Máx"
                  value={precioMax}
                  onChange={(e) => {
                    setPrecioMax(e.target.value);
                    setPagina(1);
                  }}
                  className="w-full px-3 py-2 bg-primary text-white rounded text-sm"
                />
              </div>
              {rangoPrecios && (
                <p className="text-gray-400 text-xs mt-2">
                  Rango disponible: RD$ {rangoPrecios.min} - RD$ {rangoPrecios.max}
                </p>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            {cargando ? (
              <div className="text-center text-gray-300 py-12">
                <p>Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-12">
                <p>{error}</p>
              </div>
            ) : productos.length === 0 ? (
              <div className="text-center text-gray-300 py-12">
                <p className="text-lg">No se encontraron productos con los filtros aplicados</p>
              </div>
            ) : (
              <>
                {/* Grid de productos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {productos.map((producto) => (
                    <ProductCard
                      key={producto._id}
                      producto={producto}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {/* Paginación */}
                {totalPaginas > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPagina(Math.max(1, pagina - 1))}
                      disabled={pagina === 1}
                      className="px-4 py-2 bg-accent text-white rounded disabled:bg-gray-600 hover:bg-blue-600 transition"
                    >
                      ← Anterior
                    </button>
                    <span className="text-white">
                      Página {pagina} de {totalPaginas}
                    </span>
                    <button
                      onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
                      disabled={pagina === totalPaginas}
                      className="px-4 py-2 bg-accent text-white rounded disabled:bg-gray-600 hover:bg-blue-600 transition"
                    >
                      Siguiente →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
