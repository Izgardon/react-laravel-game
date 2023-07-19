import { Reducer } from "redux";
import { ActionType } from "../actions/actionTypes";

interface AppState {
  roomNumber: string | null;
  roundNumber: string | null;
}

const initialState: AppState = {
  roomNumber: null,
  roundNumber: null,
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
    default:
      return state;
  }
};

export default reducer;
