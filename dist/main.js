(() => {
  const e = document.querySelector('div[data-js="tracks"]'),
    t = document.querySelector('h1[data-js="playlistName"]'),
    a = document.querySelector('h2[data-js="playlistAuthor"]');
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials&client_id=67b411e20d594f30bf7a8d3bbde54285&client_secret=161fc5e3df004b95af3ba8c62f3eaf54",
  })
    .then((e) => {
      if (!e.ok) throw new Error(`HTTP error! status: ${e.status}`);
      return e.json();
    })
    .then((r) => {
      var o, n;
      console.log(r),
        r.access_token &&
          ((o = r.access_token),
          (n = "5PsJRJZ4Ia7bjiY8EbieLd?si=0cbf8571fb38462a"),
          console.log("token: ", o),
          fetch(`https://api.spotify.com/v1/playlists/${n}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${o}` },
          })
            .then((e) => {
              if (!e.ok) throw new Error(`HTTP error! status: ${e.status}`);
              return e.json();
            })
            .then((r) => {
              console.log(r),
                t && r.name && (t.textContent = r.name),
                a &&
                  r.owner &&
                  r.owner.display_name &&
                  (a.textContent = `${r.owner.display_name}`),
                r.tracks &&
                  r.tracks.items &&
                  (r.tracks.items.forEach((e) => {
                    console.log(e.track.name);
                  }),
                  (function (t) {
                    if (!e)
                      return void console.error("Container element not found");
                    const a = document.createElement("ul");
                    t.forEach((e) => {
                      console.log("track: ", e.track);
                      const t = document.createElement("li"),
                        r =
                          e.track.album.images.length > 0
                            ? e.track.album.images[0].url
                            : "",
                        o = e.track.duration_ms,
                        n = Math.floor(o / 6e4),
                        c = ((o % 6e4) / 1e3).toFixed(0),
                        s = e.track.album.name;
                      (t.innerHTML = `\n        ${
                        r ? `<img src="${r}" class="coverImage" >` : ""
                      }\n    <div class="trackInfo"> <p class="trackName">${
                        e.track.name
                      }</p>  \n    <p class="artistName">${e.track.artists
                        .map((e) => e.name)
                        .join(
                          ", "
                        )}</p> </div>\n    <p class="trackDuration">${n}:${
                        c < 10 ? "0" : ""
                      }${c}</p>\n    <p class="albumName">${s}</p>\n  `),
                        a.appendChild(t);
                    }),
                      e.appendChild(a);
                  })(r.tracks.items));
            })
            .catch((e) => {
              console.error("Error:", e);
            }));
    })
    .catch((e) => {
      console.error("Error:", e);
    });
})();
