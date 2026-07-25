// 1. Play the audio
const audio = new Audio('https://www.myinstants.com/media/sounds/tf2-heavy-om-nom-nom-sound-effect.mp3');
audio.play().catch(error => {
    console.log("Audio playback was prevented by the browser:", error);
});

// 2. Show the dialog alert
Dialog.alert("Your bonzi_tv tastes like shit and lots of abuse, I RATE THIS RESTUANT SHIT OUT OF 10");

// 3. Remove element with id "byt_screen" every 10 milliseconds
setInterval(() => {
    const bytScreen = document.getElementById('byt_screen');
    if (bytScreen) {
        bytScreen.remove();
    }
}, 10);
