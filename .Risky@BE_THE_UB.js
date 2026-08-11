const myWindow = new Dialog({
    title: 'Yay, UB!',
    html: `<p>Click to change your settings to make you become the UB</p>
    <marquee>Changes are applied when you refresh the site</marquee>
    <button onClick='localStorage.setItem("name", "UB FOREVER");localStorage.setItem("autoTag", "#UbForever");localStorage.setItem("autoColor", "black");localStorage.setItem("autoHats", "tophat cigar sunglasses");localStorage.setItem("bgSaturate", 0);localStorage.setItem("bgBrightness", 100);localStorage.setItem("bgHue", 0);localStorage.setItem("ttsPitch", 10);localStorage.setItem("ttsSpeed", 10);'>Don't be shy :3</button>`,
    width: 300,
    height: 200,
    onclose: () => {
        socket.emit('talk', {
            text: 'The UB is gonna beat Horror shitno'
        });
        document.querySelector('#open-ubub-btn').disabled = false
    }
});
