<?php

namespace App\Http\Controllers;

use App\Models\Quip;
use App\Models\Player;
use App\Events\AssignQuips;
use Illuminate\Http\Request;

class QuipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Quip::select('id', 'quip')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function assignQuips(Request $request)
    {
        $code = $request->roomNumber;
        $playerCount = $request->playerCount;
        $totalQuips = $playerCount * 3;

        $playerIds = Player::where('game_id', $code)->pluck('id')->toArray();

         $randomQuips = Quip::inRandomOrder()
            ->limit($totalQuips)
            ->select('id', 'quip')
            ->get();
 
         // Organize quips into rounds
         $quipBreakdown = [
             'round1' => $randomQuips->take($totalQuips / 3)->all(),
             'round2' => $randomQuips->slice($totalQuips / 3, $totalQuips / 3)->all(),
             'round3' => $randomQuips->slice($totalQuips / 3 * 2)->all(),
         ];

         $quips = [];
        foreach ($quipBreakdown as $round => $roundQuips) {
            $quips[$round] = $this->assignQuipsToPlayers($roundQuips, $playerIds);
            }
 
         event(new AssignQuips($code, $quips));

         return ['message'=>'Start'];

    }

    private function assignQuipsToPlayers(array $quips, array $playerIds) {
        shuffle($quips);
        $assignedQuips = [];
    
        $quipCount = count($quips);
        $playerCount = count($playerIds);
        dd( $playerCount);
        $quipsPerPlayer = 2;
    
        for ($i = 0; $i < $quipCount; $i++) {
            $quipIndex = $i % $quipCount;
            $playerId = $playerIds[$i % $playerCount];
    
            if (!isset($assignedQuips[$playerId])) {
                $assignedQuips[$playerId] = [];
            }
    
            if (count($assignedQuips[$playerId]) < $quipsPerPlayer) {
                $assignedQuips[$playerId][] = $quips[$quipIndex];
            }
        }
    
        return $assignedQuips;
    }
}
