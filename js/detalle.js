/* =========================================================
   detalle.js
   Vista de detalle: lee el id de la URL (detalle.html?id=4),
   busca la noticia y muestra su contenido completo.
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));
  const contenedor = document.getElementById("contenido-detalle");

  try {
    const noticias = await cargarNoticias();
    const noticia = noticias.find((item) => item.id === id);

    if (!noticia) {
      contenedor.innerHTML = `
        <p class="empty-state">No se encontró la noticia solicitada.</p>
        <a class="btn btn-outline" href="noticias.html">Volver a noticias</a>`;
      return;
    }

    const nombre = escaparHTML(noticia.nombre);
    document.title = `Patitas que Sanan - ${noticia.nombre}`;
    document.getElementById("breadcrumb-actual").textContent = noticia.nombre;

    if (noticia.imagen) {
      document.getElementById("imagen-detalle").innerHTML =
        `<img src="${escaparHTML(noticia.imagen)}" alt="Foto de ${nombre}" />`;
    }

    const parrafos = noticia.contenido.map((parrafo) => `<p>${escaparHTML(parrafo)}</p>`).join("");
    const favorito = esFavorito(noticia.id);

    contenedor.innerHTML = `
      <h1>${nombre}</h1>
      ${parrafos}
      <div class="detail-actions">
        <button
          class="btn ${favorito ? "btn-accent" : "btn-outline"}"
          id="btn-favorito"
          aria-pressed="${favorito}"
        >${favorito ? "En favoritos ♥" : "Agregar a favoritos"}</button>
        <a class="btn btn-outline" href="contacto.html">Contactar sobre esta historia</a>
      </div>`;

    document.getElementById("btn-favorito").addEventListener("click", (evento) => {
      const boton = evento.currentTarget;
      const esFav = alternarFavorito(noticia.id);
      boton.textContent = esFav ? "En favoritos ♥" : "Agregar a favoritos";
      boton.classList.toggle("btn-accent", esFav);
      boton.classList.toggle("btn-outline", !esFav);
      boton.setAttribute("aria-pressed", String(esFav));
    });
  } catch (error) {
    contenedor.innerHTML = '<p class="empty-state">No se pudo cargar la noticia.</p>';
    console.error(error);
  }
});
