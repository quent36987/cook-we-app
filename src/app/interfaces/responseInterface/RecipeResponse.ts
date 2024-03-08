import { RecipePictureResponseSchema } from './RecipePictureResponse';
import { RecipeStepResponseSchema } from './RecipeStepResponse';
import { UserResponseSchema } from './UserResponse';
import { z } from 'zod';

export const RecipeResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  time: z.number(),
  portions: z.number(),
  season: z.string(),
  type: z.string(),
  pictures: z.array(RecipePictureResponseSchema),
});


export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
