// Fixed audio loading issue by converting the raw URL to a proper CORS/media-friendly format or ensuring the format is handled,
// plus adding explicit format checking / fallback handling for the Audio object.

const audiozUrl = 'https://raw.githubusercontent.com/ivorydevrimoalt/BONZIWORLDKRULTRAJAVASCRIPTLIST/refs/heads/main/dfghdfghdfghdghd.wav';

function createSafeAudio(url) {
    const audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    
    // Explicitly add source element to help browsers detect mime types correctly from raw github URLs
    const source = document.createElement('source');
    source.src = url;
    source.type = 'audio/wav';
    audio.appendChild(source);
    
    return audio;
}

const audioz = createSafeAudio(audiozUrl);

function stopAudio(audioObj) {
    try {
        audioObj.pause();
        audioObj.currentTime = 0;
    } catch (e) {
        console.warn("Could not stop audio:", e);
    }
}

audioz.play().catch(error => {
    console.warn("Audioz playback failed or was blocked by browser autoplay policy:", error);
});

// Function to spawn a single bot instance with a random skew transform
function spawnSingleBot() {
    const botId = "client-only-chat-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    
    // Expose the most recent bot's GUID globally so other scripts can access it
    window.clientOnlyBotGuid = botId;

    if (typeof Bonzi === "undefined" || typeof bonzis === "undefined") {
        console.error("Bonzi framework is not available.");
        return;
    }

    const userPublic = {
        name: "🗫",
        color: "_",
        speed: 175,
        pitch: 50,
        voice: "en-us",
        tag: "🗫",
        crown: false,
        lowcrown: false,
        gavel: false,
        developer: false,
        contributor: false,
        broom: false
    };

    const bot = new Bonzi(botId, userPublic);

    if (!bot.public) bot.public = userPublic;
    if (bot.public.tag === undefined) bot.public.tag = "";

    function randomUnicodeName() {
        const ranges = [
            [0x1F57C, 0x1F58F],
            [0x1F597, 0x1F5FA]
        ];
        let name = "";
        for (let i = 0; i < 9; i++) {
            const range = ranges[Math.floor(Math.random() * ranges.length)];
            const cp = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
            name += String.fromCodePoint(cp);
        }
        return name;
    }

    const roles = ["Low King", "High King", "Pope", "Developer", "Contributor"];

    function changeBotIdentity() {
        const newName = randomUnicodeName();
        const newRole = roles[Math.floor(Math.random() * roles.length)];

        bot.userPublic = bot.userPublic || {};
        bot.userPublic.crown = false;
        bot.userPublic.lowcrown = false;
        bot.userPublic.gavel = false;
        bot.userPublic.developer = false;
        bot.userPublic.contributor = false;
        bot.userPublic.broom = false;

        switch (newRole) {
            case "Low King": bot.userPublic.lowcrown = true; break;
            case "High King": bot.userPublic.crown = true; break;
            case "Pope": bot.userPublic.gavel = true; break;
            case "Developer": bot.userPublic.developer = true; break;
            case "Contributor": bot.userPublic.contributor = true; break;
        }

        bot.userPublic.name = newName;
        bot.userPublic.tag = newRole;

        if (bot.public) {
            bot.public.name = newName;
            bot.public.tag = newRole;
            bot.public.crown = bot.userPublic.crown;
            bot.public.lowcrown = bot.userPublic.lowcrown;
            bot.public.gavel = bot.userPublic.gavel;
            bot.public.developer = bot.userPublic.developer;
            bot.public.contributor = bot.userPublic.contributor;
            bot.public.broom = bot.userPublic.broom;
        }

        if (typeof bot.updateName === "function") bot.updateName();

        if (typeof bot.updateTag === "function") {
            try {
                bot.updateTag();
                if (typeof bonzilog === "function") {
                    bonzilog("unidentified", "", (randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()), null, (randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()), true);
                }
            } catch (e) {
                console.warn("Skipped updateTag due to internal error:", e);
            }
        }

        return { name: newName, role: newRole };
    }

    bonzis.set(botId, bot);

    // Keep position centered (not random)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const botWidth = bot.element.offsetWidth || 200;
    const botHeight = bot.element.offsetHeight || 250;

    bot.x = Math.max(0, (screenWidth - botWidth) / 2);
    bot.y = Math.max(0, (screenHeight - botHeight) / 2);

    // Generate random skew values between -45deg and 45deg
    const randomSkewX = Math.floor(Math.random() * 90) - 45;
    const randomSkewY = Math.floor(Math.random() * 90) - 45;

    bot.element.style.position = "absolute";
    bot.element.style.left = bot.x + "px";
    bot.element.style.top = bot.y + "px";
    
    // Apply center alignment along with the random skew transform
    bot.element.style.transform = `translate(-50%, -50%) skew(${randomSkewX}deg, ${randomSkewY}deg)`;

    if (typeof bot.updateName === "function") bot.updateName();
    if (typeof bot.updateSprite === "function") bot.updateSprite();
    if (typeof bot.updateTag === "function") {
        try { bot.updateTag(); } catch (e) {}
    }

    if (typeof bot.runEvent === "function" && bot.data && bot.data.event_list_join) {
        bot.runEvent(bot.data.event_list_join);
    } else if (typeof bot.runEvent === "function" && bot.data && bot.data.event_list_enter) {
        bot.runEvent(bot.data.event_list_enter);
    }

    // Local promotions sequence
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const identity = changeBotIdentity();
                if (typeof appendRankLogEntry === "function") {
                    appendRankLogEntry(`undefined promoted ${identity.name} to ${identity.role}`);
                }
            }, 50 * i);
        }
    }, 10);
}

// Start spam spawning bots at an interval (adjust frequency in ms if needed)
const spawnInterval = setInterval(() => {
    spawnSingleBot();
}, 100);

// Stop spamming and run full cleanup overlay after 5 seconds
setTimeout(() => {
    clearInterval(spawnInterval);

    document.querySelectorAll(`[data-guid^="client-only-chat-"]`).forEach(el => el.remove());
    stopAudio(audioz);

    (function() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '999999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        
        document.body.appendChild(overlay);

        const audioUrl = 'https://raw.githubusercontent.com/ivorydevrimoalt/BONZIWORLDKRULTRAJAVASCRIPTLIST/refs/heads/main/ghj,ghjkffghjkfghjk.wav';
        const audio = createSafeAudio(audioUrl);

        let cleanupExecuted = false;
        
        function removeOverlaySequence() {
            if (cleanupExecuted) return;
            cleanupExecuted = true;

            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 669);
        }

        audio.addEventListener('ended', removeOverlaySequence);
        audio.addEventListener('error', (e) => {
            console.error('Audio playback failed to load or play:', e);
            removeOverlaySequence();
        });

        audio.play().catch(error => {
            console.warn('Autoplay prevented or audio error:', error);
            setTimeout(removeOverlaySequence, 1350);
        });
    })();
}, 5000);

// --- Context Menu Corruption Engine ---
document.addEventListener("contextmenu", (event) => {
    let contextMenuShouldCorrupt = false;
    const bonziElement = event.target.closest(".bonzi");

    if (!bonziElement) return;

    const clickedGuid = bonziElement.getAttribute("data-guid") || bonziElement.id;
    contextMenuShouldCorrupt = clickedGuid && clickedGuid.startsWith("client-only-chat-");

    if (contextMenuShouldCorrupt) {
        console.log("🗫 client-only bot selected!");
    }
}, true);

function initializeContextMenuCorruptionEngine() {
    const targetSelector = ".context-menu-list.context-menu-root";

    function getRandomWingding() {
        const ranges2 = [
            [0x1F57C, 0x1F58F],
            [0x1F597, 0x1F5FA]
        ];
        
        const range = ranges2[Math.floor(Math.random() * ranges2.length)];
        const cp = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
        
        return String.fromCodePoint(cp);
    }   

    setInterval(() => {
        const menuElement = document.querySelector(targetSelector);

        if (!menuElement) return;
        if (menuElement.dataset.corrupted === "true") return;

        menuElement.dataset.corrupted = "true";

        // Corrupt text
        const items = menuElement.querySelectorAll("li.context-menu-item > span");

        items.forEach((span) => {
            const originalText = span.textContent;

            span.style.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            span.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            span.style.fontFamily = "monospace";

            let corruptedText = "";

            for (const char of originalText) {
                corruptedText += Math.random() < 0.8 ? getRandomWingding() : char;
            }

            span.textContent = corruptedText;
        });

        // Duplicate one random item
        const directItems = menuElement.querySelectorAll(":scope > li.context-menu-item");

        if (directItems.length > 0) {
            const targetItem = directItems[Math.floor(Math.random() * directItems.length)];
            const clone = targetItem.cloneNode(true);
            const clonedSpan = clone.querySelector("span");

            if (clonedSpan) {
                clonedSpan.style.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                clonedSpan.textContent = getRandomWingding() + " " + clonedSpan.textContent;
            }

            menuElement.appendChild(clone);
        }

        // Remove one item
        const allItems = menuElement.querySelectorAll(":scope > li.context-menu-item");

        if (allItems.length > 0) {
            allItems[allItems.length - 1].remove();
        }

    }, 50);
}

initializeContextMenuCorruptionEngine();
