# ⚡ INICIO RÁPIDO - 5 MINUTOS

## 🚀 Para empezar AHORA mismo:

### 1️⃣ Abre 2 PowerShell/CMD en: `C:\Users\jeanc\Desktop\PIXELATE WEBSITE\pixelate-store-rd`

### 2️⃣ Terminal 1 - Backend:
```powershell
cd backend
npm install
npm run dev
```

Espera a ver:
```
✅ Conectado a MongoDB exitosamente
🎥 Pixelate Store RD - Backend
Servidor ejecutándose en: http://localhost:5000
```

### 3️⃣ Terminal 2 - Frontend:
```powershell
cd frontend
npm install
npm start
```

Se abrirá automáticamente en: **http://localhost:3000**

---

## 🎮 ¡YA FUNCIONA! Prueba esto:

### 👤 Para Admin (si ejecutaste seed):
1. Click en Login (arriba a la derecha)
2. Selecciona "Administrador"
3. **Email:** admin@pixelate.rd
4. **Pass:** Admin123456
5. ✨ ¡Ya estás dentro!

### 🛒 Para Cliente:
1. Ve al catálogo
2. Filtra por categoría (Cámaras, Lentes, etc)
3. Agrega productos al carrito
4. Checkout → Confirma pedido
5. ¡Listo! Verás que se calcula automáticamente el delivery

---

## 📝 PRIMERO: Agregar datos de ejemplo

Si quieres productos en la base de datos:

```powershell
# Terminal 3 (mantén las otras 2 ejecutándose)
cd backend
npm run seed
```

Verás:
```
🌱 Iniciando seed de datos...
✅ 10 productos insertados
✅ Usuario admin creado
```

---

## ❓ ¿Qué hacer si no funciona?

**Error: "Cannot find module"**
```powershell
cd backend
npm install
```

**MongoDB no conecta:**
- Verifica que MongoDB esté ejecutándose (si es local)
- O comprueba tu conexión a MongoDB Atlas

**Frontend no ve Backend:**
- Verifica que backend esté en http://localhost:5000
- Abre DevTools (F12) y mira la consola para errores

---

## 🔧 Configuración Importante

### Backend `.env` debe tener:
```env
MONGODB_URI=mongodb://localhost:27017/pixelate-store-rd
JWT_SECRET=pixelate_store_rd_secret_key_2024_super_segura
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env` debe tener:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📚 Documentación Completa

- **GUIA_EJECUCION.md** - Guía detallada paso a paso
- **README.md** - Información del proyecto
- **RESUMEN_PROYECTO.md** - Estadísticas y features
- **docs/API_DOCUMENTATION.md** - Todos los endpoints

---

## 🎯 URLs Importantes

| URL | Descripción |
|-----|------------|
| http://localhost:3000 | 🏠 Frontend |
| http://localhost:5000 | ⚙️ Backend API |
| http://localhost:5000/api/health | 💊 Verificar salud |
| http://localhost:3000/admin | 👨‍💼 Panel Admin |
| http://localhost:3000/productos | 📦 Catálogo |

---

## ✅ Checklist Rápido

- [ ] MongoDB corriendo (local o Atlas)
- [ ] Instalar backend: `cd backend && npm install`
- [ ] Instalar frontend: `cd frontend && npm install`
- [ ] Configurar .env files
- [ ] Ejecutar seed: `npm run seed` (opcional)
- [ ] Iniciar backend: `npm run dev`
- [ ] Iniciar frontend: `npm start`
- [ ] Abrir http://localhost:3000

---

## 🎉 ¡LISTO!

**Tu tienda online está funcionando ahora mismo** 🎊

Visita: http://localhost:3000

Cualquier duda, revisa la documentación completa en los archivos .md

**¡A disfrutar de Pixelate Store RD!** 🎥
