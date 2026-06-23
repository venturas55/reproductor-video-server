import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const VIDEO_DIR = process.env.VIDEO_DIR || "D:/Videos2";

app.use(cors());

// 🔥 static correcto (IMPORTANTE)
app.use(express.static(path.join(__dirname, "public")));
app.use("/media", express.static(VIDEO_DIR));

// Handlebars
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ----------------------------
// Obtener videos por carpetas
// ----------------------------
function getVideos() {
  const allowed = [".mp4", ".webm", ".mkv", ".mov"];

  const playlists = [];

  function scan(dir, playlist = "General") {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    const videos = [];

    for (const file of files) {
      const full = path.join(dir, file.name);

      if (file.isDirectory()) {
        scan(full, file.name);
      } else {
        if (allowed.includes(path.extname(file.name).toLowerCase())) {
          videos.push(
            path
              .relative(VIDEO_DIR, full)
              .replaceAll("\\", "/")
          );
        }
      }
    }

    if (videos.length) {
      playlists.push({
        playlist,
        videos
      });
    }
  }

  scan(VIDEO_DIR);

  return playlists;
}

// ----------------------------
// Rutas
// ----------------------------
app.get("/", (req, res) => {
  const videos = getVideos();

  res.render("index", {
    videos
  });
});

app.get("/api/videos", (req, res) => {
  res.json(getVideos());
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});