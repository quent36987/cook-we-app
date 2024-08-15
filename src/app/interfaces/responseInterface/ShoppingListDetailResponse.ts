import { z } from 'zod';
import { RecipeShoppingListResponseSchema } from './RecipeShoppingListResponse';
import { IngredientShoppingListResponseSchema } from './IngredientShoppingListResponse';

export const ShoppingListDetailResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  ownerUsername: z.string(),
  createdAt: z.string(),
  recipes: z.array(RecipeShoppingListResponseSchema),
  ingredients: z.array(IngredientShoppingListResponseSchema),
});

export type ShoppingListDetailResponse = z.infer<typeof ShoppingListDetailResponseSchema>;
