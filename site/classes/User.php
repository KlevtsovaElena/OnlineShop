<?php



final class User extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'users';

    public function username() : string
    {
        return $this->getField('username');
    }


}