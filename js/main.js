document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const titleElement = document.getElementById("page-title");
  const iconElement = document.querySelector(".category-icon");
  const baseUrl = "https://raw.githubusercontent.com/holayaiko/web/main/images/icons/";

  // --- 1. GESTIÓN DE CATEGORÍAS (Header e Iconos) ---
  const categories = {
    "categoria-diseno": { name: "Diseño", file: "diseno.svg" },
    "categoria-impresion": { name: "SI NO EXISTE, HAZLO EXISTIR", file: "impresion.svg" },
    "categoria-editorial": { name: "Editorial", file: "editorial.svg" },
    "categoria-programacion": { name: "Programación", file: "programacion.svg" },
    "categoria-modelado3d": { name: "Modelado 3D", file: "modelado3d.svg" },
    "categoria-video": { name: "Vídeo", file: "video.svg" },
    "categoria-audio": { name: "Audio", file: "audio.svg" },
    "categoria-otros": { name: "Otros", file: "otros.svg" },
  };

  for (const [className, data] of Object.entries(categories)) {
    if (body.classList.contains(className)) {
      if (titleElement) titleElement.textContent = data.name;
      if (iconElement) {
        iconElement.src = baseUrl + data.file;
        iconElement.alt = "Icono de " + data.name;
      }
      document.title = "Yaiko - " + data.name;
      break;
    }
  }

  // --- 2. LÓGICA DE PANELES: SECCIÓN IMPRESIÓN (Anomalocaris / Amigos) ---
  const showcaseImpresion = document.getElementById('showcase-impresion');
  const btnAnomalo = document.getElementById('btn-anomalo');
  const btnAmigos = document.getElementById('btn-amigos');

  if (showcaseImpresion && btnAnomalo && btnAmigos) {
    btnAnomalo.addEventListener('click', (e) => {
      e.stopPropagation();
      showcaseImpresion.classList.remove('active-amigos');
      showcaseImpresion.classList.toggle('active-anomalo');
    });

    btnAmigos.addEventListener('click', (e) => {
      e.stopPropagation();
      showcaseImpresion.classList.remove('active-anomalo');
      showcaseImpresion.classList.toggle('active-amigos');
    });

    showcaseImpresion.addEventListener('click', (e) => {
      if (e.target.classList.contains('showcase-panel') || e.target === showcaseImpresion) {
        showcaseImpresion.classList.remove('active-anomalo', 'active-amigos');
      }
    });
  }

  // --- 3. LÓGICA DE PANELES: SECCIÓN EGIPTO (PFG) ---
  const showcaseEgipto = document.getElementById('showcase-proyecto-final');
  const btnEgipto = document.getElementById('btn-egipto');

  if (showcaseEgipto && btnEgipto) {
    btnEgipto.addEventListener('click', (e) => {
      e.stopPropagation();
      // El CSS se encarga del giro de 180° y el desplazamiento a la izquierda
      showcaseEgipto.classList.toggle('active-egipto');
    });

    showcaseEgipto.addEventListener('click', (e) => {
      // Si el click no es en la tarjeta, reseteamos el estado
      if (!btnEgipto.contains(e.target)) {
        showcaseEgipto.classList.remove('active-egipto');
      }
    });
  }

  // --- 4. EFECTO 3D UNIVERSAL (Inclinación y Máscara) ---
  const scenes = document.querySelectorAll(".scene-3d");

  scenes.forEach((scene) => {
    const card = scene.querySelector(".card-3d");
    if (!card) return;

    scene.addEventListener("mousemove", (e) => {
      const rect = scene.getBoundingClientRect();
      const mouseXPct = (e.clientX - rect.left) / rect.width;
      const mouseYPct = (e.clientY - rect.top) / rect.height;

      // Detectar estado de la sección Egipto
      const isEgipto = scene.classList.contains('variante-egipto');
      const isEgiptoActive = showcaseEgipto && showcaseEgipto.classList.contains('active-egipto');

      // Parámetros de rotación sutil (tilt)
      let rotateY = (mouseXPct - 0.5) * 30;
      let rotateX = (0.5 - mouseYPct) * 30;
      
      let baseRotationY = 0;

      // Si es Egipto y está activo (mostrando la parte trasera)
      if (isEgipto && isEgiptoActive) {
        baseRotationY = 180; // Mantenemos la base del giro CSS
        rotateY = rotateY * -1; // Invertimos el eje para que la perspectiva sea natural
      }

      // Aplicamos la transformación sumando el "tilt" del ratón a la rotación base
      // Usamos una transición corta para que el movimiento del ratón sea fluido
      card.style.transition = "transform 0.5s ease-out";
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${baseRotationY + rotateY}deg)`;

      // Lógica de la máscara (shimmer diagonal)
      // En la cara trasera (Egipto activo), invertimos la dirección de la máscara
      const maskPos = (isEgipto && isEgiptoActive) 
        ? (mouseXPct * 120 - 10) 
        : (110 - mouseXPct * 120);
        
      card.style.setProperty("--mask-offset", `${maskPos}%`);
    });

    scene.addEventListener("mouseleave", () => {
      const isEgipto = scene.classList.contains('variante-egipto');
      const isEgiptoActive = showcaseEgipto && showcaseEgipto.classList.contains('active-egipto');
      const baseRotationY = (isEgipto && isEgiptoActive) ? 180 : 0;

      // Al salir, devolvemos la tarjeta a su posición base (0° o 180°) con la transición suave del CSS
      card.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.transform = `rotateX(0deg) rotateY(${baseRotationY}deg)`;
      card.style.setProperty("--mask-offset", `50%`);
    });
  });
});