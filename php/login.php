<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("db.php");

$login = $_POST['login'];
$password = $_POST['password'];

if (empty($login) || empty($password)) {
    echo "Пожалуйста, заполните все поля";
} else {
    $stmt = $conn->prepare("SELECT * FROM registerUser WHERE login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();

     if (password_verify($password, $row['password'])) {
        // Сохраняем данные пользователя в сессии
        session_start();
        $_SESSION['phone'] = $row['phone'];
        $_SESSION['username'] = $login;
        echo "success"; // Успешная аутентификация
        
    } else {
        echo "failure"; // Неправильный логин или пароль
    }
} else {
    echo "failure"; // Пользователь не найден
}
}

$stmt->close();
$conn->close();
?>