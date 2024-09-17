import { useEffect, useRef, Dispatch } from "react";
import SocketService from "@/services/socketService";
import { CoinflipActionType } from "../contexts/stateManagement";
import socketService from "@/services/socketService";

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

      SocketService.on("rooms-updated", (rooms: any[]) => {
        dispatch({ type: "SET_ROOMS", payload: rooms });
      });

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

    socketService.on("game-result", (result) => {
      dispatch({ type: "SET_GAME_RESULT", payload: result });
    });

    socketService.on("room-deleted", ({ roomId }) => {
      dispatch({ type: "REMOVE_ROOM", payload: roomId });
    });

    SocketService.on("room-error", (error) => {
      alert(`Error creating room: ${error.message}`);
    });

    return () => {
      SocketService.off("rooms-updated");
      SocketService.off("balance-updated");
      socketService.off("game-result");
      socketService.off("room-error");
    };
  }, [user, setUser, dispatch]);
};
