document.addEventListener("DOMContentLoaded", function () {
  // Para todos los carruseles (puede haber más de uno)
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-btn.next');
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    let currentIndex = 0;

    function updateSlidePosition() {
      if (!slides.length) return;
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    }

    if (nextButton) {
      // Usar 'click' y 'touchstart' para mayor compatibilidad
      nextButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación para no cerrar el modal si es el caso
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
      });
      nextButton.addEventListener('touchstart', (e) => {
        e.stopPropagation(); // Evitar propagación
        e.preventDefault(); // Prevenir el comportamiento predeterminado del touch (ej. scroll)
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
      });
    }

    if (prevButton) {
      // Usar 'click' y 'touchstart' para mayor compatibilidad
      prevButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
      });
      prevButton.addEventListener('touchstart', (e) => {
        e.stopPropagation(); // Evitar propagación
        e.preventDefault(); // Prevenir el comportamiento predeterminado del touch
        currentIndex = (currentIndex + 1 + slides.length) % slides.length; // Asegura que siempre sea positivo
        updateSlidePosition();
      });
    }

    window.addEventListener('resize', updateSlidePosition);
    updateSlidePosition();

    // Modal - abrir imagen al hacer clic dentro de este carrusel
    const images = slides.map(slide => slide.querySelector('img'));
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        openModal(images, index);
      });
      img.addEventListener('touchstart', (e) => { // Añadir touchstart para abrir modal
        e.preventDefault(); // Evita el click simulado y el scroll
        openModal(images, index);
      });
    });
  });

  // Modal fuera de los carruseles (global)
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  let modalImages = [];
  let modalCurrentIndex = 0;

  function openModal(imagesArray, index) {
    modalImages = imagesArray;
    modalCurrentIndex = index;
    modalImage.src = modalImages[modalCurrentIndex].src;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showPrev() {
    modalCurrentIndex = (modalCurrentIndex - 1 + modalImages.length) % modalImages.length;
    modalImage.src = modalImages[modalCurrentIndex].src;
  }

  function showNext() {
    modalCurrentIndex = (modalCurrentIndex + 1) % modalImages.length;
    modalImage.src = modalImages[modalCurrentIndex].src;
  }

  // Evento para cerrar modal al click/touch fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modal.addEventListener('touchstart', (e) => { // Añadir touchstart para cerrar modal
    if (e.target === modal) {
      e.preventDefault(); // Evita el click simulado
      closeModal();
    }
  });


  // También debes asegurarte de que los botones de navegación del modal (si existen) también usen touchstart
  // Si tienes botones para 'modal-prev' y 'modal-next' en tu HTML, asegúrate de que tengan listeners:
  const modalPrevButton = document.querySelector('.modal-prev');
  const modalNextButton = document.querySelector('.modal-next');
  const modalCloseButton = document.querySelector('.modal-close'); // Asegúrate de cerrar también

  if (modalPrevButton) {
    modalPrevButton.addEventListener('click', showPrev);
    modalPrevButton.addEventListener('touchstart', (e) => { e.preventDefault(); showPrev(); });
  }
  if (modalNextButton) {
    modalNextButton.addEventListener('click', showNext);
    modalNextButton.addEventListener('touchstart', (e) => { e.preventDefault(); showNext(); });
  }
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
    modalCloseButton.addEventListener('touchstart', (e) => { e.preventDefault(); closeModal(); });
  }


  // Teclas del teclado para navegación modal (esto funciona bien en desktop)
  window.addEventListener("keydown", function(e) {
    if (modal.style.display === "flex") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
  });
});