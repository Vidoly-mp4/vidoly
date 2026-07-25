// =====================================================
// Admin.js v2 - Part 1
// Foundation & Dashboard
// =====================================================

// -----------------------------
// Application State
// -----------------------------

// ====================================
// Login Credentials
// ====================================

const ADMIN_USERNAME = "PutriAlya666";
const ADMIN_PASSWORD = "#AlyaAli666*";

let data = [];

let editingId = null;
let deleteId = null;

// Stores uploaded thumbnail files in memory
// Key = thumbnail filename
// Value = File object

const thumbnailFiles = new Map();

// -----------------------------
// Dialog References
// -----------------------------

const videoDialog = document.getElementById("videoDialog");
const imageDialog = document.getElementById("imageDialog");
const deleteDialog = document.getElementById("deleteDialog");

const contentList = document.getElementById("contentList");

// -----------------------------
// Utility Functions
// -----------------------------

function generateThumbnailName(file){

    const extension =
        file.name.split(".").pop().toLowerCase();

    const now = new Date();

    const timestamp =
        now.getFullYear() +
        String(now.getMonth()+1).padStart(2,"0") +
        String(now.getDate()).padStart(2,"0") +
        String(now.getHours()).padStart(2,"0") +
        String(now.getMinutes()).padStart(2,"0") +
        String(now.getSeconds()).padStart(2,"0") +
        String(now.getMilliseconds()).padStart(3,"0");

    return `thumbnails/${timestamp}.${extension}`;

}


function getNextId(){

    if(data.length===0) return 1;

    return Math.max(...data.map(x=>x.id))+1;

}


function getItem(id){

    return data.find(x=>x.id===id);

}


// -----------------------------
// Thumbnail Preview
// -----------------------------

function previewImage(file, previewId){

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        document
        .getElementById(previewId)
        .src = e.target.result;

    };

    reader.readAsDataURL(file);

}

// -----------------------------
// Get Thumbnail Source
// -----------------------------

function getThumbnailSrc(item){

    // Newly added item
    if(item.thumbnailFile){

        return URL.createObjectURL(item.thumbnailFile);

    }

    // Loaded from data.json
    return item.thumbnail;

}


// -----------------------------
// Reset Preview Images
// -----------------------------

function resetPreviewImages(){

    document.getElementById("videoPreview").src =
        "https://placehold.co/400x225?text=No+Image";

    document.getElementById("imagePreview").src =
        "https://placehold.co/400x225?text=No+Image";

}


// -----------------------------
// Dashboard
// -----------------------------

function refreshDashboard(){

    data.sort((a,b)=>b.id-a.id);

    updateStatistics();

    renderContentList();

}


// -----------------------------
// Statistics
// -----------------------------

function updateStatistics(){

    const videos =
        data.filter(x=>x.type==="video").length;

    const images =
        data.filter(x=>x.type==="image").length;

    document.getElementById("videoCount").textContent =
        videos;

    document.getElementById("imageCount").textContent =
        images;

    document.getElementById("totalCount").textContent =
        data.length;

}


// -----------------------------
// Render Content
// -----------------------------

function renderContentList(){

    contentList.innerHTML="";

    data.forEach(item=>{

        const row=document.createElement("div");

        row.className="content-item";

        row.innerHTML=`

           <img
                src="${getThumbnailSrc(item)}"
                alt="Thumbnail">

            <strong>${item.type.toUpperCase()}</strong>

            <div class="content-buttons">

                <button onclick="editItem(${item.id})">
                    Edit
                </button>

                <button onclick="deleteItem(${item.id})">
                    Delete
                </button>

            </div>

        `;

        contentList.appendChild(row);

    });

}


// -----------------------------
// Load data.json
// -----------------------------

async function loadData(){

    try{

        const response =
            await fetch("data.json");

        data =
            await response.json();

        refreshDashboard();

    }

    catch(err){

        console.error(err);

        alert("Unable to load data.json");

    }

}


// -----------------------------
// Open Add Video
// -----------------------------

function openVideoDialog(){

    editingId=null;

    document.getElementById("videoDialogTitle").textContent =
        "Add Video";

    document.getElementById("videoLink").value="";

    document.getElementById("watchMoreLink").value="";

    document.getElementById("videoThumbnail").value="";

    resetPreviewImages();

    videoDialog.showModal();

}


// -----------------------------
// Open Add Image
// -----------------------------

function openImageDialog(){

    editingId=null;

    document.getElementById("imageDialogTitle").textContent =
        "Add Image";

    document.getElementById("imageLink").value="";

    document.getElementById("imageThumbnail").value="";

    resetPreviewImages();

    imageDialog.showModal();

}


// -----------------------------
// Delete Dialog
// -----------------------------

function deleteItem(id){

    deleteId=id;

    deleteDialog.showModal();

}


// -----------------------------
// Placeholder
// -----------------------------

function editItem(id){

    // Part 2

}

// -----------------------------
// Create Export Data
// -----------------------------

function buildExportData(){

    return data.map(item=>{

        const copy={...item};

        delete copy.thumbnailFile;

        return copy;

    });

}


// -----------------------------
// Buttons
// -----------------------------

document
.getElementById("addVideoBtn")
.onclick=openVideoDialog;

document
.getElementById("addImageBtn")
.onclick=openImageDialog;


// -----------------------------
// Live Preview
// -----------------------------

document
.getElementById("videoThumbnail")
.addEventListener("change",function(){

    if(this.files.length===0) return;

    previewImage(
        this.files[0],
        "videoPreview"
    );

});


document
.getElementById("imageThumbnail")
.addEventListener("change",function(){

    if(this.files.length===0) return;

    previewImage(
        this.files[0],
        "imagePreview"
    );

});


// -----------------------------
// Prevent Form Submit
// -----------------------------

document
.getElementById("videoForm")
.onsubmit=e=>e.preventDefault();

document
.getElementById("imageForm")
.onsubmit=e=>e.preventDefault();


// -----------------------------
// ESC closes dialogs
// -----------------------------

document.addEventListener("keydown",e=>{

    if(e.key!=="Escape") return;

    if(videoDialog.open) videoDialog.close();

    if(imageDialog.open) imageDialog.close();

    if(deleteDialog.open) deleteDialog.close();

});


// -----------------------------
// Initialize
// -----------------------------

// ====================================
// Login
// ====================================

document.getElementById("loginBtn").onclick = function () {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("adminPanel").style.display = "block";

        loadData();

    }

    else {

        document.getElementById("loginError").textContent =
            "Invalid username or password.";

    }

};


// Press Enter to Login

document.getElementById("password")
.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        document.getElementById("loginBtn").click();

    }

});

resetPreviewImages();

// =====================================================
// Admin.js v2 - Part 2
// Add / Edit Videos & Images
// =====================================================


// ---------------------------------
// Save Video
// ---------------------------------

document.getElementById("saveVideo").onclick = function () {

    const video =
        document.getElementById("videoLink").value.trim();

    const watch =
        document.getElementById("watchMoreLink").value.trim();

    const fileInput =
        document.getElementById("videoThumbnail");

    if (video === "" || watch === "") {

        alert("Please complete every field.");

        return;

    }

    // -------------------------
    // ADD NEW VIDEO
    // -------------------------

    if (editingId === null) {

        if (fileInput.files.length === 0) {

            alert("Please choose a thumbnail.");

            return;

        }

        const file = fileInput.files[0];

        const thumbnail =
            generateThumbnailName(file);

        thumbnailFiles.set(thumbnail, file);

        data.push({

            id: getNextId(),

            type: "video",

            thumbnail: thumbnail,

            thumbnailFile: file,

            video: video,

            watch: watch

        });

    }

    // -------------------------
    // EDIT VIDEO
    // -------------------------

    else {

        const item = getItem(editingId);

        item.video = video;

        item.watch = watch;

        if (fileInput.files.length > 0) {

            const file = fileInput.files[0];

            const thumbnail =
                generateThumbnailName(file);

            thumbnailFiles.set(thumbnail, file);

            item.thumbnail = thumbnail;

            item.thumbnailFile = file;

        }

    }

    refreshDashboard();

    videoDialog.close();

};



// ---------------------------------
// Save Image
// ---------------------------------

document.getElementById("saveImage").onclick = function () {

    const link =
        document.getElementById("imageLink").value.trim();

    const fileInput =
        document.getElementById("imageThumbnail");

    if (link === "") {

        alert("Please complete every field.");

        return;

    }

    // -------------------------
    // ADD NEW IMAGE
    // -------------------------

    if (editingId === null) {

        if (fileInput.files.length === 0) {

            alert("Please choose a thumbnail.");

            return;

        }

        const file = fileInput.files[0];

        const thumbnail =
            generateThumbnailName(file);

        thumbnailFiles.set(thumbnail, file);

        data.push({

            id: getNextId(),

            type: "image",

            thumbnail: thumbnail,

            thumbnailFile: file,

            link: link

        });

    }

    // -------------------------
    // EDIT IMAGE
    // -------------------------

    else {

        const item = getItem(editingId);

        item.link = link;

        if (fileInput.files.length > 0) {

            const file = fileInput.files[0];

            const thumbnail =
                generateThumbnailName(file);

            thumbnailFiles.set(thumbnail, file);

            item.thumbnail = thumbnail;

            item.thumbnailFile = file;

        }

    }

    refreshDashboard();

    imageDialog.close();

};



// ---------------------------------
// Edit Item
// ---------------------------------

function editItem(id) {

    const item = getItem(id);

    if (!item) return;

    editingId = id;

    // -------------------------
    // VIDEO
    // -------------------------

    if (item.type === "video") {

        document.getElementById("videoDialogTitle").textContent =
            "Edit Video";

        document.getElementById("videoLink").value =
            item.video;

        document.getElementById("watchMoreLink").value =
            item.watch;

        document.getElementById("videoThumbnail").value = "";

        document.getElementById("videoPreview").src =
            getThumbnailSrc(item);

        videoDialog.showModal();

    }

    // -------------------------
    // IMAGE
    // -------------------------

    else {

        document.getElementById("imageDialogTitle").textContent =
            "Edit Image";

        document.getElementById("imageLink").value =
            item.link;

        document.getElementById("imageThumbnail").value = "";

        document.getElementById("imagePreview").src =
            getThumbnailSrc(item);

        imageDialog.showModal();

    }

}



// ---------------------------------
// Reset Dialogs
// ---------------------------------

videoDialog.addEventListener("close", () => {

    editingId = null;

    document.getElementById("videoThumbnail").value = "";

});

imageDialog.addEventListener("close", () => {

    editingId = null;

    document.getElementById("imageThumbnail").value = "";

});



// ---------------------------------
// Cancel Events
// ---------------------------------

videoDialog.addEventListener("cancel", function (e) {

    e.preventDefault();

    videoDialog.close();

});

imageDialog.addEventListener("cancel", function (e) {

    e.preventDefault();

    imageDialog.close();

});

// =====================================================
// Admin.js v2 - Part 3
// Export Website_Update.zip
// =====================================================


// ---------------------------------
// Export Website Update
// ---------------------------------

document.getElementById("exportBtn").onclick = async function () {

    try {

        // JSZip must be loaded
        if (typeof JSZip === "undefined") {

            alert("JSZip was not found.");

            return;

        }

        const zip = new JSZip();

        // -------------------------
        // Build clean JSON
        // -------------------------

        const exportData = buildExportData();

        zip.file(

            "data.json",

            JSON.stringify(exportData, null, 4)

        );



        // -------------------------
        // Create thumbnails folder
        // -------------------------

        const thumbnailsFolder = zip.folder("thumbnails");



        // -------------------------
        // Add every uploaded image
        // -------------------------

        for (const item of data) {

            if (!item.thumbnailFile)
                continue;

            const filename =
                item.thumbnail.split("/").pop();

            thumbnailsFolder.file(

                filename,

                item.thumbnailFile

            );

        }



        // -------------------------
        // Generate ZIP
        // -------------------------

        const blob = await zip.generateAsync({

            type: "blob",

            compression: "DEFLATE",

            compressionOptions: {

                level: 9

            }

        });



        // -------------------------
        // Download
        // -------------------------

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "Website_Update.zip";

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);



        alert("Website_Update.zip exported successfully.");

    }

    catch (err) {

        console.error(err);

        alert("Export failed.");

    }

};

// =====================================================
// Admin.js v2 - Part 4
// Delete & Final Polish
// =====================================================


// ---------------------------------
// Confirm Delete
// ---------------------------------

document.getElementById("confirmDelete").onclick = function () {

    if (deleteId === null) return;

    const item = getItem(deleteId);

    // Remove thumbnail from memory if it was uploaded this session
    if (item && item.thumbnailFile) {

        thumbnailFiles.delete(item.thumbnail);

    }

    data = data.filter(x => x.id !== deleteId);

    deleteId = null;

    deleteDialog.close();

    refreshDashboard();

};



// ---------------------------------
// Cancel Delete
// ---------------------------------

const cancelDeleteBtn = document.getElementById("cancelDelete");

if (cancelDeleteBtn) {

    cancelDeleteBtn.onclick = function () {

        deleteId = null;

        deleteDialog.close();

    };

}



// ---------------------------------
// Clear Dialog State
// ---------------------------------

function clearVideoDialog() {

    document.getElementById("videoLink").value = "";

    document.getElementById("watchMoreLink").value = "";

    document.getElementById("videoThumbnail").value = "";

    document.getElementById("videoPreview").src =
        "https://placehold.co/400x225?text=No+Image";

}


function clearImageDialog() {

    document.getElementById("imageLink").value = "";

    document.getElementById("imageThumbnail").value = "";

    document.getElementById("imagePreview").src =
        "https://placehold.co/400x225?text=No+Image";

}



// ---------------------------------
// Dialog Close Events
// ---------------------------------

videoDialog.addEventListener("close", function () {

    editingId = null;

    clearVideoDialog();

});


imageDialog.addEventListener("close", function () {

    editingId = null;

    clearImageDialog();

});



// ---------------------------------
// ESC closes dialogs
// ---------------------------------

document.addEventListener("keydown", function (e) {

    if (e.key !== "Escape") return;

    if (videoDialog.open)
        videoDialog.close();

    if (imageDialog.open)
        imageDialog.close();

    if (deleteDialog.open)
        deleteDialog.close();

});



// ---------------------------------
// Prevent Form Submit
// ---------------------------------

document.getElementById("videoForm").onsubmit = function (e) {

    e.preventDefault();

};

document.getElementById("imageForm").onsubmit = function (e) {

    e.preventDefault();

};



// ---------------------------------
// Refresh Dashboard
// ---------------------------------

refreshDashboard();

console.log("Admin.js v2 loaded successfully.");

