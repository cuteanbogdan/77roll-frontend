import { useEffect } from "react";
import SocketService from "@/services/socketService";
import { Dispatch } from "react";
import { ActionType } from "../contexts/stateManagement";

export const useSocketListeners = (
  dispatch: Dispatch<ActionType>,
  setUser: any,
  user: any
) => {
  useEffect(() => {
    if (user && user._id) {
      SocketService.registerUser(user._id);
    }

    SocketService.on(
      "roulette-result",
      (result: { winningNumber: number; updatedHistory: number[] }) => {
        dispatch({ type: "SET_TARGET_NUMBER", payload: result.winningNumber });
        dispatch({ type: "SET_HISTORY", payload: result.updatedHistory });
      }
    );

    SocketService.emit("get-all-bets", {});

    SocketService.on("bet-updated", (updatedBets: any[]) => {
      if (updatedBets && updatedBets.length > 0) {
        dispatch({ type: "SET_BETS", payload: updatedBets });
      }
    });

    SocketService.on("all-bets", (allBets: any[]) => {
      if (allBets && allBets.length > 0) {
        dispatch({ type: "SET_BETS", payload: allBets });
      }
    });

    SocketService.on("balance-updated", (balance: number) => {
      if (balance !== undefined && user) {
        setUser((prevUser: any) => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            balance: balance,
          };
        });
      }
    });

    SocketService.on("clear-bets", () => {
      dispatch({ type: "CLEAR_BETS" });
    });

    SocketService.on("bet-error", (error: { message: string }) => {
      // Handle the error, e.g., show a message to the user
      alert(`Bet Error: ${error.message}`);
    });

    return () => {
      SocketService.off("roulette-result");
      SocketService.off("bet-updated");
      SocketService.off("new-bet");
      SocketService.off("all-bets");
      SocketService.off("balance-updated");
      SocketService.off("clear-bets");
      SocketService.off("bet-error");
    };
  }, [user, setUser, dispatch]);
};
