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
document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicButton');
    const openBtn = document.getElementById('openInvitation');
    let isPlaying = false;

    // Fungsi Play / Pause Audio
    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    // Putar musik otomatis saat tombol "Buka Undangan" diklik
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            bgMusic.play();
            isPlaying = true;
            musicBtn.classList.add('playing');
        });
    }

    // Toggle musik lewat tombol floating
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
});