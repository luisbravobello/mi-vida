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

// Copiar email al portapapeles con confirmación visible
const copiar = document.getElementById('copiarEmail');
const copyMsg = document.getElementById('copyMsg');
if (copiar && copyMsg) {
  copiar.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('luisbravobello@gmail.com');
      copyMsg.textContent = '¡Email copiado!';
    } catch (err) {
      copyMsg.textContent = 'No se pudo copiar: luisbravobello@gmail.com';
    }
  });
}

// Año automático en el footer
const anio = document.getElementById('anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}

// Hora en vivo de Punta Cana (America/Santo_Domingo)
const horaRD = document.getElementById('horaRD');
function actualizarHora() {
  if (!horaRD) {
    return;
  }
  const ahora = new Date();
  horaRD.textContent = new Intl.DateTimeFormat('es-DO', {
    timeZone: 'America/Santo_Domingo',
    hour: '2-digit',
    minute: '2-digit'
  }).format(ahora);
  horaRD.setAttribute('datetime', ahora.toISOString());
}
actualizarHora();
setInterval(actualizarHora, 30000);

// Cuenta regresiva para el 27 de octubre (nací en 2002)
const cuenta = document.getElementById('cuentaCumple');
if (cuenta) {
  const ahoraRD = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo' }));
  let anioMeta = ahoraRD.getFullYear();
  let cumple = new Date(anioMeta, 9, 27);
  if (ahoraRD > cumple && ahoraRD.toDateString() !== cumple.toDateString()) {
    anioMeta++;
    cumple = new Date(anioMeta, 9, 27);
  }
  const dias = Math.ceil((cumple - ahoraRD) / 86400000);
  const edad = anioMeta - 2002;
  if (dias === 0) {
    cuenta.innerHTML = '¡Hoy cumplo <strong>' + edad + '</strong>!';
  } else if (dias === 1) {
    cuenta.innerHTML = '¡Mañana cumplo <strong>' + edad + '</strong>!';
  } else {
    cuenta.innerHTML = 'Faltan <strong>' + dias + ' días</strong> para mis ' + edad + '.';
  }
}

// Frase rotativa: solo frases textuales ya escritas en la página
const frase = document.querySelector('.frase');
if (frase && !reduceMovimiento) {
  const frases = [
    'No me rendiré hasta graduarme como Ingeniero de Software.',
    'Menos es más: 1 meta clara vale más que 10 a medias.',
    'Amo mi carrera al 100%.'
  ];
  let turno = 0;
  setInterval(() => {
    frase.classList.add('cambiando');
    setTimeout(() => {
      turno = (turno + 1) % frases.length;
      frase.textContent = frases[turno];
      frase.classList.remove('cambiando');
    }, 400);
  }, 6000);
}
