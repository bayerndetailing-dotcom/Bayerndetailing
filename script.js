const menuButton=document.querySelector('.menu-button'),nav=document.querySelector('.main-nav');menuButton?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',o);menuButton.textContent=o?'Sluiten':'Menu'});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu'}));document.getElementById('year').textContent=new Date().getFullYear();

const slider=document.getElementById('compare-slider');
const before=document.getElementById('compare-before');
const line=document.getElementById('compare-line');
const handle=document.getElementById('compare-handle');

function setPosition(clientX){
  const r=slider.getBoundingClientRect();
  let p=(clientX-r.left)/r.width*100;
  p=Math.max(0,Math.min(100,p));
  before.style.width=p+'%';
  line.style.left=p+'%';
  handle.setAttribute('aria-valuenow',Math.round(p));
}
let dragging=false;
function start(e){dragging=true;slider.setPointerCapture?.(e.pointerId);setPosition(e.clientX)}
function move(e){if(dragging)setPosition(e.clientX)}
function end(){dragging=false}
slider.addEventListener('pointerdown',start);
window.addEventListener('pointermove',move);
window.addEventListener('pointerup',end);
handle.addEventListener('keydown',e=>{let p=Number(handle.getAttribute('aria-valuenow'));if(e.key==='ArrowLeft')p-=2;else if(e.key==='ArrowRight')p+=2;else return;e.preventDefault();const r=slider.getBoundingClientRect();setPosition(r.left+(p/100)*r.width)});

const form=document.getElementById('contact-form'),status=document.querySelector('.form-status');
form?.addEventListener('submit',e=>{e.preventDefault();status.textContent='Bedankt! Het formulier is in deze demo nog niet gekoppeld aan e-mail.'});