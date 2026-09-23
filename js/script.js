/* =========================================================
   GUEST NAME (Ambil Nama Tamu dari URL)
========================================================= */
(function () {
    var params = new URLSearchParams(window.location.search);
    var guest = params.get("to");
    var guestElement = document.getElementById("guestName");

    if (guest && guestElement) {
        guestElement.innerHTML = decodeURIComponent(guest);
    }
})();


/* =========================================================
   COUNTDOWN TIMER
========================================================= */
var weddingDate = new Date("October 01, 2026 08:00:00").getTime();

function updateCountdown() {
    var now = new Date().getTime();
    var distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = formatNumber(days);
    document.getElementById("hours").innerHTML = formatNumber(hours);
    document.getElementById("minutes").innerHTML = formatNumber(minutes);
    document.getElementById("seconds").innerHTML = formatNumber(seconds);
}

function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}

setInterval(updateCountdown, 1000);
updateCountdown();


/* =========================================================
   COPY ACCOUNT NUMBER
========================================================= */
function copyAccount() {
    var accountElement = document.getElementById("accountNumber");
    if (!accountElement) return;

    var account = accountElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(account).then(function () {
            showCopyMessage();
        }).catch(function () {
            fallbackCopy(account);
        });
    } else {
        fallbackCopy(account);
    }
}

function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showCopyMessage();
}

function showCopyMessage() {
    var message = document.getElementById("copyMessage");
    if (message) {
        message.style.display = "block";
        setTimeout(function () {
            message.style.display = "none";
        }, 2500);
    }
}


/* =========================================================
   SCROLL ANIMATION (INTERSECTION OBSERVER)
========================================================= */
function initScrollAnimation() {
    const animatedItems = document.querySelectorAll('.animate-item');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target); // Hentikan pemantauan setelah muncul
            }
        });
    }, {
        threshold: 0.15 // Bekerja ketika 15% bagian elemen masuk layar
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });
}


/* =========================================================
   MAIN INITIALIZATION (OPEN INVITATION & MUSIC CONTROL)
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openInvitation');
    const musicBtn = document.getElementById('musicButton');
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');
    const navbar = document.querySelector('.wedding-navbar');

    // 1. Inisialisasi Audio langsung via JavaScript Object
    const audio = new Audio('./assets/audio.mp3');
    audio.loop = true;
    let isPlaying = false;

    // Fungsi Toggle Musik
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            if (musicBtn) musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            audio.play().then(() => {
                if (musicBtn) musicBtn.classList.add('playing');
                isPlaying = true;
            }).catch(err => console.log("Gagal play:", err));
        }
    }

    // 2. Event Klik Buka Undangan
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            // Putar lagu langsung saat diklik
            audio.play().then(() => {
                isPlaying = true;
                if (musicBtn) musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("Autoplay diblokir:", err);
            });

            // Animasi Transisi Undangan
            if (opening) opening.classList.add('fade-out');
            if (mainContent) {
                mainContent.classList.remove('d-none');
                mainContent.classList.add('fade-in');
            }
            if (navbar) {
                navbar.classList.remove('d-none');
                navbar.classList.add('fade-in');
            }

            document.body.style.overflow = "auto";

            setTimeout(function () {
                if (opening) opening.style.display = "none";
            }, 800);

            if (typeof initScrollAnimation === 'function') {
                initScrollAnimation();
            }
        });
    }

    // Event Tombol Musik Floating
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
});


    /* =========================================================
       RSVP FORM HANDLING
    ========================================================= */
    var rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var success = document.getElementById("rsvpSuccess");
            if (success) success.classList.remove("d-none");
            rsvpForm.reset();
        });
    }


    /* =========================================================
       BACK TO TOP BUTTON
    ========================================================= */
    var backTop = document.getElementById("backTop");
    window.addEventListener("scroll", function () {
        if (document.documentElement.scrollTop > 500) {
            if (backTop) backTop.style.display = "block";
        } else {
            if (backTop) backTop.style.display = "none";
        }
    });

    if (backTop) {
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* =========================================================
       NAVBAR AUTO CLOSE MOBILE
    ========================================================= */
    var navLinks = document.querySelectorAll(".nav-link");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
                bsCollapse.hide();
            }
        });
    });
});
