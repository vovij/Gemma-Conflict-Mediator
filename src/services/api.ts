// src/services/api.ts
const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  createDispute: async (participant1Name: string, initialMessage: string) => {
    const response = await fetch(`${API_BASE_URL}/disputes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant1Name, initialMessage })
    });
    if (!response.ok) throw new Error('Failed to create dispute');
    return response.json();
  },

  joinDispute: async (invitationLink: string, participant2Name: string) => {
    const response = await fetch(`${API_BASE_URL}/disputes/${invitationLink}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant2Name })
    });
    if (!response.ok) throw new Error('Failed to join dispute');
    return response.json();
  },

  getMessages: async (disputeId: string) => {
    const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  getDisputeStatus: async (disputeId: string) => {
    const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}/status`);
    if (!response.ok) throw new Error('Failed to fetch dispute status');
    return response.json();
  }
};
