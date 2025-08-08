import z from "zod";

export const authHeaderSchema = z.object({
  authorization: z.string().describe('Bearer token for authentication')
})