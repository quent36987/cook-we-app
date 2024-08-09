import { z } from "zod";

export const RecipePictureResponseSchema = z.object({
  imageUrl: z.string(),
  id: z.number(),
  ownerUsername: z.string(),
  createdAt: z.string(),
});

export type RecipePictureResponse = z.infer<typeof RecipePictureResponseSchema>;
