import axios from 'axios';
import { Dispute, Message, User } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const disputeApi = {
  create: async (title: string): Promise<Dispute> => {
    const { data } = await api.post('/disputes', { title });
    return data;
  },

  join: async (disputeId: string): Promise<Dispute> => {
    const { data } = await api.post(`/disputes/${disputeId}/join`);
    return data;
  },

  getMessages: async (disputeId: string): Promise<Message[]> => {
    const { data } = await api.get(`/disputes/${disputeId}/messages`);
    return data;
  },

  getDispute: async (disputeId: string): Promise<Dispute> => {
    const { data } = await api.get(`/disputes/${disputeId}`);
    return data;
  },
};

export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get('/users/me');
    return data;
  },
};