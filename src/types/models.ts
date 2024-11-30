import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
});

export const DisputeSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['waiting', 'active', 'resolved']),
  createdById: z.string(),
  participantId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MessageSchema = z.object({
  id: z.string(),
  disputeId: z.string(),
  content: z.string(),
  role: z.enum(['user1', 'user2', 'ai']),
  userId: z.string(),
  timestamp: z.date(),
  aiSummary: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Dispute = z.infer<typeof DisputeSchema>;
export type Message = z.infer<typeof MessageSchema>;