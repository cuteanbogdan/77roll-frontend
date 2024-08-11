import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "", {});

      this.socket.on("connect", () => {
        console.log("Connected to the server with ID:", this.socket?.id);
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Disconnected from the server due to:", reason);
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error.message);
      });
    }
  }

  public connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  public emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  public registerUser(userId: string) {
    if (this.socket) {
      this.emit("register-user", userId);
    }
  }
}

export default new SocketService();
