import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

// Componente de tarjeta glassmorphism para mostrar productos
const ProductGlassCard = ({ producto, onEdit, onDelete }) => {
  return (
    <div className="group glass-card-hover h-full flex flex-col">
      {/* Imagen de fondo difuminada */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${producto.imagen})`,
          filter: 'blur(10px)',
        }}
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />

      {/* Contenido */}
      <div className="relative z-10 h-full p-5 flex flex-col justify-between">
        {/* Imagen principal insertada */}
        <div className="mb-4 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/160?text=No+Img';
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 backdrop-blur-sm">
          <h3 className="font-bold text-dark text-sm line-clamp-2 mb-1">{producto.nombre}</h3>
          <p className="text-xs text-dark/70 mb-2">{producto.marca} • {producto.categoria}</p>

          {/* Precio */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-accent text-lg">RD$ {producto.precio.toFixed(2)}</span>
              {producto.descuento > 0 && (
                <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-bold border border-accent/30">
                  -{producto.descuento}%
                </span>
              )}
            </div>
            {producto.stock > 0 ? (
              <span className="text-xs text-green-600 font-semibold">📦 {producto.stock} en stock</span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">❌ Sin stock</span>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-3 border-t border-white/20">
          <button
            onClick={() => onEdit(producto)}
            className="flex-1 bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(producto._id)}
            className="flex-1 bg-red-500/80 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [modo, setModo] = useState('lista'); // 'lista', 'crear', 'editar'
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precioOriginal: '',
    categoria: 'Cámaras',
    marca: '',
    stock: '',
    descuento: '',
    destacado: false,
    especificaciones: '{}',
    imagen: null,
    imagenes: [],
  });
  const [previews, setPreviews] = useState({
    principal: null,
    secundarias: [],
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const response = await adminAPI.obtenerProductos();
      setProductos(response.data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'imagen') {
        const file = files[0];
        setForm({ ...form, [name]: file });
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => setPreviews({ ...previews, principal: e.target.result });
          reader.readAsDataURL(file);
        }
      } else if (name === 'imagenes') {
        const newFiles = Array.from(files);
        setForm({ ...form, imagenes: [...(form.imagenes || []), ...newFiles] });
        newFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviews((prev) => ({
              ...prev,
              secundarias: [...prev.secundarias, e.target.result],
            }));
          };
          reader.readAsDataURL(file);
        });
      }
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const eliminarImagenSecundaria = (index) => {
    setForm({
      ...form,
      imagenes: form.imagenes.filter((_, i) => i !== index),
    });
    setPreviews({
      ...previews,
      secundarias: previews.secundarias.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.precio || !form.categoria || !form.marca) {
      alert('❌ Faltan datos requeridos (nombre, descripción, precio, categoría, marca)');
      return;
    }

    // Validar imagen solo en modo crear
    if (modo === 'crear') {
      if (!form.imagen || !(form.imagen instanceof File)) {
        console.error('Imagen no válida:', form.imagen);
        alert('❌ Debes subir una imagen principal para crear un producto');
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('descripcion', form.descripcion);
      formData.append('precio', form.precio);
      formData.append('precioOriginal', form.precioOriginal || '');
      formData.append('categoria', form.categoria);
      formData.append('marca', form.marca);
      formData.append('stock', form.stock);
      formData.append('descuento', form.descuento || 0);
      formData.append('destacado', form.destacado);
      formData.append('especificaciones', form.especificaciones);

      if (form.imagen) {
        formData.append('imagen', form.imagen);
      }

      // Agregar imágenes secundarias
      if (form.imagenes && form.imagenes.length > 0) {
        form.imagenes.forEach((img, idx) => {
          if (img instanceof File) {
            formData.append(`imagenes`, img);
          }
        });
      }

      if (modo === 'crear') {
        await adminAPI.crearProducto(formData);
        alert('✅ Producto creado exitosamente');
      } else if (modo === 'editar') {
        await adminAPI.actualizarProducto(productoSeleccionado._id, formData);
        alert('✅ Producto actualizado exitosamente');
      }

      setModo('lista');
      resetForm();
      cargarProductos();
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.error || err.message));
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      precio: '',
      precioOriginal: '',
      categoria: 'Cámaras',
      marca: '',
      stock: '',
      descuento: '',
      destacado: false,
      especificaciones: '{}',
      imagen: null,
      imagenes: [],
    });
    setPreviews({
      principal: null,
      secundarias: [],
    });
    setProductoSeleccionado(null);
  };

  const handleEditar = (producto) => {
    setProductoSeleccionado(producto);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      precioOriginal: producto.precioOriginal || '',
      categoria: producto.categoria,
      marca: producto.marca,
      stock: producto.stock,
      descuento: producto.descuento || 0,
      destacado: producto.destacado || false,
      especificaciones: JSON.stringify(producto.especificaciones || {}),
      imagen: null,
      imagenes: [],
    });
    setPreviews({
      principal: producto.imagen,
      secundarias: producto.imagenes || [],
    });
    setModo('editar');
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await adminAPI.eliminarProducto(id);
      alert('Producto eliminado ✅');
      cargarProductos();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
      console.error(err);
    }
  };

  const handleNuevoProducto = () => {
    resetForm();
    setProductoSeleccionado(null);
    setModo('crear');
  };

  const handleCancelar = () => {
    setModo('lista');
    resetForm();
  };

  // Preview del producto
  const calcularPrecioFinal = () => {
    const precio = parseFloat(form.precio) || 0;
    const descuento = parseFloat(form.descuento) || 0;
    return (precio - precio * (descuento / 100)).toFixed(2);
  };

  return (
    <div>
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-6">
          {error}
        </div>
      )}

      {modo === 'lista' && (
        <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent/5">
          {/* Header */}
          <div className="glass-card sticky top-0 z-40 py-6 mb-8">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-dark">🎥 Gestión de Productos</h2>
                <p className="text-dark/70 text-sm mt-1">Administra tu catálogo de cámaras y accesorios</p>
              </div>
              <button
                onClick={handleNuevoProducto}
                className="bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 backdrop-blur-sm border border-accent/50 transform hover:scale-105"
              >
                ➕ Nuevo Producto
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="container mx-auto px-4 pb-12">
            {cargando ? (
              <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin">
                  <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"></div>
                </div>
              </div>
            ) : productos.length === 0 ? (
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-12 text-center">
                <p className="text-dark text-xl font-semibold">No hay productos aún</p>
                <p className="text-dark/70 mt-2">Comienza a agregar productos a tu catálogo</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productos.map((producto) => (
                  <ProductGlassCard
                    key={producto._id}
                    producto={producto}
                    onEdit={handleEditar}
                    onDelete={handleEliminar}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(modo === 'crear' || modo === 'editar') && (
        <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent/5 py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-dark">
                {modo === 'crear' ? '✨ Crear Nuevo Producto' : '📝 Editar Producto'}
              </h2>
              <p className="text-dark/70 text-sm mt-2">
                {modo === 'crear'
                  ? 'Agrega un nuevo producto a tu catálogo'
                  : 'Actualiza los detalles del producto'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="glass-card p-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="nombre" className="text-dark font-semibold block mb-2">Nombre *</label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="Ej: Canon EOS R5"
                        required
                      />
                    </div>

                    {/* Categoría */}
                    <div>
                      <label htmlFor="categoria" className="text-dark font-semibold block mb-2">Categoría *</label>
                      <select
                        id="categoria"
                        name="categoria"
                        value={form.categoria}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        required
                      >
                        <option value="Cámaras">Cámaras</option>
                        <option value="Lentes">Lentes</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Iluminación">Iluminación</option>
                        <option value="Mochilas">Mochilas</option>
                      </select>
                    </div>

                    {/* Marca */}
                    <div>
                      <label htmlFor="marca" className="text-dark font-semibold block mb-2">Marca *</label>
                      <input
                        id="marca"
                        type="text"
                        name="marca"
                        value={form.marca}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="Ej: Canon"
                        required
                      />
                    </div>

                    {/* Precio */}
                    <div>
                      <label htmlFor="precio" className="text-dark font-semibold block mb-2">Precio (RD$) *</label>
                      <input
                        id="precio"
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="0.00"
                        step="0.01"
                        required
                      />
                    </div>

                    {/* Precio Original */}
                    <div>
                      <label htmlFor="precioOriginal" className="text-dark font-semibold block mb-2">Precio Original</label>
                      <input
                        id="precioOriginal"
                        type="number"
                        name="precioOriginal"
                        value={form.precioOriginal}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>

                    {/* Descuento */}
                    <div>
                      <label htmlFor="descuento" className="text-dark font-semibold block mb-2">Descuento (%)</label>
                      <input
                        id="descuento"
                        type="number"
                        name="descuento"
                        value={form.descuento}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label htmlFor="stock" className="text-dark font-semibold block mb-2">Stock</label>
                      <input
                        id="stock"
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    {/* Destacado */}
                    <div className="flex items-center pt-6">
                      <input
                        id="destacado"
                        type="checkbox"
                        name="destacado"
                        checked={form.destacado}
                        onChange={handleInputChange}
                        className="w-5 h-5 cursor-pointer accent-accent"
                      />
                      <label htmlFor="destacado" className="text-dark ml-3 font-semibold cursor-pointer">
                        ⭐ Producto Destacado
                      </label>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-6">
                    <label htmlFor="descripcion" className="text-dark font-semibold block mb-2">Descripción *</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                      placeholder="Describe el producto..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  {/* Especificaciones */}
                  <div className="mb-6">
                    <label htmlFor="especificaciones" className="text-dark font-semibold block mb-2">Especificaciones (JSON)</label>
                    <textarea
                      id="especificaciones"
                      name="especificaciones"
                      value={form.especificaciones}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 text-dark placeholder-dark/50 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none transition backdrop-blur-sm font-mono text-sm"
                      placeholder='{"Resolución": "45MP", "Video": "4K"}'
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Imagen Principal */}
                  <div className="mb-6">
                    <label htmlFor="imagen" className="text-dark font-semibold block mb-2">
                      📷 Imagen Principal {modo === 'crear' ? '*(obligatoria)' : '(opcional)'}
                    </label>
                    <div className={`relative border-2 border-dashed rounded-lg p-4 transition ${
                      form.imagen 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-accent/50 bg-white/80'
                    }`}>
                      <input
                        id="imagen"
                        key={`imagen-${modo}`}
                        type="file"
                        name="imagen"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full cursor-pointer"
                        required={modo === 'crear'}
                      />
                      {form.imagen && (
                        <p className="text-green-600 text-sm mt-2 font-bold">
                          ✅ Imagen seleccionada: {form.imagen.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Imágenes Secundarias */}
                  <div className="mb-6">
                    <label htmlFor="imagenes" className="text-dark font-semibold block mb-2">
                      🖼️ Imágenes Adicionales ({form.imagenes.length}/5)
                    </label>
                    <input
                      id="imagenes"
                      key={`imagenes-${modo}`}
                      type="file"
                      name="imagenes"
                      onChange={handleInputChange}
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 bg-white/80 text-dark rounded-lg border-2 border-dashed border-accent/50 focus:border-accent focus:outline-none transition backdrop-blur-sm"
                    />
                    {previews.secundarias.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {previews.secundarias.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Secundaria ${idx}`}
                              className="w-full h-24 rounded-lg object-cover border-2 border-accent/30 group-hover:border-accent transition"
                            />
                            <button
                              type="button"
                              onClick={() => eliminarImagenSecundaria(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 backdrop-blur-sm border border-accent/50 transform hover:scale-105"
                    >
                      {modo === 'crear' ? '✅ Crear Producto' : '💾 Guardar Cambios'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelar}
                      className="flex-1 backdrop-blur-md bg-white/20 border border-white/30 hover:border-dark/30 text-dark px-6 py-3 rounded-lg font-bold transition-all duration-300"
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview del Producto */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 glass-card p-6">
                  <h3 className="text-xl font-bold text-dark mb-4">📱 Vista Previa</h3>

                  {/* Imagen Principal */}
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                    {previews.principal ? (
                      <img
                        src={previews.principal}
                        alt="Preview"
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-accent/20 to-dark/10 rounded-xl border-2 border-dashed border-accent/30 flex items-center justify-center">
                        <span className="text-dark/50 text-sm">Sin imagen</span>
                      </div>
                    )}
                  </div>

                  {/* Galería */}
                  {previews.secundarias.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-dark mb-2">Galería</p>
                      <div className="grid grid-cols-3 gap-2">
                        {previews.secundarias.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Gal ${idx}`}
                            className="w-full h-16 rounded-lg object-cover border border-accent/30 hover:border-accent transition"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Info Producto */}
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-lg font-bold text-dark line-clamp-2">
                      {form.nombre || 'Nombre del Producto'}
                    </h4>
                    <p className="text-sm text-dark/70 mt-1">
                      {form.marca || 'Marca'} • {form.categoria || 'Categoría'}
                    </p>

                    {/* Precio */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-2xl font-bold text-accent">RD$ {calcularPrecioFinal()}</span>
                      {form.descuento > 0 && (
                        <>
                          <span className="text-sm text-dark/50 line-through">
                            RD$ {parseFloat(form.precio).toFixed(2)}
                          </span>
                          <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-bold border border-accent/30">
                            -{form.descuento}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="mt-3">
                      <span className={`text-sm font-semibold ${form.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {form.stock > 0 ? `📦 ${form.stock} en stock` : '❌ Sin stock'}
                      </span>
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-dark mt-4 line-clamp-3">
                      {form.descripcion || 'Descripción del producto...'}
                    </p>

                    {/* Botón Demo */}
                    <button className="w-full bg-gradient-to-r from-accent to-accent-dark text-white font-bold py-3 rounded-lg mt-4 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105">
                      🛒 Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
