import { Message } from "@/types/auth";

export type ActionType =
  | { type: "SET_BETS"; payload: any[] }
  | { type: "CLEAR_BETS" }
  | { type: "SET_HISTORY"; payload: number[] }
  | {
      type: "SET_TARGET_NUMBER";
      payload: { number: number };
    }
  | { type: "SET_ROUND_NUMBER"; payload: number }
  | { type: "SET_BETTING_OPEN"; payload: boolean }
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message };

export const initialState: StateType = {
  bets: [],
  history: [],
  targetNumber: 1,
  roundNumber: 0,
  bettingOpen: true,
  messages: [],
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

    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
}
