import SocketService from "@/services/socketService";

export const placeBet = (userId: string, color: string, amount: number) => {
  SocketService.emit("place-bet", {
    color,
    amount,
    userId,
  });
};
