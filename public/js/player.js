let playlists = [];
let currentPlaylist = [];
let index = 0;
let expanded = {};

async function loadVideos() {
  const res = await fetch("/api/videos");
  playlists = await res.json();

  render();

  if (playlists.length) {
    selectPlaylist(0);
  }
}

function selectPlaylist(i) {
  currentPlaylist = playlists[i].videos;
  expanded[i] = true;
  render();
  play(0);
}

function toggle(i) {
  expanded[i] = !expanded[i];
  render();
}

function play(i) {
  index = i;

  const video = document.getElementById("video");
  const file = currentPlaylist[i];

  video.src = "/media/" + file;
  video.load();
  video.play();

  showTitle(file.split("/").pop());
}

function playFrom(pIndex, i) {
  currentPlaylist = playlists[pIndex].videos;
  play(i);
}

function render() {
  const list = document.getElementById("list");

  list.innerHTML = playlists.map((p, i) => {
    const open = expanded[i];

    return `
      <div class="playlist">

        <h3 onclick="toggle(${i})" style="cursor:pointer">
          ${open ? "▼" : "▶"} ${p.playlist}
        </h3>

        ${open ? p.videos.map((v, j) => `
          <div onclick="playFrom(${i}, ${j})">
            ▶ ${v.split("/").pop()}
          </div>
        `).join("") : ""}

      </div>
    `;
  }).join("");
}

function showTitle(name) {
  const title = document.getElementById("videoTitle");
  title.textContent = name;

  title.style.opacity = 1;

  clearTimeout(window.t);

  window.t = setTimeout(() => {
    title.style.opacity = 0;
  }, 2000);
}

loadVideos();