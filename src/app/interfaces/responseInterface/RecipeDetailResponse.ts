import { RecipePictureResponseSchema } from './RecipePictureResponse';
import { RecipeStepResponseSchema } from './RecipeStepResponse';
import { UserResponseSchema } from './UserResponse';
import { z } from 'zod';
import { IngredientResponseSchema } from '@interfaces/responseInterface/IngredientResponse';
import { CommentResponseSchema } from '@interfaces/responseInterface/CommentResponse';

export const RecipeDetailResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  time: z.number(),
  portions: z.number(),
  season: z.string(),
  type: z.string(),
  createdAt: z.string(),
  ownerUsername: z.string(),
  steps: z.array(RecipeStepResponseSchema),
  pictures: z.array(RecipePictureResponseSchema),
  ingredients: z.array(IngredientResponseSchema),
  comments: z.array(CommentResponseSchema),
});


export type RecipeDetailResponse = z.infer<typeof RecipeDetailResponseSchema>;
