import * as z from "zod";

export const bodySchema = z.object({
  title: z.string(),
  status: z.string().optional().nullable(),
  label: z.string().array(),
});

export type Body = z.infer<typeof bodySchema>;
