import { z } from "zod";

export const RecipeStepResponseSchema = z.object({
  stepNumber: z.number(),
  text: z.string(),
});

export type RecipeStepResponse = z.infer<typeof RecipeStepResponseSchema>;
