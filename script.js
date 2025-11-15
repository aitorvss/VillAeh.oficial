document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar AOS para las animaciones al hacer scroll
    AOS.init({
        duration: 800, // Duración de la animación en milisegundos
        once: true     // Las animaciones solo se ejecutan una vez
    });

    // =============================================
    // ========= LÓGICA MENÚ HAMBURGUESA ===========
    // =============================================
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const navPrincipal = document.querySelector('.nav-principal');
    const navIcon = menuToggleBtn.querySelector('i'); // El icono <i> dentro del botón
    
    // 1. Abrir/Cerrar con el botón
    menuToggleBtn.addEventListener('click', () => {
        navPrincipal.classList.toggle('menu-abierto');
        
        // Cambiar el icono (de ☰ a X y viceversa)
        if (navPrincipal.classList.contains('menu-abierto')) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        } else {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        }
    });

    // 2. Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-principal a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerramos si el menú está abierto (en modo móvil)
            if (navPrincipal.classList.contains('menu-abierto')) {
                navPrincipal.classList.remove('menu-abierto');
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
            }
        });
    });

    // =============================================
    // ========= LÓGICA DE SCROLL ACTIVO ===========
    // =============================================
    
    const sections = document.querySelectorAll('section[id]');
    
    // CORRECCIÓN: Tu CSS usa 200px de padding, el offset debe coincidir.
    const offset = 200; 

    const updateActiveLink = () => {
        
        const scrollPosition = window.scrollY;
        
        const atBottom = (window.innerHeight + scrollPosition) >= document.body.scrollHeight - 10;

        let currentSectionId = '';

        if (atBottom) {
            currentSectionId = sections[sections.length - 1].id;
        } else {
            sections.forEach(section => {
                if ((scrollPosition + offset) >= section.offsetTop) {
                    currentSectionId = section.id;
                }
            });
        }
        
        if (currentSectionId === '' && navLinks.length > 0 && navLinks[0].getAttribute('href') === '#inicio') {
            currentSectionId = 'inicio';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('activo');
            
            const expectedHref = `#${currentSectionId}`;
            
            if (link.getAttribute('href') === expectedHref) {
                link.classList.add('activo');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); 
});