import { ActionType } from "./actionTypes";

interface SetRoomNumberAction {
  type: ActionType.SET_ROOM_NUMBER;
  payload: string;
}

interface SetRoundNumberAction {
  type: ActionType.SET_ROUND_NUMBER;
  payload: string;
}

// Action creators
export const setRoomNumber = (roomNumber: string): SetRoomNumberAction => ({
  type: ActionType.SET_ROOM_NUMBER,
  payload: roomNumber,
});

export const setRoundNumber = (roundNumber: string): SetRoundNumberAction => ({
  type: ActionType.SET_ROUND_NUMBER,
  payload: roundNumber,
});
