<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user=User::create([
            'name'=>"somebodyawesome",
            'email'=>"luckynoob@yahoo.com",
            'role' => 'admin',
            'group'=>"FIA2-GL-3",
            'password' => bcrypt("ilove123456")
        ]);
        
    }
}
