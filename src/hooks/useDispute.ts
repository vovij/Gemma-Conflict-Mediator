// src/hooks/useDispute.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DisputeWebSocket } from '../services/socket';

export const useDispute = (disputeId: string, participantName: string) => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<DisputeWebSocket | null>(null);

  // Query for messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', disputeId],
    queryFn: () => api.getMessages(disputeId),
    refetchInterval: false // We'll use WebSocket for real-time updates
  });

  // Query for dispute status
  const { data: dispute, isLoading: disputeLoading } = useQuery({
    queryKey: ['dispute', disputeId],
    queryFn: () => api.getDisputeStatus(disputeId)
  });

  // Mutation for sending messages
  const { mutate: sendMessage } = useMutation({
    mutationFn: (content: string) => {
      socket?.sendMessage(content);
      return Promise.resolve(); // WebSocket handles the actual sending
    },
    onSuccess: () => {
      // Optionally handle successful message send
    }
  });

  useEffect(() => {
    const ws = new DisputeWebSocket(disputeId, participantName).connect();
    
    ws.onMessage((message) => {
      // Update the messages cache when new message arrives
      queryClient.setQueryData(['messages', disputeId], (old: any) => 
        old ? [...old, message] : [message]
      );
    });
    
    setSocket(ws);

    return () => {
      ws.disconnect();
    };
  }, [disputeId, participantName, queryClient]);

  return {
    messages,
    dispute,
    loading: messagesLoading || disputeLoading,
    sendMessage
  };
};
