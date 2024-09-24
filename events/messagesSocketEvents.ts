import { useEffect, Dispatch } from "react";
import SocketService from "@/services/socketService";
import { MessagesActionType } from "../contexts/stateManagement";
import { Message, User } from "@/types/auth";

export const useMessageSocketListeners = (
  dispatch: Dispatch<MessagesActionType>,
  user: User | null
) => {
  useEffect(() => {
    if (user && user._id) {
      SocketService.emit("request-messages", {});

      SocketService.on("initial-messages", (messages: Message[]) => {
        dispatch({ type: "SET_MESSAGES", payload: messages });
      });

      SocketService.on("receive-message", (message: Message) => {
        dispatch({ type: "ADD_MESSAGE", payload: message });
      });
    }

    return () => {
      SocketService.off("initial-messages");
      SocketService.off("receive-message");
    };
  }, [user, dispatch]);
};
