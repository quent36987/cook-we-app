import { z } from 'zod';
import { UserResponseSchema } from '@interfaces/responseInterface/UserResponse';

export const CommentResponseSchema = z.object({
  id: z.number(),
  recipeId: z.number(),
  text: z.string(),
  ownerUsername: z.string(),
  createdAt: z.string(),
});

export type CommentResponse = z.infer<typeof CommentResponseSchema>;
