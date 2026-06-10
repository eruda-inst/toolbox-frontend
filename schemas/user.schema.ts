import z from "zod";

const userOutSchema = z.object({
  id: z.number().nonnegative(),
  nome: z.string(),
  email: z.email(),
  ativo: z.boolean(),
  criado_em: z.string(),
  atualizado_em: z.string().nullable(),
  id_grupo: z.number().nonnegative(),
});

export { userOutSchema };
