<?php



final class User extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'users';

    public function username() : string
    {
        return $this->getField('username');
    }

public static function exists() : bool{

    $username = $_POST['user_name'];
    $email = $_POST['user_mail'];  

    //заходим в базу и считаем сколько у нас юзеров с таким логином и паролем
    $pdo = \Connection::getConnection();
    $result = $pdo->query("SELECT COUNT(id) as num FROM users WHERE user_name ='$username' OR user_mail = '$email'");
    $row = $result->fetch();


    //возвращаем ответ в зависимости от цифры 0 или 1
    if($row['num'] > 0) {
        return true;

    } 
       
    return false;
        //return(bool) $row['num']
        //return


}

}