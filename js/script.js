/* =========================================================
   UNDANGAN FIRMAN & PUTRI — JavaScript
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector, root = document) => root.querySelector(selector);

    const opening = $("#opening");
    const openButton = $("#openInvitation");
    const mainContent = $("#mainContent");
    const bgMusic = $("#bgMusic");
    const musicButton = $("#musicButton");
    const backTop = $("#backTop");

    // Nama tamu dari URL: ?to=Nama%20Tamu. Gunakan textContent untuk keamanan.
    const guestName = $("#guestName");
    const guest = new URLSearchParams(window.location.search).get("to");
    if (guest && guestName) guestName.textContent = guest.trim().slice(0, 120);

    // Cegah halaman bergulir di belakang sampul.
    document.body.style.overflow = opening ? "hidden" : "auto";

    let musicPlaying = false;
    const setMusicState = (playing) => {
        musicPlaying = playing;
        musicButton?.classList.toggle("playing", playing);
        musicButton?.setAttribute("aria-pressed", String(playing));
        musicButton?.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
        const icon = $("i", musicButton || document.createElement("button"));
        if (icon) icon.className = playing ? "bi bi-pause-fill" : "bi bi-music-note";
    };

    const playMusic = async () => {
        if (!bgMusic) return;
        try {
            await bgMusic.play();
            setMusicState(true);
        } catch (error) {
            setMusicState(false);
            console.warn("Musik tidak dapat diputar. Periksa file assets/audio.mp3 dan izin browser.", error);
        }
    };

    const pauseMusic = () => {
        bgMusic?.pause();
        setMusicState(false);
    };

    // Audio bisa dihentikan oleh browser/perangkat; sinkronkan tombol dengan kondisi nyata.
    bgMusic?.addEventListener("pause", () => setMusicState(false));
    bgMusic?.addEventListener("play", () => setMusicState(true));
    musicButton?.addEventListener("click", () => musicPlaying ? pauseMusic() : playMusic());

    // Satu-satunya handler untuk membuka sampul; klik merupakan gestur pengguna agar audio diizinkan.
    openButton?.addEventListener("click", async () => {
        if (opening) {
            opening.classList.add("hide");
            opening.setAttribute("aria-hidden", "true");
        }
        mainContent?.classList.remove("d-none");
        mainContent?.classList.add("fade-in");
        document.body.style.overflow = "auto";
        await playMusic();
        window.setTimeout(() => {
            if (opening) opening.style.display = "none";
        }, 850);
    });

    // Countdown dengan zona waktu WIB (UTC+7), tanggal resepsi 1 Oktober 2026 pukul 08.00.
    const weddingTime = new Date("2026-10-01T08:00:00+07:00").getTime();
    const twoDigits = (value) => String(value).padStart(2, "0");
    const updateCountdown = () => {
        const ids = ["days", "hours", "minutes", "seconds"];
        const nodes = ids.map(id => $("#" + id));
        if (nodes.some(node => !node)) return;

        const remaining = weddingTime - Date.now();
        if (remaining <= 0) {
            nodes.forEach(node => node.textContent = "00");
            return;
        }
        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        [String(days).padStart(2, "0"), twoDigits(hours), twoDigits(minutes), twoDigits(seconds)]
            .forEach((value, index) => nodes[index].textContent = value);
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);

    // Salin rekening dengan fallback untuk browser lama/non-secure context.
    window.copyAccount = async () => {
        const account = $("#accountNumber")?.textContent?.trim();
        const message = $("#copyMessage");
        if (!account || !message) return;
        let copied = false;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(account);
                copied = true;
            }
        } catch (_) { /* lanjut ke fallback */ }

        if (!copied) {
            const temporary = document.createElement("textarea");
            temporary.value = account;
            temporary.setAttribute("readonly", "");
            temporary.style.position = "fixed";
            temporary.style.opacity = "0";
            document.body.appendChild(temporary);
            temporary.select();
            try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
            temporary.remove();
        }
        message.textContent = copied
            ? "Nomor rekening berhasil disalin."
            : "Gagal menyalin otomatis. Silakan salin nomor rekening secara manual.";
        message.style.display = "block";
        window.setTimeout(() => { message.style.display = "none"; }, 3000);
    };

    // RSVP saat ini hanya validasi dan umpan balik lokal; belum mengirim data ke siapa pun.
    const rsvpForm = $("#rsvpForm");
    rsvpForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!rsvpForm.reportValidity()) return;
        const success = $("#rsvpSuccess");
        if (success) {
            success.classList.remove("d-none");
            success.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        rsvpForm.reset();
    });

    // Tombol kembali ke atas.
    const updateBackTop = () => {
        if (backTop) backTop.style.display = window.scrollY > 500 ? "block" : "none";
    };
    window.addEventListener("scroll", updateBackTop, { passive: true });
    updateBackTop();
    backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Tutup navbar Bootstrap pada layar kecil setelah memilih tautan.
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const collapse = $("#navbarWedding");
            if (collapse?.classList.contains("show") && window.bootstrap?.Collapse) {
                window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
            }
        });
    });

    // Animasi saat elemen masuk viewport, dengan fallback jika IntersectionObserver tidak tersedia.
    const animatedItems = document.querySelectorAll(".animate-item");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animatedItems.forEach(item => observer.observe(item));
    } else {
        animatedItems.forEach(item => item.classList.add("show"));
    }

    // Lightbox galeri Bootstrap.
    document.querySelectorAll(".gallery img[data-bs-target='#imageModal']").forEach(image => {
        image.addEventListener("click", () => {
            const modalImage = $("#modalImage");
            if (modalImage) {
                modalImage.src = image.currentSrc || image.src;
                modalImage.alt = image.alt || "Foto galeri";
            }
        });
    });
});
