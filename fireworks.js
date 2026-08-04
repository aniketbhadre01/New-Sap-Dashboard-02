// ==========================================
// PROFESSIONAL FIREWORKS
// ==========================================

const fireCanvas = document.getElementById("fireworkCanvas");
const fireCtx = fireCanvas.getContext("2d");

fireCanvas.width = window.innerWidth;
fireCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    fireCanvas.width = window.innerWidth;
    fireCanvas.height = window.innerHeight;

});

let fireworks = [];

class Firework {

    constructor() {

        this.x = Math.random() * fireCanvas.width;
        this.y = fireCanvas.height;

        this.targetY = Math.random() * (fireCanvas.height / 2);

        this.color = `hsl(${Math.random() * 360},100%,60%)`;

        this.exploded = false;

        this.particles = [];

    }

    update() {

        if (!this.exploded) {

            this.y -= 8;

            fireCtx.beginPath();

            fireCtx.arc(this.x, this.y, 4, 0, Math.PI * 2);

            fireCtx.fillStyle = this.color;

            fireCtx.fill();

            if (this.y <= this.targetY) {

                this.explode();

            }

        }

        this.particles.forEach((p, index) => {

            p.x += p.vx;
            p.y += p.vy;

            p.life--;

            fireCtx.beginPath();

            fireCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);

            fireCtx.fillStyle = this.color;

            fireCtx.fill();

            if (p.life <= 0) {

                this.particles.splice(index, 1);

            }

        });

    }

    explode() {

        this.exploded = true;

        for (let i = 0; i < 80; i++) {

            const angle = Math.random() * Math.PI * 2;

            const speed = Math.random() * 6;

            this.particles.push({

                x: this.x,
                y: this.y,

                vx: Math.cos(angle) * speed,

                vy: Math.sin(angle) * speed,

                life: 70

            });

        }

    }

}

function animateFireworks() {

    fireCtx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);

    fireworks.forEach((fw, index) => {

        fw.update();

        if (fw.exploded && fw.particles.length === 0) {

            fireworks.splice(index, 1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

function startFireworks() {

    animateFireworks();

    setInterval(() => {

        fireworks.push(new Firework());

    }, 700);

}
