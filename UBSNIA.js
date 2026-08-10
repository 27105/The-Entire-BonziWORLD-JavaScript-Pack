const runEventServerside = 0;
const ubsnia = [
    "Ohio and the 'nam had sent nuclear bombs to the balkans from the balcony and the 'nam had fighten each other, the nuclear missles are gay as fuck but they made out in the middle of a balcony",
    "Subway Sandwitch Sent Subway Scary Witches in Sand for Sans because Sans ordered the Scary Subway Sanded Witch we all know sans made that bust of a balcony joke",
    "The ub valley planned to make a planet called ub-planet and the rocket had failed but nobody known why but he realized its made by the busted Balkans",
    "Shawarma had exploded in the ub valley every direction so ohio people will get the taste of the busted shawarma",
    "Shirada had a border to cross so nobody will call him a raddar bus",
    "She rather order an orange juice rather to get a stinky sock sub",
    "He'd rather call her to molest a femboy rather to disrespect ub" 
];

let accumulatedDelay = 0;

for (let i = 0; i < ubsnia.length; i++) {
    // Calculate characters (excluding spaces) to determine reading time
    const charCount = ubsnia[i].replace(/\s/g, '').length;
    
    // Give roughly 50ms to 100ms per character, or scale it to your preferred speed
    const readingTime = charCount * 70; 

    setTimeout(() => {
        socket.emit("talk", { text: ubsnia[i] });
        console.log(`Sent item ${i}, triggered at accumulated delay: ${accumulatedDelay}ms`);
    }, accumulatedDelay);

    // Add the current item's duration PLUS a natural pause before the next one starts
    accumulatedDelay += readingTime + 1000; 
}
