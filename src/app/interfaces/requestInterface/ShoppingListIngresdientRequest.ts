import { z } from 'zod';

export const ShoppingListIngredientRequestSchema = z.object({
  id: z.number().optional(), // Optional if the ingredient is new
  recipeId: z.number().optional(),
  name: z.string(),
  checked: z.boolean().optional(), // Optional, default to unchecked
});

export type ShoppingListIngredientRequest = z.infer<typeof ShoppingListIngredientRequestSchema>;
