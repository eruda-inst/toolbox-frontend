import z from "zod";

const permOutSchema = z.object({
  id: z.number().nonnegative(),
  nome: z.string(),
  codigo: z.string(),
  criado_em: z.string(),
});

export { permOutSchema };
