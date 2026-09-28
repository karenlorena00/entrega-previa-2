/* =========================================================
   storage.js
   Manejo de datos persistentes en el navegador (localStorage):
   favoritos, noticias creadas por el usuario y noticias
   eliminadas del conjunto original (mini CRUD).
   ========================================================= */

const STORAGE_KEYS = {
  FAVORITOS: "pqs_favoritos",
  NOTICIAS_EXTRA: "pqs_noticias_extra",
  NOTICIAS_ELIMINADAS: "pqs_noticias_eliminadas",
};

function leerJSON(clave, valorPorDefecto) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : valorPorDefecto;
  } catch (error) {
    console.error(`No se pudo leer "${clave}" de localStorage`, error);
    return valorPorDefecto;
  }
}

function guardarJSON(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

/* ---------- Favoritos ---------- */

function obtenerFavoritos() {
  return leerJSON(STORAGE_KEYS.FAVORITOS, []);
}

function esFavorito(id) {
  return obtenerFavoritos().includes(id);
}

function alternarFavorito(id) {
  const favoritos = obtenerFavoritos();
  const indice = favoritos.indexOf(id);

  if (indice === -1) {
    favoritos.push(id);
  } else {
    favoritos.splice(indice, 1);
  }

  guardarJSON(STORAGE_KEYS.FAVORITOS, favoritos);
  return favoritos.includes(id);
}

/* ---------- Mini CRUD de noticias ---------- */

function obtenerNoticiasExtra() {
  return leerJSON(STORAGE_KEYS.NOTICIAS_EXTRA, []);
}

function obtenerNoticiasEliminadas() {
  return leerJSON(STORAGE_KEYS.NOTICIAS_ELIMINADAS, []);
}

function crearNoticia(noticia) {
  const extra = obtenerNoticiasExtra();
  extra.push(noticia);
  guardarJSON(STORAGE_KEYS.NOTICIAS_EXTRA, extra);
}

function eliminarNoticia(id) {
  const extra = obtenerNoticiasExtra();
  const esCreadaPorUsuario = extra.some((noticia) => noticia.id === id);

  if (esCreadaPorUsuario) {
    // Las noticias creadas por el usuario se borran directamente de localStorage.
    guardarJSON(STORAGE_KEYS.NOTICIAS_EXTRA, extra.filter((noticia) => noticia.id !== id));
  } else {
    // Las del JSON base no se pueden borrar del archivo, así que se marcan como eliminadas.
    const eliminadas = obtenerNoticiasEliminadas();
    if (!eliminadas.includes(id)) {
      eliminadas.push(id);
      guardarJSON(STORAGE_KEYS.NOTICIAS_ELIMINADAS, eliminadas);
    }
  }

  // También se quita de favoritos si estaba marcada.
  const favoritos = obtenerFavoritos().filter((favId) => favId !== id);
  guardarJSON(STORAGE_KEYS.FAVORITOS, favoritos);
}

// Se usa la fecha en milisegundos para que un id nunca se repita,
// aunque se hayan eliminado noticias antes.
function generarNuevoId() {
  return Date.now();
}
