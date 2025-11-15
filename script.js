document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-principal a');
    const sections = document.querySelectorAll('section[id]');
    
    // Un "margen" para que el enlace se active un poco antes
    const offset = 250; 

    const updateActiveLink = () => {
        
        const scrollPosition = window.scrollY;
        
        // --- LA COMPROBACIÓN ESPECIAL ---
        // Comprueba si el usuario está al final de la página
        // (Añadimos un pequeño búfer de 10px por si acaso)
        const atBottom = (window.innerHeight + scrollPosition) >= document.body.scrollHeight - 10;

        let currentSectionId = '';

        if (atBottom) {
            // SI ESTÁS AL FINAL: Forzamos que la sección activa
            // sea la última de la lista (es decir, "contacto")
            currentSectionId = sections[sections.length - 1].id;
            
        } else {
            // SI NO ESTÁS AL FINAL: Usamos la lógica normal
            // Recorremos todas las secciones...
            sections.forEach(section => {
                // ...y si hemos pasado el inicio de una sección (con el offset)
                if ((scrollPosition + offset) >= section.offsetTop) {
                    // ...la marcamos como la sección actual
                    currentSectionId = section.id;
                }
            });
        }
        
        // --- CASO ESPECIAL PARA "INICIO" ---
        // Si después de todo, no hay sección (estamos arriba del todo),
        // y el primer enlace es #inicio, lo activamos.
        if (currentSectionId === '' && navLinks.length > 0 && navLinks[0].getAttribute('href') === '#inicio') {
            currentSectionId = 'inicio';
        }

        
        // --- ACTUALIZAR LAS CLASES ---
        // Finalmente, recorremos los enlaces y ponemos "activo"
        // solo al que coincida con la sección actual.
        navLinks.forEach(link => {
            link.classList.remove('activo');
            
            const expectedHref = `#${currentSectionId}`;
            
            if (link.getAttribute('href') === expectedHref) {
                link.classList.add('activo');
            }
        });
    };

    // Ejecutamos la función al hacer scroll y al cargar la página
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); 
});