document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Tabla y filtros
    const codeTable = document.getElementById('orl-code-table');
    const searchInput = document.getElementById('search-code');
    const modalitySelect = document.getElementById('filter-modality');
    const areaSelect = document.getElementById('filter-area');
    const resetButton = document.getElementById('reset-filters');
    const totalResults = document.getElementById('total-results');
    
    // Inicializar tabla
    initializeTable();
    
    // Función para inicializar la tabla con datos
    function initializeTable() {
        if (!codeTable) return;
        
        const tbody = codeTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Cargar los datos (asumiendo que orlData está disponible globalmente)
        if (typeof orlData !== 'undefined') {
            orlData.forEach(code => {
                const row = document.createElement('tr');
                
                // Añadir celda para código
                const codeCell = document.createElement('td');
                codeCell.textContent = code.code;
                row.appendChild(codeCell);
                
                // Añadir celda para descripción
                const descCell = document.createElement('td');
                descCell.textContent = code.description;
                row.appendChild(descCell);
                
                // Añadir celda para modalidad con etiqueta
                const modalityCell = document.createElement('td');
                const modalityTag = document.createElement('span');
                modalityTag.textContent = code.modality;
                modalityTag.classList.add('modality-tag');
                
                // Añadir clase basada en la modalidad
                if (code.modality === 'MAI') {
                    modalityTag.classList.add('modality-mai');
                } else if (code.modality === 'MLE') {
                    modalityTag.classList.add('modality-mle');
                } else if (code.modality.includes('PPC') || code.modality.includes('Estético')) {
                    modalityTag.classList.add('modality-ppc');
                }
                
                modalityCell.appendChild(modalityTag);
                row.appendChild(modalityCell);
                
                // Añadir celda para área/tipo
                const areaCell = document.createElement('td');
                areaCell.textContent = code.area;
                if (code.type) {
                    areaCell.textContent += ` (${code.type})`;
                }
                row.appendChild(areaCell);
                
                // Añadir celda para valor
                const valueCell = document.createElement('td');
                valueCell.textContent = code.value || 'No especificado';
                row.appendChild(valueCell);
                
                tbody.appendChild(row);
            });
            
            updateResultCount(orlData.length);
        }
    }
    
    // Función para filtrar la tabla
    function filterTable() {
        if (!codeTable) return;
        
        const tbody = codeTable.querySelector('tbody');
        const searchTerm = searchInput.value.toLowerCase();
        const modalityFilter = modalitySelect.value;
        const areaFilter = areaSelect.value;
        
        let filteredCount = 0;
        
        // Recorrer todas las filas y aplicar filtros
        Array.from(tbody.querySelectorAll('tr')).forEach(row => {
            const codeText = row.cells[0].textContent.toLowerCase();
            const descText = row.cells[1].textContent.toLowerCase();
            const modalityText = row.cells[2].textContent;
            const areaText = row.cells[3].textContent;
            
            // Aplicar filtros
            const matchesSearch = searchTerm === '' || 
                                 codeText.includes(searchTerm) || 
                                 descText.includes(searchTerm);
            
            const matchesModality = modalityFilter === '' || 
                                   modalityText.includes(modalityFilter);
            
            const matchesArea = areaFilter === '' || 
                               areaText.includes(areaFilter);
            
            // Mostrar u ocultar fila según filtros
            if (matchesSearch && matchesModality && matchesArea) {
                row.style.display = '';
                filteredCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        updateResultCount(filteredCount);
    }
    
    // Actualizar contador de resultados
    function updateResultCount(count) {
        if (totalResults) {
            totalResults.textContent = count;
        }
    }
    
    // Resetear filtros
    function resetFilters() {
        if (searchInput) searchInput.value = '';
        if (modalitySelect) modalitySelect.value = '';
        if (areaSelect) areaSelect.value = '';
        filterTable();
    }
    
    // Función para actualizar la navegación
    function updateNavigation() {
        prevButton.disabled = currentSlideIndex === 0;
        nextButton.disabled = currentSlideIndex === totalSlides - 1;
        
        // Si existe una función global de actualización del contador, usarla
        if (window.updateSlideCounterFunction) {
            window.updateSlideCounterFunction(currentSlideIndex + 1);
        } else {
            // Actualizar contador
            slideCounter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
        }
    }
    
    // Función para mostrar un slide específico
    function showSlide(index) {
        // Asegurar que el índice esté dentro del rango
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar el slide actual
        slides[index].classList.add('active');
        
        // Actualizar el índice actual
        currentSlideIndex = index;
        
        // Actualizar navegación
        updateNavigation();
        
        // Hacer scroll al inicio del slide (útil en vista móvil)
        if (window.innerWidth <= 768) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para navegación
    prevButton.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlideIndex + 1);
        }
    });
    
    // Event listeners para filtros de tabla
    if (searchInput) searchInput.addEventListener('input', filterTable);
    if (modalitySelect) modalitySelect.addEventListener('change', filterTable);
    if (areaSelect) areaSelect.addEventListener('change', filterTable);
    if (resetButton) resetButton.addEventListener('click', resetFilters);
    
    // Inicializar navegación
    updateNavigation();
    
    // Función para manejar desplazamiento suave en los slides
    function handleSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const container = document.getElementById('presentation-container');
                    const targetPosition = targetElement.offsetTop - container.offsetTop;
                    
                    container.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Inicializar desplazamiento suave
    handleSmoothScroll();
}); 