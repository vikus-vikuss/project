<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("db.php");

$phone = $_POST['phone'];
$username = $_POST['username'];
$password = $_POST['password'];

if (empty($phone) || empty($username) || empty($password)){
    echo "Пожалуйста, заполните все поля";
} else {
    // Проверяем уникальность логина
    $checkUniqueStmt = $conn->prepare("SELECT * FROM registerUser WHERE login = ?");
    $checkUniqueStmt->bind_param("s", $username);
    $checkUniqueStmt->execute();
    $checkUniqueResult = $checkUniqueStmt->get_result();

    if($checkUniqueResult->num_rows > 0){
        // Логин уже существует, можно просто завершить скрипт здесь
        echo "Логин уже занят. Пожалуйста, выберите другой.";
        exit();
    }

    // Хешируем пароль
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $insertStmt = $conn->prepare("INSERT INTO registerUser (phone, login, password) VALUES (?, ?, ?)");
    $insertStmt->bind_param("sss", $phone, $username, $passwordHash); // Сохраняем хешированный пароль

    // Обработка успешной регистрации
    if ($insertStmt->execute()) {
        // Сохраняем данные пользователя в сессии
        session_start();
        $_SESSION['phone'] = $phone;
        $_SESSION['username'] = $username;
        echo "Успешно! Вы зарегистрированы.";
    } else {
        echo "Ошибка: " . $conn->error;
    }
    $insertStmt->close();
    $checkUniqueStmt->close();
}

$conn->close();
?>