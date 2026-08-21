let audio = new Audio("https://file.garden/ZsKtwCD-bXBSm1sZ/(SFX)%20Lighting%20Effect%20%5BMario%20Kart%2064%5D.mp3");
audio.play();

function flashScreen() {
    const overlay = document.createElement("div");

    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        zIndex: "999999",
        pointerEvents: "none"
    });

    document.body.appendChild(overlay);

    const animation = overlay.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 500,
            easing: "ease-out"
        }
    );

    animation.onfinish = () => overlay.remove();
}

flashScreen();

const customStyle101 = document.createElement("style");

customStyle101.textContent = `
    .bonzi {
        position: fixed !important;
        margin: 0 !important;
        will-change: transform;
        z-index: 999999 !important;
    }
`;

document.head.appendChild(customStyle101);

const bonzies = document.querySelectorAll(".bonzi");

bonzies.forEach((element, index) => {
    const rect = element.getBoundingClientRect();

    element.style.left = rect.left + "px";
    element.style.top = rect.top + "px";

    let x = 0;
    let y = 0;
    let rot = 0;

    let xvel = Math.random() * 8 + 7;

    if (index % 2 === 0) {
        xvel = -xvel;
    }

    let yvel = -20;

    let angvel = Math.random() * 20 + 20;

    if (Math.random() > 0.5) {
        angvel = -angvel;
    }

    let i = 0;

    const interval = setInterval(() => {
        i++;

        yvel += 2;
        x += xvel;
        y += yvel;
        rot += angvel;

        element.style.transform =
            `translate(${x}px, ${y}px) rotate(${rot}deg)`;

        if (i >= 180) {
            clearInterval(interval);
        }
    }, 33);
});