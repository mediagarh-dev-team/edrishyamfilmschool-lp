AOS.init({
    duration: 800,   // animation length in ms
    once: true,      // animate only the first time it scrolls into view
    offset: 80,      // trigger a bit before the element is fully visible
    easing: "ease-out-cubic",
});
(function () {
    const slider = document.getElementById("learnSlider");
    const track = document.getElementById("learnTrack");
    if (!slider || !track) return;

    const cards = Array.from(track.children);
    const total = cards.length;

    const prevBtn = document.getElementById("learnPrev");
    const nextBtn = document.getElementById("learnNext");
    const rangeEl = document.getElementById("learnRange");
    const fillEl = document.getElementById("learnFill");
    const totalEl = document.getElementById("learnTotal");

    const pad = (n) => String(n).padStart(2, "0");

    let index = 0;       // index of the first visible card
    let perView = 3;
    let cardW = 0;
    let gap = 20;

    function getPerView() {
        const w = window.innerWidth;
        if (w >= 992) return 3;
        if (w >= 576) return 2;
        return 1;
    }

    function layout() {
        perView = getPerView();
        gap = parseFloat(getComputedStyle(track).columnGap) || 20;

        const width = slider.clientWidth;
        cardW = (width - gap * (perView - 1)) / perView;
        cards.forEach((c) => (c.style.flex = "0 0 " + cardW + "px"));

        // keep index on a clean page boundary after resize
        index = Math.min(Math.round(index / perView) * perView, total - perView);
        index = Math.max(index, 0);
        update();
    }

    function update() {
        track.style.transform = "translateX(" + -(index * (cardW + gap)) + "px)";

        cards.forEach((c, i) => c.classList.toggle("is-active", i >= index && i < index + perView));

        const start = index + 1;
        const end = Math.min(index + perView, total);

        if (rangeEl) rangeEl.textContent = perView === 1 ? pad(start) : pad(start) + " – " + pad(end);
        if (fillEl) fillEl.style.width = (end / total) * 100 + "%";
        if (totalEl) totalEl.textContent = pad(total);

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= total - perView;
    }

    function next() {
        index = Math.min(index + perView, total - perView);
        update();
    }

    function prev() {
        index = Math.max(index - perView, 0);
        update();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // touch / mouse swipe
    let startX = null;
    slider.addEventListener("pointerdown", (e) => (startX = e.clientX));
    window.addEventListener("pointerup", (e) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
        startX = null;
    });

    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    layout();

    const CARD = document.querySelectorAll(".media-card");
    const canHover = window.matchMedia("(hover: hover)").matches;

    function setIcon(card, playing) {
        const icon = card.querySelector(".media-play i");
        if (!icon) return;
        icon.classList.toggle("fa-pause", playing);
        icon.classList.toggle("fa-play", !playing);
    }

    function stopCard(card) {
        const video = card.querySelector(".media-video");
        card.classList.remove("is-playing");
        video.pause();
        video.currentTime = 0;
        setIcon(card, false);
    }

    function playCard(card) {
        // only one video at a time
        CARD.forEach((c) => {
            if (c !== card) stopCard(c);
        });

        const video = card.querySelector(".media-video");
        card.classList.add("is-playing");
        setIcon(card, true);

        video.muted = false;
        video.volume = 1;

        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                // browser blocked sound (no click on the page yet) -> play muted instead
                video.muted = true;
                video.play().catch(() => { });
            });
        }
    }

    // after the visitor's first click/tap anywhere, unmute whatever is playing
    window.addEventListener(
        "pointerdown",
        () => {
            document.querySelectorAll(".media-video").forEach((v) => {
                if (!v.paused) v.muted = false;
            });
        },
        { once: true }
    );

    CARD.forEach((card) => {
        if (canHover) {
            // DESKTOP: hover to play, leave to stop
            card.addEventListener("mouseenter", () => playCard(card));
            card.addEventListener("mouseleave", () => stopCard(card));
        } else {
            // MOBILE / TABLET: play button toggles play and pause
            const btn = card.querySelector(".media-play");
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (card.classList.contains("is-playing")) {
                    stopCard(card);
                } else {
                    playCard(card);   // this also stops any other playing video
                }
            });
        }
    });

    // stop the video if the tile scrolls out of view (saves data and battery)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) stopCard(entry.target);
            });
        },
        { threshold: 0.2 }
    );
    CARD.forEach((card) => observer.observe(card));
})();