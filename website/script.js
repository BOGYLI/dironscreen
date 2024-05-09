let mediaList = [];
let currentIndex = 0;

async function fetchMediaList() {
    const response = await fetch('/api/media');
    mediaList = await response.json();
}

function displayMedia() {
    if (mediaList.length === 0) return;

    const media = mediaList[currentIndex];
    const imgElement = document.getElementById('image-display');
    const videoElement = document.getElementById('video-display');

    // Entfernen Sie die fade-in Klasse
    imgElement.classList.remove('fade-in');
    videoElement.classList.remove('fade-in');

    if (media.type === 'image') {
        imgElement.src = media.src;
        imgElement.style.display = 'block';
        videoElement.style.display = 'none';

        // Fügen Sie eine kurze Verzögerung ein, damit der Effekt besser sichtbar wird
        setTimeout(() => imgElement.classList.add('fade-in'), 10);

        setTimeout(displayNext, 5000); // Anzeigeintervall für Bilder
    } else if (media.type === 'video') {
        videoElement.src = media.src;
        videoElement.style.display = 'block';
        imgElement.style.display = 'none';
        videoElement.load();
        videoElement.muted = true; // Optional: Ton stummschalten, um Autoplay-Einschränkungen zu umgehen
        videoElement.play(); // Automatisch abspielen

        // Übergang aktivieren
        setTimeout(() => videoElement.classList.add('fade-in'), 10);

        videoElement.onended = displayNext; // Weiter zum nächsten Medium nach dem Videoende
    }
}

function displayNext() {
    currentIndex = (currentIndex + 1) % mediaList.length;
    displayMedia();
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchMediaList();
    displayMedia();
});
