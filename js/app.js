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
