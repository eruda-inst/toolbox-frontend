import z from "zod";
import { userOutSchema } from "@/schemas/user.schema";

type UserOut = z.infer<typeof userOutSchema>;

export type { UserOut };
