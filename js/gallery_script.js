
        
     document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.image_otz .gallery span img');
    const numImages = images.length;
    const itemsPerSlide = 3;
    const gallery = document.querySelector('.image_otz .gallery');

    function smoothScrollGallery(direction) {
    const newIndex = currentIndex + (direction * itemsPerSlide);
    
    if (newIndex >= 0 && newIndex <= numImages - itemsPerSlide) {
        currentIndex = newIndex;
    }

    images.forEach((img, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + itemsPerSlide;
        img.parentElement.style.display = isVisible ? 'inline-block' : 'none';
    });

    arrowButtonRight.style.display = currentIndex + itemsPerSlide >= numImages ? 'none' : 'block';
    arrowButtonLeft.style.display = currentIndex <= 0 ? 'none' : 'block';
}

    const arrowButtonLeft = document.querySelector('.arrow-button-left');
    const arrowButtonRight = document.querySelector('.arrow-button-right');

    arrowButtonLeft.addEventListener('click', () => {
        smoothScrollGallery(-1);
    });

    arrowButtonRight.addEventListener('click', () => {
        smoothScrollGallery(1);
    });

    smoothScrollGallery(0);
});