import { useEffect, Dispatch } from "react";
import SocketService from "@/services/socketService";
import { MessagesActionType } from "../contexts/stateManagement";
import { Message } from "@/types/auth";

export const useMessageSocketListeners = (
  dispatch: Dispatch<MessagesActionType>,
  user: any
) => {
  useEffect(() => {
    if (user && user._id) {
      SocketService.registerUser(user._id);

      SocketService.on("receive-message", (message: Message) => {
        dispatch({ type: "ADD_MESSAGE", payload: message });
      });
    }

    return () => {
      SocketService.off("receive-message");
    };
  }, [user, dispatch]);
};
