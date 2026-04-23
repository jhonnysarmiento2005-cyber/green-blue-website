// Green & Blue Industries — script.js

// Smooth active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--dark)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Animate elements on scroll
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
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animateOnScroll.observe(el);
});

// Contact form — conectar con EmailJS o tu backend aquí
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // TODO: Integrar EmailJS o tu servicio de envío preferido
    // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form).then(...)

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
