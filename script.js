document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true
    });

    const toTopBtn = document.querySelector('.back-to-top-btn');

    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                toTopBtn.classList.add('visible');
            } else {
                toTopBtn.classList.remove('visible');
            }
        });

        toTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const faqPreguntas = document.querySelectorAll('.faq-pregunta');

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const item = pregunta.closest('.faq-item');
            item.classList.toggle('activo');

            faqPreguntas.forEach(otraPregunta => {
                const otroItem = otraPregunta.closest('.faq-item');
                if (otroItem !== item && otroItem.classList.contains('activo')) {
                    otroItem.classList.remove('activo');
                }
            });
        });
    });

    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const navPrincipal = document.querySelector('.nav-principal');
    const navIcon = menuToggleBtn.querySelector('i');

    menuToggleBtn.addEventListener('click', () => {
        navPrincipal.classList.toggle('menu-abierto');
        if (navPrincipal.classList.contains('menu-abierto')) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        } else {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        }
    });

    const navLinks = document.querySelectorAll('.nav-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navPrincipal.classList.contains('menu-abierto')) {
                navPrincipal.classList.remove('menu-abierto');
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const offset = 200;

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY;
        const atBottom = (window.innerHeight + scrollPosition) >= document.body.scrollHeight - 10;
        let currentSectionId = '';

        if (atBottom) {
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
            const expectedHref = `#${currentSectionId}`;
            if (link.getAttribute('href') === expectedHref) {
                link.classList.add('activo');
            }
        });
    };

    if (sections.length > 0) {
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }
});
