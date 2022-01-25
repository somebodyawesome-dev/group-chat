<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $toUser;
    public $sentBy;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message,$toUser,$sentBy)
    {
        $this->message=$message;
        $this->toUser=$toUser;
        $this->sentBy=$sentBy;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // .$this->toUser
        return new PrivateChannel('chat-'.$this->toUser);
    }
    public function broadcastAs(){
        return "message-received";
    }
    /**
 * Get the data to broadcast.
 *
 * @return array
 */
public function broadcastWith()
{
    return ['message' => $this->message,'sentBy'=>$this->sentBy];
}
}
