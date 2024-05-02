
        let currentIndex = 0;
        const images = document.querySelectorAll('.galerry_work img');
        const totalImages = images.length;
        const scrollDistance = 2; // Сколько изображений прокручивать за раз
    
        function smoothScrollGallery(direction) {
            currentIndex = currentIndex + direction * scrollDistance;
    
            if (currentIndex < 0) {
                currentIndex = 0;
            }
    
            if (currentIndex > totalImages - 2) {
                currentIndex = totalImages - 2;
            }
    
            document.querySelectorAll('.galerry_work img').forEach((img, index) => {
                img.style.display = 'none';
            });
    
            for (let i = currentIndex; i < currentIndex + 2; i++) {
                images[i].style.display = 'inline-block';
            }
        }
    