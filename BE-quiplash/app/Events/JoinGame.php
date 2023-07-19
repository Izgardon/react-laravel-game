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

    public $roomNumber;
   
    public function __construct($roomNumber)
    {
        $this->roomNumber = $roomNumber;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    { 
        return new PrivateChannel($this->roomNumber);
       
    }

    public function broadcastAs()
  {
      return 'joinRoom';
  }
}
