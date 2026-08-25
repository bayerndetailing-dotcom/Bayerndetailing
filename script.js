document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BEFORE / AFTER SLIDER
     ========================= */

  const compareSlider =
    document.getElementById("compare-slider");

  const compareBefore =
    document.getElementById("compare-before");

  const compareDivider =
    document.getElementById("compare-divider");

  const compareHandle =
    document.getElementById("compare-handle");


  if (
    compareSlider &&
    compareBefore &&
    compareDivider
  ) {

    let isDragging = false;


    function updateSlider(clientX) {

      const rect =
        compareSlider.getBoundingClientRect();


      let position =
        ((clientX - rect.left) / rect.width) * 100;


      position =
        Math.max(
          0,
          Math.min(100, position)
        );


      /*
        Alleen het zichtbare deel van
        before.png verandert.

        De foto's zelf bewegen niet.
      */

      compareBefore.style.clipPath =
        `inset(0 ${100 - position}% 0 0)`;


      compareDivider.style.left =
        `${position}%`;


      if (compareHandle) {

        compareHandle.setAttribute(
          "aria-valuenow",
          Math.round(position)
        );

      }

    }


    compareSlider.addEventListener(
      "pointerdown",
      (event) => {

        isDragging = true;

        compareSlider.setPointerCapture(
          event.pointerId
        );

        updateSlider(
          event.clientX
        );

      }
    );


    compareSlider.addEventListener(
      "pointermove",
      (event) => {

        if (!isDragging) {
          return;
        }


        updateSlider(
          event.clientX
        );

      }
    );


    compareSlider.addEventListener(
      "pointerup",
      () => {

        isDragging = false;

      }
    );


    compareSlider.addEventListener(
      "pointercancel",
      () => {

        isDragging = false;

      }
    );


    compareSlider.addEventListener(
      "pointerleave",
      () => {

        isDragging = false;

      }
    );

  }



  /* =========================
     CONTACTFORMULIER
     ========================= */

  const contactForm =
    document.getElementById("contact-form");

  const formStatus =
    document.getElementById("form-status");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        /*
          Controleer of minstens één
          behandeling is geselecteerd.
        */

        const selectedServices =
          contactForm.querySelectorAll(
            'input[name="services"]:checked'
          );


        if (
          selectedServices.length === 0
        ) {

          if (formStatus) {

            formStatus.textContent =
              "Selecteer minimaal één gewenste behandeling.";

            formStatus.style.color =
              "#ff8a8a";

          }

          return;

        }


        if (formStatus) {

          formStatus.textContent =
            "Je aanvraag wordt verstuurd...";

          formStatus.style.color =
            "#aeb4bc";

        }


        /*
          Verzamel alle formuliergegevens
        */

        const formData =
          new FormData(contactForm);


        try {

          const response =
            await fetch(
              "https://formspree.io/f/mzepndra",
              {
                method: "POST",

                body: formData,

                headers: {
                  Accept: "application/json"
                }
              }
            );


          if (response.ok) {

            /*
              Formulier leegmaken
            */

            contactForm.reset();


            if (formStatus) {

              formStatus.textContent =
                "Bedankt! Je aanvraag is succesvol verstuurd. We nemen zo snel mogelijk contact met je op.";

              formStatus.style.color =
                "#8ed0a1";

            }

          } else {

            let errorMessage =
              "Er is iets misgegaan bij het versturen. Probeer het opnieuw.";


            try {

              const data =
                await response.json();


              if (
                data.errors &&
                data.errors.length > 0
              ) {

                errorMessage =
                  data.errors
                    .map(
                      error => error.message
                    )
                    .join(", ");

              }

            } catch (error) {

              console.error(error);

            }


            if (formStatus) {

              formStatus.textContent =
                errorMessage;

              formStatus.style.color =
                "#ff8a8a";

            }

          }

        } catch (error) {

          console.error(error);


          if (formStatus) {

            formStatus.textContent =
              "Er kon geen verbinding worden gemaakt. Controleer je internetverbinding en probeer het opnieuw.";

            formStatus.style.color =
              "#ff8a8a";

          }

        }

      }
    );

  }



  /* =========================
     FOOTER JAARTAL
     ========================= */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }



  /* =========================
     MOBIEL MENU
     ========================= */

  const menuButton =
    document.querySelector(
      ".menu-button"
    );


  const mainNav =
    document.querySelector(
      ".main-nav"
    );


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
