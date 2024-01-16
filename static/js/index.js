const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showImage(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
            slide.classList.remove('inactive');
        } else {
            slide.classList.remove('active');
            slide.classList.add('inactive');
        }
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % slides.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showImage(currentIndex);
}

setInterval(nextImage, 6000);

showImage(currentIndex);
