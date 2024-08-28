interface StateType {
  bets: any[];
  history: number[];
  targetNumber: number;
  roundNumber: number;
  bettingOpen: boolean;
  messages: Message[];
}

interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}
