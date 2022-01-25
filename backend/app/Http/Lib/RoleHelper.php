<?php
namespace App\Http\Lib;


trait RoleHelper
{
    protected static function isAdmin($user):bool {
        if(empty($user)) return false;
        return $user->role == 'admin';
    }
    protected static function isEtudiant($user):bool {
        if(empty($user)) return false;
        return $user->role == 'etudiant';
    }
}
