// ========================================
// AOS INIT
// ========================================

AOS.init({
  duration: 1000,
  once: true
});

// ========================================
// MODAL ELEMENTS
// ========================================

const modal = document.getElementById("projectModal");

const projectVideo = document.getElementById("projectVideo");

const projectTitle = document.getElementById("projectTitle");

const projectDescription = document.getElementById("projectDescription");

const projectCategory = document.getElementById("projectCategory");

// ========================================
// PRELOAD IMAGES
// ========================================

function preloadProjectImages(images = []) {

  images.forEach((src) => {

    const img = new Image();

    img.src = src;

  });

}

// ========================================
// MODAL OPEN ANIMATION
// ========================================

function animateModalOpen() {

  gsap.fromTo(

    ".modal-container",

    {
      scale: 0.96,
      opacity: 0,
      y: 60
    },

    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power4.out"
    }

  );

  gsap.from(

    ".modal-description",

    {
      opacity: 0,
      y: 30,
      delay: 0.2,
      duration: 0.6,
      ease: "power3.out"
    }

  );

}

// ========================================
// MODAL CLOSE ANIMATION
// ========================================

function animateModalClose(callback) {

  gsap.to(".modal-container", {

    opacity: 0,

    scale: 0.96,

    y: 40,

    duration: 0.35,

    ease: "power3.in",

    onComplete: callback

  });

}

// ========================================
// SWIPER INIT
// ========================================

let projectSwiper = new Swiper(".projectSwiper", {

  loop: false,

  speed: 1000,

  effect: "slide",

  grabCursor: true,

  autoplay: {
    delay: 3200,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});

// ========================================
// OPEN PROJECT
// ========================================

function openProject(data = {}) {

  const project = {

    title:
      data.title ||
      "Projet Artistique Premium",

    category:
      data.category ||
      "Art Urbain",

    description:
      data.description ||
      "Création immersive mêlant art mural moderne et design visuel premium.",

    video:
      data.video ||
      "https://www.youtube.com/embed/dQw4w9WgXcQ",

    images:
      data.images || [

        "images/oeuvre/akan1.jpg",

        "images/oeuvre/akan2.jpg",

        "images/oeuvre/akan3.jpg",

      ]

  };

  // ========================================
  // PRELOAD
  // ========================================

  preloadProjectImages(project.images);

  // ========================================
  // TEXT CONTENT
  // ========================================

  projectTitle.innerText = project.title;

  projectCategory.innerText = project.category;

  projectDescription.innerText = project.description;

  projectVideo.src = project.video;

  // ========================================
  // SLIDER CONTENT
  // ========================================

  const swiperWrapper = document.querySelector(
    ".projectSwiper .swiper-wrapper"
  );

  swiperWrapper.innerHTML = "";

  project.images.forEach((image) => {

    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <img src="${image}" alt="Project Image">
      </div>
    `;

  });

  // ========================================
  // DESTROY OLD SWIPER
  // ========================================

  if (projectSwiper) {

    projectSwiper.destroy(true, true);

  }

  // ========================================
  // REBUILD SWIPER
  // ========================================

  projectSwiper = new Swiper(".projectSwiper", {

    loop: true,

    speed: 1000,

    effect: "slide",

    grabCursor: true,

    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

  });

  // ========================================
  // SHOW MODAL
  // ========================================

  modal.classList.add("active");

  document.body.style.overflow = "hidden";

  // ========================================
  // ANIMATION
  // ========================================

  animateModalOpen();

}

// ========================================
// CLOSE PROJECT
// ========================================

function closeProject() {

  animateModalClose(() => {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

    projectVideo.src = "";

  });

}

// ========================================
// ESC KEY
// ========================================

document.addEventListener("keydown", function (e) {

  if (e.key === "Escape") {

    closeProject();

  }

});

// ========================================
// CLICK OUTSIDE
// ========================================

modal.addEventListener("click", function (e) {

  if (e.target.classList.contains("modal-backdrop")) {

    closeProject();

  }

});

// ========================================
// MOBILE SWIPE CLOSE
// ========================================

let touchStartY = 0;

modal.addEventListener("touchstart", (e) => {

  touchStartY = e.changedTouches[0].screenY;

});

modal.addEventListener("touchend", (e) => {

  let touchEndY = e.changedTouches[0].screenY;

  if (touchEndY - touchStartY > 120) {

    closeProject();

  }

});

// ========================================
// PARALLAX HOVER EFFECT
// ========================================

document.querySelectorAll(".gallery-card").forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 25;

    const moveY = (y - rect.height / 2) / 25;

    gsap.to(card.querySelector("img"), {

      x: moveX,

      y: moveY,

      duration: 0.5,

      ease: "power2.out"

    });

  });

  card.addEventListener("mouseleave", () => {

    gsap.to(card.querySelector("img"), {

      x: 0,

      y: 0,

      duration: 0.6,

      ease: "power3.out"

    });

  });

});

// ========================================
// DEMO PROJECTS
// ========================================

const demoProjects = [

  {
    title: "Fresque Premium",
    category: "Art Urbain",

    description:
      "Composition murale immersive réalisée pour espace moderne haut de gamme.",

    video:
      "https://www.youtube.com/embed/dQw4w9WgXcQ",

    images: [

      "images/oeuvre/akan1.jpg",

      "images/oeuvre/akan2.jpg",

      "images/oeuvre/akan3.jpg",

    ]
  },

  {
    title: "Projet Studio",
    category: "Studio",

    description:
      "Décoration artistique contemporaine avec approche minimaliste premium.",

    video:
      "https://www.youtube.com/embed/dQw4w9WgXcQ",

    images: [

      "images/oeuvre/akan2.jpg",

      "images/oeuvre/akan3.jpg",

      "images/oeuvre/akan1.jpg",

    ]
  }

];

// ========================================
// BIND GALLERY CARDS
// ========================================

document.querySelectorAll(".gallery-card").forEach((card, index) => {

  card.addEventListener("click", () => {

    openProject(demoProjects[index]);

  });

});

// ========================================
// EXPORT GLOBAL
// ========================================

window.openProject = openProject;

window.closeProject = closeProject;