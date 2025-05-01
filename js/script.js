document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const tableBody = document.querySelector('#orl-code-table tbody');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // --- Inicialización --- 
    updateSlideVisibility();
    updateNavigationButtons();
    updateSlideCounter();
    populateTable();

    // --- Navegación --- 
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlideVisibility();
            updateNavigationButtons();
            updateSlideCounter();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlideVisibility();
            updateNavigationButtons();
            updateSlideCounter();
        }
    });

    // --- Funciones Auxiliares --- 
    function updateSlideVisibility() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                // Forzar reflow para reiniciar animación
                slide.style.display = 'block'; 
                // Añadir clase activa después de un pequeño delay para permitir transición
                setTimeout(() => slide.classList.add('active'), 10); 
            } else {
                slide.classList.remove('active');
                // Esperar a que termine la transición antes de ocultar
                slide.addEventListener('transitionend', function handleTransitionEnd() {
                    if (!slide.classList.contains('active')) {
                       slide.style.display = 'none';
                    }
                    slide.removeEventListener('transitionend', handleTransitionEnd);
                }, { once: true });
                 // Fallback por si transitionend no se dispara (ej. elemento ya oculto)
                if (getComputedStyle(slide).opacity == 0) {
                     slide.style.display = 'none';
                }
            }
        });
        // Asegurarse de que el contenedor principal tenga altura adecuada (puede ser necesario si hay problemas)
        // const activeSlideElement = slides[currentSlide];
        // document.getElementById('presentation-container').style.minHeight = activeSlideElement.scrollHeight + 'px';
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }

    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    // --- Llenar Tabla Anexo --- 
    function populateTable() {
        if (!tableBody || typeof orlData === 'undefined') return;

        tableBody.innerHTML = ''; // Limpiar tabla

        orlData.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = item.code || 'N/A';
            row.insertCell().textContent = item.description || 'Descripción no disponible';
            row.insertCell().textContent = item.modality || 'N/A';
            row.insertCell().textContent = `${item.area || 'N/A'} / ${item.type || 'N/A'}`;
            row.insertCell().textContent = item.value || 'N/A';
        });
    }
}); 