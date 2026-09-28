/* =========================================================
   noticias.js
   Carga las noticias desde el JSON local, las combina con lo
   guardado en localStorage (mini CRUD) y genera las tarjetas
   dinámicas usadas en Home, Listado y Favoritos.
   ========================================================= */

// Convierte caracteres especiales en texto seguro para evitar que
// lo que escribe el usuario se interprete como HTML (ataque XSS).
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function cargarNoticias() {
  const respuesta = await fetch("data/noticias.json");
  const base = await respuesta.json();
  const extra = obtenerNoticiasExtra();
  const eliminadas = obtenerNoticiasEliminadas();

  return [...base, ...extra].filter((noticia) => !eliminadas.includes(noticia.id));
}

// Actualiza icono, texto accesible y estado del botón de favorito.
function pintarBotonFavorito(boton, esFav) {
  boton.classList.toggle("is-active", esFav);
  boton.innerHTML = esFav ? "&#9829;" : "&#9825;";
  boton.title = esFav ? "Quitar de favoritos" : "Agregar a favoritos";
  boton.setAttribute("aria-label", boton.title);
  boton.setAttribute("aria-pressed", String(esFav));
}

function crearTarjetaHTML(noticia, opciones = {}) {
  const { mostrarEliminar = false } = opciones;
  const favorito = esFavorito(noticia.id);
  const nombre = escaparHTML(noticia.nombre);
  const resumen = escaparHTML(noticia.resumen);
  const textoFavorito = favorito ? "Quitar de favoritos" : "Agregar a favoritos";

  // Con foto se usa <img alt>; sin foto, el recuadro gris se describe con aria-label.
  const imagenHTML = noticia.imagen
    ? `<div class="card-image"><img src="${escaparHTML(noticia.imagen)}" alt="Foto de ${nombre}" loading="lazy" /></div>`
    : `<div class="card-image" role="img" aria-label="Sin imagen para ${nombre}"></div>`;

  return `
    <article class="card" data-id="${noticia.id}">
      ${imagenHTML}
      <div class="card-body">
        <h3 class="card-title">${nombre}</h3>
        <p class="card-text">${resumen}</p>
        <div class="card-actions">
          <a class="btn btn-outline" href="detalle.html?id=${noticia.id}">Ver más</a>
          <div class="card-buttons">
            <button
              class="fav-btn ${favorito ? "is-active" : ""}"
              data-id="${noticia.id}"
              title="${textoFavorito}"
              aria-label="${textoFavorito}"
              aria-pressed="${favorito}"
            >${favorito ? "&#9829;" : "&#9825;"}</button>
            ${mostrarEliminar
              ? `<button class="delete-btn" data-id="${noticia.id}" title="Eliminar noticia" aria-label="Eliminar noticia">&times;</button>`
              : ""
            }
          </div>
        </div>
      </div>
    </article>`;
}

function activarBotonesFavoritos(contenedor) {
  contenedor.querySelectorAll(".fav-btn").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      pintarBotonFavorito(boton, alternarFavorito(id));
    });
  });
}

function activarBotonesEliminar(contenedor, alEliminar) {
  contenedor.querySelectorAll(".delete-btn").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const confirmado = confirm("¿Seguro que deseas eliminar esta noticia?");
      if (!confirmado) return;

      eliminarNoticia(id);
      if (typeof alEliminar === "function") alEliminar(id);
    });
  });
}
