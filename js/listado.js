/* =========================================================
   listado.js
   Página de noticias: muestra el listado completo de noticias.
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-noticias");

  try {
    const noticias = await cargarNoticias();

    contenedor.innerHTML = noticias.length
      ? noticias.map((noticia) => crearTarjetaHTML(noticia)).join("")
      : '<p class="empty-state">No hay noticias registradas.</p>';

    activarBotonesFavoritos(contenedor);
  } catch (error) {
    contenedor.innerHTML = '<p class="empty-state">No se pudieron cargar las noticias.</p>';
    console.error(error);
  }
});
