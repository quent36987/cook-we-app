import { z } from 'zod';

export const RecipeShoppingListResponseSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  recipeId: z.number(),
  name: z.string(),
  portions: z.number(),
});

export type RecipeShoppingListResponse = z.infer<typeof RecipeShoppingListResponseSchema>;
