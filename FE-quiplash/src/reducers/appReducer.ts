import { Reducer } from "redux";
import { ActionType } from "../actions/actionTypes";
import AppState from "../types/AppState";

const initialState: AppState = {
  roomNumber: null,
  roundNumber: null,
  host: false,
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
    case ActionType.SET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
