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

class HostQuips implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $code;
    public $quips;
    public $time;
   
    public function __construct($code, $quips, $time)
    {
      
        $this->code = $code;
        $this->quips = $quips;
        $this->time = $time;
        
    }

    public function broadcastOn()
{
    
    return [$this->code];
}
    public function broadcastAs()
  {
      return 'hostQuips';
  }
}
