<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class JoinGame
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomCode;
   
    public function __construct($roomCode)
    {
        $this->roomCode = $roomCode;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    { return new PrivateChannel($this->roomCode);
       
    }

    public function broadcastAs()
  {
      return 'joinRoom';
  }
}
