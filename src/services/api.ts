import { Dispute, Message, DisputeCreateResponse, DisputeJoinResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  createDispute: async (participant1Name: string, initialMessage: string): Promise<DisputeCreateResponse> => {
    const response = await fetch(`${API_BASE_URL}/disputes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant1Name, initialMessage })
    });
    if (!response.ok) throw new Error('Failed to create dispute');
    return response.json();
  },

  joinDispute: async (invitationLink: string, participant2Name: string): Promise<DisputeJoinResponse> => {
    const response = await fetch(`${API_BASE_URL}/disputes/${invitationLink}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant2Name })
    });
    if (!response.ok) throw new Error('Failed to join dispute');
    return response.json();
  },

  getMessages: async (disputeId: string): Promise<Message[]> => {
    const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  getDisputeStatus: async (disputeId: string): Promise<Dispute> => {
    const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}/status`);
    if (!response.ok) throw new Error('Failed to fetch dispute status');
    return response.json();
  }
};

// src/services/socket.ts
export class DisputeWebSocket {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: any) => void)[] = [];

  constructor(private disputeId: string, private participantName: string) {}

  connect() {
    this.ws = new WebSocket(`ws://localhost:3000/ws/${this.disputeId}`);
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageHandlers.forEach(handler => handler(message));
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return this;
  }

  onMessage(handler: (message: any) => void) {
    this.messageHandlers.push(handler);
  }

  sendMessage(content: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'message',
        content,
        senderName: this.participantName
      }));
    }
  }

  disconnect() {
    this.ws?.close();
  }
}
