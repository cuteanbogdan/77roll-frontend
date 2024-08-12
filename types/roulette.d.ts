interface StateType {
  bets: any[];
  history: number[];
  targetNumber: number;
  bettingOpen: boolean;
}

interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}
