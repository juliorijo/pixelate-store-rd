# ❓ PREGUNTAS FRECUENTES (FAQ)

## Instalación & Configuración

### P: ¿Necesito instalar MongoDB localmente?
**R:** No obligatoriamente. Puedes usar:
- MongoDB local (descarga en mongodb.com)
- MongoDB Atlas gratuito (recomendado para empezar)
- Otras bases de datos con driver Mongoose

### P: ¿Qué versión de Node.js necesito?
**R:** Node.js v14 o superior. Descarga desde https://nodejs.org/

### P: ¿Puedo cambiar el puerto?
**R:** Sí. En `backend/.env` cambia:
```
PORT=5001  # o el que prefieras
```

### P: ¿Qué hacer si npm install falla?
**R:** Intenta:
```bash
npm cache clean --force
npm install
```

---

## Backend

### P: ¿Cómo agrego nuevas categorías?
**R:** 
1. Ve a `backend/models/Product.js`
2. Busca el enum de `categoria`
3. Agrega la nueva categoría:
```javascript
categoria: {
  type: String,
  enum: ['Cámaras', 'Lentes', 'Accesorios', 'Trípodes', 'NUEVA'],
  required: true,
}
```

### P: ¿Cómo cambio el JWT_SECRET?
**R:** En `backend/.env`:
```env
JWT_SECRET=tu_nueva_clave_super_segura_aqui
```

### P: ¿Puedo cambiar el impuesto (ITBIS)?
**R:** 
1. Backend: Edita `backend/routes/orders.js` línea ~60
2. Frontend: Edita `frontend/src/utils/constants.js`
```javascript
export const IMPUESTO = 0.16;  // 16% en lugar de 18%
```

### P: ¿Cómo agrego más métodos de pago?
**R:** 
1. `backend/models/Order.js` - actualiza enum
2. `frontend/src/pages/Checkout.jsx` - agrega opciones

### P: ¿Dónde se guardan las imágenes?
**R:** En `backend/uploads/` con nombres únicos. En producción, considera usar AWS S3 o Cloudinary.

### P: ¿Cómo cambio el horario de delivery?
**R:** En `backend/routes/orders.js`:
```javascript
const calcularTipoEntrega = () => {
  const ahora = new Date();
  const hora = ahora.getHours();

  if (hora < 14) {  // Cambia 14 (2 PM) a lo que desees
	return 'mismo_dia';
  } else {
	return 'siguiente_dia';
  }
};
```

---

## Frontend

### P: ¿Cómo cambio el número de WhatsApp?
**R:** En `frontend/src/components/WhatsAppButton.jsx` línea 8:
```javascript
const numeroWhatsApp = '18091234567'; // Tu número aquí
```

### P: ¿Cómo cambio los colores del tema?
**R:** En `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#1f2937',     // Gris oscuro
  secondary: '#111827',   // Negro
  accent: '#3b82f6',      // Azul
}
```

### P: ¿Cómo agrego más redes sociales?
**R:** En `frontend/src/components/Footer.jsx`:
```jsx
<a href="https://tu-link" className="...">📱 Ícono</a>
```

### P: ¿Cómo cambio el logo/nombre?
**R:** En `frontend/src/components/NavBar.jsx`:
```jsx
<Link to="/" className="...">
  <span>TU_LOGO_EMOJI</span>
  <span>Tu Nombre</span>
</Link>
```

### P: ¿Cómo personalizo el banner?
**R:** En `frontend/src/pages/Home.jsx`:
- Cambia el texto
- Cambia el emoji
- Modifica colores

### P: ¿Cómo desactivo el dark mode?
**R:** No es recomendable, pero puedes cambiar colores en Tailwind config.

---

## Base de Datos

### P: ¿Cómo agrego más productos manualmente?
**R:** 
1. Ve a `backend/scripts/seed.js`
2. Agrega más objetos al array `productosEjemplo`
3. Ejecuta `npm run seed`

O crea ruta POST en admin para agregar vía interfaz.

### P: ¿Cómo borro todos los datos?
**R:** Ejecuta `npm run seed` de nuevo (limpia y recrea datos)

### P: ¿Cómo backupeo mi base de datos?
**R:** 
- MongoDB local: usa `mongodump`
- MongoDB Atlas: usa el backup automático

### P: ¿Puedo usar otra base de datos?
**R:** Sí, pero necesitarías reemplazar Mongoose con otro ORM.

---

## APIs & Integración

### P: ¿Cómo llamo a los endpoints desde postman?
**R:** Ejemplo:
```
GET http://localhost:5000/api/products?categoria=Cámaras&precioMax=5000
```

### P: ¿Cómo paso el token en Postman?
**R:** 
1. Header → Authorization
2. Tipo: Bearer Token
3. Valor: Tu token JWT

### P: ¿Cómo agrego CORS para otro dominio?
**R:** En `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://tudominio.com'],
  credentials: true
}));
```

### P: ¿Cómo cambio el timeout de las peticiones?
**R:** En `frontend/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,  // en milisegundos
});
```

---

## Problemas Comunes

### P: "Cannot find module 'express'"
**R:** 
```bash
cd backend
npm install
```

### P: "MongoDB connection refused"
**R:** 
- Verifica que MongoDB esté corriendo
- Comprueba la URL en .env
- Si usas Atlas, verifica IP whitelist

### P: "Port 3000 already in use"
**R:** 
```bash
set PORT=3001 && npm start
```

### P: "CORS error"
**R:** 
- Verifica que backend esté en puerto correcto
- Comprueba FRONTEND_URL en backend/.env
- Comprueba REACT_APP_API_URL en frontend/.env

### P: "Images not showing"
**R:** 
- Las imágenes están en `backend/uploads/`
- Verifica que multer esté correctamente configurado
- En producción, usa servicio de almacenamiento

### P: "Carrito se borra al refrescar"
**R:** Debería guardarse en localStorage. Si no:
- Abre DevTools (F12)
- Ve a Storage → LocalStorage
- Verifica si 'cart' existe
- Revisa la consola para errores

### P: "No recibo notificaciones de email"
**R:** 
- Email no está implementado por defecto
- Necesitas agregar SMTP config en .env
- Usa Nodemailer para implementar

---

## Desarrollo

### P: ¿Cómo agrego un nuevo componente?
**R:** 
1. Crea archivo en `frontend/src/components/MiComponente.jsx`
2. Importa en donde lo necesites
3. Usa con `<MiComponente />`

### P: ¿Cómo agrego una nueva página?
**R:** 
1. Crea `frontend/src/pages/MiPagina.jsx`
2. Agrega ruta en `frontend/src/App.jsx`:
```jsx
<Route path="/mi-pagina" element={<MiPagina />} />
```
3. Agrega link en NavBar

### P: ¿Cómo debug la aplicación?
**R:** 
- Frontend: DevTools (F12) → Console
- Backend: Ve la consola del terminal
- Usa `console.log()` generosamente

### P: ¿Cómo agrego validación adicional?
**R:** 
- Frontend: usa `.required` en inputs
- Backend: agrega lógica en rutas antes de guardar

### P: ¿Cómo mejoro la performance?
**R:** 
- Agrupa consultas a BD
- Usa paginación
- Optimiza imágenes
- Implementa caching

---

## Producción

### P: ¿Cómo deployar el backend?
**R:** Opciones:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS

### P: ¿Cómo deployar el frontend?
**R:** Opciones:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### P: ¿Necesito cambiar .env para producción?
**R:** Sí. Crea `.env.production` con:
```env
MONGODB_URI=tu-url-atlas
JWT_SECRET=clave-super-segura-larga
NODE_ENV=production
FRONTEND_URL=https://tudominio.com
```

### P: ¿Cómo securizo las imágenes?
**R:** 
- Valida tipos de archivo
- Limita tamaño
- Usa servicio en la nube (AWS S3, Cloudinary)

### P: ¿Cómo hago backups automáticos?
**R:** 
- MongoDB Atlas hace backups automáticos
- Implementa script de backup

---

## Soporte & Ayuda

### P: ¿Dónde encuentro más documentación?
**R:** 
- `README.md` - Visión general
- `GUIA_EJECUCION.md` - Paso a paso
- `INICIO_RAPIDO.md` - 5 minutos
- `docs/API_DOCUMENTATION.md` - APIs
- `RESUMEN_PROYECTO.md` - Estadísticas

### P: ¿Cómo reporte un bug?
**R:** 
1. Describe qué pasó
2. Qué esperabas que pasara
3. Pasos para reproducir
4. Screenshots/logs

### P: ¿Puedo modificar el proyecto?
**R:** Sí, está bajo licencia MIT. Haz lo que quieras.

### P: ¿Cómo contribuyo?
**R:** 
1. Fork el repo
2. Crea rama feature
3. Haz cambios
4. Pull request

---

## Tips & Trucos

### 💡 Tip 1: Usa nodemon en desarrollo
```bash
npm run dev  # Auto-reinicia en cambios
```

### 💡 Tip 2: Limpia cache del navegador
- F12 → Application → Clear Storage

### 💡 Tip 3: Usa Postman/Insomnia para testear APIs
- Más fácil que curl
- Guarda requests

### 💡 Tip 4: Monitorea MongoDB con MongoDB Compass
- Descarga gratis
- Ve datos en tiempo real

### 💡 Tip 5: Usa git para versionado
```bash
git init
git add .
git commit -m "Initial commit"
```

---

## Contacto & Soporte

**Documentación:** Ver archivos .md en el proyecto
**Email:** support@pixelate.rd
**WhatsApp:** +1 (809) 123-4567

---

**¿No encontraste tu pregunta?** Revisa los archivos de documentación o contacta al equipo de soporte.

**Última actualización:** 2024
