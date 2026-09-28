/* =========================================================
   home.js
   Página de inicio: muestra solo las noticias marcadas como
   destacadas en el JSON.
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-destacadas");

  try {
    const noticias = await cargarNoticias();
    const destacadas = noticias.filter((noticia) => noticia.destacada);

    contenedor.innerHTML = destacadas.length
      ? destacadas.map((noticia) => crearTarjetaHTML(noticia)).join("")
      : '<p class="empty-state">No hay noticias destacadas por el momento.</p>';

    activarBotonesFavoritos(contenedor);
  } catch (error) {
    contenedor.innerHTML = '<p class="empty-state">No se pudieron cargar las noticias.</p>';
    console.error(error);
  }
});
