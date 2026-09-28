/* =========================================================
   contacto.js
   Validaciones básicas del formulario de contacto:
   campos obligatorios y formato de correo electrónico.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const alerta = document.getElementById("alerta-confirmacion");
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    asunto: document.getElementById("asunto"),
    mensaje: document.getElementById("mensaje"),
  };

  // Regla de cada campo: el correo debe tener formato válido, el resto no puede estar vacío.
  function esCampoValido(campo) {
    const valor = campo.value.trim();
    return campo === campos.correo ? regexCorreo.test(valor) : valor.length > 0;
  }

  function validarCampo(campo) {
    const esValido = esCampoValido(campo);
    campo.classList.toggle("is-invalid", !esValido);
    document.getElementById(`error-${campo.id}`).classList.toggle("visible", !esValido);
    return esValido;
  }

  function validarFormulario() {
    // Se validan todos los campos (sin detenerse en el primero) para mostrar todos los errores.
    return Object.values(campos).map(validarCampo).every(Boolean);
  }

  // Validación inmediata: al salir de un campo se revisa, y al corregirlo se quita el error.
  Object.values(campos).forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      if (campo.classList.contains("is-invalid")) validarCampo(campo);
    });
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    alerta.classList.remove("visible");

    if (!validarFormulario()) return;

    // Sin backend disponible en esta entrega: se simula el envío exitoso.
    alerta.classList.add("visible");
    form.reset();
    alerta.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
