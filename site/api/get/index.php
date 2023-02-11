<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();


 
//получаем апишку - все товары, чисто таблицу Goods или инфу по 1 товару из этой таблицы
echo json_encode(Good::getLines(), JSON_UNESCAPED_UNICODE);
   
 