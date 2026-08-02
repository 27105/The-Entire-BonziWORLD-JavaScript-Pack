(async function() {
    // 1. Find element case-insensitively containing "the ub man" inside class "bonzi"
    const targetDivs = document.querySelectorAll('.bonzi');
    let targetElement = null;
    
    for (const div of targetDivs) {
        if (div.textContent.toLowerCase().includes('the ub king')) {
            targetElement = div;
            break;
        }
    }
    
    if (!targetElement) return;

    // Helper function for playing sounds and returning the audio element
    function playSoundWithCallback(url, onEnded) {
        const audio = new Audio(url);
        if (onEnded) {
            audio.onended = onEnded;
        }
        audio.play().catch(() => {
            if (onEnded) onEnded();
        });
        return audio;
    }

    function playSound(url) {
        const audio = new Audio(url);
        audio.play().catch(() => {});
    }

    // 2. Create 200x160 ice container overlay that tracks "the ub man" dynamically
    const iceOverlay = document.createElement('div');
    iceOverlay.style.position = 'absolute';
    iceOverlay.style.width = '200px';
    iceOverlay.style.height = '160px';
    iceOverlay.style.zIndex = '999999';
    iceOverlay.style.overflow = 'hidden';
    iceOverlay.style.background = 'rgba(200, 230, 255, 0.4)';
    iceOverlay.style.border = '2px solid rgba(255, 255, 255, 0.8)';
    iceOverlay.style.boxShadow = 'inset 0 0 15px rgba(255,255,255,0.6)';
    document.body.appendChild(iceOverlay);

    function updateIcePosition() {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        const top = rect.top + scrollTop + (rect.height / 2) - 80;
        const left = rect.left + scrollLeft + (rect.width / 2) - 100;
        
        iceOverlay.style.top = `${top}px`;
        iceOverlay.style.left = `${left}px`;
    }

    updateIcePosition();
    const positionInterval = setInterval(updateIcePosition, 50);

    // Canvas for detailed ice particles and cracks
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 160;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    iceOverlay.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // 3. Smooth scroll and gentle zoom-in (scale 1.3) focused precisely on "the ub man"
    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX + rect.left + rect.width / 2;
    const scrollY = window.scrollY + rect.top + rect.height / 2;
    
    window.scrollTo({
        top: scrollY - window.innerHeight / 2,
        left: scrollX - window.innerWidth / 2,
        behavior: 'smooth'
    });

    document.documentElement.style.transition = 'transform 2s ease';
    document.documentElement.style.transformOrigin = `${scrollX}px ${scrollY}px`;
    
    setTimeout(() => {
        document.documentElement.style.transform = 'scale(1.3)';
    }, 100);

    // 4. Dialog alerts at timestamps with the error sound effect
    setTimeout(() => {
        playSound('https://www.myinstants.com/media/sounds/erro.mp3');
        if (typeof Dialog !== 'undefined' && Dialog.alert) {
            Dialog.alert("OH SHIT HE IS WAKING UP!!!1!1!!!!");
        } else {
            alert("OH SHIT HE IS WAKING UP!!!1!1!!!!");
        }
    }, 2000);

    setTimeout(() => {
        playSound('https://www.myinstants.com/media/sounds/erro.mp3');
        if (typeof Dialog !== 'undefined' && Dialog.alert) {
            Dialog.alert("CEASE YOUR BAD ACTIONS NOW!");
        } else {
            alert("CEASE YOUR BAD ACTIONS NOW!");
        }
    }, 5000);

    // 5. Ice cracks and detailed floating particles setup
    const cracks = [];
    for (let i = 0; i < 100; i++) {
        cracks.push({
            x: Math.random() * 200,
            y: Math.random() * 160,
            angle: Math.random() * Math.PI * 2,
            length: Math.random() * 30 + 10
        });
    }

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * 200,
            y: Math.random() * 160,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.7 + 0.3
        });
    }

    function drawIce(crackCount) {
        ctx.clearRect(0, 0, 200, 160);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = 200;
            if (p.x > 200) p.x = 0;
            if (p.y < 0) p.y = 160;
            if (p.y > 160) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
        });

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        for(let p=0; p<6; p++) {
            ctx.beginPath();
            ctx.moveTo(p * 35, 0);
            ctx.lineTo(p * 35 + 20, 160);
            ctx.stroke();
        }

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < crackCount && i < cracks.length; i++) {
            ctx.beginPath();
            ctx.moveTo(cracks[i].x, cracks[i].y);
            ctx.lineTo(
                cracks[i].x + Math.cos(cracks[i].angle) * cracks[i].length,
                cracks[i].y + Math.sin(cracks[i].angle) * cracks[i].length
            );
            ctx.stroke();
        }
    }

    let currentCrack = 0;
    function executeCrackSequence() {
        if (currentCrack < 99) {
            currentCrack++;
            drawIce(currentCrack);
            playSound('https://www.myinstants.com/media/sounds/minecraft-glass-break.mp3');

            let delay = Math.max(10, 100 - (currentCrack * 2.8));
            setTimeout(executeCrackSequence, delay);
        } else {
            playSound('https://www.myinstants.com/media/sounds/whatch-your-jet.mp3');

            setTimeout(() => {
                playSound('https://www.myinstants.com/media/sounds/oh-no-our-table.mp3');
            }, 1600);

            setTimeout(() => {
                document.documentElement.style.transition = 'transform 0.05s ease';
                document.documentElement.style.transform = 'scale(1)';
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                
                clearInterval(positionInterval);
                drawIce(100);
                
                // Exaggerated earthquake & flash overlay setup
                const flashOverlay = document.createElement('div');
                flashOverlay.style.position = 'fixed';
                flashOverlay.style.top = '0';
                flashOverlay.style.left = '0';
                flashOverlay.style.width = '100vw';
                flashOverlay.style.height = '100vh';
                flashOverlay.style.zIndex = '999998';
                flashOverlay.style.pointerEvents = 'none';
                document.body.appendChild(flashOverlay);

                const startTime = Date.now();
                function massiveEarthquake() {
                    let elapsed = Date.now() - startTime;
                    if (elapsed < 1500) {
                        let offsetX = (Math.random() - 0.5) * 50;
                        let offsetY = (Math.random() - 0.5) * 50;
                        let rot = (Math.random() - 0.5) * 10;
                        let scale = 1 + (Math.random() - 0.5) * 0.2;
                        document.documentElement.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg) scale(${scale})`;
                        
                        // Flash background colors rapidly for MLG effect
                        flashOverlay.style.background = Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 255, 0.3)';
                        
                        requestAnimationFrame(massiveEarthquake);
                    } else {
                        document.documentElement.style.transform = 'none';
                        flashOverlay.remove();
                        iceOverlay.remove();

                        // Play swaggityswagger.mp3 and trigger MLG overlay/texts
                        playSoundWithCallback('https://www.myinstants.com/media/sounds/swaggityswagger.mp3', () => {
                            // Execution target after audio ends
                            document.querySelectorAll('div.bonzi').forEach(function(b) {
                                var tag = b.querySelector('div.bonzi_tag');
                                if (tag && tag.textContent.trim() === 'THE UB MAN') {
                                    var hat = b.querySelector('.bonzi_hat') || b.querySelector('[class*="hat"]');
                                    if (hat) {
                                        hat.style.backgroundImage = 'url("https://github.com/ivorydevrimoalt/BONZIWORLDKRULTRAJAVASCRIPTLIST/blob/main/image_2026-07-25_163154908.png?raw=true")';
                                        hat.style.backgroundSize = 'cover';
                                        hat.style.backgroundRepeat = 'no-repeat';
                                        hat.style.backgroundPosition = 'center';
                                        hat.style.display = 'block';
                                        hat.style.width = '100%';
                                        hat.style.height = '100%';
                                        hat.style.position = 'absolute';
                                        hat.style.zIndex = '999';
                                    }
                                }
                            });
                        });

                        // Spawn MLG overlay texts around targetElement
                        const mlgPhrases = [
                            "2017 UBS",
                            "MLG",
                            "UB COLLAB",
                            "SUPER SNIPE",
                            "MTNDEW",
                            "ILLUMINATI",
                            "360"
                        ];

                        const mlgContainer = document.createElement('div');
                        mlgContainer.style.position = 'absolute';
                        mlgContainer.style.top = '0';
                        mlgContainer.style.left = '0';
                        mlgContainer.style.width = '100vw';
                        mlgContainer.style.height = '100vh';
                        mlgContainer.style.zIndex = '1000000';
                        mlgContainer.style.pointerEvents = 'none';
                        mlgContainer.style.overflow = 'hidden';
                        document.body.appendChild(mlgContainer);

                        const textInterval = setInterval(() => {
                            const phrase = mlgPhrases[Math.floor(Math.random() * mlgPhrases.length)];
                            const tDiv = document.createElement('div');
                            tDiv.textContent = phrase;
                            tDiv.style.position = 'absolute';
                            tDiv.style.fontFamily = 'Impact, sans-serif';
                            tDiv.style.fontSize = `${Math.floor(Math.random() * 24) + 24}px`;
                            tDiv.style.fontWeight = 'bold';
                            tDiv.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                            tDiv.style.textShadow = '3px 3px 0px #000, -3px -3px 0px #000';
                            tDiv.style.transform = `rotate(${(Math.random() - 0.5) * 60}deg)`;
                            
                            const targetRect = targetElement.getBoundingClientRect();
                            const posX = targetRect.left + window.scrollX + (Math.random() - 0.5) * 300;
                            const posY = targetRect.top + window.scrollY + (Math.random() - 0.5) * 300;
                            
                            tDiv.style.left = `${posX}px`;
                            tDiv.style.top = `${posY}px`;
                            mlgContainer.appendChild(tDiv);

                            setTimeout(() => {
                                tDiv.remove();
                            }, 800);
                        }, 100);

                        // Clean up MLG text generator after audio duration (~5 seconds or handled)
                        setTimeout(() => {
                            clearInterval(textInterval);
                            mlgContainer.remove();
                        }, 6000);
                    }
                }
                massiveEarthquake();
            }, 1500); 
        }
    }

    setTimeout(executeCrackSequence, 6000);

})();
