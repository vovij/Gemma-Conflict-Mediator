import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { disputeApi } from '../services/api';
import { WebSocketService } from '../services/socket';
import { AIService } from '../services/ai';
import { useState, useEffect } from 'react';
import { Message } from '../types/models';

export function useDispute(disputeId: string) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);
  
  const { data: dispute } = useQuery({
    queryKey: ['dispute', disputeId],
    queryFn: () => disputeApi.getDispute(disputeId),
  });

  const { data: initialMessages } = useQuery({
    queryKey: ['messages', disputeId],
    queryFn: () => disputeApi.getMessages(disputeId),
    onSuccess: (data) => setMessages(data),
  });

  useEffect(() => {
    const ws = WebSocketService.getInstance();
    ws.connect(disputeId, 'current-user-id'); // In real app, get from auth

    ws.subscribeToMessages((newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      
      // Check if we should generate AI summary
      AIService.shouldGenerateSummary([...messages, newMessage]).then(should => {
        if (should) {
          AIService.generateSummary([...messages, newMessage]).then(summary => {
            ws.sendMessage({
              disputeId,
              content: summary,
              role: 'ai',
              userId: 'ai-system',
            });
          });
        }
      });
    });

    return () => ws.disconnect();
  }, [disputeId]);

  const sendMessage = useMutation({
    mutationFn: (content: string) => {
      const message = {
        disputeId,
        content,
        role: 'user1' as const, // In real app, determine from auth
        userId: 'current-user-id', // In real app, get from auth
      };
      WebSocketService.getInstance().sendMessage(message);
      return Promise.resolve();
    },
  });

  return {
    dispute,
    messages,
    sendMessage: sendMessage.mutate,
    isLoading: !dispute || !initialMessages,
  };
}