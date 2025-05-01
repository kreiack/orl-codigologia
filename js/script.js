document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const tableBody = document.querySelector('#orl-code-table tbody');
    
    // Elementos de filtrado
    const searchInput = document.getElementById('search-code');
    const modalitySelect = document.getElementById('filter-modality');
    const areaSelect = document.getElementById('filter-area');
    const resetButton = document.getElementById('reset-filters');
    const totalResults = document.getElementById('total-results');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let filteredData = []; // Para almacenar datos filtrados

    // --- Inicialización --- 
    updateSlideVisibility();
    updateNavigationButtons();
    updateSlideCounter();
    populateTable();
    setupTableFilters();

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

    // Navegación con teclas de flecha
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && !prevButton.disabled) {
            prevButton.click();
        } else if (event.key === 'ArrowRight' && !nextButton.disabled) {
            nextButton.click();
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
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }

    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    // --- Filtros de Tabla ---
    function setupTableFilters() {
        if (!searchInput || !modalitySelect || !areaSelect || !resetButton) return;

        // Evento para el campo de búsqueda (con debounce)
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });

        // Eventos para los selectores
        modalitySelect.addEventListener('change', applyFilters);
        areaSelect.addEventListener('change', applyFilters);

        // Evento para el botón de reset
        resetButton.addEventListener('click', () => {
            searchInput.value = '';
            modalitySelect.value = '';
            areaSelect.value = '';
            applyFilters();
        });

        // Inicializar selectores con valores únicos
        if (typeof orlData !== 'undefined') {
            // Llenar selector de áreas con valores únicos
            const areas = [...new Set(orlData.map(item => item.area).filter(Boolean))];
            areas.sort().forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });
        }
    }

    function applyFilters() {
        if (typeof orlData === 'undefined' || !tableBody) return;

        const searchTerm = searchInput.value.toLowerCase();
        const modalityFilter = modalitySelect.value;
        const areaFilter = areaSelect.value;

        // Filtrar datos
        filteredData = orlData.filter(item => {
            const matchesSearch = searchTerm === '' || 
                item.code?.toLowerCase().includes(searchTerm) || 
                item.description?.toLowerCase().includes(searchTerm);
            
            const matchesModality = modalityFilter === '' || 
                item.modality === modalityFilter;
            
            const matchesArea = areaFilter === '' || 
                item.area === areaFilter;
            
            return matchesSearch && matchesModality && matchesArea;
        });

        // Actualizar tabla
        updateTable();
        
        // Actualizar contador de resultados
        if (totalResults) {
            totalResults.textContent = filteredData.length;
        }
    }

    function updateTable() {
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        filteredData.forEach(item => {
            const row = tableBody.insertRow();
            
            // Insertar celdas con resaltado si hay término de búsqueda
            const searchTerm = searchInput?.value.toLowerCase() || '';
            
            // Código
            const codeCell = row.insertCell();
            codeCell.textContent = item.code || 'N/A';
            if (searchTerm && item.code && item.code.toLowerCase().includes(searchTerm)) {
                highlightText(codeCell, searchTerm);
            }
            
            // Descripción
            const descCell = row.insertCell();
            descCell.textContent = item.description || 'Descripción no disponible';
            if (searchTerm && item.description && item.description.toLowerCase().includes(searchTerm)) {
                highlightText(descCell, searchTerm);
            }
            
            // Resto de celdas
            row.insertCell().textContent = item.modality || 'N/A';
            row.insertCell().textContent = `${item.area || 'N/A'} / ${item.type || 'N/A'}`;
            row.insertCell().textContent = item.value || 'N/A';
        });
    }

    function highlightText(cell, searchTerm) {
        const content = cell.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        cell.innerHTML = content.replace(regex, '<span class="highlight">$1</span>');
    }

    // --- Llenar Tabla Anexo --- 
    function populateTable() {
        if (!tableBody || typeof orlData === 'undefined') return;

        // Guardar datos completos en filteredData inicial
        filteredData = [...orlData];
        
        // Actualizar tabla
        updateTable();
        
        // Actualizar contador de resultados
        if (totalResults) {
            totalResults.textContent = filteredData.length;
        }
    }
}); 