import { z, ZodSchema, ZodType } from 'zod';

export const PageResponseSchema = <ItemType extends ZodType>(itemSchema: ItemType) => {
  return z.object({
    content: z.array(itemSchema),
    page: z.number(),
    totalElements: z.number(),
    size: z.number(),
  });
}

export type PageType<TPageType extends ZodType> = ReturnType<
  typeof PageResponseSchema<TPageType>
>

export type PageResponse<TPage> = z.infer<PageType<ZodType<TPage>>>
