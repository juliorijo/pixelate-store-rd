# 🔄 Instrucciones Post-Reinicio - Pixelate Store RD

## IMPORTANTE: Lee esto DESPUÉS de reiniciar tu máquina

Tu máquina tiene procesos de Node pegados que no pueden ser terminados normalmente. Necesitas **reiniciar tu máquina** para limpiar completamente.

---

## ✅ Después de Reiniciar:

### 1️⃣ Abre la PRIMERA Terminal (Backend)

```powershell
cd "C:\Users\jeanc\Desktop\PIXELATE WEBSITE\pixelate-store-rd\backend"
npm run dev
```

**Deberías ver:**
```
✅ Backend funcionando correctamente en puerto 4000
```

### 2️⃣ Abre la SEGUNDA Terminal (Frontend)

```powershell
cd "C:\Users\jeanc\Desktop\PIXELATE WEBSITE\pixelate-store-rd\frontend"
$env:PORT=3001; npm start
```

**O en CMD (si usas cmd.exe):**
```cmd
cd "C:\Users\jeanc\Desktop\PIXELATE WEBSITE\pixelate-store-rd\frontend"
set PORT=3001 && npm start
```

**Deberías ver:**
```
✅ Frontend corriendo en http://localhost:3001
```

### 3️⃣ Accede a la Aplicación

- **Tienda:** http://localhost:3001
- **Admin:** http://localhost:3001/admin
- **Login Admin:** 
  - Email: `admin@pixelate.rd`
  - Contraseña: `Admin123456`

---

## 🔧 Configuración Actual (POST-CAMBIOS)

### Backend (.env)
```
PORT=4000
MONGODB_URI=mongodb+srv://...
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:4000/api
```

---

## 🆘 Si sigue sin funcionar después del reinicio:

1. Abre Task Manager (Ctrl + Shift + Esc)
2. Busca todos los procesos "node.exe"
3. Termina cada uno manualmente
4. Intenta nuevamente

---

## 📋 Cambios Realizados Hoy:

✅ Agregados `id` a todos los inputs en AdminProductos.jsx
✅ Asociados labels correctamente con `htmlFor`
✅ Arreglados problemas de accesibilidad
✅ Configurado CORS para imágenes (`/uploads`)
✅ Mejorada validación de imágenes en producto creation
✅ Cambio de puerto backend: 5002 → 4000
✅ Actualizado frontend API URL a `http://localhost:4000/api`

---

## ✨ Lo que debería funcionar ahora:

- ✅ Crear productos sin que rechace la imagen
- ✅ Cargar imágenes sin bloqueos CORS
- ✅ Formulario accesible
- ✅ Admin en http://localhost:3001/admin
- ✅ Tienda pública funcionando

¡Buena suerte! 🚀
