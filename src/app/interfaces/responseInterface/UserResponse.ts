import { z } from "zod";

export const UserResponseSchema = z.object({
  username: z.string().nullable(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
