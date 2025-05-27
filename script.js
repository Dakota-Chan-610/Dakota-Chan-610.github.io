// Create animated background
function createAnimatedBackground() {
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-bg';
    document.body.insertBefore(animatedBg, document.body.firstChild);
}

// Typing animation for hero heading
function initTypingAnimation() {
    const heroHeading = document.querySelector('.hero h1');
    if (!heroHeading) return;

    // Split the text into static and dynamic parts
    const staticText = "Hi, I'm ";
    const dynamicText = "Dakota Chan";
    
    // Create the static text span
    const staticSpan = document.createElement('span');
    staticSpan.textContent = staticText;
    heroHeading.textContent = '';
    heroHeading.appendChild(staticSpan);
    
    // Create the dynamic text span
    const typingText = document.createElement('span');
    typingText.className = 'typing-text';
    heroHeading.appendChild(typingText);

    let isDeleting = false;
    let textIndex = 0;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = dynamicText.substring(0, textIndex);
        typingText.textContent = currentText;

        if (!isDeleting && textIndex === dynamicText.length) {
            // Pause at the end of typing
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
            return;
        }

        if (isDeleting && textIndex === 0) {
            // Pause at the start before typing again
            isDeleting = false;
            setTimeout(typeWriter, 1000);
            return;
        }

        if (isDeleting) {
            textIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            textIndex++;
            typingSpeed = 100; // Normal speed when typing
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing animation when the page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Create chat background
function createChatBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const chatBackground = document.createElement('div');
    chatBackground.className = 'chat-background';
    hero.insertBefore(chatBackground, hero.firstChild);

    // Sample chat messages
    const messages = [
        "Hello! 👋",
        "Welcome to my portfolio!",
        "I'm a Data Anlayst",
        "Let's connect!",
        "Check out my projects",
        "Feel free to reach out",
        "Looking for opportunities",
        "Let's build something amazing"
    ];

    // Create chat bubbles
    function createChatBubble() {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${Math.random() > 0.5 ? 'left' : 'right'}`;
        bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        // Random position
        const top = Math.random() * 80 + 10; // 10% to 90% from top
        bubble.style.top = `${top}%`;
        
        // Random delay
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        
        chatBackground.appendChild(bubble);

        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }

    // Create initial bubbles
    for (let i = 0; i < 5; i++) {
        setTimeout(createChatBubble, i * 500);
    }

    // Continue creating bubbles
    setInterval(createChatBubble, 1500);
}

// Initialize all animations
createAnimatedBackground();
createChatBackground();
initTypingAnimation();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add fade-in class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Dynamic background effect
const hero = document.querySelector('.hero');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
    
    // Update hero section gradient
    if (hero) {
        const opacity = Math.max(0.05, 0.05 + scrollPercentage * 0.1);
        hero.style.setProperty('--gradient-opacity', opacity);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// CV Preview Panel Functionality
function togglePreview() {
    const panel = document.getElementById('cv-preview-panel');
    const overlay = document.querySelector('.preview-overlay') || createOverlay();
    
    if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'preview-overlay';
    overlay.addEventListener('click', togglePreview);
    document.body.appendChild(overlay);
    return overlay;
}

// Close preview panel when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const panel = document.getElementById('cv-preview-panel');
        if (panel.classList.contains('active')) {
            togglePreview();
        }
    }
}); 

// Update Cards Functionality
document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.update-card');
            const likesCount = card.querySelector('.likes-count');
            const icon = this.querySelector('i');
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Update icon
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                // Increment likes count
                const currentLikes = parseInt(likesCount.textContent);
                likesCount.textContent = currentLikes + 1;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Decrement likes count
                const currentLikes = parseInt(likesCount.textContent);
                likesCount.textContent = currentLikes - 1;
            }
        });
    });
});

// Initialize particles
function initParticles() {
    const updatesSection = document.getElementById('updates');
    if (!updatesSection) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    updatesSection.insertBefore(particlesContainer, updatesSection.firstChild);

    // Create particles
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * -20;
        particle.style.animation = `particleFloat ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Call the initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    // ... rest of your existing DOMContentLoaded code ...
    // WhatsApp-style random doodle shapes
    const updatesBg = document.querySelector('.updates-bg');
    if (updatesBg) {
        const shapeTypes = ['circle', 'triangle', 'hexagon', 'square', 'diamond', 'pentagon', 'star'];
        const colors = ['#42b581', '#25d366', '#128c7e', '#075e54', '#34b7f1'];
        const shapes = [];
        const shapeCount = 24;

        for (let i = 0; i < shapeCount; i++) {
            const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 32 + 24; // 24-56px
            const orbitRadius = Math.random() * 120 + 60; // 60-180px
            const speed = Math.random() * 0.8 + 0.2; // 0.2-1.0 (radians/sec)
            const angle = Math.random() * Math.PI * 2;
            const centerX = Math.random() * 80 + 10; // 10%-90% of width
            const centerY = Math.random() * 60 + 20; // 20%-80% of height
            const opacity = Math.random() * 0.15 + 0.13; // 0.13-0.28
            const rotation = Math.random() * 360;

            let svg;
            if (type === 'circle') {
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" /></svg>`;
            } else if (type === 'triangle') {
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points="${size/2},0 ${size},${size} 0,${size}" fill="${color}" /></svg>`;
            } else if (type === 'hexagon') {
                const h = size/2;
                const r = h * 0.95;
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points="
                    ${h+r*Math.cos(0)},${h+r*Math.sin(0)}
                    ${h+r*Math.cos(Math.PI/3)},${h+r*Math.sin(Math.PI/3)}
                    ${h+r*Math.cos(2*Math.PI/3)},${h+r*Math.sin(2*Math.PI/3)}
                    ${h+r*Math.cos(Math.PI)},${h+r*Math.sin(Math.PI)}
                    ${h+r*Math.cos(4*Math.PI/3)},${h+r*Math.sin(4*Math.PI/3)}
                    ${h+r*Math.cos(5*Math.PI/3)},${h+r*Math.sin(5*Math.PI/3)}
                " fill="${color}" /></svg>`;
            } else if (type === 'square') {
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect x="0" y="0" width="${size}" height="${size}" fill="${color}" /></svg>`;
            } else if (type === 'diamond') {
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points="${size/2},0 ${size},${size/2} ${size/2},${size} 0,${size/2}" fill="${color}" /></svg>`;
            } else if (type === 'pentagon') {
                const h = size/2;
                const r = h * 0.95;
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points="
                    ${h+r*Math.cos(-Math.PI/2)},${h+r*Math.sin(-Math.PI/2)}
                    ${h+r*Math.cos(-Math.PI/2+2*Math.PI/5)},${h+r*Math.sin(-Math.PI/2+2*Math.PI/5)}
                    ${h+r*Math.cos(-Math.PI/2+4*Math.PI/5)},${h+r*Math.sin(-Math.PI/2+4*Math.PI/5)}
                    ${h+r*Math.cos(-Math.PI/2+6*Math.PI/5)},${h+r*Math.sin(-Math.PI/2+6*Math.PI/5)}
                    ${h+r*Math.cos(-Math.PI/2+8*Math.PI/5)},${h+r*Math.sin(-Math.PI/2+8*Math.PI/5)}
                " fill="${color}" /></svg>`;
            } else if (type === 'star') {
                const h = size/2;
                const r1 = h * 0.95;
                const r2 = h * 0.45;
                let points = '';
                for (let j = 0; j < 10; j++) {
                    const angle = Math.PI/2 + j * Math.PI/5;
                    const r = j % 2 === 0 ? r1 : r2;
                    points += `${h + r * Math.cos(angle)},${h - r * Math.sin(angle)} `;
                }
                svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points="${points.trim()}" fill="${color}" /></svg>`;
            }

            const el = document.createElement('div');
            el.className = 'doodle-shape';
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.opacity = opacity;
            el.style.transform = `rotate(${rotation}deg)`;
            el.innerHTML = svg;
            updatesBg.appendChild(el);

            shapes.push({el, centerX, centerY, orbitRadius, speed, angle, rotation});
        }

        function animateShapes() {
            const w = updatesBg.offsetWidth;
            const h = updatesBg.offsetHeight;
            const now = Date.now() / 1000;
            shapes.forEach((shape, i) => {
                const a = shape.angle + now * shape.speed;
                const x = shape.centerX/100 * w + Math.cos(a) * shape.orbitRadius - shape.el.offsetWidth/2;
                const y = shape.centerY/100 * h + Math.sin(a) * shape.orbitRadius - shape.el.offsetHeight/2;
                shape.el.style.transform = `translate(${x}px, ${y}px) rotate(${shape.rotation}deg)`;
            });
            requestAnimationFrame(animateShapes);
        }
        animateShapes();
    }
});

// Game variables
let canvas, ctx;
let gameStarted = false;
let score = 0;
let animationId;
let gravity = 0.5;
let player = {
    x: 50,
    y: 300,
    width: 32,
    height: 48,
    jumping: false,
    velocityY: 0
};
let obstacles = [];
let ground = 300;
let gameSpeed = 5;
let obstacleTimer = 0;
let obstacleInterval = 1500; // milliseconds

// Update obstacles to have types
const OBSTACLE_TYPES = ['car', 'train', 'bin', 'dog', 'people'];

// Background animation state
let bgOffset = 0;
let sunOffset = 0;

// Add at the top of the file (or before drawAnimatedBackground):
const PIXEL_STARS = Array.from({length: 40}, () => ({
    x: Math.random() * 800,
    y: Math.random() * 400,
    size: Math.random() > 0.7 ? 4 : 2,
    speed: 0.2 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2
}));

// Initialize game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;
    
    // Event listeners
    document.getElementById('startButton').addEventListener('click', startGame);
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial render
    drawGame();
}

// Start game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        obstacles = [];
        player.y = ground;
        player.velocityY = 0;
        document.getElementById('scoreValue').textContent = score;
        gameLoop();
    }
}

// Game loop
function gameLoop() {
    if (!gameStarted) return;
    
    update();
    drawGame();
    animationId = requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Increase difficulty based on score
    if (score >= 20) {
        gameSpeed = 10;
        obstacleInterval = 1000;
    } else if (score >= 15) {
        gameSpeed = 8;
        obstacleInterval = 1000;
    } else if (score >= 5) {
        gameSpeed = 6;
        obstacleInterval = 1100;
    } else {
        gameSpeed = 5;
        obstacleInterval = 1500;
    }
    // Update player
    if (player.jumping) {
        player.velocityY += gravity;
        player.y += player.velocityY;
        
        if (player.y >= ground) {
            player.y = ground;
            player.jumping = false;
            player.velocityY = 0;
        }
    }
    
    // Update obstacles
    obstacleTimer += 16; // Assuming 60fps
    if (obstacleTimer >= obstacleInterval) {
        createObstacle();
        obstacleTimer = 0;
    }
    
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameSpeed;
        
        // Check collision
        if (checkCollision(player, obstacle)) {
            gameOver();
        }
        
        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
            document.getElementById('scoreValue').textContent = score;
        }
    });
}

// Draw game
function drawGame() {
    // Animate background offsets
    bgOffset += gameSpeed * 0.5; // Parallax speed
    sunOffset += 0.2; // Slow sun movement

    // Determine if evening mode should be active
    const evening = score >= 20;

    // Draw animated background
    drawAnimatedBackground(bgOffset, sunOffset, evening);

    // Draw ground
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, ground + player.height, canvas.width, canvas.height - ground - player.height);

    // Draw player (64-bit pixel art style)
    drawPixelPlayer(player.x, player.y, player.jumping || player.y < ground);

    // Draw obstacles
    obstacles.forEach(obstacle => {
        drawObstacle(obstacle);
    });

    // Draw game over message
    if (!gameStarted && score > 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Draw animated cityscape background
function drawAnimatedBackground(offset, sun, evening) {
    // Smooth transition between day and evening
    let t = 0;
    if (evening) {
        t = Math.min(1, (score - 20) / 5); // Fade in over 5 points
    }
    // Sky gradient
    let skyGradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (!evening && t === 0) {
        skyGradient.addColorStop(0, '#7ecfff'); // day blue
        skyGradient.addColorStop(1, '#f7e6b6'); // day yellow
    } else {
        // Blend from day to evening
        function blend(a, b) {
            // a, b: hex color strings
            const ah = a.match(/#(..)(..)(..)/).slice(1).map(x => parseInt(x, 16));
            const bh = b.match(/#(..)(..)(..)/).slice(1).map(x => parseInt(x, 16));
            return '#' + ah.map((v, i) => Math.round(v * (1 - t) + bh[i] * t).toString(16).padStart(2, '0')).join('');
        }
        skyGradient.addColorStop(0, blend('#7ecfff', '#3a295a')); // blue to deep purple
        skyGradient.addColorStop(1, blend('#f7e6b6', '#ff8c42')); // yellow to orange
    }
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sun/moon
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    let sunColor = !evening && t === 0 ? '#ffe066' : `#ffb347`;
    ctx.arc(100 + (sun % (canvas.width + 200)), 80, 40, 0, 2 * Math.PI);
    ctx.fillStyle = sunColor;
    ctx.shadowColor = sunColor;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();

    // Clouds (fade out in evening)
    ctx.save();
    ctx.globalAlpha = 0.5 * (1 - t);
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 3; i++) {
        let cx = (sun * 0.7 + i * 200) % (canvas.width + 100) - 50;
        ctx.fillRect(cx, 60 + 20 * i, 60, 18);
        ctx.fillRect(cx + 20, 50 + 20 * i, 40, 14);
    }
    ctx.restore();

    // Pixel stars/sparkles
    for (let star of PIXEL_STARS) {
        // Animate horizontal movement for a digital effect
        star.x -= star.speed;
        if (star.x < 0) star.x = 800;
        // Flicker effect
        const flicker = 0.7 + 0.3 * Math.sin(Date.now() / 200 + star.phase);
        ctx.globalAlpha = flicker;
        ctx.fillStyle = evening ? '#fffbe6' : '#0ff';
        ctx.fillRect(star.x, star.y, star.size, star.size);
        ctx.globalAlpha = 1;
    }

    // Buildings (parallax, several layers)
    for (let layer = 0; layer < 3; layer++) {
        let colorDay, colorEve;
        if (layer === 0) { colorDay = '#3a4a6d'; colorEve = '#2a2340'; }
        if (layer === 1) { colorDay = '#46618a'; colorEve = '#3d2d4a'; }
        if (layer === 2) { colorDay = '#5c7fa6'; colorEve = '#6a4a5a'; }
        let color = t === 0 ? colorDay : (t === 1 ? colorEve : blend(colorDay, colorEve));
        let baseY = 220 + layer * 30;
        let speed = 0.2 + layer * 0.3;
        for (let i = 0; i < 10; i++) {
            let bx = ((i * 120 - (offset * speed) % 120) + canvas.width) % (canvas.width + 120) - 60;
            let bHeight = 80 + Math.sin(i + layer) * 20 + layer * 20;
            ctx.fillStyle = color;
            ctx.fillRect(bx, baseY - bHeight, 60, bHeight);
            // Windows
            if (layer === 2) {
                ctx.fillStyle = t > 0 ? '#ffe066' : '#ffe066';
                for (let w = 0; w < 3; w++) {
                    for (let h = 0; h < Math.floor(bHeight / 24); h++) {
                        ctx.globalAlpha = t > 0 ? 0.7 + 0.3 * Math.sin(Date.now() / 500 + w + h) : 1;
                        ctx.fillRect(bx + 10 + w * 14, baseY - bHeight + 10 + h * 20, 8, 8);
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }
    }
}

// Draw a 64-bit pixel art character
function drawPixelPlayer(x, y, jumpState = 0) {
    // Enhanced color palette with more shades for better detail
    const skin = '#f7d6b6';
    const skinShadow = '#e0b48a';
    const skinDarkShadow = '#c99d76';
    const skinHighlight = '#ffecd6';
    
    const hair = '#3b2320';
    const hairShadow = '#2a1815';
    const hairHighlight = '#6d4c41';
    const hairShine = '#8a6552';
    
    const jacket = '#5a6b4a';  // Olive green jacket
    const jacketShadow = '#3d4a35';
    const jacketDarkShadow = '#2a3525';
    const jacketHighlight = '#7a8a6a';
    const jacketDetail = '#4a5a3a';
    
    const shirt = '#c8d0d8';  // Light gray/blue shirt
    const shirtShadow = '#9aa2aa';
    const shirtHighlight = '#e0e8f0';
    
    const pants = '#2c3e50';  // Dark blue/gray pants
    const pantsShadow = '#1a252f';
    const pantsHighlight = '#3c4e60';
    
    const shoes = '#222';
    const shoesHighlight = '#555';
    
    const eye = '#222';
    const eyeHighlight = '#444';
    const white = '#fff';
    const brow = '#3b2320';
    const mouth = '#a0522d';
    const mouthHighlight = '#c06040';
    const blush = '#e0a080';
    
    // Determine if jumping and which phase of jump
    const jumping = jumpState > 0;
    const jumpRising = jumpState === 1;
    const jumpPeak = jumpState === 2;
    const jumpFalling = jumpState === 3;
    
    // Apply jump offset to y position
    let jumpOffset = 0;
    if (jumpRising) jumpOffset = -6;
    else if (jumpPeak) jumpOffset = -10;
    else if (jumpFalling) jumpOffset = -4;
    
    // Apply the jump offset to the y position
    y += jumpOffset;
    
    // Head (improved shape with better curve)
    ctx.fillStyle = skin;
    ctx.fillRect(x + 12, y + 2, 24, 26);
    
    // Softer face shape with rounded jawline
    ctx.fillRect(x + 10, y + 8, 2, 16);
    ctx.fillRect(x + 36, y + 8, 2, 16);
    
    // Head shadow/shading with smoother gradients
    ctx.fillStyle = skinShadow;
    ctx.fillRect(x + 28, y + 16, 8, 8);
    ctx.fillRect(x + 20, y + 24, 16, 4);
    
    // Deeper shadows for more dimension
    ctx.fillStyle = skinDarkShadow;
    ctx.fillRect(x + 30, y + 20, 4, 4);
    ctx.fillRect(x + 26, y + 24, 6, 2);
    
    // Face highlights for more dimension
    ctx.fillStyle = skinHighlight;
    ctx.fillRect(x + 14, y + 6, 6, 2);
    ctx.fillRect(x + 16, y + 8, 4, 2);
    
    // Subtle blush for more lifelike appearance
    ctx.fillStyle = blush;
    ctx.fillRect(x + 16, y + 20, 4, 2);
    ctx.fillRect(x + 30, y + 20, 4, 2);
    
    // Hair - improved flowing style with better layering
    ctx.fillStyle = hair;
    // Top of head
    ctx.fillRect(x + 8, y, 32, 8);
    
    // Hair sides (more natural flow with varied width)
    ctx.fillRect(x + 6, y + 4, 6, 32); // left side
    ctx.fillRect(x + 4, y + 8, 2, 24); // left edge
    ctx.fillRect(x + 36, y + 4, 6, 32); // right side
    ctx.fillRect(x + 42, y + 8, 2, 24); // right edge
    
    // Hair back/bottom layers with more natural flow
    ctx.fillRect(x + 10, y + 28, 28, 8);
    ctx.fillRect(x + 12, y + 36, 24, 6);
    ctx.fillRect(x + 14, y + 42, 20, 4);
    ctx.fillRect(x + 16, y + 46, 16, 2);
    
    // Hair shadow for more depth
    ctx.fillStyle = hairShadow;
    ctx.fillRect(x + 8, y + 2, 4, 4);
    ctx.fillRect(x + 36, y + 2, 4, 4);
    
    // Hair highlights for more texture and dimension
    ctx.fillStyle = hairHighlight;
    ctx.fillRect(x + 16, y + 2, 8, 2);
    ctx.fillRect(x + 14, y + 12, 6, 2);
    ctx.fillRect(x + 26, y + 16, 6, 2);
    ctx.fillRect(x + 18, y + 30, 8, 2);
    ctx.fillRect(x + 8, y + 20, 4, 2);
    ctx.fillRect(x + 38, y + 22, 4, 2);
    
    // Additional hair shine for more depth
    ctx.fillStyle = hairShine;
    ctx.fillRect(x + 20, y + 4, 4, 2);
    ctx.fillRect(x + 30, y + 6, 4, 2);
    ctx.fillRect(x + 22, y + 32, 6, 2);
    
    // Hair movement during jump
    if (jumping) {
        // Add hair movement based on jump phase
        ctx.fillStyle = hair;
        if (jumpRising) {
            // Hair lifts slightly when starting to jump
            ctx.fillRect(x + 14, y + 48, 20, 2);
        } else if (jumpPeak) {
            // Hair floats up at peak of jump
            ctx.fillRect(x + 12, y + 48, 24, 2);
            ctx.fillRect(x + 14, y + 50, 20, 2);
        } else if (jumpFalling) {
            // Hair trails upward when falling
            ctx.fillRect(x + 12, y + 48, 24, 2);
        }
    }
    
    // Face: improved eyebrows with more expression
    ctx.fillStyle = brow;
    
    // Eyebrows change with jump state
    if (jumping) {
        if (jumpRising || jumpPeak) {
            // Raised eyebrows during rising and peak
            ctx.fillRect(x + 17, y + 9, 5, 2); // left eyebrow raised
            ctx.fillRect(x + 26, y + 9, 5, 2); // right eyebrow raised
        } else {
            // Focused eyebrows when falling
            ctx.fillRect(x + 17, y + 10, 5, 2);
            ctx.fillRect(x + 26, y + 10, 5, 2);
        }
    } else {
        // Normal eyebrows
        ctx.fillRect(x + 17, y + 10, 5, 2);
        ctx.fillRect(x + 26, y + 10, 5, 2);
    }
    
    // Face: eyes with more detail and expression
    ctx.fillStyle = white;
    ctx.fillRect(x + 17, y + 14, 5, 4);
    ctx.fillRect(x + 26, y + 14, 5, 4);
    
    // Eye details change with jump state
    ctx.fillStyle = eye;
    if (jumping) {
        if (jumpRising) {
            // Wider eyes when starting jump
            ctx.fillRect(x + 18, y + 15, 3, 2);
            ctx.fillRect(x + 27, y + 15, 3, 2);
        } else if (jumpPeak) {
            // Looking up at peak
            ctx.fillRect(x + 19, y + 14, 2, 2);
            ctx.fillRect(x + 28, y + 14, 2, 2);
        } else {
            // Looking down when falling
            ctx.fillRect(x + 19, y + 16, 2, 2);
            ctx.fillRect(x + 28, y + 16, 2, 2);
        }
    } else {
        // Normal eyes
        ctx.fillRect(x + 19, y + 15, 2, 2);
        ctx.fillRect(x + 28, y + 15, 2, 2);
    }
    
    // Eye highlights for more life
    ctx.fillStyle = eyeHighlight;
    ctx.fillRect(x + 20, y + 15, 1, 1);
    ctx.fillRect(x + 29, y + 15, 1, 1);
    
    // Face: improved nose with better shading
    ctx.fillStyle = skinShadow;
    ctx.fillRect(x + 24, y + 18, 2, 3);
    ctx.fillStyle = skinDarkShadow;
    ctx.fillRect(x + 25, y + 19, 1, 2);
    
    // Face: mouth with more detail and changes with jump
    if (jumping) {
        if (jumpRising || jumpPeak) {
            // Open mouth during rising and peak
            ctx.fillStyle = mouth;
            ctx.fillRect(x + 21, y + 22, 7, 3);
            ctx.fillStyle = '#300';
            ctx.fillRect(x + 23, y + 23, 3, 2);
            ctx.fillStyle = mouthHighlight;
            ctx.fillRect(x + 22, y + 22, 5, 1);
        } else {
            // Determined expression when falling
            ctx.fillStyle = mouth;
            ctx.fillRect(x + 21, y + 22, 7, 2);
            ctx.fillStyle = mouthHighlight;
            ctx.fillRect(x + 22, y + 22, 5, 1);
        }
    } else {
        // Normal smile
        ctx.fillStyle = mouth;
        ctx.fillRect(x + 21, y + 22, 7, 2);
        ctx.fillStyle = mouthHighlight;
        ctx.fillRect(x + 22, y + 22, 5, 1);
    }
    
    // Neck with better shading
    ctx.fillStyle = skin;
    ctx.fillRect(x + 20, y + 28, 8, 6);
    ctx.fillStyle = skinShadow;
    ctx.fillRect(x + 24, y + 30, 4, 4);
    
    // Shirt/undershirt with more detail
    ctx.fillStyle = shirt;
    ctx.fillRect(x + 18, y + 34, 12, 6);
    ctx.fillStyle = shirtShadow;
    ctx.fillRect(x + 24, y + 36, 6, 4);
    ctx.fillStyle = shirtHighlight;
    ctx.fillRect(x + 18, y + 34, 4, 2);
    
    // Jacket - improved with more detail and better fit
    ctx.fillStyle = jacket;
    ctx.fillRect(x + 14, y + 32, 20, 24);
    
    // Jacket details and shading for more realism
    ctx.fillStyle = jacketShadow;
    ctx.fillRect(x + 26, y + 44, 8, 12);
    ctx.fillRect(x + 16, y + 50, 6, 6);
    
    // Jacket highlights and details
    ctx.fillStyle = jacketHighlight;
    ctx.fillRect(x + 16, y + 34, 2, 8);
    ctx.fillRect(x + 30, y + 36, 2, 6);
    
    // Jacket seams and details
    ctx.fillStyle = jacketDetail;
    ctx.fillRect(x + 14, y + 40, 2, 16);
    ctx.fillRect(x + 32, y + 40, 2, 16);
    ctx.fillRect(x + 18, y + 54, 12, 2);
    
    // Jacket movement during jump
    if (jumping) {
        if (jumpRising) {
            // Jacket lifts slightly when starting jump
            ctx.fillStyle = jacket;
            ctx.fillRect(x + 12, y + 32, 2, 20);
            ctx.fillRect(x + 34, y + 32, 2, 20);
        } else if (jumpPeak) {
            // Jacket floats up at peak
            ctx.fillStyle = jacket;
            ctx.fillRect(x + 12, y + 32, 2, 16);
            ctx.fillRect(x + 34, y + 32, 2, 16);
            ctx.fillStyle = jacketHighlight;
            ctx.fillRect(x + 12, y + 32, 1, 8);
            ctx.fillRect(x + 35, y + 32, 1, 8);
        } else if (jumpFalling) {
            // Jacket trails upward when falling
            ctx.fillStyle = jacket;
            ctx.fillRect(x + 12, y + 32, 2, 18);
            ctx.fillRect(x + 34, y + 32, 2, 18);
        }
    }
    
    // Arms with better proportions and movement during jump
    ctx.fillStyle = jacket;
    if (jumping) {
        if (jumpRising) {
            // Arms raise up when starting jump
            ctx.fillRect(x + 6, y + 32, 8, 20); // left arm raised
            ctx.fillRect(x + 34, y + 32, 8, 20); // right arm raised
            
            // Arm shading
            ctx.fillStyle = jacketShadow;
            ctx.fillRect(x + 10, y + 44, 4, 8);
            ctx.fillRect(x + 34, y + 44, 4, 8);
            
            // Arm highlights
            ctx.fillStyle = jacketHighlight;
            ctx.fillRect(x + 6, y + 34, 2, 6);
            ctx.fillRect(x + 40, y + 34, 2, 6);
        } else if (jumpPeak) {
            // Arms fully extended at peak
            ctx.fillRect(x + 4, y + 30, 8, 20); // left arm extended up
            ctx.fillRect(x + 36, y + 30, 8, 20); // right arm extended up
            
            // Arm shading
            ctx.fillStyle = jacketShadow;
            ctx.fillRect(x + 8, y + 42, 4, 8);
            ctx.fillRect(x + 36, y + 42, 4, 8);
            
            // Arm highlights
            ctx.fillStyle = jacketHighlight;
            ctx.fillRect(x + 4, y + 32, 2, 6);
            ctx.fillRect(x + 42, y + 32, 2, 6);
        } else if (jumpFalling) {
            // Arms start to come down when falling
            ctx.fillRect(x + 5, y + 34, 8, 20); // left arm coming down
            ctx.fillRect(x + 35, y + 34, 8, 20); // right arm coming down
            
            // Arm shading
            ctx.fillStyle = jacketShadow;
            ctx.fillRect(x + 9, y + 46, 4, 8);
            ctx.fillRect(x + 35, y + 46, 4, 8);
            
            // Arm highlights
            ctx.fillStyle = jacketHighlight;
            ctx.fillRect(x + 5, y + 36, 2, 6);
            ctx.fillRect(x + 41, y + 36, 2, 6);
        }
    } else {
        // Normal arms
        ctx.fillRect(x + 6, y + 36, 8, 20); // left arm
        ctx.fillRect(x + 34, y + 36, 8, 20); // right arm
        
        // Arm shading
        ctx.fillStyle = jacketShadow;
        ctx.fillRect(x + 10, y + 48, 4, 8);
        ctx.fillRect(x + 34, y + 48, 4, 8);
        
        // Arm highlights
        ctx.fillStyle = jacketHighlight;
        ctx.fillRect(x + 6, y + 38, 2, 6);
        ctx.fillRect(x + 40, y + 38, 2, 6);
    }
    
    // Hands with more detail and better shape, changing with jump
    if (jumping) {
        if (jumpRising) {
            // Hands start to raise
            ctx.fillStyle = skin;
            ctx.fillRect(x + 8, y + 52, 4, 6); // left hand
            ctx.fillRect(x + 7, y + 54, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 10, y + 54, 2, 4);
            
            // Right hand
            ctx.fillStyle = skin;
            ctx.fillRect(x + 36, y + 52, 4, 6);
            ctx.fillRect(x + 40, y + 54, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 38, y + 54, 2, 4);
        } else if (jumpPeak) {
            // Hands fully raised at peak
            ctx.fillStyle = skin;
            ctx.fillRect(x + 6, y + 50, 4, 6); // left hand
            ctx.fillRect(x + 5, y + 52, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 8, y + 52, 2, 4);
            
            // Right hand
            ctx.fillStyle = skin;
            ctx.fillRect(x + 38, y + 50, 4, 6);
            ctx.fillRect(x + 42, y + 52, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 40, y + 52, 2, 4);
        } else if (jumpFalling) {
            // Hands start to come down
            ctx.fillStyle = skin;
            ctx.fillRect(x + 7, y + 54, 4, 6); // left hand
            ctx.fillRect(x + 6, y + 56, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 9, y + 56, 2, 4);
            
            // Right hand
            ctx.fillStyle = skin;
            ctx.fillRect(x + 37, y + 54, 4, 6);
            ctx.fillRect(x + 41, y + 56, 1, 2); // thumb
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 39, y + 56, 2, 4);
        }
    } else {
        // Normal hands
        ctx.fillStyle = skin;
        ctx.fillRect(x + 8, y + 56, 4, 6); // left hand
        ctx.fillRect(x + 7, y + 58, 1, 2); // thumb
        ctx.fillStyle = skinShadow;
        ctx.fillRect(x + 10, y + 58, 2, 4);
        
        // Right hand
        ctx.fillStyle = skin;
        ctx.fillRect(x + 36, y + 56, 4, 6);
        ctx.fillRect(x + 40, y + 58, 1, 2); // thumb
        ctx.fillStyle = skinShadow;
        ctx.fillRect(x + 38, y + 58, 2, 4);
    }
    
    // Pants and legs with better proportions and improved jump animation
    ctx.fillStyle = pants;
    if (jumping) {
        if (jumpRising) {
            // Legs bend when starting to jump
            ctx.save();
            // Left leg (bent for jump)
            ctx.translate(x + 18, y + 56);
            ctx.rotate(-0.4);
            ctx.fillRect(0, 0, 6, 16);
            ctx.restore();
            
            // Right leg (bent for jump)
            ctx.save();
            ctx.translate(x + 28, y + 56);
            ctx.rotate(0.4);
            ctx.fillRect(0, 0, 6, 16);
            ctx.restore();
        } else if (jumpPeak) {
            // Legs extend at peak of jump
            ctx.save();
            // Left leg (extended)
            ctx.translate(x + 18, y + 56);
            ctx.rotate(-0.2);
            ctx.fillRect(0, 0, 6, 18);
            ctx.restore();
            
            // Right leg (extended)
            ctx.save();
            ctx.translate(x + 28, y + 56);
            ctx.rotate(0.2);
            ctx.fillRect(0, 0, 6, 18);
            ctx.restore();
        } else if (jumpFalling) {
            // Legs prepare for landing
            ctx.save();
            // Left leg (preparing for landing)
            ctx.translate(x + 18, y + 56);
            ctx.rotate(-0.3);
            ctx.fillRect(0, 0, 6, 17);
            ctx.restore();
            
            // Right leg (preparing for landing)
            ctx.save();
            ctx.translate(x + 28, y + 56);
            ctx.rotate(0.3);
            ctx.fillRect(0, 0, 6, 17);
            ctx.restore();
        }
    } else {
        // Standing pose with better proportions
        ctx.fillRect(x + 18, y + 56, 6, 18); // left leg
        ctx.fillRect(x + 24, y + 56, 6, 18); // right leg
    }
    
    // Pants shading with more detail
    ctx.fillStyle = pantsShadow;
    if (jumping) {
        if (jumpRising) {
            ctx.save();
            ctx.translate(x + 26, y + 64);
            ctx.rotate(0.4);
            ctx.fillRect(0, 0, 4, 8);
            ctx.restore();
        } else if (jumpPeak) {
            ctx.save();
            ctx.translate(x + 26, y + 66);
            ctx.rotate(0.2);
            ctx.fillRect(0, 0, 4, 8);
            ctx.restore();
        } else if (jumpFalling) {
            ctx.save();
            ctx.translate(x + 26, y + 65);
            ctx.rotate(0.3);
            ctx.fillRect(0, 0, 4, 8);
            ctx.restore();
        }
    } else {
        ctx.fillRect(x + 26, y + 66, 4, 8);
        ctx.fillRect(x + 18, y + 66, 2, 8);
    }
    
    // Pants highlights
    ctx.fillStyle = pantsHighlight;
    if (!jumping) {
        ctx.fillRect(x + 20, y + 58, 2, 6);
        ctx.fillRect(x + 24, y + 58, 2, 6);
    } else if (jumpPeak) {
        // Add highlights at peak of jump
        ctx.save();
        ctx.translate(x + 20, y + 58);
        ctx.rotate(-0.2);
        ctx.fillRect(0, 0, 2, 6);
        ctx.restore();
        
        ctx.save();
        ctx.translate(x + 30, y + 58);
        ctx.rotate(0.2);
        ctx.fillRect(0, 0, 2, 6);
        ctx.restore();
    }
    
    // Shoes with better shape and movement during jump
    ctx.fillStyle = shoes;
    if (jumping) {
        if (jumpRising) {
            // Shoes angle more during initial jump
            ctx.save();
            ctx.translate(x + 16, y + 72);
            ctx.rotate(-0.4);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 24, y + 72);
            ctx.rotate(0.4);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
        } else if (jumpPeak) {
            // Shoes point slightly at peak
            ctx.save();
            ctx.translate(x + 16, y + 74);
            ctx.rotate(-0.2);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 24, y + 74);
            ctx.rotate(0.2);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
        } else if (jumpFalling) {
            // Shoes prepare for landing
            ctx.save();
            ctx.translate(x + 16, y + 73);
            ctx.rotate(-0.3);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 24, y + 73);
            ctx.rotate(0.3);
            ctx.fillRect(0, 0, 8, 4);
            ctx.restore();
        }
    } else {
        // Normal shoes
        ctx.fillRect(x + 16, y + 74, 8, 4); // left shoe
        ctx.fillRect(x + 24, y + 74, 8, 4); // right shoe
    }
    
    // Shoe highlights with more detail
    ctx.fillStyle = shoesHighlight;
    if (jumping) {
        if (jumpRising) {
            ctx.save();
            ctx.translate(x + 18, y + 74);
            ctx.rotate(-0.4);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 26, y + 74);
            ctx.rotate(0.4);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
        } else if (jumpPeak) {
            ctx.save();
            ctx.translate(x + 18, y + 76);
            ctx.rotate(-0.2);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 26, y + 76);
            ctx.rotate(0.2);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
        } else if (jumpFalling) {
            ctx.save();
            ctx.translate(x + 18, y + 75);
            ctx.rotate(-0.3);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
            
            ctx.save();
            ctx.translate(x + 26, y + 75);
            ctx.rotate(0.3);
            ctx.fillRect(0, 0, 4, 2);
            ctx.restore();
        }
    } else {
        ctx.fillRect(x + 18, y + 76, 4, 2);
        ctx.fillRect(x + 26, y + 76, 4, 2);
    }
    
    // Add jump effects if jumping
    if (jumping) {
        // Add motion lines
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.4;
        
        if (jumpRising) {
            // Rising motion lines
            ctx.fillRect(x + 14, y + 80, 2, 4);
            ctx.fillRect(x + 32, y + 80, 2, 4);
        } else if (jumpPeak) {
            // Peak motion effect
            ctx.fillRect(x + 10, y + 78, 2, 2);
            ctx.fillRect(x + 36, y + 78, 2, 2);
            ctx.fillRect(x + 8, y + 80, 2, 2);
            ctx.fillRect(x + 38, y + 80, 2, 2);
        } else if (jumpFalling) {
            // Falling motion lines
            ctx.fillRect(x + 12, y + 76, 2, 6);
            ctx.fillRect(x + 34, y + 76, 2, 6);
        }
        
        ctx.globalAlpha = 1.0;
    }
}

// Update createObstacle to assign a random type and adjust size
function createObstacle() {
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    let width = 20, height = 40;
    let extra = {};
    if (type === 'car') { width = 48; height = 24; }
    if (type === 'train') { width = 80; height = 32; }
    if (type === 'bin') { width = 20; height = 32; }
    if (type === 'dog') { width = 32; height = 20; }
    if (type === 'people') {
        width = 24; height = 38;
        // Randomize palette for variety
        const skinTones = ['#f7d6b6', '#e0b48a', '#c68642', '#8d5524'];
        const hairColors = ['#3b2320', '#6d4c41', '#222', '#bfa36f'];
        const shirtColors = ['#bfa36f', '#c8d0d8', '#ff8a65', '#1976d2', '#388e3c'];
        const pantsColors = ['#2c3e50', '#222b3a', '#5c7fa6', '#6a4a5a'];
        extra = {
            skin: skinTones[Math.floor(Math.random() * skinTones.length)],
            hair: hairColors[Math.floor(Math.random() * hairColors.length)],
            shirt: shirtColors[Math.floor(Math.random() * shirtColors.length)],
            pants: pantsColors[Math.floor(Math.random() * pantsColors.length)]
        };
    }
    obstacles.push({
        x: canvas.width,
        y: ground + player.height - height,
        width,
        height,
        type,
        ...extra
    });
}

// Draw pixel-art obstacles
function drawObstacle(ob) {
    const { x, y, width, height, type } = ob;
    if (type === 'people') {
        // Pixel-art person: head, body, arms, legs, face, hair
        const skin = ob.skin || '#f7d6b6';
        const hair = ob.hair || '#3b2320';
        const shirt = ob.shirt || '#bfa36f';
        const pants = ob.pants || '#2c3e50';
        // Head
        ctx.fillStyle = skin;
        ctx.fillRect(x + 6, y, 12, 12);
        // Hair (top)
        ctx.fillStyle = hair;
        ctx.fillRect(x + 6, y, 12, 4);
        ctx.fillRect(x + 4, y + 4, 4, 8); // left
        ctx.fillRect(x + 14, y + 4, 4, 8); // right
        // Face: eyes
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 9, y + 6, 2, 2);
        ctx.fillRect(x + 13, y + 6, 2, 2);
        // Face: mouth
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x + 11, y + 10, 2, 2);
        // Body (shirt)
        ctx.fillStyle = shirt;
        ctx.fillRect(x + 8, y + 12, 8, 12);
        // Arms
        ctx.fillStyle = skin;
        ctx.fillRect(x + 4, y + 14, 4, 10); // left
        ctx.fillRect(x + 16, y + 14, 4, 10); // right
        // Pants
        ctx.fillStyle = pants;
        ctx.fillRect(x + 8, y + 24, 4, 10); // left leg
        ctx.fillRect(x + 12, y + 24, 4, 10); // right leg
        // Shoes
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 8, y + 34, 4, 4);
        ctx.fillRect(x + 12, y + 34, 4, 4);
        // Simple highlight
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 10, y + 2, 2, 2);
    } else if (type === 'car') {
        // Car: body, roof, windows, wheels, highlights
        // Body
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(x, y + 8, width, height - 12);
        // Roof
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 8, y, width - 16, 12);
        // Windows
        ctx.fillStyle = '#b3e5fc';
        ctx.fillRect(x + 12, y + 2, width - 24, 8);
        // Headlights
        ctx.fillStyle = '#fffde7';
        ctx.fillRect(x + width - 6, y + height - 18, 4, 4);
        // Taillights
        ctx.fillStyle = '#ff8a65';
        ctx.fillRect(x + 2, y + height - 18, 4, 4);
        // Wheels
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 6, y + height - 6, 10, 6);
        ctx.fillRect(x + width - 16, y + height - 6, 10, 6);
        // Wheel highlights
        ctx.fillStyle = '#888';
        ctx.fillRect(x + 8, y + height - 4, 4, 2);
        ctx.fillRect(x + width - 14, y + height - 4, 4, 2);
    } else if (type === 'train') {
        // Train: body, windows, doors, wheels, highlights
        ctx.fillStyle = '#1976d2';
        ctx.fillRect(x, y, width, height - 8);
        // Roof
        ctx.fillStyle = '#90caf9';
        ctx.fillRect(x, y, width, 8);
        // Windows
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x + 10 + i * 18, y + 10, 12, 10);
        }
        // Door
        ctx.fillStyle = '#bdbdbd';
        ctx.fillRect(x + width - 24, y + 10, 10, 16);
        // Wheels
        ctx.fillStyle = '#333';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x + 8 + i * 18, y + height - 8, 8, 8);
        }
        // Wheel highlights
        ctx.fillStyle = '#bbb';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x + 10 + i * 18, y + height - 6, 4, 2);
        }
    } else if (type === 'bin') {
        // Rubbish bin: body, lid, wheels, highlights
        ctx.fillStyle = '#388e3c';
        ctx.fillRect(x, y + 8, width, height - 8);
        // Lid
        ctx.fillStyle = '#222';
        ctx.fillRect(x - 2, y, width + 4, 10);
        // Lid highlight
        ctx.fillStyle = '#6abf69';
        ctx.fillRect(x, y + 2, width, 4);
        // Wheels
        ctx.fillStyle = '#555';
        ctx.fillRect(x + 2, y + height - 6, 4, 6);
        ctx.fillRect(x + width - 6, y + height - 6, 4, 6);
        // Bin label
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + width / 2 - 4, y + 16, 8, 4);
    } else if (type === 'dog') {
        // Dog: body, head, legs, tail, face, ears, highlights
        // Body
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x + 8, y + 10, 16, 8);
        // Head
        ctx.fillRect(x + 20, y, 10, 10);
        // Ears
        ctx.fillStyle = '#6d4c41';
        ctx.fillRect(x + 20, y, 3, 4);
        ctx.fillRect(x + 27, y, 3, 4);
        // Face
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 26, y + 6, 4, 4); // snout
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 28, y + 8, 2, 2); // nose
        ctx.fillRect(x + 23, y + 6, 2, 2); // eye
        // Legs
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x + 10, y + 18, 4, 6);
        ctx.fillRect(x + 20, y + 18, 4, 6);
        // Tail
        ctx.fillRect(x + 6, y + 12, 4, 4);
        // Highlight
        ctx.fillStyle = '#deb887';
        ctx.fillRect(x + 12, y + 12, 4, 2);
    } else {
        // Default: red block
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(x, y, width, height);
    }
}

// Check collision
function checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
           player.x + player.width > obstacle.x &&
           player.y < obstacle.y + obstacle.height &&
           player.y + player.height > obstacle.y;
}

// Handle key press
function handleKeyPress(e) {
    if (e.code === 'Space' && !player.jumping && gameStarted) {
        player.jumping = true;
        player.velocityY = -12;
    }
}

// Game over
function gameOver() {
    gameStarted = false;
    cancelAnimationFrame(animationId);
    
    // Update final score
    document.getElementById('finalScore').textContent = score;
    
    // Show game over screen
    document.querySelector('.game-over').classList.add('active');
    
    // Add click event listener to replay button
    document.querySelector('.replay-button').addEventListener('click', function() {
        // Reset game state
        score = 0;
        obstacles = [];
        player.y = ground;
        player.velocityY = 0;
        
        // Update score display
        document.getElementById('scoreValue').textContent = '0';
        
        // Hide game over screen
        document.querySelector('.game-over').classList.remove('active');
        
        // Start new game
        startGame();
    });
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);