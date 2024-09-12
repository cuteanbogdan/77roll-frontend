import { Message } from "@/types/auth";
import { CoinflipStateType, StateType } from "@/types/roulette";

export type ActionType =
  | { type: "SET_BETS"; payload: any[] }
  | { type: "CLEAR_BETS" }
  | { type: "SET_HISTORY"; payload: number[] }
  | {
      type: "SET_TARGET_NUMBER";
      payload: { number: number };
    }
  | { type: "SET_ROUND_NUMBER"; payload: number }
  | { type: "SET_BETTING_OPEN"; payload: boolean };

export type CoinflipActionType =
  | { type: "SET_ROOMS"; payload: any[] }
  | { type: "ADD_ROOM"; payload: any }
  | { type: "UPDATE_ROOM"; payload: any }
  | { type: "CLEAR_ROOMS" }
  | { type: "SET_GAME_RESULT"; payload: { roomId: string; result: string } };

export type MessagesActionType =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message };

export const initialState: StateType = {
  bets: [],
  history: [],
  targetNumber: 1,
  roundNumber: 0,
  bettingOpen: true,
};

export const initialMessagesState = {
  messages: [] as Message[],
};

export const initialCoinflipState: CoinflipStateType = {
  rooms: [],
};

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_BETS":
      return { ...state, bets: action.payload };
    case "CLEAR_BETS":
      return { ...state, bets: [] };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    case "SET_TARGET_NUMBER":
      return {
        ...state,
        targetNumber: action.payload.number,
      };
    case "SET_ROUND_NUMBER":
      return { ...state, roundNumber: action.payload };
    case "SET_BETTING_OPEN":
      return { ...state, bettingOpen: action.payload };
    default:
      return state;
  }
}

export function coinflipReducer(
  state: CoinflipStateType,
  action: CoinflipActionType
): CoinflipStateType {
  switch (action.type) {
    case "SET_ROOMS":
      return { ...state, rooms: action.payload };
    case "ADD_ROOM":
      return { ...state, rooms: [...state.rooms, action.payload] };
    case "UPDATE_ROOM":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
      };
    case "SET_GAME_RESULT":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload.roomId
            ? { ...room, result: action.payload.result, isFlipping: false }
            : room
        ),
      };
    default:
      return state;
  }
}

export function messagesReducer(
  state = initialMessagesState,
  action: MessagesActionType
) {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
