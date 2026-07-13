# 🚀 Guía de Deploy en Render

## Paso 1: Preparar GitHub

1. Abre tu repositorio en GitHub (o crea uno nuevo)
2. Asegúrate de tener todo commiteado:
```bash
git add .
git commit -m "Preparar para deploy en Render"
git push origin main
```

## Paso 2: Deploy del Backend en Render

1. Entra a [render.com](https://render.com)
2. Haz login con tu cuenta de GitHub
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name:** pixelate-backend
   - **Environment:** Node
   - **Build Command:** `cd pixelate-store-rd/backend && npm install`
   - **Start Command:** `cd pixelate-store-rd/backend && npm start`
   - **Plan:** Free

6. Añade las variables de entorno en Render:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = (copia tu valor actual de .env)
   - `JWT_SECRET` = (copia tu valor actual de .env)
   - `JWT_EXPIRE` = `7d`
   - `FRONTEND_URL` = (dejalo vacío por ahora)

7. Click en "Create Web Service"
8. Espera a que termine el deploy (2-5 minutos)
9. **Copia la URL del backend** (ej: https://pixelate-backend.onrender.com)

## Paso 3: Actualizar Frontend con URL del Backend

1. En tu máquina local, actualiza el .env del frontend:
```
REACT_APP_API_URL=https://pixelate-backend.onrender.com/api
```

2. Commit y push:
```bash
git add pixelate-store-rd/frontend/.env
git commit -m "Actualizar API URL para producción"
git push origin main
```

## Paso 4: Deploy del Frontend en Render

1. En Render, click "New +" → "Static Site"
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name:** pixelate-frontend
   - **Build Command:** `cd pixelate-store-rd/frontend && npm install && npm run build`
   - **Publish Directory:** `pixelate-store-rd/frontend/build`

4. Click en "Create Static Site"
5. Espera a que termine el deploy
6. **Copia la URL del frontend** (ej: https://pixelate-frontend.onrender.com)

## Paso 5: Actualizar Backend con URL del Frontend

1. En Render, abre el Web Service del backend
2. Ve a "Environment"
3. Actualiza `FRONTEND_URL` con la URL del frontend
4. Guarda y espera a que redeploy

## ✅ Verificar que funciona

1. Abre tu sitio en: https://pixelate-frontend.onrender.com
2. Prueba:
   - Login: admin@pixelate.rd / Admin123456
   - Crear un producto
   - Subir imagen
   - Ver tienda pública

## 🆘 Si hay problemas

### Error en login o productos no cargan:
- Verifica que FRONTEND_URL en el backend sea la URL de Render del frontend
- Verifica que REACT_APP_API_URL en el frontend sea la URL de Render del backend

### Imágenes no cargan:
- Las imágenes se guardan temporalmente en Render
- Para persistencia permanente, considera: AWS S3, Cloudinary, o Supabase

### Plan gratuito de Render:
- Los servicios gratuitos se duermen después de 15 minutos de inactividad
- El primer request tardará ~30 segundos
- Consideta upgradear a pago para mejor performance ($7/mes)

## 📝 URLs Finales

- **Frontend:** https://pixelate-frontend.onrender.com
- **Backend API:** https://pixelate-backend.onrender.com/api
- **Render Dashboard:** https://dashboard.render.com

---

¡Listo! Tu aplicación está en producción 🎉
