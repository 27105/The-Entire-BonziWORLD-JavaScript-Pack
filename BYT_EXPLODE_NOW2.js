// 1. Screen shake & explosion sfx loop (10 times every 100ms)
let shakeCount = 0;
const shakeInterval = setInterval(() => {
    const x = (Math.random() - 0.5) * 30;
    const y = (Math.random() - 0.5) * 30;
    document.body.style.transform = `translate(${x}px, ${y}px)`;

    try {
        let sfx = new Audio("./explosion.mp3");
        sfx.play().catch(() => {});
    } catch (e) {}

    shakeCount++;
    if (shakeCount >= 10) {
        clearInterval(shakeInterval);
        document.body.style.transform = 'none';

        // 2. Apply gravity, jump, loud explosion, and fall to bottom edge (excluding chatbar)
        const byts = document.querySelectorAll('[id*="byt"]:not(#chatbar):not(.chatbar), #byt_screen');
        
        byts.forEach(el => {
            el.style.position = 'relative';
            el.style.transition = 'none';
            el.style.bottom = '150px';
        });

        try {
            let loudSfx = new Audio("./explosion.mp3");
            loudSfx.volume = 1.0;
            loudSfx.play().catch(() => {});
        } catch (e) {}

        // Fall down to bottom edge of screen for 2 seconds
        setTimeout(() => {
            byts.forEach(el => {
                const rect = el.getBoundingClientRect();
                const fallDistance = window.innerHeight - rect.bottom;
                el.style.transition = 'bottom 0.5s cubic-bezier(.5, 0, 1, 1)';
                el.style.bottom = `-${fallDistance}px`;
            });

            // 3. After 2 seconds, play lego breaking sound ONCE and start the forever remove (excluding chatbar)
            setTimeout(() => {
                try {
                    let legoSfx = new Audio("https://www.myinstants.com/media/sounds/lego-breaking.mp3");
                    legoSfx.play().catch(() => {});
                } catch (e) {}

                setInterval(() => {
                    const targetByts = document.querySelectorAll('[id*="byt"]:not(#chatbar):not(.chatbar), #byt_screen');
                    targetByts.forEach(el => el.remove());
                }, 100);
            }, 2000);

        }, 300);
    }
}, 100);
