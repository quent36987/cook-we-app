import { z } from 'zod';

export const ShoppingListResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  ownerUsername: z.string(),
  createdAt: z.string(),
});

export type ShoppingListResponse = z.infer<typeof ShoppingListResponseSchema>;
