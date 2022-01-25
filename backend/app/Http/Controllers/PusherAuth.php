<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class PusherAuth extends Controller
{
    /**
     * Authenticates logged-in user in the Pusher JS app
     * For presence channels
     */
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     e
     */
    public function pusherAuth(Request $request)
    {
        $user = auth()->user();

        if ($user) {
            $pusher = new Pusher(config('broadcasting.connections.pusher.key'),
                                config('broadcasting.connections.pusher.secret'),
                                config('broadcasting.connections.pusher.app_id'));
            return $pusher->socketAuth($request->input('channel_name'), $request->input('socket_id'));
            
        }else {
            header('', true, 403);
            echo "Forbidden";
            return response("Forbi");
        }
    }
}
