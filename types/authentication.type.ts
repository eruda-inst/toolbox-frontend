import z from "zod";
import { credInSchema } from "@/schemas/authentication.schema";

type CredIn = z.infer<typeof credInSchema>;

export type { CredIn };
