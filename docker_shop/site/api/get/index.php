<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

    $host = 'mysql';
    $db   = 'watches';
    $user = 'root';
    $pass = 'test123';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    //создание объекта для подключения к БД
    $pdo = new PDO($dsn, $user, $pass, $opt);

       //получаем название таблицы из GET параметра 
       $table = $_GET['table'];

   // $sqlText = 'SELECT * FROM `Goods` JOIN `Brands` on Goods.brand = Brands.id;' ;

   $filterStr = '';
   if (isset($_GET['id']) && $_GET['id'] > 0) {
       $filterStr = $filterStr . " AND id = " . $_GET['id'];
   }
   /*if (isset($_GET['username'])) {
       $username = $_GET['username'];
       $filterStr = $filterStr . " AND username LIKE '%$username%' ";
   }
   if (isset($_GET['last_name'])) {
       $lastName = $_GET['last_name'];
       $filterStr = $filterStr . " AND last_name LIKE '%$lastName%' ";
   }
   if (isset($_GET['first_name'])) {
       $firstName = $_GET['first_name'];
       $filterStr = $filterStr . " AND first_name LIKE '%$firstName%' ";
   }
  //  echo $sqlText . '<br>';
  //  echo 'сработал get';

*/

   $sqlText = 'SELECT * FROM `' . $table . '` WHERE id > 0 ' . $filterStr . ';';

    $result = $pdo->query($sqlText);

    $users = [];
    while ($row = $result->fetch())
    {
        $users[] = $row;
    } 

    //получаем апишку - все товары, чисто таблицу Goods или инфу по 1 товару из этой таблицы
    echo json_encode($users, JSON_UNESCAPED_UNICODE);
   
   
   
    /*

    //получаем название таблицы из GET параметра 
    $table = $_GET['table'];













    //строка фильтрации
    $filterStr = '';
    if (isset($_GET['id']) && $_GET['id'] > 0) {
        $filterStr = $filterStr . " AND id = " . $_GET['id'];
    }
    if (isset($_GET['username'])) {
        $username = $_GET['username'];
        $filterStr = $filterStr . " AND username LIKE '%$username%' ";
    }
    if (isset($_GET['last_name'])) {
        $lastName = $_GET['last_name'];
        $filterStr = $filterStr . " AND last_name LIKE '%$lastName%' ";
    }
    if (isset($_GET['first_name'])) {
        $firstName = $_GET['first_name'];
        $filterStr = $filterStr . " AND first_name LIKE '%$firstName%' ";
    }

    //считывание даннвх
    //достаём данные из БД
    $sqlText = 'SELECT * FROM ' . $table . " WHERE id > 0 " . $filterStr;
    echo $sqlText . '<br>';
    echo 'сработал get';
    $result = $pdo->query($sqlText);
   
   //отрезаем по одной строчке из результата и показываем каждую в виде массива
   $users = [];
    while ($row = $result->fetch())
    {
        //смотрим данные одной строки
        //echo $row['first_name'] . " " . $row['last_name'] . '<br>';
        $users[] = $row;
    }

    //кодируем и выводим на экран

    echo 'сработал get';
    echo json_encode($users);
    */