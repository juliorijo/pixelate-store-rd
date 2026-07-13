# Pixelate Store RD - E-Commerce de Fotografía

Aplicación web full-stack para una tienda especializada en venta de cámaras, lentes y accesorios fotográficos.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)

## ✨ Características

- ✅ Catálogo de productos dinámico con filtros
- ✅ Carrito de compras persistente
- ✅ Sistema de checkout con múltiples métodos de pago
- ✅ Cálculo automático de delivery según hora
- ✅ Panel de administrador con CRUD de productos
- ✅ Autenticación JWT segura
- ✅ Subida de imágenes
- ✅ Gestión de pedidos
- ✅ Diseño responsive y dark mode
- ✅ WhatsApp flotante
- ✅ SEO básico

## 🛠️ Tecnologías

### Frontend
- React.js 18+
- Tailwind CSS
- Axios
- React Router v6
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- Multer (para imágenes)
- Dotenv

### Base de Datos
- MongoDB

## 🚀 Instalación

### Prerequisitos
- Node.js v14 o superior
- npm o yarn
- MongoDB (local o MongoDB Atlas)

### Paso 1: Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd pixelate-store-rd
```

### Paso 2: Instalar dependencias

```bash
npm run install-all
```

O instalar manualmente:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## ⚙️ Configuración

### Variables de Entorno - Backend

Crear archivo `backend/.env`:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/pixelate-store-rd
# O si usas MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/pixelate-store-rd

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRE=7d

# Puerto
PORT=5000

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña

# Corsn
FRONTEND_URL=http://localhost:3000
```

### Variables de Entorno - Frontend

Crear archivo `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Ejecución

### Opción 1: Ejecutar Backend y Frontend por separado

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Opción 2: Ejecutar desde la raíz (si tienes concurrently instalado)

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
pixelate-store-rd/
├── backend/
│   ├── config/
│   │   └── db.js                 # Configuración de MongoDB
│   ├── models/
│   │   ├── User.js               # Modelo de usuario
│   │   ├── Product.js            # Modelo de producto
│   │   ├── Order.js              # Modelo de pedido
│   │   └── OrderDetail.js        # Detalles del pedido
│   ├── routes/
│   │   ├── products.js           # Rutas de productos
│   │   ├── orders.js             # Rutas de pedidos
│   │   ├── auth.js               # Rutas de autenticación
│   │   └── admin.js              # Rutas de administrador
│   ├── middleware/
│   │   ├── auth.js               # Middleware de autenticación JWT
│   │   ├── errorHandler.js       # Manejo de errores
│   │   └── upload.js             # Configuración de multer
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── uploads/                  # Carpeta de imágenes
│   ├── server.js                 # Archivo principal
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   └── CartContext.js
│   │   ├── hooks/
│   │   │   └── useCart.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   └── tailwind.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── docs/
│   └── API_DOCUMENTATION.md      # Documentación de API
├── package.json                  # Scripts raíz
├── .gitignore
└── README.md
```

## 🔌 Endpoints API

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/category/:category` - Obtener por categoría

### Pedidos
- `POST /api/orders` - Crear nuevo pedido
- `GET /api/orders/:id` - Obtener pedido
- `POST /api/checkout` - Procesar checkout

### Admin
- `POST /api/admin/login` - Login de administrador
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/:id` - Actualizar producto
- `DELETE /api/admin/products/:id` - Eliminar producto
- `GET /api/admin/orders` - Ver todos los pedidos
- `PUT /api/admin/orders/:id/status` - Cambiar estado de pedido

## 📚 Documentación Adicional

Ver `docs/API_DOCUMENTATION.md` para detalles completos de todos los endpoints.

## 🔐 Seguridad

- Contraseñas hasheadas con bcryptjs
- JWT para autenticación
- Validación de entrada
- CORS configurado
- Variables sensibles en .env

## 📦 Datos de Prueba

Para llenar la base de datos con datos de ejemplo:

```bash
cd backend
npm run seed
```

## 📝 Licencia

MIT

## 👥 Autor

Pixelate Store RD

---

**¿Necesitas ayuda?** Revisa los archivos en `docs/` o crea un issue en el repositorio.
