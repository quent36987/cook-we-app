import { z } from 'zod';

export const ShoppingListRecipeRequestSchema = z.object({
  recipeId: z.number(),
  portion: z.number(),
  ingredients: z.array(z.string()), // Array of ingredient names or IDs
});

export type ShoppingListRecipeRequest = z.infer<typeof ShoppingListRecipeRequestSchema>;
