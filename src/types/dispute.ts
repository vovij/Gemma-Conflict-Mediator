import { z } from 'zod';

export const DisputeSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['waiting', 'active', 'resolved']),
  createdById: z.string(),
  participantId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Dispute = z.infer<typeof DisputeSchema>;