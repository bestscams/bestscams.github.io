// Ripple-Effekt bei Button-Klick
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    btn.appendChild(ripple);
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - btn.getBoundingClientRect().left - size/2 + 'px';
    ripple.style.top  = e.clientY - btn.getBoundingClientRect().top  - size/2 + 'px';
    setTimeout(() => ripple.remove(), 600);
  });
});

// Diashow-Funktion
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000);
showSlide(currentSlide);
