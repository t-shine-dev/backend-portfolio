 // Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
        lucide.createIcons();
    });

    // Mobile Menu Toggle - FIXED VERSION
    (function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        // Function to open menu
        function openMenu() {
            if (mobileMenu) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = '0';
                document.body.style.left = '0';
                
                // Ensure close button is clickable
                if (closeMenuBtn) {
                    closeMenuBtn.style.pointerEvents = 'auto';
                    closeMenuBtn.style.zIndex = '1001';
                }
            }
        }
        
        // Function to close menu
        function closeMenu() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                document.body.style.left = '';
            }
        }
        
        // Open menu button click
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
        }
        
        // Close menu button click - MULTIPLE EVENT LISTENERS for reliability
        if (closeMenuBtn) {
            // Remove any existing listeners first
            closeMenuBtn.replaceWith(closeMenuBtn.cloneNode(true));
            const newCloseBtn = document.getElementById('close-menu');
            
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked'); // Debug
                    closeMenu();
                });
                
                // Also add touch event for mobile
                newCloseBtn.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button touched'); // Debug
                    closeMenu();
                });
            }
        }
        
        // Mobile links click
        if (mobileLinks.length > 0) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    closeMenu();
                });
            });
        }
        
        // Close when clicking outside the menu
        if (mobileMenu) {
            mobileMenu.addEventListener('click', function(e) {
                // Close if clicking on the overlay background (not the menu content)
                if (e.target === mobileMenu) {
                    closeMenu();
                }
            });
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    })();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-item, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Skill Progress Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        });
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
            submitBtn.disabled = true;
            lucide.createIcons();

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error but still provide feedback
                submitBtn.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5"></i> Error. Try again.';
                submitBtn.classList.remove('bg-fastapi');
                submitBtn.classList.add('bg-red-600');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.add('bg-fastapi');
                    submitBtn.classList.remove('bg-red-600');
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }
        });
    }

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg', 'bg-dark/95');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-dark/95');
                navbar.classList.add('bg-dark/90');
            }
        });
    }

    // Fix for iOS 100vh issue
    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVh);
    setVh();