// Получаем необходимые элементы
const modal = document.getElementById("modal-okno");
const closeBtn = document.querySelector(".close-okno");
const loginLink = document.getElementById("login_link");
const registerLink = document.getElementById("register_link");
const modalRegistration = document.getElementById("modal-registration");
const closeBtnRegistration = modalRegistration.querySelector(".close-okno");
const backButton = modalRegistration.querySelector("#back_button");
const modals = document.querySelectorAll('.modal');
const detailButtons = document.querySelectorAll('.button-info');
const purchaseButtons = document.querySelectorAll('.purchase-button');
const closeButtons = document.querySelectorAll('.close');
const body = document.querySelector('body');
let selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];
let scrollTopPos = 0;
    

// Функция для открытия окна входа и авторизации поверх текущего окна
function openLoginModalAboveCart() {
    // Закрываем текущее окно (корзину)
    closeModal();
    
    // Открываем окно входа и авторизации
    const loginModal = document.getElementById('modal-okno');
    if (loginModal) {
        loginModal.style.display = 'block';
        document.body.classList.add('modal-open');
    }
}
function redirectToOplataPage() {
    window.location.href = 'http://mysite/oplata.html';
}
function handleSuccessfulAuth() {
    const cartPaymentInfo = document.querySelector('.t-top-form');
    const paymentButton = document.getElementById('paymentButton');
// Сохраняем информацию о входе
localStorage.setItem('loggedIn', 'true');

// Показываем ссылку "Профиль"
document.getElementById('profile_link').style.display = 'inline';

updateCartIcon(); // Обновляем иконку корзины при успешной аутентификации
    // Скрыть текст "Для перехода к оплате, пожалуйста войдите в аккаунт." и кнопку "Войти"
    cartPaymentInfo.style.display = 'none';
// Скрыть кнопку "Войти"
buyButton.style.display = 'none';
    // Показать кнопку "Перейти к оплате"
    paymentButton.style.display = 'block';
}
// Добавляем обработчик события для кнопки "Войти"
const buyButton = document.getElementById('vhod-cart');
if (buyButton) {
    buyButton.addEventListener('click', function() {
        openLoginModalAboveCart();
    });
}
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


// При нажатии на ссылку "Вход" показываем модальное окно входа и скрываем окно регистрации
loginLink.addEventListener("click", function () {
    modal.style.display = "block";
    modalRegistration.style.display = "none";
    document.body.classList.add("modal-open");
});

// При нажатии на ссылку "Регистрация" скрываем модальное окно входа и показываем окно регистрации
registerLink.addEventListener("click", function () {
    modal.style.display = "none";
    modalRegistration.style.display = "block";
    document.body.classList.add("modal-open");
});

// При нажатии на кнопку закрытия окна регистрации скрываем его и удаляем класс модального окна
closeBtnRegistration.addEventListener("click", function () {
    modalRegistration.style.display = "none";
    document.body.classList.remove("modal-open");
});

// При нажатии на кнопку "Назад" в окне регистрации скрываем его и показываем окно входа
// Обработчик для кнопки "Назад"
backButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Скрываем окно регистрации
    modalRegistration.style.display = 'none';
    
    // Показываем окно входа
    modal.style.display = 'block';
    
    // Очищаем поля ввода в окне регистрации
    document.getElementById('phone_register').value = '';
    document.getElementById('username_register').value = '';
    document.getElementById('password_register').value = '';
});

// При нажатии на кнопку закрытия окна входа скрываем его и удаляем класс модального окна
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
});
function authenticateUser(login, password) {
    var formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/login.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText.trim() === "success") {
                // Скрываем кнопку "Вход" и показываем кнопку "Профиль"
                loginLink.style.display = 'none';
                document.getElementById('profile_link').style.display = 'inline'; 

                // Открываем страницу index-2.php сразу после успешной авторизации
                window.location.href = 'http://mysite/index-2.php';
                // После успешной аутентификации вызываем функцию для обновления интерфейса корзины
                handleSuccessfulAuth();
            } else {
                alert("Неправильный логин или пароль. Попробуйте снова.");
            }
        }
    };
    xhr.send(formData);
}
// При нажатии на кнопку закрытия окна входа также показываем кнопку "Профиль" при необходимости
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    if (document.getElementById('profile_link').style.display === 'none') {
        loginLink.style.display = 'inline'; // Показываем кнопку "Вход", если кнопка "Профиль" скрыта
    }
    document.body.classList.remove("modal-open");

    // Вызываем функцию для обновления интерфейса после успешной аутентификации
    handleSuccessfulAuth();
});
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    let loginInput = document.getElementById('login').value;
    let passwordInput = document.getElementById('password').value;

    authenticateUser(loginInput, passwordInput);
});

document.getElementById('code_button').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение при нажатии на кнопку

    var formData = new FormData(document.getElementById('registrationForm'));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/register.php', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText.includes("Успешно!")) {
                // Очистка формы, скрытие модального окна регистрации и отображение модального окна входа
                modalRegistration.style.display = 'none';
                document.body.classList.remove("modal-open");

                modal.style.display = 'block';
                document.body.classList.add("modal-open");

                // Очистка полей ввода в форме регистрации
                document.getElementById('phone_register').value = '';
                document.getElementById('username_register').value = '';
                document.getElementById('password_register').value = '';

                alert("Регистрация успешно завершена!");
            } else {
                alert(xhr.responseText);
            }
        }
    };

    xhr.send(formData);
});
// Функция для сохранения выбранных курсов в Local Storage
function saveSelectedCoursesToLocalStorage() {
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
}

// Перед закрытием окна сохраняем выбранные курсы в Local Storage
function closeModal() {
    saveSelectedCoursesToLocalStorage();

    body.classList.remove('modal-open');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });

    window.scrollTo(0, scrollTopPos);
    body.style.top = '0';
}

// При загрузке страницы отображаем сохраненные курсы
document.addEventListener("DOMContentLoaded", function() {
    updateCartIcon(); // Обновляем иконку корзины
});

// Обновляем иконку корзины в соответствии с выбранными курсами
function updateCartIcon() {
    const cartCountElement = document.querySelector('.cart-count');
    let totalSelected = selectedCourses.reduce((acc, course) => acc + course.quantity, 0);
    cartCountElement.textContent = totalSelected;

    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.display = totalSelected > 0 ? 'flex' : 'none';
}

// Добавляем курс в корзину и сохраняем изменения
function addToCart(courseName, coursePrice) {
    const existingCourse = selectedCourses.find(course => course.name === courseName);

    if (existingCourse) {
        existingCourse.quantity++;
    } else {
        selectedCourses.push({ name: courseName, price: coursePrice, quantity: 1 });
    }

    updateCartIcon(); // Обновляем иконку корзины
    saveSelectedCoursesToLocalStorage();
}

// Удаляем курс из корзины и сохраняем изменения
function removeCourseFromCart(courseName) {
    selectedCourses = selectedCourses.filter(course => course.name !== courseName);
    updateCartIcon(); // Обновляем иконку корзины
    saveSelectedCoursesToLocalStorage();
} updateCartIcon(); // Обновляем иконку корзины


     // Проверяем, сохранен ли пользователь авторизован на странице
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        handleSuccessfulAuth(); // Вызываем функцию для обновления интерфейса после успешной авторизации
    } else {
        // Отобразить информацию о войдите в аккаунт если пользователь не авторизован
        const cartPaymentInfo = document.querySelector('.t-top-form');
        const buyButton = document.getElementById('vhod-cart');
        
        // Показываем текст "Для перехода к оплате, пожалуйста войдите в аккаунт."
        cartPaymentInfo.style.display = 'block';

        // Показываем кнопку "Войти"
        buyButton.style.display = 'block';
    }

    // Обновляем иконку корзины
    updateCartIcon();

// После успешной аутентификации пользователя
function handleSuccessfulAuth() {
    localStorage.setItem('loggedIn', 'true'); // Сохраняем информацию о входе
    document.getElementById('login_link').style.display = 'none'; // Скрываем ссылку "Вход"
    document.getElementById('register_link').style.display = 'none'; // Скрываем ссылку "Регистрация"
    document.getElementById('profile_link').style.display = 'inline'; // Показываем ссылку "Профиль"

    const cartPaymentInfo = document.querySelector('.t-top-form');
    const paymentButton = document.getElementById('paymentButton');

    // Скрываем текст "Для перехода к оплате, пожалуйста войдите в аккаунт." и кнопку "Войти"
    cartPaymentInfo.style.display = 'none';

    const buyButton = document.getElementById('vhod-cart');
    buyButton.style.display = 'none';

    // Показываем кнопку "Перейти к оплате"
    paymentButton.style.display = 'block';
}


        
 