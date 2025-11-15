document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar AOS para las animaciones al hacer scroll
    AOS.init({
        duration: 800,
        once: true
    });

    // =============================================
    // ========= LÓGICA BOTÓN VOLVER ARRIBA ========
    // =============================================
    const toTopBtn = document.querySelector('.back-to-top-btn');

    if (toTopBtn) { // Comprueba si el botón existe en la página
        window.addEventListener('scroll', () => {
            // Si el usuario ha bajado más de 400px...
            if (window.scrollY > 400) {
                // ...mostramos el botón
                toTopBtn.classList.add('visible');
            } else {
                // ...si no, lo ocultamos
                toTopBtn.classList.remove('visible');
            }
        });

        // Opcional: Que el scroll sea suave
        toTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el salto brusco del href="#"
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =============================================
    // ========= LÓGICA DE FAQ (ACORDEÓN) ==========
    // =============================================
    const faqPreguntas = document.querySelectorAll('.faq-pregunta');

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            // 1. Busca el contenedor padre '.faq-item'
            const item = pregunta.closest('.faq-item');
            
            // 2. Añade o quita la clase 'activo'
            item.classList.toggle('activo');

            // 3. (Opcional) Cierra otros items
            // Si quieres que solo uno esté abierto a la vez:
            faqPreguntas.forEach(otraPregunta => {
                const otroItem = otraPregunta.closest('.faq-item');
                // Si NO es el item en el que hicimos clic...
                if (otroItem !== item && otroItem.classList.contains('activo')) {
                    // ... ciérralo
                    otroItem.classList.remove('activo');
                }
            });
        });
    });


    // =============================================
    // ========= LÓGICA MENÚ HAMBURGUESA ===========
    // =============================================
    
    // --- ¡AQUÍ ESTABA EL ERROR! HE BORRADO LAS LÍNEAS REPETIDAS ---
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
    
    // Tu CSS usa 200px, el JS debe usar 200px. Esto está correcto.
    const offset = 200; 

    const updateActiveLink = () => {
        
        const scrollPosition = window.scrollY;
        
        const atBottom = (window.innerHeight + scrollPosition) >= document.body.scrollHeight - 10;

        let currentSectionId = '';

        if (atBottom) {
            // Comprueba si hay secciones antes de acceder al array
            if (sections.length > 0) {
                currentSectionId = sections[sections.length - 1].id;
            }
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
            
            // Solo aplica la clase 'activo' a los enlaces de scroll interno (que empiezan con #)
            const expectedHref = `#${currentSectionId}`;
            if (link.getAttribute('href') === expectedHref) {
                link.classList.add('activo');
            }
        });
    };

    // Solo ejecuta el 'updateActiveLink' si hay secciones en la página
    if (sections.length > 0) {
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); 
    }
});