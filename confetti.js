// ===========================================
// PROFESSIONAL CONFETTI
// ===========================================

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

let confetti = [];

const colors = [
    "#FFD700", // Gold
    "#00FF99", // Green
    "#FFFFFF", // White
    "#4CAF50",
    "#FFC107"
];

function createConfetti() {

    for (let i = 0; i < 250; i++) {

        confetti.push({

            x: Math.random() * confettiCanvas.width,

            y: -Math.random() * confettiCanvas.height,

            w: Math.random() * 12 + 5,

            h: Math.random() * 12 + 5,

            color: colors[Math.floor(Math.random() * colors.length)],

            speed: Math.random() * 4 + 2,

            tilt: Math.random() * 10,

            angle: Math.random() * Math.PI

        });

    }

}

function drawConfetti() {

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    confetti.forEach(c => {

        confettiCtx.save();

        confettiCtx.translate(c.x, c.y);

        confettiCtx.rotate(c.angle);

        confettiCtx.fillStyle = c.color;

        confettiCtx.fillRect(
            -c.w / 2,
            -c.h / 2,
            c.w,
            c.h
        );

        confettiCtx.restore();

        c.y += c.speed;

        c.x += Math.sin(c.angle);

        c.angle += 0.02;

        if (c.y > confettiCanvas.height + 20) {

            c.y = -20;

            c.x = Math.random() * confettiCanvas.width;

        }

    });

    requestAnimationFrame(drawConfetti);

}

function startConfetti() {

    createConfetti();

    drawConfetti();

}