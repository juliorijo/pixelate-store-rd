# Documentación de API - Pixelate Store RD

## Base URL
```
http://localhost:5000/api
```

## Autenticación
Se usa JWT (JSON Web Token). El token debe enviarse en el header:
```
Authorization: Bearer <tu_token>
```

---

## 📦 ENDPOINTS DE PRODUCTOS

### Obtener todos los productos
```
GET /products
```
**Parámetros de query:**
- `categoria` - Filtrar por categoría (Cámaras, Lentes, Accesorios, Trípodes)
- `marca` - Filtrar por marca
- `precioMin` - Precio mínimo
- `precioMax` - Precio máximo
- `buscar` - Buscar por nombre o descripción
- `pagina` - Número de página (default: 1)
- `limite` - Productos por página (default: 12)

**Ejemplo:**
```
GET /products?categoria=Cámaras&precioMax=5000&pagina=1
```

**Response:**
```json
{
  "productos": [...],
  "total": 100,
  "paginas": 9,
  "paginaActual": 1
}
```

### Obtener productos destacados
```
GET /products/destacados
```

### Obtener producto por ID
```
GET /products/:id
```

### Obtener categorías disponibles
```
GET /products/categorias/list
```

### Obtener marcas disponibles
```
GET /products/marcas/list
```

### Obtener rango de precios
```
GET /products/precios/rango
```

---

## 📋 ENDPOINTS DE PEDIDOS

### Crear pedido (Checkout)
```
POST /orders
```
**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1-809-xxx-xxxx",
  "direccion": "Calle 1 #123",
  "ciudad": "Santo Domingo",
  "codigoPostal": "10101",
  "items": [
	{
	  "productoId": "507f1f77bcf86cd799439011",
	  "cantidad": 2
	}
  ],
  "metodoPago": "efectivo",
  "notas": "Dejar en la puerta"
}
```

**Response:**
```json
{
  "mensaje": "Pedido creado exitosamente ✅",
  "pedido": {...},
  "tipoEntrega": "Entrega el mismo día",
  "fechaEntrega": "2024-01-15T16:00:00.000Z"
}
```

### Obtener pedido por ID
```
GET /orders/:id
```

### Obtener pedidos por email del cliente
```
GET /orders/email/:email
```

---

## 🔐 ENDPOINTS DE AUTENTICACIÓN

### Login de administrador
```
POST /auth/login
```
**Body:**
```json
{
  "email": "admin@pixelate.rd",
  "contraseña": "Admin123456"
}
```

**Response:**
```json
{
  "mensaje": "Inicio de sesión exitoso ✅",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
	"id": "507f1f77bcf86cd799439011",
	"nombre": "Administrador",
	"email": "admin@pixelate.rd",
	"rol": "admin"
  }
}
```

### Login de cliente
```
POST /auth/cliente/login
```

### Registro de cliente
```
POST /auth/cliente/registro
```
**Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "contraseña": "MiPassword123",
  "telefono": "+1-809-xxx-xxxx",
  "direccion": "Av. Principal 456",
  "ciudad": "Santiago"
}
```

### Verificar token
```
POST /auth/verificar
```
**Headers:**
```
Authorization: Bearer <token>
```

---

## 🛠️ ENDPOINTS DE ADMINISTRADOR (Requieren autenticación JWT de admin)

### Crear producto
```
POST /admin/productos
```
**Content-Type:** `multipart/form-data`

**Fields:**
- `nombre` - Nombre del producto (required)
- `descripcion` - Descripción (required)
- `precio` - Precio en RD$ (required)
- `precioOriginal` - Precio sin descuento (opcional)
- `categoria` - Categoría (required)
- `marca` - Marca (required)
- `stock` - Stock disponible (required)
- `imagen` - Archivo de imagen (required)
- `especificaciones` - JSON con especificaciones
- `descuento` - Porcentaje de descuento
- `destacado` - Boolean (true/false)

**Example con cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/productos \
  -H "Authorization: Bearer <token>" \
  -F "nombre=Nueva Cámara" \
  -F "descripcion=Descripción del producto" \
  -F "precio=2999" \
  -F "categoria=Cámaras" \
  -F "marca=Canon" \
  -F "stock=10" \
  -F "imagen=@/ruta/imagen.jpg" \
  -F "destacado=true"
```

### Obtener todos los productos (admin)
```
GET /admin/productos
```
Requiere autenticación de admin

### Obtener producto por ID (admin)
```
GET /admin/productos/:id
```

### Actualizar producto
```
PUT /admin/productos/:id
```
**Content-Type:** `multipart/form-data`

Soporta los mismos campos que crear producto

### Eliminar producto
```
DELETE /admin/productos/:id
```

### Obtener todos los pedidos
```
GET /admin/orders
```
**Parámetros de query:**
- `estado` - Filtrar por estado (pendiente, confirmado, preparando, en_camino, entregado, cancelado)
- `desde` - Fecha de inicio (ISO format)
- `hasta` - Fecha de fin (ISO format)

### Obtener pedido por ID
```
GET /admin/orders/:id
```

### Actualizar estado del pedido
```
PUT /admin/orders/:id/estado
```
**Body:**
```json
{
  "estado": "en_camino",
  "notasAdmin": "Ya está en camino"
}
```

**Estados válidos:**
- `pendiente` - Pedido recibido
- `confirmado` - Pedido confirmado
- `preparando` - Preparando el envío
- `en_camino` - En camino
- `entregado` - Entregado
- `cancelado` - Cancelado

### Obtener estadísticas del dashboard
```
GET /admin/estadisticas/dashboard
```

**Response:**
```json
{
  "totalProductos": 50,
  "totalPedidos": 250,
  "totalClientes": 120,
  "ingresosTotales": 850000,
  "pedidosPorEstado": [...],
  "productosmasVendidos": [...]
}
```

---

## ❌ Códigos de Error

- `200` - OK
- `201` - Creado exitosamente
- `400` - Bad Request (datos inválidos)
- `401` - No autorizado (token faltante o inválido)
- `403` - Acceso denegado (no tiene permisos)
- `404` - No encontrado
- `500` - Error del servidor

---

## 🎁 Categorías disponibles

- Cámaras
- Lentes
- Accesorios
- Trípodes

---

## 💾 Métodos de pago

- `efectivo` - Efectivo contra entrega
- `transferencia` - Transferencia bancaria

---

## 📅 Sistema de Delivery automático

El sistema calcula automáticamente el tipo de entrega basado en la hora de compra:

- **Antes de las 2:00 PM**: Entrega el mismo día (entre 4-6 PM)
- **Después de las 2:00 PM**: Entrega al día siguiente (entre 9-11 AM)

---

## 🔒 Seguridad

- Las contraseñas se hashean con bcryptjs
- Los tokens JWT tienen validez de 7 días
- Solo los administradores pueden crear/editar/eliminar productos
- Las imágenes se guardan en el servidor local
- Se valida el CORS desde el frontend

---

## 📝 Notas

- Los precios deben estar en RD$ (Pesos Dominicanos)
- Se aplica automáticamente 18% ITBIS (impuesto)
- El delivery es gratuito en RD
- Las imágenes deben ser JPG, PNG, GIF o WebP (máximo 5MB)

