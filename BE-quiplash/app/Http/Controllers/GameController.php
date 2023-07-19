<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Game;
use App\Models\Answer;
use App\Models\Player;
use App\Events\StartGame;
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

    public function start(Request $request)
    {
        $code = $request->roomNumber;
        event(new StartGame($code));

        Game::where('game_id', $code)->update(['running' => true]);

    }

    public function cleanData()
    {
        Game::where('created_at', '<', Carbon::now()->subHours(2))->delete();
        Player::where('created_at', '<', Carbon::now()->subHours(2))->delete();
        Answer::where('created_at', '<', Carbon::now()->subHours(2))->delete();
    }


    private function createGameCode() 
    {
        $code = rand(pow(10, 3), pow(10, 4)-1);
        return (string)$code;
    }
}
