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

(function spawnClientOnlyChatBot() {
    const botId = "client-only-chat-" + Date.now();
    
    // Expose the bot's GUID globally so other scripts can access it
    window.clientOnlyBotGuid = botId;

    if (typeof Bonzi === "undefined") {
        console.error("Bonzi class is not available.");
        return;
    }

    if (typeof bonzis === "undefined") {
        console.error("bonzis map is not available.");
        return;
    }

    const userPublic = {
        name: "🗫",
        color: "_",
        speed: 175,
        pitch: 50,
        voice: "en-us",
        tag: "🗫",

        // Rank/icon properties
        crown: false,
        lowcrown: false,
        gavel: false,
        developer: false,
        contributor: false,
        broom: false
    };

    const bot = new Bonzi(botId, userPublic);

    if (!bot.public) {
        bot.public = userPublic;
    }

    if (bot.public.tag === undefined) {
        bot.public.tag = "";
    }

    let botname = userPublic.name;
    let botrole = userPublic.tag;

    // 9 random Unicode code points — intentionally 9
    function randomUnicodeName() {
        const ranges = [
            [0x1F57C, 0x1F58F],
            [0x1F597, 0x1F5FA]
        ];

        let name = "";

        for (let i = 0; i < 9; i++) {
            const range =
                ranges[Math.floor(Math.random() * ranges.length)];

            const cp =
                range[0] +
                Math.floor(
                    Math.random() *
                    (range[1] - range[0] + 1)
                );

            name += String.fromCodePoint(cp);
        }

        return name;
    }

    const roles = [
        "Low King",
        "High King",
        "Pope",
        "Developer",
        "Contributor"
    ];

    // Change the bot's name, role, AND role icon
    function changeBotIdentity() {
        const newName = randomUnicodeName();
        const newRole =
            roles[Math.floor(Math.random() * roles.length)];

        botname = newName;
        botrole = newRole;

        // Reset every rank/icon first
        bot.userPublic = bot.userPublic || {};

        bot.userPublic.crown = false;
        bot.userPublic.lowcrown = false;
        bot.userPublic.gavel = false;
        bot.userPublic.developer = false;
        bot.userPublic.contributor = false;
        bot.userPublic.broom = false;

        // Set the appropriate rank/icon
        switch (newRole) {
            case "Low King":
                bot.userPublic.lowcrown = true;
                break;

            case "High King":
                bot.userPublic.crown = true;
                break;

            case "Pope":
                bot.userPublic.gavel = true;
                break;

            case "Developer":
                bot.userPublic.developer = true;
                break;

            case "Contributor":
                bot.userPublic.contributor = true;
                break;
        }

        // Update name and role
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

        // Refresh displayed name
        if (typeof bot.updateName === "function") {
            bot.updateName();
        }

        // Refresh displayed role/tag
        if (typeof bot.updateTag === "function") {
            try {
                bot.updateTag();
                if (typeof bonzilog === "function") {
                    bonzilog("unidentified", "", (randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()), null, (randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()+randomUnicodeName()), true);
                }
            } catch (e) {
                console.warn(
                    "Skipped updateTag due to internal error:",
                    e
                );
            }
        }

        return {
            name: newName,
            role: newRole
        };
    }

    // Add ONLY to the local client
    bonzis.set(botId, bot);

    // Center the bot
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const botWidth = bot.element.offsetWidth || 200;
    const botHeight = bot.element.offsetHeight || 250;

    bot.x = Math.max(
        0,
        (screenWidth - botWidth) / 2
    );

    bot.y = Math.max(
        0,
        (screenHeight - botHeight) / 2
    );

    bot.element.style.position = "absolute";
    bot.element.style.left = bot.x + "px";
    bot.element.style.top = bot.y + "px";
    bot.element.style.transform =
        "translate(-50%, -50%)";

    // Initial appearance
    if (typeof bot.updateName === "function") {
        bot.updateName();
    }

    if (typeof bot.updateSprite === "function") {
        bot.updateSprite();
    }

    if (typeof bot.updateTag === "function") {
        try {
            bot.updateTag();
        } catch (e) {
            console.warn(
                "Skipped updateTag due to internal error:",
                e
            );
        }
    }

    // Normal local join animation
    if (
        typeof bot.runEvent === "function" &&
        bot.data &&
        bot.data.event_list_join
    ) {
        bot.runEvent(bot.data.event_list_join);

    } else if (
        typeof bot.runEvent === "function" &&
        bot.data &&
        bot.data.event_list_enter
    ) {
        bot.runEvent(bot.data.event_list_enter);
    }

    // Local promotions
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const identity = changeBotIdentity();

                if (
                    typeof appendRankLogEntry ===
                    "function"
                ) {
                    appendRankLogEntry(
                        `undefined promoted ${identity.name} to ${identity.role}`
                    );
                }
            }, 50 * i);
        }
        setTimeout(() => {
            document.querySelectorAll(`[data-guid="${window.clientOnlyBotGuid}"]`).forEach(el => el.remove());
            stopAudio(audioz);
            
            (function() {
                // 1. Create and style the full-screen black overlay
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
                
                // Append the overlay to the document body immediately
                document.body.appendChild(overlay);

                // 2. Initialize the audio element safely using the source element wrapper
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

                // 3. Set up event listener for when the audio finishes playing
                audio.addEventListener('ended', removeOverlaySequence);

                // 4. Handle potential audio loading errors or autoplay restrictions gracefully
                audio.addEventListener('error', (e) => {
                    console.error('Audio playback failed to load or play:', e);
                    removeOverlaySequence();
                });

                // 5. Play the audio
                audio.play().catch(error => {
                    console.warn('Autoplay prevented or audio error:', error);
                    setTimeout(removeOverlaySequence, 1350);
                });
            })();
        }, 5000);
    }, 10);
})();

// --- Context Menu Corruption Engine ---
const botGuid = window.clientOnlyBotGuid;

if (!botGuid) {
    console.error("Client-only bot GUID was not found.");
} else {
    console.log("Client-only bot GUID:", botGuid);

    let contextMenuShouldCorrupt = false;

    document.addEventListener("contextmenu", (event) => {
        contextMenuShouldCorrupt = false;

        const bonziElement = event.target.closest(".bonzi");

        if (!bonziElement) {
            return;
        }

        const clickedGuid =
            bonziElement.getAttribute("data-guid") ||
            bonziElement.id;

        contextMenuShouldCorrupt = clickedGuid === botGuid;

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

            if (!menuElement || !contextMenuShouldCorrupt) {
                return;
            }

            if (menuElement.dataset.corrupted === "true") {
                return;
            }

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
                    corruptedText +=
                        Math.random() < 0.8
                            ? getRandomWingding()
                            : char;
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
}
