/**
 * Main JavaScript for Portfolio Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle for Mobile
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarItems = document.querySelector('.navbar-items');
    
    if (navbarToggle && navbarItems) {
        navbarToggle.addEventListener('click', function() {
            navbarItems.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navbarItems.classList.contains('active')) {
            navbarItems.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Account for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    if (navbarItems.classList.contains('active')) {
                        navbarItems.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form submission logic
            // In a real implementation, you would use AJAX to send the form data to a server
            console.log('Form submitted with:', { name, email, message });
            
            // Reset form after submission
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    
    // Add active class to current section in navigation
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-items a');
        
        // Get current scroll position
        let scrollPosition = window.scrollY;
        
        // Add navbar height to account for fixed position
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        // Highlight the appropriate nav item based on the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // 50px offset for better UX
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add scroll event listener for navigation highlighting
    window.addEventListener('scroll', highlightNavigation);
    
    // Call once on page load
    highlightNavigation();
    
    // Add CSS styling for active navigation link
    const style = document.createElement('style');
    style.textContent = `
        .navbar-items a.active {
            color: var(--primary-color);
        }
        .navbar-items a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});