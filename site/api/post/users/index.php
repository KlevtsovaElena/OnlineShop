<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

if (isset($_POST['password'])) {
    $_POST['password'] = crypt($_POST['password'], 'inordic');
}

if (User::exists()){
    echo "Юзер уже есть";
    exit(0);
}

//создаём запись в БД
User::createLine();