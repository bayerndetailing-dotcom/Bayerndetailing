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

      comparison.style.setProperty(
        "--comparison-position",
        `${value}%`
      );

    }


    range.addEventListener(
      "input",
      updateComparison
    );


    // Startpositie
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
      async (event) => {

        event.preventDefault();


        if (formStatus) {

          formStatus.textContent =
            "Aanvraag wordt verstuurd...";

        }


        // Geselecteerde services verzamelen

        const selectedServices =
          Array.from(
            contactForm.querySelectorAll(
              'input[name="services[]"]:checked'
            )
          ).map(
            (checkbox) => checkbox.value
          );


        // Controleer of minstens
        // één service is gekozen

        if (selectedServices.length === 0) {

          if (formStatus) {

            formStatus.textContent =
              "Selecteer minimaal één gewenste behandeling.";

          }

          return;

        }


        // Formuliergegevens ophalen

        const formData =
          new FormData(contactForm);


        // services[] vervangen
        // door één leesbare tekst

        formData.delete("services[]");

        formData.append(
          "services",
          selectedServices.join(", ")
        );


        try {

          const response =
            await fetch(
              "https://api.web3forms.com/submit",
              {
                method: "POST",

                body: formData
              }
            );


          const result =
            await response.json();


          if (result.success) {

            if (formStatus) {

              formStatus.textContent =
                "Bedankt! Je aanvraag is succesvol verstuurd.";

            }


            contactForm.reset();

          } else {

            if (formStatus) {

              formStatus.textContent =
                result.message ||
                "Er ging iets mis. Probeer het opnieuw.";

            }

          }

        } catch (error) {

          if (formStatus) {

            formStatus.textContent =
              "Er kon geen verbinding worden gemaakt. Probeer het later opnieuw.";

          }

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
          mainNav.classList.toggle("open");


        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );

  }

});
