interface Player {
  id: number | null;
  name: string | null;
}

interface AppState {
  roomNumber: string | null;
  roundNumber: number | null;
  questionNumber: number | null;
  host: boolean;
  players: Player[];
  activePlayer: Player;
}

export default AppState;
