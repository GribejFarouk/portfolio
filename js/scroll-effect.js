// Scroll effect for welcome section
document.addEventListener('DOMContentLoaded', function() {
    const welcomeFullscreen = document.getElementById('welcome-fullscreen');
    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // When scrolled past 10% of the viewport height
        if (scrollPosition > viewportHeight * 0.1) {
            // Start transition
            const opacity = 1 - Math.min(1, (scrollPosition - viewportHeight * 0.1) / (viewportHeight * 0.4));
            
            // Shrink the welcome section
            welcomeFullscreen.style.opacity = opacity;
            welcomeFullscreen.style.transform = `scale(${Math.max(0.8, 1 - scrollPosition / (viewportHeight * 0.8))})`;
            
            // Show the header
            mainHeader.classList.add('scrolled');
            
            // When nearly invisible, hide completely
            if (opacity < 0.1) {
                welcomeFullscreen.style.visibility = 'hidden';
                // Adjust main content padding when welcome section is gone
                mainContent.style.paddingTop = '120px';
            } else {
                welcomeFullscreen.style.visibility = 'visible';
                mainContent.style.paddingTop = '120vh';
            }
        } else {
            // Reset when scrolled back to top
            welcomeFullscreen.style.opacity = 1;
            welcomeFullscreen.style.transform = 'scale(1)';
            welcomeFullscreen.style.visibility = 'visible';
            mainHeader.classList.remove('scrolled');
            mainContent.style.paddingTop = '120vh';
        }
    });
    
    // Initial check
    window.dispatchEvent(new Event('scroll'));
});