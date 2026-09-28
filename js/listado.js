/* =========================================================
   listado.js
   Página de noticias: listado completo y mini CRUD
   (crear y eliminar noticias guardadas en localStorage).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-noticias");
  const formNoticia = document.getElementById("form-noticia");
  const alertaAdmin = document.getElementById("alerta-admin");

  async function renderizarListado() {
    try {
      const noticias = await cargarNoticias();

      contenedor.innerHTML = noticias.length
        ? noticias.map((noticia) => crearTarjetaHTML(noticia, { mostrarEliminar: true })).join("")
        : '<p class="empty-state">No hay noticias registradas.</p>';

      activarBotonesFavoritos(contenedor);
      activarBotonesEliminar(contenedor, renderizarListado);
    } catch (error) {
      contenedor.innerHTML = '<p class="empty-state">No se pudieron cargar las noticias.</p>';
      console.error(error);
    }
  }

  // Marca el campo en rojo y muestra su mensaje si está vacío.
  function validarCampoTexto(input) {
    const valido = input.value.trim().length > 0;
    input.classList.toggle("is-invalid", !valido);
    document.getElementById(`error-${input.id}`).classList.toggle("visible", !valido);
    return valido;
  }

  formNoticia.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const raza = document.getElementById("raza");
    const resumen = document.getElementById("resumen");

    // Se validan los tres campos (sin cortar en el primero) para mostrar todos los errores.
    const resultados = [nombre, raza, resumen].map(validarCampoTexto);
    if (resultados.includes(false)) return;

    crearNoticia({
      id: generarNuevoId(),
      nombre: nombre.value.trim(),
      raza: raza.value.trim(),
      fecha: new Date().toISOString().slice(0, 10),
      destacada: false,
      resumen: resumen.value.trim(),
      contenido: [resumen.value.trim()],
    });

    formNoticia.reset();
    alertaAdmin.textContent = "¡Noticia publicada correctamente!";
    alertaAdmin.classList.add("visible");
    setTimeout(() => alertaAdmin.classList.remove("visible"), 3500);

    renderizarListado();
  });

  renderizarListado();
});
