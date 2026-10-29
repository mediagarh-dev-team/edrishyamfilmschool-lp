document.querySelectorAll(".faq-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-toggle").forEach((item) => {
      const answer = document.getElementById(item.getAttribute("aria-controls"));
      const isExpanded = item === toggle && !expanded;

      item.setAttribute("aria-expanded", String(isExpanded));
      answer.hidden = !isExpanded;
    });

  });
});

const facultySlider = document.querySelector(".faculty-section-card");

if (facultySlider) {
  const facultySlides = [
    {
      name: "Vishal Sangwai",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (1).webp",
      alt: "figure",
    },
    {
      name: "Sunil Saigal",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (2).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Shrikant Sir",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (3).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Rohit Sir",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (4).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Mangesh Sawant",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (5).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Madhav Chirmuley",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (6).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Durgesh Sir",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (7).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Dilip Yande",
      role: "Head of Cinematography",
      expertise: "Direction, Cinematography",
      experience: "12+ years shooting ad films, documentaries and short films",
      credits: "Cinematographer on 6 festival-screened short films",
      image: "image/Figure-4 (8).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Sanjay Jadhav",
      role: "Faculty, Cinematography",
      expertise: "Cinematography",
      experience: "10+ years shooting ad films, documentaries and short films",
      credits: "Director of photography on festival-screened short films",
      image: "image/Image (placment) (4).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Shrikanth Bhelkar",
      role: "Faculty, Direction",
      expertise: "Direction",
      experience: "10+ years directing ad films, documentaries and short films",
      credits: "Directed short films screened at film festivals",
      image: "image/Image (placment) (1).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Tejas Nerurkar",
      role: "Faculty, Photography",
      expertise: "Photography",
      experience: "10+ years in commercial, portrait and product photography",
      credits: "Photographer for brand campaigns and photo exhibitions",
      image: "image/Image (placment) (2).webp",
      alt: "Vishal Sangwai working with a cinema camera",
    },
    {
      name: "Ashish Mhatre",
      role: "Faculty, Editing",
      expertise: "Editing",
      experience: "10+ years editing films, ad films and web content",
      credits: "Editor on short films, documentaries and brand videos",
      image: "image/Image (placment) (3).webp",
      alt: "Tejas Nerurkar, faculty member for photography",
    },
  ];
  const portrait = facultySlider.querySelector(".faculty-portrait img");
  const profile = facultySlider.querySelector(".faculty-profile");
  const slideCount = facultySlider.querySelector(".faculty-slide-count");
  const previousButton = facultySlider.querySelector('[aria-label="Previous faculty profile"]');
  const nextButton = facultySlider.querySelector('[aria-label="Next faculty profile"]');
  const profileName = profile.querySelector("h3");
  const profileRole = profile.querySelector(".faculty-role");
  const profileDetails = profile.querySelectorAll(".faculty-detail p");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeSlide = 0;
  let transitionTimeout;
  let autoplay;

  const showFacultySlide = (nextIndex) => {
    if (facultySlider.classList.contains("is-transitioning")) {
      return;
    }

    activeSlide = (nextIndex + facultySlides.length) % facultySlides.length;
    const slide = facultySlides[activeSlide];

    if (motionPreference.matches) {
      updateFacultySlide(slide);
      return;
    }

    facultySlider.classList.add("is-transitioning");
    window.clearTimeout(transitionTimeout);
    transitionTimeout = window.setTimeout(() => {
      updateFacultySlide(slide);
      facultySlider.classList.remove("is-transitioning");
      profile.classList.add("is-content-entering");
      window.setTimeout(() => profile.classList.remove("is-content-entering"), 500);
    }, 400);
  };

  const updateFacultySlide = (slide) => {
    portrait.src = slide.image;
    portrait.alt = slide.alt;
    profileName.textContent = slide.name;
    profileRole.textContent = slide.role;
    if (profileDetails.length) {
      profileDetails[0].textContent = slide.expertise;
      profileDetails[1].textContent = slide.experience;
      profileDetails[2].textContent = slide.credits;
    }
    slideCount.firstChild.textContent = `${String(activeSlide + 1).padStart(2, "0")} `;
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplay);
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (
      !motionPreference.matches
      && !document.hidden
      && !facultySlider.matches(":hover")
      && !facultySlider.contains(document.activeElement)
    ) {
      autoplay = window.setInterval(() => {
        showFacultySlide(activeSlide + 1);
      }, 6000);
    }
  };

  previousButton.addEventListener("click", () => {
    showFacultySlide(activeSlide - 1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    showFacultySlide(activeSlide + 1);
    startAutoplay();
  });

  facultySlider.addEventListener("mouseenter", stopAutoplay);
  facultySlider.addEventListener("mouseleave", startAutoplay);
  facultySlider.addEventListener("focusin", stopAutoplay);
  facultySlider.addEventListener("focusout", (event) => {
    if (!facultySlider.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });
  document.addEventListener("visibilitychange", startAutoplay);
  motionPreference.addEventListener("change", startAutoplay);

  startAutoplay();
}

const scrollMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollRevealTargets = document.querySelectorAll([
  ".faculty-intro > *",
  ".faculty-portrait",
  ".faculty-profile",
  ".workshops-layout-contant > *",
  ".workshops-layout-img",
  ".workshops-marquee-group:not([aria-hidden='true']) .workshops-event-card",
  ".why-choose-header > *",
  ".why-choose-card",
  ".faq-card-tag",
  ".faq-heading",
  ".faq-item",
  ".footer-layouts-contants > *",
  ".footer-layouts-cta > *",
  ".footer-copyright > *",
].join(", "));

if (scrollRevealTargets.length && "IntersectionObserver" in window && !scrollMotionPreference.matches) {
  const revealDelayByGroup = new Map();
  const sectionRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-scroll-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  });

  scrollRevealTargets.forEach((target) => {
    const group = target.parentElement;
    const delay = revealDelayByGroup.get(group) || 0;
    target.style.setProperty("--scroll-reveal-delay", `${Math.min(delay, 450)}ms`);
    revealDelayByGroup.set(group, delay + 90);
    target.classList.add("scroll-reveal");
    sectionRevealObserver.observe(target);
  });

  scrollMotionPreference.addEventListener("change", (event) => {
    if (event.matches) {
      sectionRevealObserver.disconnect();
      scrollRevealTargets.forEach((target) => target.classList.add("is-scroll-visible"));
    }
  });
}