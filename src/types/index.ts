export interface Message {
  id: string;
  content: string;
  senderName: string;
  isAiSummary: boolean;
  createdAt: string;
  disputeId: string;
}

export interface Dispute {
  id: string;
  status: 'pending' | 'active' | 'resolved';
  participant1Name: string;
  participant2Name?: string;
  invitationLink: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface DisputeCreateResponse {
  disputeId: string;
  invitationLink: string;
}

export interface DisputeJoinResponse {
  disputeId: string;
}

export interface WebSocketMessage {
  type: 'message' | 'ai_summary';
  content: string;
  senderName: string;
}
