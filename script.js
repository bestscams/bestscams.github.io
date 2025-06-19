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

// Diashow automatisch mit Bildern p1.jpg bis p5.jpg
const slideshowContainer = document.querySelector('.slideshow-container');

// Pfade zu den Bildern
const imagePaths = [
  'images/p1.jpg',
  'images/p2.jpg',
  'images/p3.jpg',
  'images/p4.jpg',
  'images/p5.jpg'
];

// Bilder dynamisch einfügen
imagePaths.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `MM2 Item ${index + 1}`;
  img.classList.add('slide');
  slideshowContainer.appendChild(img);
});

let currentSlide = 0;
const slides = () => document.querySelectorAll('.slide');

function showSlide(index) {
  slides().forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides().length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000);
showSlide(currentSlide);
