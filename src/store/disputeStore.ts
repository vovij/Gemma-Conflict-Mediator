import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { DisputeSession, Message } from '../types';

interface DisputeStore {
  currentSession: DisputeSession | null;
  createSession: () => void;
  joinSession: (sessionId: string) => void;
  addMessage: (content: string, role: Message['role']) => void;
}

export const useDisputeStore = create<DisputeStore>((set) => ({
  currentSession: null,
  
  createSession: () => {
    const newSession: DisputeSession = {
      id: nanoid(),
      user1Id: nanoid(),
      messages: [],
      status: 'waiting',
      createdAt: new Date(),
    };
    set({ currentSession: newSession });
  },

  joinSession: (sessionId: string) => {
    // In a real app, this would fetch the session from an API
    set((state) => {
      if (state.currentSession?.id === sessionId) {
        return {
          currentSession: {
            ...state.currentSession,
            user2Id: nanoid(),
            status: 'active',
          },
        };
      }
      return state;
    });
  },

  addMessage: (content: string, role: Message['role']) => {
    set((state) => {
      if (!state.currentSession) return state;

      const newMessage: Message = {
        id: nanoid(),
        content,
        role,
        timestamp: new Date(),
      };

      return {
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, newMessage],
        },
      };
    });
  },
}));