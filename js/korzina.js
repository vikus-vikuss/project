const modals = document.querySelectorAll('.modal');
    const detailButtons = document.querySelectorAll('.button-info');
    const purchaseButtons = document.querySelectorAll('.purchase-button');
    const closeButtons = document.querySelectorAll('.close');
    const body = document.querySelector('body');
    let selectedCourses = [];
    let scrollTopPos = 0;
    
// Открываем модальное окно корзины и отображаем выбранные курсы
function openCartModal() {
    scrollTopPos = window.pageYOffset || document.documentElement.scrollTop;
    body.style.top = `-${scrollTopPos}px`;
    body.classList.add('modal-open');
    cartModal.style.display = 'block';

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Очищаем содержимое корзины перед обновлением

    let totalCost = 0; // Инициализируем общую стоимость

    selectedCourses.forEach(course => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-course', course.name);
    const itemCost = course.price * course.quantity;
    totalCost += itemCost; // Обновляем общую стоимость

    cartItem.innerHTML = `
        <div class="course-name">${course.name}</div> 
        <div class="quantity-container">
            <div class="number-product">${course.quantity}</div>
        </div>
        <div class="course-price">${course.price} руб. x ${course.quantity} = ${itemCost} руб.</div>
        <span class="remove" onclick="removeModal('${course.name}')">&times;</span>
    `;

    cartItems.appendChild(cartItem);
});

    // Добавляем общую стоимость в корзину
    const totalElement = document.createElement('div');
    totalElement.classList.add('total-cost');
    totalElement.innerHTML = `Сумма: ${totalCost} руб.`;
    cartItems.appendChild(totalElement);
}
// Функция удаления курса из корзины
function removeModal(courseName) {
    const removedCourses = selectedCourses.filter(course => course.name === courseName);

    if (removedCourses.length > 0) {
        selectedCourses = selectedCourses.filter(course => course.name !== courseName);
        openCartModal(); // Перерисовываем модальное окно корзины после удаления курса

        // Обновляем количество курсов в иконке корзины
        const cartItemCountElement = document.getElementById('cartItemCount');
        if (cartItemCountElement) {
            cartItemCountElement.textContent = selectedCourses.length;
        }

        // Высчитываем общее количество удаленных курсов
        const totalRemovedCount = removedCourses.reduce((acc, course) => acc + course.quantity, 0);

        // Обновляем сайдбар корзины с общим количеством товаров
        updateCartSidebar(-totalRemovedCount); // Уменьшаем общее количество товаров в корзине
    }
}
    // Открываем модальное окно
    function openModal(modal) {
        scrollTopPos = window.pageYOffset || document.documentElement.scrollTop;
        body.style.top = `-${scrollTopPos}px`;
        body.classList.add('modal-open');
        modal.style.display = 'block';
    }

    // Закрываем модальное окно
    function closeModal() {
        body.classList.remove('modal-open');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        window.scrollTo(0, scrollTopPos);
        body.style.top = '0';
    }

    // Закрываем модальное окно при клике на крестик
    closeButtons.forEach((button, index) => {
        button.onclick = function() {
            closeModal();
        }
    });

    // Закрываем модальное окно при клике вне модального окна
    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal();
            }
        });
    };

    function decreaseAmount(element) {
    let numberElement = element.nextElementSibling;
    let sumElement = element.closest('.kol-vo-control').querySelector('.summa-product');
    let currentAmount = parseInt(numberElement.innerText);
    let price = parseFloat(sumElement.innerText) / currentAmount; // Рассчитываем цену за один товар
    if (currentAmount > 1) {
        currentAmount--;
        numberElement.innerText = currentAmount;
        sumElement.innerText = (currentAmount * price).toFixed(2); // Пересчитываем общую сумму с округлением до двух знаков после запятой

        updateCartSidebar(-1); // Уменьшаем количество товаров в корзине на 1
        updateSelectedCoursesQuantity(-1, sumElement);
    }
}

function increaseAmount(element) {
    let numberElement = element.previousElementSibling;
    let sumElement = element.closest('.kol-vo-control').querySelector('.summa-product');
    let currentAmount = parseInt(numberElement.innerText);
    let price = parseFloat(sumElement.innerText) / currentAmount; // Рассчитываем цену за один товар
    currentAmount++;
    numberElement.innerText = currentAmount;
    sumElement.innerText = (currentAmount * price).toFixed(2); // Пересчитываем общую сумму с округлением до двух знаков после запятой

    updateCartSidebar(1); // Увеличиваем количество товаров в корзине на 1
    updateSelectedCoursesQuantity(1, sumElement);
}
function updateSelectedCoursesQuantity(changeAmount, sumElement) {
    const courseNameElement = sumElement.closest('.modal-content').querySelector('.kurs-name');
    if (courseNameElement) {
        const courseName = courseNameElement.innerText;
        const course = selectedCourses.find(course => course.name === courseName);

        if (course) {
            course.quantity += changeAmount;

            // Находим соответствующий элемент в корзине и обновляем количество
            const cartItems = document.getElementById('cartItems');
        }
    }
}
    // Обновляем сайдбар корзины с общим количеством товаров
function updateCartSidebar(changeAmount) {
    const cartCountElement = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCountElement.innerText);
    currentCount = Math.max(0, currentCount + changeAmount); // Предотвращаем отрицательное количество товаров в корзине
    cartCountElement.innerText = currentCount;

    const cartIcon = document.querySelector('.cart-icon');
    if (currentCount > 0) {
        cartIcon.style.display = 'flex';
    } else {
        cartIcon.style.display = 'none';
    }
}

    // Открываем модальное окно для покупки при клике на кнопку "Подробнее"
    detailButtons.forEach((button, index) => {
        button.onclick = function() {
            const currentModal = document.getElementById(`myModal${index + 1}`);
            openModal(currentModal);
        };
    });

// Открываем модальное окно для покупки при клике на кнопку "Оформить покупку"
function openPurchaseModal(purchaseModal) {
    const courseName = purchaseModal.querySelector('.kurs-name').innerText;
    const coursePrice = parseFloat(purchaseModal.querySelector('.summa-product').innerText);
    
    // Проверяем, добавлен ли уже данный курс в корзину
    const existingCourse = selectedCourses.find(course => course.name === courseName);
    if (!existingCourse) {
        selectedCourses.push({ name: courseName, price: coursePrice, quantity: 1 }); // Добавляем товар в корзину только если его не было
        updateCartSidebar(1); // Добавляем 1 товар в корзину при первом клике на кнопку "Оформить покупку"
    }

    const currentModal = purchaseModal.closest('.modal');
    if (purchaseModal) {
        currentModal.style.display = 'none';
        openModal(purchaseModal);
    }
}
// Находим иконку корзины
const cartIcon = document.querySelector('.cart-icon');

// При клике на иконку корзины открываем модальное окно корзины
cartIcon.addEventListener('click', function() {
    openCartModal();
});
