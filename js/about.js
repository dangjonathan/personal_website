function startTypingAnimation() {
    const texts = [
        "Hello, I am Jonathan!",
        "I am a software developer :)",
        "Welcome to my portfolio!",
        "I love coding and creating.",
    ];
    const speed = 100; // milliseconds per character
    let textIndex = 0;
    let characterIndex = 0;

    function typeWriter() {
        if (textIndex < texts.length) {
            if (characterIndex < texts[textIndex].length) {
                document.getElementById("typed-text").innerHTML += texts[textIndex].charAt(characterIndex);
                characterIndex++;
                setTimeout(typeWriter, speed);
            } else {
                // Reset character index for next text
                characterIndex = 0;
                // Move to the next text
                textIndex = (textIndex + 1) % texts.length; // Loop through texts array
                // Clear typed text element
                setTimeout(() => {
                    document.getElementById("typed-text").innerHTML = "";
                    typeWriter(); // Start typing next text
                }, 2000); // Wait 2 seconds before typing next text
            }
        }
    }

    function blinkCursor() {
        const cursor = document.getElementById('cursor');
        cursor.style.opacity = (cursor.style.opacity === '0' ? '1' : '0');
    }

    typeWriter();
    setInterval(blinkCursor, 500); // Blink every 500ms
}

document.addEventListener('DOMContentLoaded', function() {
    startTypingAnimation(); // Initial call to start the animation
});
