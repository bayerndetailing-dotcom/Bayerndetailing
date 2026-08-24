document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // BEFORE / AFTER SLIDER
  // =========================

  const comparison =
    document.getElementById("image-comparison");

  const range =
    document.getElementById("comparison-range");


  if (comparison && range) {

    function updateComparison() {

      const value = range.value;

      /*
        De CSS-variabele bepaalt:

        1. Hoeveel van before.png zichtbaar is
        2. Waar de verticale lijn staat

        De foto's zelf veranderen nooit
        van positie of grootte.
      */

      comparison.style.setProperty(
        "--comparison-position",
        `${value}%`
      );

    }


    // Update tijdens slepen
    range.addEventListener(
      "input",
      updateComparison
    );


    // Startpositie instellen
    updateComparison();

  }


  // =========================
  // FOOTER JAARTAL
  // =========================

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  // =========================
  // CONTACTFORMULIER
  // =========================

  const contactForm =
    document.getElementById("contact-form");

  const formStatus =
    document.getElementById("form-status");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        if (formStatus) {

          formStatus.textContent =
            "Bedankt! Je aanvraag is ontvangen.";

        }

      }
    );

  }


  // =========================
  // MOBIEL MENU
  // =========================

  const menuButton =
    document.querySelector(".menu-button");

  const mainNav =
    document.querySelector(".main-nav");


  if (menuButton && mainNav) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          menuButton.getAttribute(
            "aria-expanded"
          ) === "true";


        menuButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );


        if (isOpen) {

          mainNav.style.display =
            "";

        } else {

          mainNav.style.display =
            "flex";

        }

      }
    );

  }

});
