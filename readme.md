# 🎬 Video Server (Node.js + Express + Handlebars)

Servidor web sencillo tipo “YouTube local” que permite visualizar vídeos almacenados en una carpeta externa (por ejemplo, sincronizada por FTP), organizados automáticamente en listas de reproducción por carpetas.

---

## 🚀 Características

- 📁 Detección automática de carpetas = playlists
- 🎥 Reproductor de vídeo integrado
- ▶ Navegación tipo sidebar
- 📂 Soporte para subcarpetas
- 🔄 API REST (`/api/videos`)
- 🌐 Streaming directo desde carpeta externa
- 🎨 Interfaz estilo YouTube oscuro
- 📱 Diseño responsive básico

---

## 📦 Tecnologías

- Node.js
- Express
- Handlebars (HBS)
- HTML5 Video Player
- JavaScript vanilla
- CSS3

---

## 📁 Estructura del proyecto


reproductor-video-server/
│
├── public/
│ ├── js/
│ │ └── player.js
│ └── css/
│ └── styles.css
│
├── views/
│ ├── layout.hbs
│ └── index.hbs
│
├── server.js
├── .env
└── package.json


---

## ⚙️ Configuración

### 1. Instalar dependencias

```bash
npm install
2. Crear archivo .env
VIDEO_DIR=D:/Videos2
PORT=3000

👉 VIDEO_DIR puede ser una carpeta externa sincronizada por FTP.

3. Ejecutar servidor
node server.js

o con nodemon:

npx nodemon server.js
🌐 Uso

Abrir en navegador:

http://localhost:3000
📡 API
Obtener playlists y vídeos
GET /api/videos
Respuesta ejemplo
[
  {
    "playlist": "Peliculas",
    "videos": [
      "Peliculas/matrix.mp4",
      "Peliculas/avatar.mp4"
    ]
  },
  {
    "playlist": "Cursos",
    "videos": [
      "Cursos/node1.mp4",
      "Cursos/node2.mp4"
    ]
  }
]
🎮 Funcionalidades del reproductor
Click en playlist → despliega vídeos
Click en vídeo → reproduce automáticamente
Cambio dinámico sin recargar página
Título del vídeo overlay temporal
Autoplay del primer vídeo de cada playlist
📂 Formatos soportados
.mp4
.webm
.mkv
.mov
🧠 Cómo funciona
El servidor escanea la carpeta VIDEO_DIR
Agrupa vídeos por carpetas (playlists)
Expone los datos vía API /api/videos
El frontend (player.js) renderiza la UI dinámicamente
El reproductor HTML5 reproduce los archivos vía /media
📌 Notas importantes
La carpeta VIDEO_DIR debe ser accesible desde el servidor
No se requiere base de datos
Los vídeos no se copian, se sirven directamente desde disco
Ideal para servidores VPS o NAS casero
🚀 Ideas de mejora
⏭ autoplay siguiente vídeo
🔍 buscador de vídeos
🖼 thumbnails automáticos (ffmpeg)
📊 progreso de reproducción guardado
🔐 sistema de usuarios
📱 app móvil tipo PWA
🎬 modo “Netflix grid”
🧑‍💻 Autor

Proyecto personal para reproducción de vídeos locales estilo streaming.

📜 Licencia

Libre uso educativo / personal