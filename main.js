document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    window.history.replaceState(null, null, ' ');
    window.scrollTo(0, 0);

    /* =========================================================================
       1. Mobile Menu Toggle
       ========================================================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const menuIcon = menuToggle.querySelector('i');

    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navbar.classList.toggle('active');

        // Change icon
        if (navbar.classList.contains('active')) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* =========================================================================
       2. Sticky Header Effects
       ========================================================================= */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    /* =========================================================================
       3. Active Navigation Links on Scroll
       ========================================================================= */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    /* =========================================================================
       4. Intersection Observer for Fade Up Animations
       ========================================================================= */
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll('.fade-up');

        const fadeObserverOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes into view
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if part of a staggered group
                    if (entry.target.classList.contains('stagger-item')) {
                        // Find position within parent to add delay
                        const parent = entry.target.parentElement;
                        const siblings = Array.from(parent.querySelectorAll('.stagger-item'));
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }

                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, fadeObserverOptions);

        // Give hero elements an immediate class so they appear quickly
        setTimeout(() => {
            document.querySelectorAll('#inicio .fade-up').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);

        fadeElements.forEach(el => {
            // Don't observe hero elements since we animate them manually right away
            if (!el.closest('#inicio')) {
                fadeObserver.observe(el);
            }
        });
    }

    /* =========================================================================
       5. Skills Filtering
       ========================================================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                // If filter is 'all', show all and restore animation states
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    // Small trick to re-trigger opacity if needed
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // Fade out before hiding
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });

    /* =========================================================================
       6. Copy to Clipboard & Toast Notifications
       ========================================================================= */
    const copyButtons = document.querySelectorAll('.copy-action');
    const toastContainer = document.getElementById('toast-container');

    const showToast = (message, icon = 'bx-check-circle') => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class='bx ${icon} text-primary' style="font-size: 1.5rem;"></i> <span>${message}</span>`;

        toastContainer.appendChild(toast);

        // Trigger reflow
        void toast.offsetWidth;

        // Show
        toast.classList.add('show');

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for transition to finish
        }, 3000);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');

            try {
                await navigator.clipboard.writeText(textToCopy);

                let typeStr = textToCopy.includes('@') ? 'Email' : 'Teléfono';
                showToast(`${typeStr} copiado al portapapeles`);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showToast('Error al copiar', 'bx-error-circle');
            }
        });
    });

    /* =========================================================================
       7. Subtle Tilt Effect (Desktop Only)
       ========================================================================= */
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.tilt-effect');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Moderate tilt (max 3 degrees)
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = `transform 0.5s ease`;

                setTimeout(() => {
                    card.style.transition = '';
                }, 500);
            });

            // Remove transition on enter for smoother tracking
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }
});
