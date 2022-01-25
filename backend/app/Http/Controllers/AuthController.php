<?php

namespace App\Http\Controllers;

use App\Http\Lib\RoleHelper;
use App\Mail\PasswordMailer;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use RoleHelper;

    public function register(Request $request){
        $fields=$request->validate([
            'name'=>'required|string',
            'email' => 'required|string|unique:users,email',
           // 'password' => 'required|string',
            'group' => 'required|string|exists:groups,name'
        ]);
        $password=Str::random(8);
        $user=User::create([
            'name'=>$fields['name'],
            'email'=>$fields['email'],
            'role' => 'etudiant',
            'group'=>$fields['group'],
            'password' => bcrypt($password),
            'activation_token' => Str::random(16)
        ]);
        $token= $user->createToken('appToken')->plainTextToken;
        $response=[
            'user'=>$user,
            'token'=>$token
        ];
        //make mail with artisan and fix the smtp server
        //specify in send() the url of activation token localhost/activation/token 
        Mail::to($user->email)->send(new PasswordMailer($password));
        return response($response, 201);
    }

    public function login(Request $request){
        $fields=$request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
        //check email
        $user=User::where('email',$fields['email'])->first();
        //check password 
        if(!$user || !Hash::check($fields['password'],$user->password)){
            return response([
                'message'=>'bad credentials'
            ],401);
        }
        $token= $user->createToken('appToken')->plainTextToken;
        $response=[
            'user'=>$user,
            'token'=>$token
        ];
        return response($response, 201);
    }


    public function logout(Request $request) {
        /** @var \App\User|null $user */
        $user = auth()->user();
        $user->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
    public function role(Request $request){
         /** @var \App\User|null $user */
         $user = auth()->user();
         return response([
             'role'=> $request->user()->role,
         ],200);
    }

    public function activation($token){
        $user = User::where('activation_token',$token)->first();
        if(!$user)
            return response('user not valid',401);
        $user->activation_token = null;
        $user->save();
        return response('account activated',200);
    }

    public function resetRequest (Request $request){
        $validator = Validator::make($request->all(),[
            'email' => ['email','exists:users,email']
        ]);

        if($validator->fails())
            return response($validator->getMessageBag()->first(),401);
        
        $user = User::where('email',$request->email)->first();
        $user->reset_token = Str::random(16);
        Mail::to($request->email)->send(new PasswordResetMail("localhost:8000/api/reset/".$user->reset_token));
        $user->save();
        return response('Request sent with success',200);
    }

    public  function reset(Request $request,  $token){
        //TODO add validator
        $user = User::where('reset_token',$token)->first();
        if(!$user)
            return response('user does not exist',400);
        $user->password = bcrypt($request->password);
        $user->reset_token=null;
        $user->save();
        return response('password changed with success');
    }
}
