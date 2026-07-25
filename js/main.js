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