// =====================================
// Age Gate
// =====================================

const ADSTERRA_DIRECT_LINK = "https://cdn.vidiey.co/GW2272Vb.mp4";

const AGE_DELAY = 5000;

setTimeout(showAgeGate, AGE_DELAY);

function showAgeGate() {

    if (document.getElementById("ageGateOverlay"))
        return;

    const overlay = document.createElement("div");

    overlay.id = "ageGateOverlay";

    overlay.innerHTML = `

        <div class="ageGateBox">

            <h2>Adults Only</h2>

            <p>

                This website contains content intended for adults.

                <br><br>

                Are you at least 18 years old?

            </p>

            <div class="ageGateButtons">

                <button id="ageYes">

                    Yes, I'm 18+

                </button>

                <button id="ageNo">

                    No

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(overlay);

    document.getElementById("ageYes").onclick = function () {

        window.open(ADSTERRA_DIRECT_LINK, "_blank");

        overlay.remove();

    };

    document.getElementById("ageNo").onclick = function () {

        window.location.href = "https://cdn.vidiey.co/jPXeoZUf.mp4";

    };

}