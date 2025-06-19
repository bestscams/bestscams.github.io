// script.js
// Kleine Interaktivität: Klick-Effekt auf Buttons

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    // Kurzer Klick-Ripple-Effekt
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    btn.appendChild(ripple);
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - btn.getBoundingClientRect().left - size/2 + 'px';
    ripple.style.top  = e.clientY - btn.getBoundingClientRect().top  - size/2 + 'px';
    setTimeout(() => ripple.remove(), 600);
    // Weiterleitung geschieht automatisch durch den href
  });
});
