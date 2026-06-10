import z from "zod";
import { permOutSchema } from "@/schemas/perm.schema";

type PermOut = z.infer<typeof permOutSchema>;

export type { PermOut };
