import z from "zod";

const credInSchema = z.object({
  email: z.email(),
  senha: z.string().min(8),
});

const tokenOutSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().nonnegative(),
});

export { credInSchema, tokenOutSchema };
