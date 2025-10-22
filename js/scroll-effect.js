// Enhanced scroll effect with smoother transitions
document.addEventListener('DOMContentLoaded', function() {
    const welcomeFullscreen = document.getElementById('welcome-fullscreen');
    const mainContent = document.getElementById('main-content');
    const container1 = document.querySelector('.container1'); // Select the container with your picture
    
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Variables for parallax scrolling effect
    let lastScrollTop = 0;
    let ticking = false;
    
    // Handle scroll events with throttling for better performance
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // When scrolled past 5% of the viewport height (slower transition)
                if (scrollPosition > viewportHeight * 0.02) { // Even more sensitive to start transition earlier
                    // Much slower fade out - changed ratio to make it last longer
                    const opacity = 1 - Math.min(1, (scrollPosition - viewportHeight * 0.02) / (viewportHeight * 1.0));
                    
                    // Slower scale down
                    welcomeFullscreen.style.opacity = opacity;
                    welcomeFullscreen.style.transform = `scale(${Math.max(0.8, 1 - scrollPosition / (viewportHeight * 2.0))})`;
                    
                    // When nearly invisible, hide completely
                    if (opacity < 0.1) {
                        welcomeFullscreen.style.visibility = 'hidden';
                        // Adjust main content padding when welcome section is gone
                        mainContent.style.paddingTop = '20px'; // Reduced padding since we don't have header
                        
                        // Apply parallax effect to container1 (profile section)
                        if (container1) {
                            // Slow down scrolling for the first container by applying reverse parallax
                            const scrollRatio = 0.3; // This makes the section scroll at 30% of normal speed
                            const offsetY = (scrollPosition - viewportHeight) * (1 - scrollRatio);
                            
                            // Only apply when scrolling down into the profile section
                            if (scrollPosition > viewportHeight && scrollPosition < viewportHeight * 2) {
                                container1.style.transform = `translateY(${offsetY}px)`;
                            }
                        }
                    } else {
                        welcomeFullscreen.style.visibility = 'visible';
                        mainContent.style.paddingTop = '120vh'; // Updated to match CSS
                    }
                } else {
                    // Reset when scrolled back to top
                    welcomeFullscreen.style.opacity = 1;
                    welcomeFullscreen.style.transform = 'scale(1)';
                    welcomeFullscreen.style.visibility = 'visible';
                    mainContent.style.paddingTop = '120vh'; // Updated to match CSS
                    
                    if (container1) {
                        container1.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollTop = scrollPosition;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Initial check
    window.dispatchEvent(new Event('scroll'));
});