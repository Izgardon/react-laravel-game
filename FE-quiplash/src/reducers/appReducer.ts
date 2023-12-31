import { Reducer } from "redux";
import { ActionType } from "../actions/actionTypes";
import AppState from "../types/AppState";

const initialState: AppState = {
  roomNumber: null,
  roundNumber: 0,
  questionNumber: 0,
  host: false,
  players: [],
  activePlayer: { id: null, name: null },
};

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ROOM_NUMBER:
      return {
        ...state,
        roomNumber: action.payload,
      };
    case ActionType.SET_ROUND_NUMBER:
      return {
        ...state,
        roundNumber: action.payload,
      };
    case ActionType.SET_QUESTION_NUMBER:
      return {
        ...state,
        questionNumber: action.payload,
      };
    case ActionType.SET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case ActionType.SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case ActionType.SET_ACTIVE_PLAYER:
      return {
        ...state,
        activePlayer: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
