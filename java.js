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
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
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

  // Evento para cerrar modal al click fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Teclas del teclado para navegación modal
  window.addEventListener("keydown", function(e) {
    if (modal.style.display === "flex") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
  });

  // Puedes agregar botones en el modal para Prev/Next si los quieres
});
