import { io, Socket } from 'socket.io-client';
import { Message } from '../types/models';

export class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(disputeId: string, userId: string) {
    this.socket = io(import.meta.env.VITE_WS_URL, {
      query: { disputeId, userId },
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribeToMessages(callback: (message: Message) => void) {
    if (!this.socket) return;
    this.socket.on('newMessage', callback);
  }

  sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    if (!this.socket) return;
    this.socket.emit('sendMessage', message);
  }
}