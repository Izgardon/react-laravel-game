<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Game;
use App\Events\JoinGame;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function store()
    {
        do {
            $code = $this->createGameCode();
            $existingGame = Game::where('game_id', $code)->first();
        } while ($existingGame);
    
        $data = [
            'game_id' => $code,
            'created_at' => Carbon::now(),
        ];
    
        Game::create($data);
        return ['room'=>$code];
    }


    private function createGameCode() 
    {
        $code = rand(pow(10, 3), pow(10, 4)-1);
        return (string)$code;
    }
}
