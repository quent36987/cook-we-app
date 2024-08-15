import { z } from 'zod';

export const ShoppingListIngredientRequestSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
});

export type ShoppingListIngredientRequest = z.infer<typeof ShoppingListIngredientRequestSchema>;
