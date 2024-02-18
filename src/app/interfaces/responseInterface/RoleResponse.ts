import { z } from "zod";

export const RoleResponseSchema = z.object({
  role: z.string(),
});

export type RoleResponse = z.infer<typeof RoleResponseSchema>;
