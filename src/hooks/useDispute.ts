import { useState, useEffect } from 'react';
import { Message, Dispute } from '../types';
import { api } from '../services/api';
import { DisputeWebSocket } from '../services/socket';

export const useDispute = (disputeId: string, participantName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<DisputeWebSocket | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [messagesData, disputeData] = await Promise.all([
          api.getMessages(disputeId),
          api.getDisputeStatus(disputeId)
        ]);
        
        setMessages(messagesData);
        setDispute(disputeData);
        
        // Initialize WebSocket
        const ws = new DisputeWebSocket(disputeId, participantName).connect();
        ws.onMessage((message) => {
          setMessages(prev => [...prev, message]);
        });
        setSocket(ws);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      socket?.disconnect();
    };
  }, [disputeId, participantName]);

  const sendMessage = (content: string) => {
    socket?.sendMessage(content);
  };

  return {
    messages,
    dispute,
    loading,
    error,
    sendMessage
  };
};
