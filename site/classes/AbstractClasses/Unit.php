<?php

namespace AbstractClasses;

abstract class Unit implements \Interfaces\UnitActiveInterface
{
    public $id;
    protected $data;

    /*construct срабатывает автоматом при создании юзера */
    public function __construct(int $id)
    {
        $this->id = $id;
    }


    //срабатывает, когда хотят прочитать закрытую перемнную
   public function  __get($name)
    {
        echo "'эта переменная закрыта";
    }
    //срабатывает, когда хотят записать в закрытую перемнную
    public function  __set($name, $value)
    {
        echo "'нельзя";
    }  

    //вызов к несуществующему или закрытому методу
    public function  __call($name, $arr)
    {
            echo "метод $name частный";
    }

    
    //вызов к несуществующему или закрытому методу
    public static function  __callStatic($name, $arr)
    {
            echo "метод $name статический";
    }

     //метод для получения всех полей юзера из таблицы
     private function getLine() : array
     {
         //если есть кэш, то выдаем данные оттуда
         if ($this->data){
             return $this->data;
         }
         $pdo = \Connection::getConnection();
         \Mylib\Connection::getConnection();

        //отправить запрос в БД
         $rezult = $pdo->query("SELECT * FROM `" . static::TABLE . "` WHERE `id` =  " . $this->id);
 
         $user = $rezult->fetch();
 
         //сохраняем в кэш
         $this->data = $user ;
 
         return $user;
 
     } 

    //метод для получения одного поля из строки юзера
    protected function getField(string $field) : mixed
    {        
        return $this->getLine()[$field];
    }

    public function deleteLine() : bool
    {

    }
    public function UpdateLine() : bool
    {
        
    }
    public static function getLines() : array
    {
        
        $filterStr = '';

        if (isset($_GET['id']) && $_GET['id'] > 0) {
            $filterStr = ' AND id  IN (' . $_GET['id'] . ')';
        }


        $sqlText = 'SELECT * FROM `' . static::TABLE . '` WHERE 1 ' . $filterStr . ';';

        $pdo = \Connection::getConnection();
        $result = $pdo->query($sqlText);

        $goods = [];
        while ($row = $result->fetch())
        {
            $goods[] = $row;
        } 
        return $goods;
    }
}