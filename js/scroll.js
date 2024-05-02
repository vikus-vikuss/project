window.addEventListener('DOMContentLoaded', function() {
    const reviewsLink = document.getElementById('reviews_link');
    const reviewsSection = document.getElementById('reviews_section');
    const coursesLink = document.getElementById('courses_link');
    const coursesSection = document.getElementById('courses_section');

    if (reviewsLink && reviewsSection) {
        reviewsLink.addEventListener('click', function(event) {
            event.preventDefault();

            // Плавный скролл к блоку с отзывами
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (coursesLink && coursesSection) {
        coursesLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Показываем блок с информацией о курсах и скрываем другие блоки
            coursesSection.style.display = 'block';

            // Scroll к блоку с информацией о курсах
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
