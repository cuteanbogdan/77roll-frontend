export type ActionType =
  | { type: "SET_BETS"; payload: any[] }
  | { type: "CLEAR_BETS" }
  | { type: "SET_HISTORY"; payload: number[] }
  | { type: "SET_TARGET_NUMBER"; payload: number };

export const initialState: StateType = {
  bets: [],
  history: [],
  targetNumber: 1,
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
      return { ...state, targetNumber: action.payload };
    default:
      return state;
  }
}
