import { z } from 'zod';

export const IngredientShoppingListResponseSchema = z.object({
  id: z.number().nullable(),
  shoppingListRecipeId: z.number().nullable(),
  name: z.string(),
  checked: z.boolean(),
});

export type IngredientShoppingListResponse = z.infer<typeof IngredientShoppingListResponseSchema>;
