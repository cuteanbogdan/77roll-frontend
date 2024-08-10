import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  connect(url: string) {
    if (!this.socket) {
      this.socket = io(url, {});

      this.socket.on("connect", () => {
        console.log("Connected to the server with ID:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

export default new SocketService();
