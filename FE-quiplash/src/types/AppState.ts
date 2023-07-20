interface Player {
  id: number;
  name: string;
}

interface AppState {
  roomNumber: string | null;
  roundNumber: number | null;
  questionNumber: number | null;
  host: boolean;
  players: Player[];
}

export default AppState;
