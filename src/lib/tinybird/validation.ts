import * as z from "zod";

export const methodEnum = z.enum(["create", "update", "delete"]);
export const bodySchema = z.object({
  method: methodEnum,
  name: z.string(),
  value: z
    .union([
      z.string(),
      z.number(),
      z.record(z.string(), z.any()), // not very specific
      z.any().array(), // neither
    ])
    .optional()
    .nullable(),
  // can be any additional information
  metadata: z.record(z.string(), z.any()).optional().nullable(),
});

export type Method = z.infer<typeof methodEnum>;
export type Body = z.infer<typeof bodySchema>;

export type TinyData = Body & {
  timestamp: number;
  id: string;
  user_id: string;
};
