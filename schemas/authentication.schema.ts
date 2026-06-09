import z from "zod";

const credInSchema = z.object({
  email: z.email(),
  senha: z.string().min(8),
});

export { credInSchema };
