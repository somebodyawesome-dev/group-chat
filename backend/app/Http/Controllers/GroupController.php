<?php

namespace App\Http\Controllers;

use App\Http\Lib\RoleHelper;
use App\Models\Chat;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class GroupController extends Controller
{
    use RoleHelper;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return  Group::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string|unique:groups,name',
            'level'=>'required|string|exists:levels,name'
        ]);
        return Group::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Group::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $group=Group::find($id);
        $group->update($request->all());
        return $group;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Group::destroy($id);
    }

    public function  getAllGroups(Request $request){
        return GroupController::isAdmin($request->user())?Group::all():response([
            'message'=>'Unauthorizied'
        ],401);
    }
     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request 
     
     * @return \Illuminate\Http\Response
     */
    public function getUsersByGroup(Request $request){
        
        $user=$request->user();
        $groupUsers=Group::find($user->group)->users()->where('email','!=',$user->email)->get();
        $rep=array();
        foreach($groupUsers as $gu){
            //get chat
            $chat=Chat::where([['user1','=',$user->email],['user2','=',$gu->email]])
                    ->orWhere([['user1','=',$gu->email],['user2','=',$user->email]])->first();
           
            //get latest messages if exist
            array_push($rep,[
                'user'=> $gu,
                'lastMessage'=>($chat != null)?$chat->messages()->limit(1)->orderBy('created_at', 'DESC')->get()->reverse()->values()->first():null
            ]);
                    
        }
        //get last messageif exist
        return $rep;
    }
}
