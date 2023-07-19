<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Game;
use App\Models\Player;
use App\Events\JoinGame;
use Illuminate\Http\Request;


class PlayerController extends Controller
{
    public function index(Request $request)
    {
        $roomNumber = $request->roomNumber;

        $players = Player::where('game_id', $roomNumber)->get();

        return response()->json([
            'players' => $players
    ]);
    }

    public function store(Request $request)
    {
        $code = $request->roomNumber;
        $playerName=$request->playerName;

        $playerCount = Player::where('game_id', $code)->count();
        if($playerCount >= 8){
            return ['message'=>'full'];
        }  
       
        $playerNameTaken = Player::where('name', $playerName)->first();
        if($playerNameTaken){
            return ['message'=>'taken'];
        }  
        $gameExists = Game::where('game_id', $code)->first();
    
        if($gameExists){
            $data = [
                'name' => $playerName,
                'game_id' => $code,
            ];
            //Creating the player
            Player::create($data);

            //Alerting other players of new player
            
            event(new JoinGame($code));
            
            return ['message'=>'correct'];
        }  
    }
}
