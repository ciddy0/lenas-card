const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas()

// Generate random stars
const stars = Array.from({ length: 200}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3,
    alpha: Math.random() * 0.5 * 0.4,
    alphaDirection: Math.random() > 0.5 ? 1 : -1
}));

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'pink';

    stars.forEach(star => {
        // Create a radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0, // Start at star's center
            star.x, star.y, star.radius * 3 // End radius larger for glow
        );
        gradient.addColorStop(0, `rgba(255, 182, 193, ${star.alpha})`); // Light pink
        gradient.addColorStop(1, 'rgba(255, 182, 193, 0)'); // Fade to transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    drawStars();
    stars.forEach(star => {
        // Create a glowing effect by oscillating the alpha value
        star.alpha += star.alphaDirection * 0.01;
        if (star.alpha >= 1 || star.alpha <= 0) {
            star.alphaDirection *= -1; // Reverse direction when hitting bounds
        }
    });
    requestAnimationFrame(animate);
}
animate();

document.getElementById('play-button').addEventListener('click', function() {
    var audio = document.getElementById('audio');
    var button = document.getElementById('play-button');

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
})