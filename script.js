document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading time for effect (since assets might load too fast)
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger Hero animations after preloader
            triggerHeroAnimations();
        }, 1000);
    }, 1500);

    function triggerHeroAnimations() {
        const heroTexts = document.querySelectorAll('.hero .reveal-text');
        heroTexts.forEach(el => el.classList.add('active'));
    }

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const hoverElements = document.querySelectorAll('a, button, .hover-link, .magnetic-btn');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // 3. Header Scroll Blur Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Parallax Effect for Hero Background
    const heroBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        // Move the background slower than the scroll speed
        heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));

    // 6. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseout', function(e) {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
});
