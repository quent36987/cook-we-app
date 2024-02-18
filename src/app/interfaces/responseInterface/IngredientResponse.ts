import { z } from 'zod';

export const IngredientResponseSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
});

export type IngredientResponse = z.infer<typeof IngredientResponseSchema>;
