# 📋 CHECKLIST COMPLETO - Deploy Pixelate Store RD en Render

## ✅ Lo que ya está hecho

### 1. Configuración de Git
- [x] `.gitignore` en raíz
- [x] `.gitignore` en backend
- [x] `.gitignore` en frontend
- [x] `.env` está protegido (no se sube a GitHub)

### 2. Configuración del Backend
- [x] `server.js` actualizado con CORS dinámico
- [x] Puerto configurado para ser dinámico (Render lo asigna)
- [x] `.env` con todas las variables necesarias
- [x] `NODE_ENV` configurado para diferenciar desarrollo/producción
- [x] Headers CORS en `/uploads` para servir imágenes

### 3. Configuración del Frontend
- [x] `package.json` con scripts de build
- [x] `.env` con API_URL configurada
- [x] `.gitignore` creado

### 4. Archivos de Deploy
- [x] `build.sh` - Script de build para Render
- [x] `render.yaml` - Configuración automática de deploy
- [x] `DEPLOY_RENDER.md` - Instrucciones paso a paso

## 📌 Próximos pasos (Manual)

### PASO A: Preparar GitHub
1. Si aún no tienes tu repo en GitHub:
   - Crea una cuenta en github.com
   - Crea un nuevo repositorio
   - Clone tu código

2. Sube todo a GitHub:
```bash
git add .
git commit -m "Preparar para deploy en Render"
git push origin main
```

### PASO B: Deploy en Render
Sigue las instrucciones en `DEPLOY_RENDER.md`

1. Crea cuenta en Render.com
2. Conecta tu GitHub
3. Deploy Backend primero
4. Copia URL del backend
5. Actualiza frontend .env
6. Deploy Frontend
7. Actualiza backend con URL del frontend

---

## 🔐 Variables de Entorno Críticas

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=pixelate_store_rd_secret_key_2024_super_segura
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=[sera asignada despues]
```

### Frontend (.env)
```
REACT_APP_API_URL=[sera la URL de Render del backend]
```

---

## 🚨 Problemas Comunes y Soluciones

### "Cannot find module" en Render
- Asegúrate de que `npm install` está en el buildCommand
- Verifica que `package-lock.json` existe

### Imágenes no cargan
- Render usa almacenamiento efímero
- Las imágenes se pierden en cada redeploy
- Solución: Usar AWS S3 o Cloudinary

### Error de CORS
- Verifica que `FRONTEND_URL` en backend sea correcto
- Verifica que `REACT_APP_API_URL` en frontend sea correcto

### El servidor se duerme
- Plan gratuito de Render se duerme después de 15 min de inactividad
- Considera pagar $7/mes para evitar esto

---

## 📊 Estructura Final en Render

```
Frontend (Static Site)
https://pixelate-frontend.onrender.com
├── /
├── /admin
├── /cart
└── /producto/[id]

Backend (Web Service)
https://pixelate-backend.onrender.com
├── /api/products
├── /api/orders
├── /api/auth
├── /api/admin
└── /uploads/*
```

---

## ✨ Beneficios de esta configuración

✅ **No hay puertos locales** - Todo funciona con URLs públicas
✅ **HTTPS automático** - Render genera certificados gratis
✅ **Escalable** - Puedes pasar a plan pago cuando quieras
✅ **Fácil de actualizar** - Solo haz push a GitHub y redeploy
✅ **MongoDB Atlas gratis** - Ya tienes la BD en la nube
✅ **Código limpio** - .env no se sube a GitHub

---

## 📝 Cronograma Estimado

- Preparar GitHub: 5 minutos
- Deploy Backend: 5 minutos (+ 2-5 de compilación)
- Deploy Frontend: 5 minutos (+ 2-5 de compilación)
- **Total: ~20-30 minutos**

---

## 🆘 Contacto y Ayuda

Si algo no funciona:
1. Revisa los logs en Render Dashboard
2. Verifica las variables de entorno
3. Comprueba que GitHub tiene el código actualizado
4. Intenta hacer "re-deploy" en Render

---

**Generado:** 2024
**Última actualización:** Durante sesión actual
