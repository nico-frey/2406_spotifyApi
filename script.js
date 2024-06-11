const SPOTIFY_CLIENT_ID = "67b411e20d594f30bf7a8d3bbde54285";
const SPOTIFY_CLIENT_SECRET = "161fc5e3df004b95af3ba8c62f3eaf54";
const PLAYLIST_ID = "5PsJRJZ4Ia7bjiY8EbieLd?si=0cbf8571fb38462a";
const container = document.querySelector('div[data-js="tracks"]');

//Get playlist from Spotify

function fetchPlaylist(token, playlistId) {
  console.log("token: ", token);

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
      console.log(data);

      if (data.tracks && data.tracks.items) {
        data.tracks.items.forEach((item) => {
          console.log(item.track.name);
        });

        addTracksToPage(data.tracks.items);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Add tracks to HTML

function addTracksToPage(items) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  const ul = document.createElement("ul");

  // Looping through plalist

  items.forEach((item) => {
    console.log("track: ", item.track);
    const li = document.createElement("li");

    // Get coverImage from Track obj

    const coverImage =
      item.track.album.images.length > 0 ? item.track.album.images[0].url : "";

    // Get trackDuration from Track obj

    const durationMs = item.track.duration_ms;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    //console.log("track duration:", durationMs);

    // Add items to innerHTML

    li.innerHTML = `
    <p class="trackName">${item.track.name}</p>  
    <p class="artistName">${item.track.artists
      .map((artist) => artist.name)
      .join(", ")}</p>
    <p>${minutes}:${seconds < 10 ? "0" : ""}${seconds}</p>
    ${coverImage ? `<img src="${coverImage}" class="coverImage" >` : ""}
  `;

    ul.appendChild(li);
  });
  container.appendChild(ul);
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
      console.log(data);
      if (data.access_token) {
        fetchPlaylist(data.access_token, PLAYLIST_ID);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetchAccessToken();
