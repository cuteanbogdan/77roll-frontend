import { useEffect, useRef } from "react";
import SocketService from "@/services/socketService";
import { Dispatch } from "react";
import { ActionType } from "../contexts/stateManagement";

export const useSocketListeners = (
  dispatch: Dispatch<ActionType>,
  setUser: any,
  user: any
) => {
  const initialStateLoadedRef = useRef(false);

  useEffect(() => {
    if (user && user._id && !initialStateLoadedRef.current) {
      SocketService.registerUser(user._id);

      SocketService.emit("get-initial-state", {});

      SocketService.on("initial-state", (initialState: any) => {
        dispatch({ type: "SET_BETS", payload: initialState.bets });
        dispatch({ type: "SET_HISTORY", payload: initialState.history });
        dispatch({
          type: "SET_TARGET_NUMBER",
          payload: { number: initialState.targetNumber },
        });
        dispatch({
          type: "SET_ROUND_NUMBER",
          payload: initialState.roundNumber,
        });
        dispatch({
          type: "SET_BETTING_OPEN",
          payload: initialState.bettingOpen,
        });

        initialStateLoadedRef.current = true;
      });
    }

    SocketService.on(
      "roulette-result",
      (result: {
        winningNumber: number;
        updatedHistory: number[];
        roundNumber: number;
      }) => {
        dispatch({
          type: "SET_TARGET_NUMBER",
          payload: { number: result.winningNumber },
        });
        dispatch({ type: "SET_ROUND_NUMBER", payload: result.roundNumber });
        // dispatch({ type: "SET_HISTORY", payload: result.updatedHistory });
      }
    );

    SocketService.on("betting-open", () => {
      dispatch({ type: "SET_BETTING_OPEN", payload: true });
    });

    SocketService.on("betting-closed", () => {
      dispatch({ type: "SET_BETTING_OPEN", payload: false });
    });

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
      alert(`Bet Error: ${error.message}`);
    });

    SocketService.on("updated-history", (updatedHistory: number[]) => {
      dispatch({ type: "SET_HISTORY", payload: updatedHistory });
    });

    return () => {
      SocketService.off("initial-state");
      SocketService.off("roulette-result");
      SocketService.off("betting-open");
      SocketService.off("betting-closed");
      SocketService.off("bet-updated");
      SocketService.off("new-bet");
      SocketService.off("all-bets");
      SocketService.off("balance-updated");
      SocketService.off("clear-bets");
      SocketService.off("bet-error");
      SocketService.off("updated-history");
    };
  }, [user, setUser, dispatch]);
};
