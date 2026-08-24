const menuButton=document.querySelector(".menu-button"),nav=document.querySelector(".main-nav");menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",open);menuButton.textContent=open?"Sluiten":"Menu"});document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

document.getElementById("year").textContent=new Date().getFullYear();

const slider=document.getElementById("compare-slider");
const before=document.getElementById("compare-before");
const divider=document.getElementById("compare-divider");
const handle=document.getElementById("compare-handle");

function positionSlider(x){
  const rect=slider.getBoundingClientRect();
  const percentage=Math.max(0,Math.min(100,((x-rect.left)/rect.width)*100));
  before.style.width=percentage+"%";
  divider.style.left=percentage+"%";
  handle.setAttribute("aria-valuenow",Math.round(percentage));
}
let dragging=false;
slider.addEventListener("pointerdown",e=>{dragging=true;slider.setPointerCapture?.(e.pointerId);positionSlider(e.clientX)});
window.addEventListener("pointermove",e=>{if(dragging)positionSlider(e.clientX)});
window.addEventListener("pointerup",()=>dragging=false);

document.getElementById("contact-form").addEventListener("submit",e=>{e.preventDefault();document.getElementById("form-status").textContent="Bedankt! Het formulier is nog niet gekoppeld aan e-mail."});