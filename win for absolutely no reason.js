const marioKartSixtyFourSecondPlaceSoundEffect = document.createElement("audio");
marioKartSixtyFourSecondPlaceSoundEffect.src = "https://files.catbox.moe/85do15.wav";
marioKartSixtyFourSecondPlaceSoundEffect.autoplay = true;
document.body.appendChild(marioKartSixtyFourSecondPlaceSoundEffect);
setTimeout(() => {
    alert("Congratulations! You win! :D");
}, 2750);