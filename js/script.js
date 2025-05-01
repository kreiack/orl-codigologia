document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const orlTableBody = document.querySelector('#orl-code-table tbody'); // Obtener tbody de la nueva tabla
    let currentSlide = 0;
    const totalSlides = slides.length; // Se actualiza automáticamente al encontrar la nueva sección

    // --- Poblar tabla de códigos ORL (si existe la tabla y los datos) ---
    if (orlTableBody && typeof orlData !== 'undefined') {
        orlData.forEach(item => {
            const row = orlTableBody.insertRow();
            row.innerHTML = `
                <td>${item.code || 'N/A'}</td>
                <td>${item.description || ''}</td>
                <td>${item.modality || 'N/A'}</td>
                <td>${item.area && item.type ? `${item.area} / ${item.type}` : item.area || item.type || 'N/A'}</td>
                <td>${item.value || 'Consultar'}</td>
            `;
        });
    }
    // --- Fin de poblar tabla ---

    function showSlide(index) {
        // Ocultar slide actual
        slides[currentSlide].classList.remove('active');

        // Actualizar índice
        currentSlide = index;

        // Mostrar nueva slide
        slides[currentSlide].classList.add('active');

        // Actualizar contador
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

        // Habilitar/deshabilitar botones de navegación
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }

    // Event listeners para botones
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1);
        }
    });
    
    // Navegación con teclas de flecha
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            // Simular clic en botón anterior si está habilitado
            if (!prevButton.disabled) {
                prevButton.click();
            }
        } else if (event.key === 'ArrowRight') {
            // Simular clic en botón siguiente si está habilitado
            if (!nextButton.disabled) {
                nextButton.click();
            }
        }
    });

    // Inicializar la primera diapositiva
    showSlide(currentSlide);
}); 