import { useEffect, useRef, Dispatch } from "react";
import SocketService from "@/services/socketService";
import { CoinflipActionType } from "../contexts/stateManagement";

export const useCoinflipSocketListeners = (
  dispatch: Dispatch<CoinflipActionType>,
  setUser: any,
  user: any
) => {
  const initialStateLoadedRef = useRef(false);

  useEffect(() => {
    if (user && user._id && !initialStateLoadedRef.current) {
      SocketService.registerUser(user._id);

      SocketService.emit("get-rooms", {});

      initialStateLoadedRef.current = true;
    }

    SocketService.on("rooms-updated", (rooms: any[]) => {
      dispatch({ type: "SET_ROOMS", payload: rooms });
    });

    SocketService.on("balance-updated", (balance: number) => {
      if (balance !== undefined && user) {
        setUser((prevUser: any) => {
          if (!prevUser) return null;
          return { ...prevUser, balance: balance };
        });
      }
    });

    return () => {
      SocketService.off("rooms-updated");
      SocketService.off("balance-updated");
    };
  }, [user, setUser, dispatch]);
};
