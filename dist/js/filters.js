// ========================================
// GALLERY FILTER
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryCards = document.querySelectorAll(".gallery-card");

// ========================================
// FILTER CLICK
// ========================================

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    // REMOVE ACTIVE

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // ADD ACTIVE

    button.classList.add("active");

    // GET CATEGORY

    const filter = button.getAttribute("data-filter");

    // LOOP CARDS

    galleryCards.forEach((card) => {

      const category = card.getAttribute("data-category");

      // SHOW ALL

      if (filter === "all") {

        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 100);

      }

      // SHOW CATEGORY

      else if (category === filter) {

        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 100);

      }

      // HIDE

      else {

        card.style.opacity = "0";

        card.style.transform = "scale(0.9)";

        setTimeout(() => {
          card.style.display = "none";
        }, 300);

      }

    });

  });

});