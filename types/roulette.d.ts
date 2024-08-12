interface StateType {
  bets: any[];
  history: number[];
  targetNumber: number;
  bettingOpen: boolean;
  forceUpdate: boolean;
}

interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}
