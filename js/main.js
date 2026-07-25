async function loadGallery() {

    const response = await fetch("data.json");
    const data = await response.json();

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        if (item.type === "video") {

            card.innerHTML = `
                <img src="${item.thumbnail}">
                <div class="play-button">▶</div>
            `;

            card.onclick = () => {
                window.location =
                `media.html?id=${item.id}`;
            };

        } else {

            card.innerHTML = `
                <img src="${item.thumbnail}">
                <div class="play-button">▶</div>
            `;

            card.onclick = () => {
                window.location = item.link;
            };

        }

        gallery.appendChild(card);

    });

}

loadGallery();

async function loadMedia() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) return;

    const response = await fetch("data.json");
    const data = await response.json();

    const item = data.find(x => x.id === id);

    if (!item) {

        document.body.innerHTML = "<h1>Video not found.</h1>";

        return;

    }

    document.getElementById("pageName").textContent = "Video " + id;

    document.getElementById("videoPlayer").src = item.video;

    document.getElementById("watchMore").href = item.watch;

}

loadMedia();