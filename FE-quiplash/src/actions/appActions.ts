import { ActionType } from "./actionTypes";

interface SetRoomNumberAction {
  type: ActionType.SET_ROOM_NUMBER;
  payload: number;
}

interface SetRoundNumberAction {
  type: ActionType.SET_ROUND_NUMBER;
  payload: number;
}

// Action creators
export const setRoomNumber = (roomNumber: number): SetRoomNumberAction => ({
  type: ActionType.SET_ROOM_NUMBER,
  payload: roomNumber,
});

export const setRoundNumber = (roundNumber: number): SetRoundNumberAction => ({
  type: ActionType.SET_ROUND_NUMBER,
  payload: roundNumber,
});
