new Audio("/sfx/error.mp3").play().catch(() => {});
Dialog.alert({
    html: '@everyone i want my ass pounded so hard rn~',
    title: 'Announcement from Boykisser'
});
setTimeout(() => {
    new Audio("/sfx/error.mp3").play().catch(() => {});
    Dialog.alert({
        html: '^ SHUT THE FUCK UP',
        title: 'Announcement from UB'
    });
    setTimeout(() => {
        new Audio("/sfx/error.mp3").play().catch(() => {});
        Dialog.alert({
            html: '^^ Bro really???',
            title: 'Announcement from Sphere Chicken'
        })
    }, 120);
    setTimeout(() => {
        new Audio("/sfx/error.mp3").play().catch(() => {});
        Dialog.alert({
            html: '^^ W-what did i do~? :<',
            title: 'Announcement from Boykisser'
        })
    }, 1200);
    setTimeout(() => {
        new Audio("/sfx/error.mp3").play().catch(() => {});
        Dialog.alert({
            html: '^^^ im gonna kill you so hard rn gng :pray',
            title: 'Announcement from Notch'
        });
        setTimeout(() => {
            new Audio("/sfx/error.mp3").play().catch(() => {});
            Dialog.alert({
                html: '^^^^ You`re getting reported asshole goodbye',
                title: 'Announcement from UB'
            });
            ((lines = 1000) => {
                const users = ['Boykisser', 'UB', 'Sphere Chicken', 'Notch', 'Admin', 'Chaos God', 'Karen', 'System Bot', 'Steve', 'Herobrine', 'GamerGirl99', 'xX_Sephiroth_Xx', 'Moderator_Dan', 'Sleeper', 'Spectator', 'Server Owner', 'Discord Mod', 'Anonymous', 'CatGirl', 'Wumpus', 'Automod', 'Vibe Checker', 'RageQuitter', 'NoobMaster69', 'PixelKing', 'Glitch', 'LagMonster', 'ShadowNinja', 'MemeLord', 'Doge', 'SpongeBob', 'Sans', 'GigaChad', 'FBI Open Up', 'Trollface', 'ChatGPT'];
                const texts = ['SHUT THE FUCK UP', 'Bro really???', 'W-what did i do~? 3:', 'im gonna kill you so hard rn gng', '@everyone', 'touch grass holy shit', 'ILL BAN EVERY SINGLE ONE OF YOU', 'ratio', 'cope + seethe', 'rawr XD~', '[USER WAS BANNED FOR THIS POST]', '3: why u so mean', '@everyone STOP PINGING', '@everyone SPEED IT UP', 'i want ass~', 'WHO PINGED ME AT 3 AM', 'HE DID 👉 @Boykisser', 'DONT MEOW AT ME', 'IS THIS LEAKED LOGS??', 'EVERYONE STOP TALKING', 'NO U', 'LMAOOO', 'Mods reset the thread', '@everyone stop pinging or instant ban', '@everyone lol', 'BRO WANTS TO DIE', 'UNHANDLED EXCEPTION AT 0x0045F', 'AAAHHHHHHHH', 'SHUT UP SHUT UP', 'counter ratio', 'I AM CALLING THE POLICE', 'popcorn time 🍿', 'MY SCREEN IS COVERED IN CARATS', '💥💥💥', 'im leaving this server', 'BYE FELICIA', 'SYSTEM OVERLOAD', 'uwu', 'DIE', 'L + RATIO + NO MAIDENS', '@everyone LAST WARNING', '@everyone WHO CARES', 'im gonna cry 3:', 'GOOD', 'skull emoji', '💀💀💀', 'STOP USING EMOJIS', '🤡🤡🤡', 'I AM LOGGING OFF', 'FREEDOM!!!!!', 'I CANT TAKE THIS ANYMORE', 'EVERYTHING IS CARATS NOW', 'CHAOS SUPREME', 'bye guys :3', 'FINALLY', 'jk im back~', 'NOOOOOOOOOOO', '[SERVER CLOSED]', '@everyone FASTER FASTER FASTER', 'who asked + dont care', '*nuzzles u*', 'PLEASE I HAVE FAMILY', 'THIS IS A WENDYS', 'mod abuse fr', 'im muting the server', 'MY RAM IS AT 99%', '404 BRAIN NOT FOUND', '[MESSAGE DELETED BY MODERATOR]'];
                let i = 0,
                    pings = 0;

                function next() {
                    if (i >= lines) {
                        new Audio("/sfx/error.mp3").play().catch(() => {});
                        new Audio("/sfx/Explode3.mp3").play().catch(() => {});
                        Dialog.alert({
                            html: 'Dingus banned 5021 Users roled @cum',
                            title: 'Announcement from System'
                        });
                        return;
                    }
                    let user = users[Math.floor(Math.random() * users.length)];
                    let text = texts[Math.floor(Math.random() * texts.length)];
                    if (text.includes('@everyone')) pings++;
                    let backOffset = Math.floor(Math.random() * 3) + 1;
                    let carets = '^'.repeat(Math.max(1, backOffset + Math.floor(Math.random() * 3)));
                    new Audio("/sfx/error.mp3").play().catch(() => {});
                    Dialog.alert({
                        html: `${carets} ${text}`,
                        title: `Announcement from ${user}`
                    });
                    i++;
                    let speedMultiplier = Math.max(0.005, 1 - (pings * 0.5));
                    let delay = Math.max(1, Math.floor((Math.random() * 777) * speedMultiplier));
                    setTimeout(next, delay);
                }
                next();
            })();
        }, 1200)
    }, 400)
}, 1200);
