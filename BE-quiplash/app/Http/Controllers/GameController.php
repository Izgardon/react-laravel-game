<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function create()
    {
        $code = rand(pow(10, 3), pow(10, 4)-1);
        $data = [
            'game_id' => $code,
            'created_at' => Carbon::now(),
        ];
        Game::create($data);
    }

    public function join()
    {
        $code = rand(pow(10, 3), pow(10, 4)-1);
        $data = [
            'game_id' => $code,
            'created_at' => Carbon::now(),
        ];
        Game::create($data);
    }
}
