import { z } from "zod";

export const UserDetailResponseSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  username: z.string(),
  email: z.string(),
});


export type UserDetailResponse = z.infer<typeof UserDetailResponseSchema>;
