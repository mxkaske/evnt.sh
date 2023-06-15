import * as z from "zod";

export const bodySchema = z.object({
  title: z.string(),
  status: z.string().optional(),
  labels: z.string().array(),
});

export type Body = z.infer<typeof bodySchema>;

export type UpstashData = Body;
