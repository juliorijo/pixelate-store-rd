# 🚀 GUÍA PASO A PASO PARA EJECUTAR PIXELATE STORE RD

## 📋 Requisitos Previos

- **Node.js** v14+ (descarga desde https://nodejs.org/)
- **npm** (incluido con Node.js)
- **MongoDB** (instalado localmente O cuenta en MongoDB Atlas)
- **Visual Studio Code** o editor de código
- **Git** (opcional)

---

## 🛠️ PASO 1: Preparar MongoDB

### Opción A: Usar MongoDB Localmente (Windows)

1. Descarga MongoDB Community Edition desde: https://www.mongodb.com/try/download/community
2. Instala siguiendo el wizard
3. MongoDB se ejecutará como servicio automáticamente
4. Por defecto, escucha en: `mongodb://localhost:27017`

### Opción B: Usar MongoDB Atlas (Recomendado para Producción)

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster
4. Obtén la connection string (URL)
5. La URL se verá así:
   ```
   mongodb+srv://usuario:contraseña@cluster.mongodb.net/pixelate-store-rd
   ```

---

## 📦 PASO 2: Instalar Dependencias

### 2.1 Abrir PowerShell o CMD en la carpeta del proyecto

```bash
cd C:\Users\TuUsuario\Desktop\PIXELATE WEBSITE\pixelate-store-rd
```

### 2.2 Instalar todas las dependencias

```bash
npm run install-all
```

**O instalar manualmente:**

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

---

## ⚙️ PASO 3: Configurar Variables de Entorno

### 3.1 Configurar Backend

Edita el archivo `backend/.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/pixelate-store-rd

# O si usas MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/pixelate-store-rd

# JWT
JWT_SECRET=pixelate_store_rd_secret_key_2024_super_segura
JWT_EXPIRE=7d

# Puerto
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Opcional - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=contraseña-app

NODE_ENV=development
```

### 3.2 Configurar Frontend

Edita `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌱 PASO 4: Crear Datos de Ejemplo (Opcional pero Recomendado)

En una terminal, ve a la carpeta backend y ejecuta:

```bash
cd backend
npm run seed
```

**Esto creará:**
- 10 productos de ejemplo (cámaras, lentes, accesorios)
- 1 usuario administrador

**Credenciales del Admin:**
- Email: `admin@pixelate.rd`
- Contraseña: `Admin123456`

---

## ▶️ PASO 5: Ejecutar la Aplicación

### 5.1 Inicia el Backend

**Terminal 1:**
```bash
cd backend
npm run dev
```

Deberías ver algo como:
```
╔════════════════════════════════════════╗
║   🎥 Pixelate Store RD - Backend      ║
║   Servidor ejecutándose en:            ║
║   http://localhost:5000                ║
╚════════════════════════════════════════╝
```

### 5.2 Inicia el Frontend

**Terminal 2:**
```bash
cd frontend
npm start
```

Espera a que se compile y se abrirá automáticamente en:
```
http://localhost:3000
```

---

## 🧪 PASO 6: Probar la Aplicación

### En el Navegador (http://localhost:3000):

#### 🏠 Página Principal
- ✅ Ver banner con mensaje de delivery
- ✅ Ver productos destacados
- ✅ Ver categorías (Cámaras, Lentes, Accesorios, Trípodes)

#### 📦 Catálogo
- ✅ Filtrar por categoría, marca, precio
- ✅ Buscar productos
- ✅ Ver paginación
- ✅ Agregar productos al carrito

#### 🛒 Carrito
- ✅ Ver productos agregados
- ✅ Aumentar/disminuir cantidad
- ✅ Eliminar productos
- ✅ Ver total con impuesto

#### 💳 Checkout
- ✅ Llenar formulario (nombre, email, teléfono, dirección)
- ✅ Seleccionar método de pago
- ✅ Ver tipo de entrega automático (mismo día o siguiente día)
- ✅ Confirmar pedido

#### 👨‍💼 Panel Admin
- Ir a: http://localhost:3000/login
- Seleccionar: "Administrador"
- Email: `admin@pixelate.rd`
- Contraseña: `Admin123456`
- ✅ Ver dashboard con estadísticas
- ✅ Ver lista de pedidos
- ✅ Cambiar estado de pedidos

---

## 🔍 PROBAR APIS CON POSTMAN (Opcional)

### Endpoints Principales:

**1. Obtener todos los productos:**
```
GET http://localhost:5000/api/products
```

**2. Crear un pedido (Checkout):**
```
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1-809-123-4567",
  "direccion": "Calle 1 #123",
  "ciudad": "Santo Domingo",
  "items": [
	{
	  "productoId": "AQUI_EL_ID_DEL_PRODUCTO",
	  "cantidad": 1
	}
  ],
  "metodoPago": "efectivo"
}
```

**3. Login Admin:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@pixelate.rd",
  "contraseña": "Admin123456"
}
```

---

## 🐛 SOLUCIONAR PROBLEMAS

### Error: "Cannot find module 'dotenv'"
```bash
cd backend
npm install
```

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté ejecutándose
- Comprueba la MONGODB_URI en `.env`
- Si usas Atlas, verifica tu IP en whitelist

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en backend/.env
PORT=5001
```

### Error: "Port 3000 already in use"
```bash
# En terminal, ejecuta:
set PORT=3001 && npm start
```

### Frontend no conecta con Backend
- Verifica que REACT_APP_API_URL sea correcto
- Comprueba que el backend esté ejecutándose
- Abre la consola del navegador (F12) para ver errores

---

## 📱 CARACTERÍSTICAS INCLUIDAS

✅ **Frontend:**
- Catálogo de productos con filtros avanzados
- Carrito de compras persistente
- Sistema de checkout intuitivo
- Panel de administrador
- Dark mode elegante
- Responsive design
- WhatsApp flotante

✅ **Backend:**
- API REST completa
- Autenticación JWT
- CRUD de productos con imágenes
- Gestión de pedidos
- Cálculo automático de delivery
- Validación de datos
- Manejo de errores

✅ **Base de Datos:**
- Esquemas bien estructurados
- Relaciones entre colecciones
- Datos de ejemplo incluidos

---

## 🚀 SIGUIENTE: PRODUCCIÓN

Para deployar a producción:

1. **Backend:** Heroku, Railway, Render
2. **Frontend:** Vercel, Netlify
3. **Base de Datos:** MongoDB Atlas
4. **Imágenes:** AWS S3, Cloudinary, Firebase Storage

---

## 📚 DOCUMENTACIÓN ADICIONAL

- API completa: Ver `docs/API_DOCUMENTATION.md`
- README: Ver `README.md` en raíz

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Cómo cambio el número de WhatsApp?**
R: Edita `frontend/src/components/WhatsAppButton.jsx` línea 8

**P: ¿Cómo agrego más categorías?**
R: Edita `frontend/src/utils/constants.js` y `backend/models/Product.js`

**P: ¿Cómo cambio los colores del tema?**
R: Edita `frontend/tailwind.config.js`

**P: ¿Cómo configuro email de notificaciones?**
R: Ver sección de variables de entorno SMTP en este archivo

---

## 🎉 ¡LISTO PARA COMENZAR!

Ejecuta los comandos del **PASO 5** y disfruta de tu tienda en línea.

**Para dudas:** Revisa la consola del navegador (F12) o terminal para mensajes de error detallados.

---

**Última actualización:** 2024
**Versión:** 1.0.0
