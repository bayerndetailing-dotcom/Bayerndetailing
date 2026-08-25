document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // BEFORE / AFTER SLIDER
  // =========================

  const slider = document.getElementById("compare-slider");
  const before = document.getElementById("compare-before");
  const divider = document.getElementById("compare-divider");
  const handle = document.getElementById("compare-handle");

  if (slider && before && divider) {

    let position = 50;
    let isDragging = false;


    function updateSlider(value) {

      // Zorg dat de waarde altijd tussen 0 en 100 blijft
      position = Math.max(
        0,
        Math.min(100, value)
      );

      /*
        De BEFORE-foto ligt volledig boven de AFTER-foto.

        Alleen het zichtbare deel wordt aangepast.
        De foto zelf beweegt NIET.
      */

      before.style.clipPath =
        `inset(
          0
          ${100 - position}%
          0
          0
        )`;

      divider.style.left =
        `${position}%`;

      if (handle) {
        handle.setAttribute(
          "aria-valuenow",
          Math.round(position)
        );
      }

    }


    function getPosition(event) {

      const rect =
        slider.getBoundingClientRect();

      let clientX;

      if (
        event.touches &&
        event.touches.length > 0
      ) {

        clientX =
          event.touches[0].clientX;

      } else {

        clientX =
          event.clientX;

      }

      const x =
        clientX - rect.left;

      return (
        x / rect.width
      ) * 100;

    }


    // Klikken op de afbeelding
    slider.addEventListener(
      "pointerdown",
      (event) => {

        isDragging = true;

        slider.setPointerCapture(
          event.pointerId
        );

        updateSlider(
          getPosition(event)
        );

      }
    );


    // Slepen
    slider.addEventListener(
      "pointermove",
      (event) => {

        if (!isDragging) {
          return;
        }

        updateSlider(
          getPosition(event)
        );

      }
    );


    // Loslaten
    slider.addEventListener(
      "pointerup",
      () => {

        isDragging = false;

      }
    );


    slider.addEventListener(
      "pointercancel",
      () => {

        isDragging = false;

      }
    );


    // Startpositie
    updateSlider(50);

  }


  // =========================
  // CONTACTFORMULIER
  // =========================

  const contactForm =
    document.getElementById("contact-form");

  const formStatus =
    document.getElementById("form-status");

  const serviceOptions =
    document.querySelectorAll(
      'input[name="services"]:checked'
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        /*
          Zoek opnieuw op het moment
          dat het formulier wordt verstuurd.

          Dit is belangrijk, omdat een
          eerdere querySelectorAll anders
          niet altijd de huidige selectie
          gebruikt.
        */

        const selectedServices =
          contactForm.querySelectorAll(
            'input[name="services"]:checked'
          );


        // Geen behandeling geselecteerd
        if (
          selectedServices.length === 0
        ) {

          event.preventDefault();

          if (formStatus) {

            formStatus.textContent =
              "Selecteer minimaal één gewenste behandeling.";

          }

          return;

        }


        /*
          Hier komt geen preventDefault
          als je een externe formulierdienst
          gebruikt.

          Daardoor kan het formulier normaal
          worden verstuurd naar je e-mailservice.
        */

        if (formStatus) {

          formStatus.textContent =
            "Aanvraag wordt verstuurd...";

        }

      }
    );

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
  // MOBIEL MENU
  // =========================

  const menuButton =
    document.querySelector(".menu-button");

  const mainNav =
    document.querySelector(".main-nav");


  if (
    menuButton &&
    mainNav
  ) {

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


        mainNav.classList.toggle(
          "open",
          !isOpen
        );

      }
    );

  }

});
