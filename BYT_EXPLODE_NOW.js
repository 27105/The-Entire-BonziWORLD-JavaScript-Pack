// 1. Shake the screen and play the explosion sound
const sfx = new Audio("./explosion.mp3");
sfx.play().catch(error => {
    console.log("Audio playback was prevented by the browser:", error);
});

// Add a temporary screen shake effect via CSS keyframes injection
const shakeStyle = document.createElement('style');
shakeStyle.innerHTML = `
    @keyframes screenShake {
        0% { transform: translate(0, 0) rotate(0deg); }
        20% { transform: translate(-10px, 10px) rotate(-1deg); }
        40% { transform: translate(10px, -10px) rotate(1deg); }
        60% { transform: translate(-10px, -10px) rotate(0deg); }
        80% { transform: translate(10px, 10px) rotate(1deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
    }
    body {
        animation: screenShake 0.5s infinite;
    }
`;
document.head.appendChild(shakeStyle);

// Select all "byt" elements (assuming they have class "byt" or tag/id variations, let's target elements with class or id containing "byt")
const byts = document.querySelectorAll('[id*="byt"], .byt');

// 2. Apply physics: jump, random spin, and fall down to the bottom edge for 4 seconds
byts.forEach(byt => {
    byt.style.position = 'fixed';
    byt.style.zIndex = '9999';
    
    // Initial jump upward velocity and random horizontal drift / spin
    let velocityY = -Math.random() * 15 - 10; // Upward jump
    let velocityX = (Math.random() - 0.5) * 10;
    let posX = byt.getBoundingClientRect().left;
    let posY = byt.getBoundingClientRect().top;
    let rotation = 0;
    let rotationSpeed = (Math.random() - 0.5) * 30;
    
    byt.style.left = posX + 'px';
    byt.style.top = posY + 'px';

    const gravity = 1.2;
    const groundLevel = window.innerHeight - byt.offsetHeight;

    const physicsInterval = setInterval(() => {
        velocityY += gravity;
        posY += velocityY;
        posX += velocityX;
        rotation += rotationSpeed;

        // Bounce slightly if hitting the bottom edge
        if (posY >= groundLevel) {
            posY = groundLevel;
            velocityY = -velocityY * 0.3; // Damped bounce
            velocityX *= 0.8; // Friction
        }

        byt.style.top = posY + 'px';
        byt.style.left = posX + 'px';
        byt.style.transform = `rotate(${rotation}deg)`;
    }, 20);

    // Stop physics after 4 seconds and prepare for forever remove
    setTimeout(() => {
        clearInterval(physicsInterval);
    }, 4000);
});

// 3. Gradually get faster and faster from 100ms to 10ms, then start the forever remove
setTimeout(() => {
    // Stop the screen shake
    shakeStyle.remove();

    let currentInterval = 100;
    const speedUp = () => {
        // Remove any remaining byt elements
        document.querySelectorAll('[id*="byt"], .byt').forEach(el => el.remove());

        if (currentInterval > 10) {
            currentInterval -= 10;
        }
        setTimeout(speedUp, currentInterval);
    };

    speedUp();
}, 4000);
