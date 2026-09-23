/* =========================================================
   GUEST NAME
========================================================= */

/*
   Contoh URL:

   index.html?to=Bapak%20Andi

   Hasil:
   Kepada Yth.
   Bapak Andi
*/

(function () {

    var params = new URLSearchParams(window.location.search);

    var guest = params.get("to");

    var guestElement =
        document.getElementById("guestName");

    if (guest && guestElement) {

        guestElement.innerHTML =
            decodeURIComponent(guest);

    }

})();


/* =========================================================
   OPEN INVITATION
========================================================= */

var openButton =
    document.getElementById("openInvitation");

var opening =
    document.getElementById("opening");

var mainContent =
    document.getElementById("mainContent");

if (openButton) {

    openButton.addEventListener(
        "click",
        function () {

            opening.classList.add("hide");

            mainContent.classList.remove("d-none");

            document.body.style.overflow = "auto";

            setTimeout(
                function () {

                    opening.style.display = "none";

                },
                900
            );

        }
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

/*
   Format:

   YYYY-MM-DD HH:MM:SS

   Ganti sesuai tanggal pernikahan.
*/

var weddingDate =
    new Date("October 01, 2026 08:00:00").getTime();


function updateCountdown() {

    var now =
        new Date().getTime();

    var distance =
        weddingDate - now;


    if (distance < 0) {

        document.getElementById("days").innerHTML = "00";

        document.getElementById("hours").innerHTML = "00";

        document.getElementById("minutes").innerHTML = "00";

        document.getElementById("seconds").innerHTML = "00";

        return;

    }


    var days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    var hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    var minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    var seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").innerHTML =
        formatNumber(days);

    document.getElementById("hours").innerHTML =
        formatNumber(hours);

    document.getElementById("minutes").innerHTML =
        formatNumber(minutes);

    document.getElementById("seconds").innerHTML =
        formatNumber(seconds);

}


function formatNumber(number) {

    if (number < 10) {

        return "0" + number;

    }

    return number;

}


setInterval(
    updateCountdown,
    1000
);

updateCountdown();


/* =========================================================
   COPY ACCOUNT
========================================================= */

function copyAccount() {

    var account =
        document.getElementById(
            "accountNumber"
        ).innerText;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(
            account
        ).then(
            function () {

                showCopyMessage();

            }
        );

    } else {

        var textarea =
            document.createElement("textarea");

        textarea.value = account;

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand(
            "copy"
        );

        document.body.removeChild(
            textarea
        );

        showCopyMessage();

    }

}


function showCopyMessage() {

    var message =
        document.getElementById(
            "copyMessage"
        );

    message.style.display = "block";

    setTimeout(
        function () {

            message.style.display = "none";

        },
        2500
    );

}


/* =========================================================
   RSVP
========================================================= */

var rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            var success =
                document.getElementById(
                    "rsvpSuccess"
                );

            success.classList.remove(
                "d-none"
            );

            rsvpForm.reset();

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

var backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    function () {

        if (
            document.documentElement.scrollTop >
            500
        ) {

            backTop.style.display =
                "block";

        } else {

            backTop.style.display =
                "none";

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo(
                0,
                0
            );

        }
    );

}


/* =========================================================
   NAVBAR AUTO CLOSE MOBILE
========================================================= */

var navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

var navbarCollapse =
    document.querySelector(
        ".navbar-collapse"
    );


for (
    var i = 0;
    i < navLinks.length;
    i++
) {

    navLinks[i].addEventListener(
        "click",
        function () {

            if (
                navbarCollapse.classList.contains(
                    "show"
                )
            ) {

                var bsCollapse =
                    new bootstrap.Collapse(
                        navbarCollapse,
                        {
                            toggle: true
                        }
                    );

                bsCollapse.hide();

            }

        }
    );

}

// Fungsi untuk memicu animasi saat elemen muncul di layar (scroll)
function initScrollAnimation() {
    const animatedItems = document.querySelectorAll('.animate-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Beri sedikit jeda delay antar item jika tampil bersamaan
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100); 

                // Hentikan pemantauan elemen yang sudah muncul
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Animasi berjalan saat 15% bagian elemen sudah masuk ke layar
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });
}
/* =========================================================
   OPEN INVITATION & MUSIC & SCROLL ANIMATION
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicButton');
    let isPlaying = false;

    // Fungsi Toggle Play / Pause Audio
    function toggleMusic() {
        if (!bgMusic) return;
        
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
            }).catch(err => console.log('Audio gagal diputar:', err));
        }
        isPlaying = !isPlaying;
    }

    // Aksi Klik Buka Undangan
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            // 1. Animasi Fade-Out pada sampul opening
            if (opening) {
                opening.classList.add('hide');
                opening.classList.add('fade-out');
            }

            // 2. Putar Musik saat Buka Undangan
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (musicBtn) musicBtn.classList.add('playing');
                }).catch(err => console.log('Autoplay diblokir browser:', err));
            }

            // 3. Tampilkan Konten Utama
            if (mainContent) {
                mainContent.classList.remove('d-none');
                mainContent.classList.add('fade-in');
            }
            document.body.style.overflow = "auto";

            // Sembunyikan opening setelah transisi selesai
            setTimeout(function () {
                if (opening) opening.style.display = "none";
            }, 800);

            // Jalankan animasi scroll
            initScrollAnimation();
        });
    }

    // Toggle Musik lewat Tombol Floating
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
});

/* =========================================================
   BACK TO TOP
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
        window.scrollTo(0, 0);
    });
}


/* =========================================================
   NAVBAR AUTO CLOSE MOBILE
========================================================= */
var navLinks = document.querySelectorAll(".nav-link");
var navbarCollapse = document.querySelector(".navbar-collapse");

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
            bsCollapse.hide();
        }
    });
}
