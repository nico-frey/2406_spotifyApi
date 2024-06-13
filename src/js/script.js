import {
  gsapAnimations,
  playTrackAnimation,
  unplayTrackAnimation,
} from "./animations.js";

const SPOTIFY_CLIENT_ID = "67b411e20d594f30bf7a8d3bbde54285";
const SPOTIFY_CLIENT_SECRET = "161fc5e3df004b95af3ba8c62f3eaf54";
const PLAYLIST_ID = "5PsJRJZ4Ia7bjiY8EbieLd?si=0cbf8571fb38462a";
const container = document.querySelector('div[data-js="tracks"]');
const playlistTitle = document.querySelector('h1[data-js="playlistName"]');
const playlistAuthor = document.querySelector('h2[data-js="playlistAuthor"]');

let currentAudio = null;
let currentTrack = null;
let currentLi = null;

function fetchPlaylist(token, playlistId) {
  fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (playlistTitle && data.name) {
        playlistTitle.textContent = data.name;
      }
      if (playlistAuthor && data.owner && data.owner.display_name) {
        playlistAuthor.textContent = `@${data.owner.display_name}`;
      }
      if (data.tracks && data.tracks.items) {
        addTracksToPage(data.tracks.items);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addTracksToPage(items) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  const ul = document.createElement("ul");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("track");

    const coverImage =
      item.track.album.images.length > 0 ? item.track.album.images[0].url : "";
    const durationMs = item.track.duration_ms;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    const albumName = item.track.album.name;
    const previewUrl = item.track.preview_url;

    li.innerHTML = `
      ${coverImage ? `<img src="${coverImage}" class="coverImage" >` : ""}
      <div class="trackInfo">
        <p class="trackName">${item.track.name}</p>
        <p class="artistName">${item.track.artists
          .map((artist) => artist.name)
          .join(", ")}</p>
      </div>
      <p class="trackDuration">${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}</p>
      <p class="albumName">${albumName}</p>
    `;

    li.addEventListener("click", () => {
      if (currentTrack === previewUrl) {
        if (currentAudio.paused) {
          playTrackAnimation("li");
          currentAudio.play();
        } else {
          currentAudio.pause();
          unplayTrackAnimation("li");
        }
      } else {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          if (currentLi) {
            unplayTrackAnimation("li");
          }
        }
        if (previewUrl) {
          currentAudio = new Audio(previewUrl);
          currentAudio.play();
          currentTrack = previewUrl;
          currentLi = li;
          playTrackAnimation("li");
        }
      }
    });

    ul.appendChild(li);
  });

  container.appendChild(ul);
  requestAnimationFrame(() => {
    gsapAnimations();
  });
}

function fetchAccessToken() {
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.access_token) {
        fetchPlaylist(data.access_token, PLAYLIST_ID);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetchAccessToken();
