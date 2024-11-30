import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  disputeId: z.string(),
  content: z.string(),
  role: z.enum(['user1', 'user2', 'ai']),
  userId: z.string(),
  timestamp: z.date(),
  aiSummary: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageRole = z.infer<typeof MessageSchema.shape.role>;