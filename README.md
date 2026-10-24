# Bitácora PG

App personal instalable (PWA): entreno según objetivo, nutrición y recetas, salud, diario con fotos y notas de voz, finanzas e inversión, decisiones, meditación y temas visuales. **Acceso privado:** solo entran los administradores y los correos autorizados; cada persona tiene su propio espacio.

- **Página de descarga:** https://pgarciaaruvic.github.io/bitacora/
- **App:** https://pgarciaaruvic.github.io/bitacora/app/

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | Página pública de descarga (funciones, QR, instalación, privacidad, preguntas) |
| `app/index.html` | La aplicación |
| `app/firebase-config.js` | Configuración de Firebase (rellenar una vez) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Lo que la hace instalable y le permite abrir sin conexión |
| `firestore.rules` | Reglas de seguridad: cada usuario solo accede a lo suyo |

## Puesta en marcha (una sola vez, unos 10 minutos)

### 1. Crear el proyecto de Firebase (gratis, plan Spark)
1. Entra en https://console.firebase.google.com con tu cuenta de Google → **Añadir proyecto** → nombre `bitacora-pg` → puedes desactivar Google Analytics → Crear.

### 2. Activar el inicio de sesión
1. **Compilación → Authentication → Comenzar**.
2. Pestaña **Método de inicio de sesión**: activa **Correo electrónico/contraseña** y **Google** (elige tu correo de asistencia) → Guardar.
3. Pestaña **Configuración → Dominios autorizados → Añadir dominio** → `pgarciaaruvic.github.io`.

### 3. Crear la base de datos
1. **Compilación → Firestore Database → Crear base de datos** → ubicación en Europa (`eur3` o `europe-southwest1`, Madrid) → **modo de producción**.
2. Pestaña **Reglas**: borra lo que haya, pega el contenido de `firestore.rules` → **Publicar**.

### 4. Conectar la app
1. Engranaje → **Configuración del proyecto** → apartado **Tus apps** → icono web `</>` → apodo `Bitácora web` → Registrar (no hace falta Firebase Hosting).
2. Copia el objeto `firebaseConfig` que aparece y sustituye los valores de `app/firebase-config.js`. Estos valores no son secretos: la seguridad la dan las reglas del paso 3.

### 5. Publicar en GitHub Pages
1. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
2. En 1–2 minutos estará en https://pgarciaaruvic.github.io/bitacora/

## Acceso privado
- Administradores fijos (en `firestore.rules` y en la app): `pgarcia@arumani.es`, `pablogarciaalvaro.im@gmail.com`.
- Para invitar a alguien: en la app, **Perfil → Gestionar acceso → Añadir** su correo. Para quitarle el acceso, «Quitar».
- La persona entra con ese correo: con Google, o con contraseña (tendrá que verificar el correo).
- Lo impone la base de datos (reglas de Firestore), no solo la app: una cuenta no autorizada no puede leer ni escribir nada.
- Las páginas están marcadas para que los buscadores no las indexen (`noindex`, `robots.txt`).
- Cambiar los administradores: edita la lista en `firestore.rules` (publícala en Firebase → Firestore → Reglas) y en `ADMINS` del script de la app.

## Límites del plan gratuito de Firebase (Spark)
Firestore incluye cada día 50.000 lecturas, 20.000 escrituras y 20.000 borrados, y 1 GiB de datos guardados: suficiente para decenas de usuarios. Las fotos del diario se guardan comprimidas (≤ 220 KB) y las notas de voz hasta 8 MB, y cuentan dentro de ese GiB. Si algún día se superan los límites, Firebase deja de aceptar operaciones hasta el día siguiente; no cobra nada salvo que cambies a un plan de pago.

## Sin conexión
La app abre sin internet (service worker) y Firestore guarda los cambios en el dispositivo y los sincroniza al volver.

## Actualizar la app
Al cambiar archivos, sube el número de `CACHE` en `sw.js` (`bitacora-v1` → `bitacora-v2`) para que los móviles descarguen la versión nueva.

## Diferencias con la versión dentro de Claude
Esta versión no incluye funciones de IA (lectura de tickets y fotos de platos, recetas generadas, briefing, asistente, reflexiones del diario y temas descritos con texto), porque no requieren cuenta de Claude pero sí un servicio de pago. Todo lo demás funciona igual.

La información de salud, nutrición, entrenamiento e inversión es orientación general y no sustituye a un profesional.
