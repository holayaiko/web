// Ejemplo: Detectar el scroll para efectos futuros o analytics
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    // Aquí podrías añadir lógica si quieres que pase algo al bajar mucho
    console.log("Posición de scroll:", scrollPos);
});

// Ejemplo: Cambiar el título dinámicamente según la categoría activa en el body
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const titulo = document.getElementById("titulo-seccion");

    if (body.classList.contains("categoria-diseno")) {
        titulo.textContent = "Área de Diseño";
    } else if (body.classList.contains("categoria-impresion")) {
        titulo.textContent = "Área de Impresión";
    }
});