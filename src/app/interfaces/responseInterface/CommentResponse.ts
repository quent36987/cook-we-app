import { z } from 'zod';
import { UserResponseSchema } from '@interfaces/responseInterface/UserResponse';

export const CommentResponseSchema = z.object({
  id: z.number(),
  recipeId: z.number(),
  text: z.string(),
  user: UserResponseSchema,
  created: z.string(),
});

export type CommentResponse = z.infer<typeof CommentResponseSchema>;
