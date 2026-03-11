import { z } from "zod";

export const BusinessSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  businessTypeId: z.string().uuid(),
  createdAt: z.string().datetime(),
  ownerId: z.string().uuid(),
  googleClassId: z.string(),
  programName: z.string(),
  active: z.boolean(),
  logoURL: z.string().url()
});

export type Business = z.infer<typeof BusinessSchema>;