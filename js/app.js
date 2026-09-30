// landing-vida / JS mínimo: menú móvil accesible
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Formulario de contacto: sin backend, arma un correo con los datos
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
if (form && formMsg) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const nombre = document.getElementById('f-nombre').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const mensaje = document.getElementById('f-mensaje').value.trim();
    const asunto = encodeURIComponent('Hola Luis, soy ' + nombre);
    const cuerpo = encodeURIComponent(mensaje + '\n\n— ' + nombre + ' (' + email + ')');
    window.location.href = 'mailto:luisbravobello@gmail.com?subject=' + asunto + '&body=' + cuerpo;
    formMsg.textContent = 'Abriendo tu app de correo… ¡gracias por escribir, ' + nombre + '!';
    formMsg.classList.remove('err');
    formMsg.classList.add('ok');
    form.reset();
  });
}

// Máquina de escribir: el subtítulo del hero se escribe solo al cargar
const sub = document.querySelector('.hero .sub');
const reduceMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (sub && !reduceMovimiento) {
  const texto = sub.textContent;
  sub.textContent = '';
  sub.classList.add('typing');
  let i = 0;
  function escribir() {
    i++;
    sub.textContent = texto.slice(0, i);
    if (i < texto.length) {
      setTimeout(escribir, 22);
    } else {
      setTimeout(() => sub.classList.remove('typing'), 1200);
    }
  }
  setTimeout(escribir, 600);
}

// Botón flotante: aparece al bajar 600px y sube suave arriba
const arriba = document.getElementById('volverArriba');
if (arriba) {
  function verArriba() {
    arriba.classList.toggle('visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', verArriba, { passive: true });
  verArriba();
  arriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMovimiento ? 'auto' : 'smooth' });
  });
}
