
AOS.init({
  duration:1000,
  once:true
});

// ========================================
// TEAM SWIPER
// ========================================

new Swiper(".teamSwiper", {

  loop: false,

  spaceBetween: 30,

  speed: 1000,

  autoplay: {

    delay: 3000,

    disableOnInteraction: false,

  },

  breakpoints: {

    0: {
      slidesPerView: 1
    },

    768: {
      slidesPerView: 2
    },

    1200: {
      slidesPerView: 3
    }

  }

});