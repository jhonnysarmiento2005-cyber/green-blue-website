// Green & Blue Industries — script.js

// CAROUSEL
const track = document.getElementById('track');
if (track) {
  const cdots = document.querySelectorAll('.cdot');
  const total = track.children.length;
  let current = 0;
  let timer;

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    cdots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 3500);
  }

  document.getElementById('next').onclick = () => { goTo(current + 1); startTimer(); };
  document.getElementById('prev').onclick = () => { goTo(current - 1); startTimer(); };
  cdots.forEach((d, i) => d.onclick = () => { goTo(i); startTimer(); });

  startTimer();
}

// SCROLL ANIMATIONS
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animateOnScroll.observe(el);
});

// CONTACT FORM
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    // TODO: Conectar con EmailJS
    setTimeout(() => {
      btn.textContent = '¡Mensaje enviado!';
      btn.style.background = 'var(--green-dark)';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1000);
  });
}
