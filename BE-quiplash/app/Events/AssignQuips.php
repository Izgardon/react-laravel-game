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

class AssignQuips implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $code;
    public $quips;
   
    public function __construct($code, $quips)
    {
      
        $this->code = $code;
        $this->quips = $quips;
    }

    public function broadcastOn()
{
    
    return [$this->code];
}
    public function broadcastAs()
  {
      return 'assignQuips';
  }
}
