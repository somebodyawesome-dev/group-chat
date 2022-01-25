<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Level;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels=["FIA1","FIA2-GL","FIA3-GL-AL","LEEA-A1","LEEA-A2"
                ,"LEEEA-A3","PREPA-A1","PREPA-A2","MR-INFO-A1"
                ,"MR-INFO-A2"];

        foreach($levels as $level){
            Level::create([
                'name'=>$level
            ]);
            for($i=1; $i<=3;$i++){
                Group::create([
                    'name'=>$level."-".$i,
                    'level'=>$level
                ]);
            }
        }

    }
}
