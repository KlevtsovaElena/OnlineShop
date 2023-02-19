<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    if (User::check()) {
        $response = [
            'success' => true
        ];
    } else {
        $response = [
            'success' => false,
            'error' => 'юзер не авторизован'
        ];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);