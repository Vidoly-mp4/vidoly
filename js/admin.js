async function loadAdmin(){

    const response = await fetch("data.json");
    const data = await response.json();

    const videos = data.filter(x => x.type === "video").length;
    const images = data.filter(x => x.type === "image").length;

    document.getElementById("videoCount").textContent = videos;
    document.getElementById("imageCount").textContent = images;
    document.getElementById("totalCount").textContent = data.length;

    const list = document.getElementById("contentList");

    list.innerHTML = "";

    data.forEach(item => {

        list.innerHTML += `
        <div class="content-item">

            <img src="${item.thumbnail}">

            <strong>${item.type.toUpperCase()}</strong>

            <div class="content-buttons">

                <button>Edit</button>

                <button>Delete</button>

            </div>

        </div>
        `;

    });

}

loadAdmin();