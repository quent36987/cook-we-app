import { z } from 'zod';

export const RecipeShoppingListResponseSchema = z.object({
  id: z.number(),
  imageUrl: z.string().nullable(),
  recipeId: z.number(),
  name: z.string(),
  portion: z.number(),
});

export type RecipeShoppingListResponse = z.infer<typeof RecipeShoppingListResponseSchema>;
