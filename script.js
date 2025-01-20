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
let currentIndex = 0;

function updateSlider() {
    const offset = -currentIndex * (items[0].offsetWidth + 20); 
    slider.style.transform = `translateX(${offset}px)`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlider();
}

setInterval(nextCard, 5000);
