# Patitas que Sanan

Prototipo funcional (Entrega 2) de una plataforma web de noticias sobre zooterapia,
desarrollado con HTML, CSS y JavaScript puro, siguiendo la maquetación realizada en Figma.

## Estructura del proyecto

```
entregaprevia2/
├── index.html              Página de inicio (Home)
├── noticias.html           Listado dinámico de noticias + mini CRUD (crear/eliminar)
├── detalle.html            Vista de detalle de una noticia (?id=)
├── favoritos.html          Listado de noticias guardadas en favoritos
├── contacto.html           Formulario de contacto con validaciones
├── sobre-nosotros.html     Información institucional
├── css/
│   └── styles.css          Estilos generales del sitio
├── js/
│   ├── storage.js          Helpers de localStorage (favoritos y mini CRUD)
│   ├── noticias.js         Carga del JSON, tarjetas y funciones compartidas
│   ├── home.js             Lógica de la página de inicio (destacadas)
│   ├── listado.js          Listado completo + mini CRUD
│   ├── detalle.js          Vista de detalle de una noticia
│   ├── favoritos.js        Listado de favoritos
│   └── contacto.js         Validación del formulario de contacto
├── data/
│   └── noticias.json       Datos base de las noticias
├── img/                    Fotografías de cada noticia
└── mockups-figma/          Exportes de la maquetación en Figma (Entrega 1)
```

## Funcionalidades implementadas

- **Renderizado dinámico** de noticias desde `data/noticias.json`.
- **Detalle de noticia** con contenido completo por `id` (parámetro en la URL).
- **Favoritos** persistidos en `localStorage`, con página dedicada para consultarlos.
- **Mini CRUD**: creación de noticias nuevas y eliminación de noticias existentes desde
  el listado (`noticias.html`), también almacenado en `localStorage`.
- **Formulario de contacto** con validaciones básicas (campos obligatorios y formato de
  correo electrónico) y mensaje de confirmación al usuario.
- **Diseño responsive** adaptado a dispositivos móviles.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (variables, grid y flexbox)
- JavaScript (ES6+, `fetch`, `localStorage`)
- Google Fonts (Quicksand y Nunito Sans)

## Cómo ejecutar el proyecto

Como las noticias se cargan mediante `fetch` desde un archivo JSON local, el proyecto
debe abrirse a través de un servidor local (no funciona con doble clic sobre el archivo
por restricciones de CORS del navegador). Se recomienda:

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

Alternativamente, con Node.js instalado:

```bash
npx serve .
```

## Créditos de imágenes

Las fotos de Eva y Kloey son fotografías propias. Las fotos de Oreo, Niko, Toby y Zoe
provienen de la API pública [Dog CEO](https://dog.ceo/dog-api/), usada únicamente con
fines académicos para ilustrar cada raza.

## Maquetación de referencia

El diseño (Home, Listado de noticias, Detalle y Contacto) fue elaborado en Figma durante
la Entrega 1. Las exportaciones de esas vistas se encuentran en la carpeta
[`mockups-figma/`](mockups-figma/).
