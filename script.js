document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const slider = document.querySelector('.certification-slider');
const items = document.querySelectorAll('.certification-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Function to update the visible items
function updateSlider() {
    const offset = -currentIndex * (items[0].offsetWidth + 20); // Adjust for margin
    slider.style.transform = `translateX(${offset}px)`;
}

function nextCard() {
    currentIndex++;
    if (currentIndex >= items.length) {
        currentIndex = 0; // Reset to first card
    }
    updateSlider();
}

function prevCard() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = items.length - 1; // Go to last card
    }
    updateSlider();
}

// Event listeners for buttons
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

// Automatically switch cards every 3 seconds (optional)
setInterval(nextCard, 3000);
