
/* =========================================================
   GUEST NAME
========================================================= */

(function () {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("to");
    const guestElement = document.getElementById("guestName");

    if (guest && guestElement) {
        guestElement.textContent = guest;
    }
})();


/* =========================================================
   OPEN INVITATION
========================================================= */

const openButton = document.getElementById("openInvitation");
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

if (openButton) {
    openButton.addEventListener("click", function () {
        if (opening) opening.classList.add("hide");
        if (mainContent) mainContent.classList.remove("d-none");

        document.body.style.overflow = "auto";

        setTimeout(function () {
            if (opening) opening.style.display = "none";
        }, 900);
    });
}


/* =========================================================
   COUNTDOWN
========================================================= */

// Tanggal resepsi: 1 Oktober 2026 pukul 08.00 WIB
const weddingDate = new Date("October 01, 2026 08:00:00 GMT+0700").getTime();

function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (distance <= 0) {
        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElement) daysElement.textContent = formatNumber(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================================
   COPY ACCOUNT
========================================================= */

function copyAccount() {
    const accountElement = document.getElementById("accountNumber");

    if (!accountElement) return;

    const account = accountElement.innerText.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(account)
            .then(showCopyMessage)
            .catch(function () {
                fallbackCopy(account);
            });
    } else {
        fallbackCopy(account);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand("copy");
        showCopyMessage();
    } catch (error) {
        console.error("Gagal menyalin nomor rekening:", error);
    }

    document.body.removeChild(textarea);
}

function showCopyMessage() {
    const message = document.getElementById("copyMessage");

    if (!message) return;

    message.style.display = "block";

    setTimeout(function () {
        message.style.display = "none";
    }, 2500);
}


/* =========================================================
   RSVP
========================================================= */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const success = document.getElementById("rsvpSuccess");

        if (success) {
            success.classList.remove("d-none");
        }

        rsvpForm.reset();
    });
}


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function () {
    if (!backTop) return;

    if (document.documentElement.scrollTop > 500) {
        backTop.style.display = "block";
    } else {
        backTop.style.display = "none";
    }
});

if (backTop) {
    backTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   NAVBAR AUTO CLOSE MOBILE
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show") &&
            typeof bootstrap !== "undefined"
        ) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.hide();
        }
    });
});


/* =========================================================
   SCROLL ANIMATION
========================================================= */

function initScrollAnimation() {
    const animatedItems = document.querySelectorAll(".animate-item");

    if (!("IntersectionObserver" in window)) {
        animatedItems.forEach(function (item) {
            item.classList.add("show");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add("show");
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedItems.forEach(function (item) {
        observer.observe(item);
    });
}

document.addEventListener("DOMContentLoaded", initScrollAnimation);


/* =========================================================
   MUSIC PLAYER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const openingScreen = document.getElementById("opening");
    const content = document.getElementById("mainContent");
    const openBtn = document.getElementById("openInvitation");
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicButton");

    let isPlaying = false;

    /*
       Memulai musik dari detik ke-9.
       currentTime diatur sebelum audio diputar.
    */
    async function playMusic() {
        if (!bgMusic) return;

        try {
            // Pastikan durasi audio tersedia sebelum mengatur posisi.
            if (bgMusic.readyState === 0) {
                await new Promise(function (resolve) {
                    bgMusic.addEventListener("loadedmetadata", resolve, {
                        once: true
                    });
                    bgMusic.load();
                });
            }

            const startAt = 9;

            if (Number.isFinite(bgMusic.duration) && bgMusic.duration > 0) {
                bgMusic.currentTime = Math.min(startAt, Math.max(0, bgMusic.duration - 0.1));
            } else {
                bgMusic.currentTime = startAt;
            }

            await bgMusic.play();

            isPlaying = true;

            if (musicBtn) {
                musicBtn.classList.add("playing");
            }
        } catch (error) {
            console.log("Musik tidak dapat diputar:", error);
            isPlaying = false;

            if (musicBtn) {
                musicBtn.classList.remove("playing");
            }
        }
    }

    function pauseMusic() {
        if (!bgMusic) return;

        bgMusic.pause();
        isPlaying = false;

        if (musicBtn) {
            musicBtn.classList.remove("playing");
        }
    }

    function toggleMusic() {
        if (!bgMusic) return;

        if (isPlaying) {
            pauseMusic();
        } else {
            /*
              Saat tombol play ditekan kembali setelah pause,
              musik dilanjutkan dari posisi terakhir.
            */
            bgMusic.play()
                .then(function () {
                    isPlaying = true;

                    if (musicBtn) {
                        musicBtn.classList.add("playing");
                    }
                })
                .catch(function (error) {
                    console.log("Musik tidak dapat diputar:", error);
                });
        }
    }

    // Tombol buka undangan sekaligus memulai musik dari detik ke-9.
    if (openBtn) {
        openBtn.addEventListener("click", function () {
            if (openingScreen) {
                openingScreen.classList.add("fade-out");
            }

            playMusic();

            setTimeout(function () {
                if (openingScreen) {
                    openingScreen.classList.add("d-none");
                }

                if (content) {
                    content.classList.remove("d-none");
                    content.classList.add("fade-in");
                }
            }, 800);
        });
    }

    // Tombol musik mengatur play dan pause.
    if (musicBtn) {
        musicBtn.addEventListener("click", toggleMusic);
    }

    // Sinkronkan status tombol jika audio berubah dari kontrol lain.
    if (bgMusic) {
        bgMusic.addEventListener("play", function () {
            isPlaying = true;
            if (musicBtn) musicBtn.classList.add("playing");
        });

        bgMusic.addEventListener("pause", function () {
            isPlaying = false;
            if (musicBtn) musicBtn.classList.remove("playing");
        });

        bgMusic.addEventListener("ended", function () {
            isPlaying = false;
            if (musicBtn) musicBtn.classList.remove("playing");
        });
    }
});
