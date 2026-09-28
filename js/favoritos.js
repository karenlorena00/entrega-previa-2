/* =========================================================
   favoritos.js
   Muestra las noticias cuyo id está guardado en favoritos
   (localStorage). Al quitar una, la lista se vuelve a pintar.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-favoritos");

  async function renderizar() {
    try {
      const noticias = await cargarNoticias();
      const idsFavoritos = obtenerFavoritos();
      const favoritas = noticias.filter((noticia) => idsFavoritos.includes(noticia.id));

      contenedor.innerHTML = favoritas.length
        ? favoritas.map((noticia) => crearTarjetaHTML(noticia)).join("")
        : `<p class="empty-state">Todavía no has guardado ninguna noticia en favoritos.
            Explora el <a href="noticias.html">listado de noticias</a> y presiona el corazón para guardarlas aquí.</p>`;

      contenedor.querySelectorAll(".fav-btn").forEach((boton) => {
        boton.addEventListener("click", () => {
          alternarFavorito(Number(boton.dataset.id));
          renderizar();
        });
      });
    } catch (error) {
      contenedor.innerHTML = '<p class="empty-state">No se pudieron cargar los favoritos.</p>';
      console.error(error);
    }
  }

  renderizar();
});
