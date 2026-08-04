// =====================================
// SAP GO LIVE COUNTDOWN
// =====================================

const targetDate = new Date("August 10, 2026 09:00:00").getTime();

const countdown = document.getElementById("countdown");
const success = document.getElementById("success");
const flash = document.getElementById("flash");

let celebrationStarted = false;

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance <= 0) {

        clearInterval(timer);

        startCelebration();

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    countdown.innerHTML =

        `${String(days).padStart(2, "0")}d
         ${String(hours).padStart(2, "0")}h
         ${String(minutes).padStart(2, "0")}m
         ${String(seconds).padStart(2, "0")}s`;

}, 1000);


// =====================================
// CELEBRATION
// =====================================

function startCelebration() {

    if (celebrationStarted) return;

    celebrationStarted = true;

    // Flash

    flash.classList.add("flash");

    // Fade timer

    countdown.classList.add("fadeOut");

    // Green background pulse

    document.body.animate(

        [
            { background: "#05070d" },
            { background: "#0d5d35" },
            { background: "#05070d" }
        ],

        {
            duration: 1500
        }

    );

    // Wait then show success

    setTimeout(() => {

        countdown.style.display = "none";

        success.classList.remove("hidden");

        // Launch effects

        if (typeof startConfetti === "function") {

            startConfetti();

        }

        if (typeof startFireworks === "function") {

            startFireworks();

        }

        if (typeof startParticles === "function") {

            startParticles();

        }

    }, 1200);

}


// =====================================
// TEST BUTTON
// =====================================
//
// To test without waiting until Monday:
//
// Open browser console (F12)
//
// Type:
//
// startCelebration();
//
// Press Enter.
//
// The celebration will start immediately.
//