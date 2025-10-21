// Interactive background script
window.addEventListener("load", function() {
    console.log("Interactive background initializing...");
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-bg';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // We'll use CSS for most styling
    canvas.style.background = 'rgba(0, 0, 0, 0.4)'; // Darker background for better contrast
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call once to set initial size
    resizeCanvas();
    
    // Update when window size changes
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particles = [];
    const particleCount = 200; // Even more particles
    const particleBaseSize = 4; // Even larger base size
    const particleAddedSize = 3; // More size variation
    const particleBaseSpeed = 1;
    const particleVariableSpeed = 1; // Faster movement
    const connectionDistance = 200; // Longer connections
    const mouseRadius = 250; // Larger mouse influence
    
    // Mouse tracking
    let mouse = {
        x: null,
        y: null,
        radius: mouseRadius
    };
    
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Create particles
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * particleAddedSize + particleBaseSize,
                speedX: Math.random() * particleVariableSpeed * 2 - particleVariableSpeed,
                speedY: Math.random() * particleVariableSpeed * 2 - particleVariableSpeed,
                color: 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')' // Maximum visibility
            });
        }
    }
    
    // Update particles
    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            // Move particles
            particles[i].x += particles[i].speedX;
            particles[i].y += particles[i].speedY;
            
            // Bounce off edges
            if (particles[i].x > canvas.width || particles[i].x < 0) {
                particles[i].speedX = -particles[i].speedX;
            }
            
            if (particles[i].y > canvas.height || particles[i].y < 0) {
                particles[i].speedY = -particles[i].speedY;
            }
            
            // Mouse interaction - push particles away from mouse
            if (mouse.x != null && mouse.y != null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const pushFactor = (mouse.radius - distance) / mouse.radius;
                    
                    particles[i].x += Math.cos(angle) * pushFactor * 2;
                    particles[i].y += Math.sin(angle) * pushFactor * 2;
                }
            }
        }
    }
    
    // Draw particles and connections
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
            ctx.fillStyle = particles[i].color;
            ctx.fill();
            
            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    // The closer the particles, the more opaque the line
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity * 0.7 + ')'; // Highly visible connections
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Initialize
    initParticles();
    animate();
    console.log("Interactive background started successfully!");
});