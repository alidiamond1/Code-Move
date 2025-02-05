document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('nav ul li');

    function toggleMenu() {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenuButton.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }

    if (mobileMenuButton && nav && overlay) {
        mobileMenuButton.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when clicking menu items
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            // Scrolling down
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            // Scrolling up
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });

    // Enhanced Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }

    function validateInput(input) {
        const errorEl = input.parentElement.querySelector('.error-message');
        if (errorEl) errorEl.remove();
        input.classList.remove('error');
        
        let isValid = true;
        let errorMessage = '';
        
        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!input.value.trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(input.value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            
            case 'text':
                if (!input.value.trim()) {
                    errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
                    isValid = false;
                }
                break;
            
            case 'textarea':
                if (!input.value.trim()) {
                    errorMessage = 'Message is required';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            input.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
            input.parentElement.appendChild(errorDiv);
        }
        
        return isValid;
    }

    // Enhanced Scroll Animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .about-content, .contact-form'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // CTA Button Hover Effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            button.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateX(4px)';
            });
            button.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateX(0)';
            });
        }
    });
});