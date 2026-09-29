# Mi vida — Landing personal de Luis Bravo

Landing personal en HTML/CSS/JS vanilla: mi historia, mis gustos,
mis favoritos, mis metas y un formulario de contacto. Sin frameworks,
sin build, sin dependencias.

## Contenido

- [Sobre mí](#sobre-mí)
- [Secciones](#secciones)
- [Sistema de diseño](#sistema-de-diseño)
- [Estructura](#estructura)
- [Verla en local](#verla-en-local)
- [Contacto](#contacto)

## Sobre mí

| Dato    | Valor                                         |
| ------- | --------------------------------------------- |
| Nombre  | Luis Alejandro Bravo Bello                    |
| Origen  | Estado Aragua, Venezuela (27/10/2002)         |
| Vive en | Punta Cana, República Dominicana (desde 2023) |
| Estudia | Ing. de Software, UCE (9no cuatrimestre)      |
| Stack   | C#, SQL, .NET + HTML/CSS/JS                   |

## Secciones

| #   | Sección   | Qué tiene                                              |
| --- | --------- | ------------------------------------------------------ |
| 01  | Historia  | Origen + actual (8+4) y mi historia en breve           |
| 02  | Gustos    | 5 tarjetas: K-Dramas, Brawlhalla, anime, viajar, leer  |
| 03  | Favoritos | Mi top: anime rankeado, K-Dramas y mains de Brawlhalla |
| 04  | Metas     | Graduarme UCE, primer empleo dev, vida estable en RD   |
| 05  | Contacto  | Formulario (nombre, email, mensaje) + botones directos |

## Sistema de diseño

Sigo el estándar **Clase 03 ISW-312** (retícula + escala + tipo + color + CRAP):

| Sistema   | Decisión                                        |
| --------- | ----------------------------------------------- |
| Retícula  | 12 columnas, `max-width: 1080px`, mobile 4 cols |
| Espaciado | Escala 8pt: 4, 8, 16, 24, 32, 48, 64            |
| Tipo      | 2 fuentes (Cormorant Garamond + Montserrat)     |
| Color     | 60-30-10 blanco y negro, contraste AA 4.5:1     |
| Iconos    | Cero SVG en el HTML, puro texto y CSS           |

> [!NOTE]
> El formulario no tiene backend: al enviar abre tu app de correo
> con el mensaje ya armado hacia mi Gmail.

## Estructura

```text
mi-vida/
├── index.html          # Estructura semántica por secciones
├── Assets/
│   └── estilos.css     # Sistema Clase 03 + micro-interacciones
├── js/
│   └── app.js          # Menú móvil + formulario (mailto)
└── README.md
```

## Verla en local

```powershell
Set-Location "$env:USERPROFILE\OneDrive\Desktop\landing-vida"
start index.html
```

Eso es todo: doble clic a `index.html` y listo.

## Contacto

- Email: [luisbravobello@gmail.com](mailto:luisbravobello@gmail.com)
- GitHub: [luisbravobello](https://github.com/luisbravobello)
