interface StateType {
  bets: any[];
  history: number[];
  targetNumber: number;
}

interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}
