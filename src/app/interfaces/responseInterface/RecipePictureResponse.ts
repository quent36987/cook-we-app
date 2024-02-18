import { z } from "zod";

export const RecipePictureResponseSchema = z.object({
  imageUrl: z.string(),
});

export type RecipePictureResponse = z.infer<typeof RecipePictureResponseSchema>;
