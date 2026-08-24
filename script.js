// ================================
// BEFORE / AFTER IMAGE SLIDER
// ================================

const slider = document.getElementById("compare-slider");
const overlay = document.getElementById("compare-overlay");
const divider = document.getElementById("compare-divider");
const handle = document.getElementById("compare-handle");

let isDragging = false;


// Update de positie van de slider
function updateCompareSlider(clientX) {

  const rect = slider.getBoundingClientRect();

  // Positie van de cursor binnen de afbeelding
  let position = clientX - rect.left;

  // Voorkom dat de slider buiten de afbeelding komt
  position = Math.max(
    0,
    Math.min(position, rect.width)
  );

  // Zet om naar percentage
  const percentage = (position / rect.width) * 100;


  /*
    BELANGRIJK:

    De after.png verandert NIET van:
    - grootte
    - positie
    - uitsnede
    - schaal

    Alleen het zichtbare gedeelte
    wordt verborgen met clip-path.
  */

  overlay.style.clipPath =
    `inset(0 ${100 - percentage}% 0 0)`;


  // Verplaats alleen de scheidingslijn
  divider.style.left = `${percentage}%`;


  // Update toegankelijkheidswaarde
  handle.setAttribute(
    "aria-valuenow",
    Math.round(percentage)
  );

}


// Begin slepen
slider.addEventListener("pointerdown", (event) => {

  isDragging = true;

  slider.setPointerCapture(event.pointerId);

  updateCompareSlider(event.clientX);

});


// Tijdens slepen
slider.addEventListener("pointermove", (event) => {

  if (!isDragging) return;

  updateCompareSlider(event.clientX);

});


// Stop slepen
slider.addEventListener("pointerup", () => {

  isDragging = false;

});


// Stop bij annuleren
slider.addEventListener("pointercancel", () => {

  isDragging = false;

});


// ================================
// FOOTER JAARTAL
// ================================

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ================================
// CONTACTFORMULIER
// ================================

const contactForm =
  document.getElementById("contact-form");

const formStatus =
  document.getElementById("form-status");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      if (formStatus) {

        formStatus.textContent =
          "Bedankt! Je aanvraag is ontvangen.";

      }

    }
  );

}
