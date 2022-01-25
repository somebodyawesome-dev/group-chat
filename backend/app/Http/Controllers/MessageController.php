<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        return Message::all();
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
            'message'=>'required|string',
            'toUser'=>'required|string|exists:users,email'
            // ,'chat'=>'required|string'
        ]);
       $user=$request->user()->email;
        $chat=Chat::where([['user1','=',$request['toUser']],['user2','=',$user]])
            ->orWhere([['user1','=',$user],['user2','=',$request['toUser']]])->first();
        if(!$chat){
            
            $chat=Chat::create([
                'user1'=>$user,
                'user2'=>$request['toUser']
            ]);
        }
        $request['chat']=$chat->id;
        Message::create([
            'message'=>$request['message'],
            'chat'=>$chat->id,
            'sentBy'=>$user
        ]);
        broadcast(new MessageSent($request['message'],$request['toUser'],$user));
        return response(['message'=>'message sent !'],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string   $email
     * @return \Illuminate\Http\Response
     */
    public function getMessagesFromChat(Request $request,$email){
        
        $user=$request->user();
        
        $chat=Chat::where([['user1','=',$email],['user2','=',$user->email]])
        ->orWhere([['user1','=',$user->email],['user2','=',$email]])->first();
    
            //get latest 50 message
       return response(['email'=>$email,
       'messages'=>($chat != null)?$chat->messages()->limit(50)
       ->orderBy('created_at', 'DESC')->get()->reverse()->values():array() 
            ],200);
    
    
    
    }
}
