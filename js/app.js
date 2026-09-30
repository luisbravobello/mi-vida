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

// Globo terráqueo en canvas: ruta Venezuela → República Dominicana (sin geolocalización)
const globo = document.getElementById('globo');
if (globo) {
  const ctx = globo.getContext('2d');
  const reduceMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAD = Math.PI / 180;

  // Esfera de puntos (distribución Fibonacci: reparte parejo)
  const PUNTOS = 700;
  const esfera = [];
  const dorado = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PUNTOS; i++) {
    const y = 1 - (i / (PUNTOS - 1)) * 2;
    const radio = Math.sqrt(1 - y * y);
    const angulo = dorado * i;
    esfera.push({ x: Math.cos(angulo) * radio, y: y, z: Math.sin(angulo) * radio });
  }

  function aXYZ(lat, lng) {
    const phi = lat * RAD;
    const lam = lng * RAD;
    return { x: Math.cos(phi) * Math.sin(lam), y: Math.sin(phi), z: Math.cos(phi) * Math.cos(lam) };
  }
  const venezuela = aXYZ(10.49, -66.88);
  const dominicana = aXYZ(18.58, -68.4);

  let rotacion = -68 * RAD;
  let W = 0;
  let H = 0;
  let R = 0;

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const lado = globo.clientWidth || 320;
    W = lado;
    H = lado;
    globo.width = Math.round(lado * dpr);
    globo.height = Math.round(lado * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = lado * 0.36;
  }

  function rotar(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
  }

  function puntoArco(a, c, b, t) {
    const u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
      y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
      z: u * u * a.z + 2 * u * t * c.z + t * t * b.z
    };
  }

  function marcador(p, texto, cx, cy) {
    if (p.z <= 0.05) {
      return;
    }
    const x = cx + p.x * R;
    const y = cy - p.y * R;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1f1f1f';
    ctx.stroke();
    ctx.font = '600 11px Montserrat, sans-serif';
    ctx.fillStyle = '#14110e';
    ctx.textAlign = 'center';
    ctx.fillText(texto, x, y - 12);
  }

  function dibujar(tiempo) {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H / 2;

    for (const p of esfera) {
      const r = rotar(p, rotacion);
      const alFrente = r.z > 0;
      ctx.beginPath();
      ctx.arc(cx + r.x * R, cy - r.y * R, alFrente ? 1.6 : 1, 0, Math.PI * 2);
      ctx.fillStyle = alFrente ? 'rgba(20,17,14,.85)' : 'rgba(20,17,14,.18)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, R + 10, 0, Math.PI * 2);
    ctx.strokeStyle = '#e3e1dc';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * Math.PI * 2;
      const p = rotar({ x: Math.cos(t), y: 0, z: Math.sin(t) }, rotacion);
      const x = cx + p.x * R;
      const y = cy - p.y * R;
      if (i === 0 || p.z <= 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = 'rgba(20,17,14,.2)';
    ctx.stroke();

    const a = rotar(venezuela, rotacion);
    const b = rotar(dominicana, rotacion);
    const medio = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 };
    const largo = Math.hypot(medio.x, medio.y, medio.z) || 1;
    const control = { x: medio.x / largo * 1.35, y: medio.y / largo * 1.35, z: medio.z / largo * 1.35 };
    const PASOS = 40;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < PASOS; i++) {
      const p0 = puntoArco(a, control, b, i / PASOS);
      const p1 = puntoArco(a, control, b, (i + 1) / PASOS);
      if (p0.z > 0 && p1.z > 0) {
        ctx.beginPath();
        ctx.moveTo(cx + p0.x * R, cy - p0.y * R);
        ctx.lineTo(cx + p1.x * R, cy - p1.y * R);
        ctx.strokeStyle = 'rgba(20,17,14,.55)';
        ctx.stroke();
      }
    }

    const t = (tiempo % 4000) / 4000;
    const v = puntoArco(a, control, b, t);
    if (v.z > 0) {
      ctx.beginPath();
      ctx.arc(cx + v.x * R, cy - v.y * R, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#1f1f1f';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + v.x * R, cy - v.y * R, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(20,17,14,.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    marcador(a, 'Venezuela', cx, cy);
    marcador(b, 'Rep. Dominicana', cx, cy);
  }

  medir();
  window.addEventListener('resize', medir);
  if (reduceMovimiento) {
    dibujar(0);
  } else {
    let anterior = performance.now();
    function cuadro(ahora) {
      const dt = (ahora - anterior) / 1000;
      anterior = ahora;
      rotacion += dt * ((Math.PI * 2) / 26);
      dibujar(ahora);
      requestAnimationFrame(cuadro);
    }
    requestAnimationFrame(cuadro);
  }
}
