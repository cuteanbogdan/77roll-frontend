import SocketService from "@/services/socketService";

export const placeBet = (userId: string, color: string, amount: number) => {
  SocketService.emit("place-bet", {
    color,
    amount,
    userId,
  });
};

export const rouletteNumbers: RouletteNumber[] = [
  { number: 1, color: "red" },
  { number: 14, color: "black" },
  { number: 2, color: "red" },
  { number: 13, color: "black" },
  { number: 3, color: "red" },
  { number: 12, color: "black" },
  { number: 4, color: "red" },
  { number: 0, color: "green" },
  { number: 11, color: "black" },
  { number: 5, color: "red" },
  { number: 10, color: "black" },
  { number: 6, color: "red" },
  { number: 9, color: "black" },
  { number: 7, color: "red" },
  { number: 8, color: "black" },
];
