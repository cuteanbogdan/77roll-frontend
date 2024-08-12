export type ActionType =
  | { type: "SET_BETS"; payload: any[] }
  | { type: "CLEAR_BETS" }
  | { type: "SET_HISTORY"; payload: number[] }
  | {
      type: "SET_TARGET_NUMBER";
      payload: { number: number; forceUpdate: boolean };
    }
  | { type: "SET_BETTING_OPEN"; payload: boolean };

export const initialState: StateType = {
  bets: [],
  history: [],
  targetNumber: 1,
  bettingOpen: true,
  forceUpdate: false,
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
        forceUpdate: !state.forceUpdate,
      };
    case "SET_BETTING_OPEN":
      return { ...state, bettingOpen: action.payload };
    default:
      return state;
  }
}
