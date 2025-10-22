// Scroll effect for welcome section - simplified version
document.addEventListener('DOMContentLoaded', function() {
    const welcomeFullscreen = document.getElementById('welcome-fullscreen');
    const mainContent = document.getElementById('main-content');
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // When scrolled past 5% of the viewport height (slower transition)
        if (scrollPosition > viewportHeight * 0.05) {
            // Start transition (slower fade out - changed from 0.4 to 0.6)
            const opacity = 1 - Math.min(1, (scrollPosition - viewportHeight * 0.05) / (viewportHeight * 0.6));
            
            // Shrink the welcome section (slower scale down - changed from 0.8 to 1.2)
            welcomeFullscreen.style.opacity = opacity;
            welcomeFullscreen.style.transform = `scale(${Math.max(0.8, 1 - scrollPosition / (viewportHeight * 1.2))})`;
            
            // When nearly invisible, hide completely
            if (opacity < 0.1) {
                welcomeFullscreen.style.visibility = 'hidden';
                // Adjust main content padding when welcome section is gone
                mainContent.style.paddingTop = '20px'; // Reduced padding since we don't have header
            } else {
                welcomeFullscreen.style.visibility = 'visible';
                mainContent.style.paddingTop = '100vh';
            }
        } else {
            // Reset when scrolled back to top
            welcomeFullscreen.style.opacity = 1;
            welcomeFullscreen.style.transform = 'scale(1)';
            welcomeFullscreen.style.visibility = 'visible';
            mainContent.style.paddingTop = '100vh';
        }
    });
    
    // Initial check
    window.dispatchEvent(new Event('scroll'));
});