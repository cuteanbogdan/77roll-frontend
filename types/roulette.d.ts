export interface BaseStateType {
  messages: Message[];
}
export interface StateType {
  bets: any[];
  history: number[];
  targetNumber: number;
  roundNumber: number;
  bettingOpen: boolean;
}

export interface CoinflipStateType {
  rooms: any[];
}

export interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}
