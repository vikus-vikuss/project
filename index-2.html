<?php
session_start(); // Обязательно начинайте сессию на странице, чтобы иметь доступ к данным пользователя

// Проверяем существование данных пользователя в сессии
$phone = isset($_SESSION['phone']) ? $_SESSION['phone'] : '';
$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/st.css">
    <title>Document</title>
</head>
<body>
    <div class="sidebar">
        <ul class="links-list">
            <li><a href="/index.html" onclick="showContent('home')">Главная</a></li>
            <li><a href="#" onclick="showContent('profile')">Личный кабинет</a></li>
            <li><a href="#" onclick="showContent('courses')">Ваши курсы</a></li>
        </ul>
        <button class="logout-button" onclick="openModal()">Выйти из аккаунта</button>
        <div id="logoutModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>Вы действительно хотите выйти из аккаунта?</h2>
        <div class="modal-buttons">
            <button onclick="logout()">Выйти</button>
            <button onclick="closeModal()">Нет, остаться</button>
        </div>
    </div>
</div>
    </div>
    <div class="main-content" id="main-content">
        <div id="profile-content" style="display: none;">
        <div class="h2">Ваша контактная информация</div>
    <div class="information">
    <p>Телефон: <?php echo $phone; ?></p>
    <p>Логин: <?php echo $username; ?></p>
    </div>
</table>
    </div>
    <div id="courses-content" style="display: none;">
       <div class="h2">Ой! Кажется, здесь пусто.</div>
    </div>
    <script>
        function showContent(tabName) {
            var tabs = document.getElementsByClassName('main-content')[0].children;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].id === tabName + '-content') {
                    tabs[i].style.display = 'block';
                } else {
                    tabs[i].style.display = 'none';
                }
            }
        }
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Получаем данные из сессии, которые были сохранены при входе или регистрации
            const phone = "<?php echo isset($_SESSION['phone']) ? $_SESSION['phone'] : ''; ?>";
            const username = "<?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?>";

        });
    
function logout() {
    fetch('php/logout.php')
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('loggedIn'); // Удалить информацию о входе при успешном выходе
                window.location.reload();
            } else {
                console.error('Failed to logout');
            }
        })
        .catch(error => console.error(error));
}
    </script>
     <script>
        function showContent(tabName) {
            var tabs = document.getElementsByClassName('main-content')[0].children;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].id === tabName + '-content') {
                    tabs[i].style.display = 'block';
                } else {
                    tabs[i].style.display = 'none';
                }
            }
        }

        function logout() {
            fetch('php/logout.php')
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        console.error('Failed to logout');
                    }
                })
                .catch(error => console.error(error));
        }
    </script>
    <script>
        // Получаем ссылку на элемент "Главная"
const homeLink = document.querySelector('.links-list a');

// При нажатии на ссылку "Главная" выполняем навигацию назад в истории браузера
homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});
    </script>
    <script>// Открытие модального окна при нажатии на кнопку "Выйти из аккаунта"
function openModal() {
    document.getElementById('logoutModal').style.display = 'block';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

// Функция для выхода из аккаунта
function logout() {
    fetch('php/logout.php', {
        method: 'POST',
        credentials: 'same-origin' // Передача cookie для уничтожения сессии
    })
    .then(response => {
        if (response.ok) {
            // Очистка данных сессии
            sessionStorage.clear(); // Очистка данных в sessionStorage
            localStorage.clear(); // Очистка данных в localStorage

            // Перенаправление на страницу входа (например, index.html)
            window.location.href = 'http://mysite/index.html';
        } else {
            console.error('Failed to logout');
        }
    })
    .catch(error => console.error(error));

}
</script>
</body>
</html>
