import z from "zod";
import { credInSchema, tokenOutSchema } from "@/schemas/authentication.schema";

type CredIn = z.infer<typeof credInSchema>;

type TokenOut = z.infer<typeof tokenOutSchema>;

export type { CredIn, TokenOut };
