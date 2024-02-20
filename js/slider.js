let currentSlide = 0;
const slides = document.querySelectorAll('.favourite-slider-item');
const sliderList = document.querySelector('.favourite-slider-list');
const totalSlides = slides.length;
let progressBarValue = 0;
let autoInterval;
let mouseStartX;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('slider-active', i === index);
    });

    currentSlide = index;
    updateSliderPosition();
    updateProgressBar();
}

function updateSliderPosition() {
    const container = document.querySelector('.favourite-slider-container');
    container.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function updateProgressBar() {
    const progressBar = document.querySelectorAll('.slider-control');
    progressBar[currentSlide].value = progressBarValue;

    if (autoInterval) {
        progressBar[(currentSlide + 1) % totalSlides].value = 0;
        progressBar[(currentSlide + 2) % totalSlides].value = 0;
    }
}

function startAutoSlide() {
    autoInterval = setInterval(() => {
        progressBarValue += 5;
        updateProgressBar();

        if (progressBarValue >= 500) {
            progressBarValue = 0;
            showSlide((currentSlide + 1) % totalSlides);
        }
    }, 50);
}

function stopAutoSlide() {
    clearInterval(autoInterval);
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    stopAutoSlide();
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchEndX < touchStartX) {
        progressBarValue = 0;
        showSlide((currentSlide + 1) % totalSlides);
    } else if (touchEndX > touchStartX) {
        progressBarValue = 0;
        showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    startAutoSlide();
}

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchend', handleTouchEnd);
sliderList.addEventListener('mouseenter', () => {
    stopAutoSlide();
});

sliderList.addEventListener('mouseleave', () => {
    startAutoSlide();
});

document.getElementById('slider-prev').addEventListener('click', () => {
    progressBarValue = 0;
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    stopAutoSlide();
    startAutoSlide();
});

document.getElementById('slider-next').addEventListener('click', () => {
    progressBarValue = 0;
    showSlide((currentSlide + 1) % totalSlides);
    stopAutoSlide();
    startAutoSlide();
});

startAutoSlide();