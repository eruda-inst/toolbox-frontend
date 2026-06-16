import z from "zod";
import {
  requestOtpInSchema,
  resetPasswordInSchema,
  verifyOtpInSchema,
  verifyOtpOutSchema,
} from "@/schemas/resetPassword.schema";

type requestOtpIn = z.infer<typeof requestOtpInSchema>;
type resetPasswordIn = z.infer<typeof resetPasswordInSchema>;
type verifyOtpIn = z.infer<typeof verifyOtpInSchema>;
type verifyOtpOut = z.infer<typeof verifyOtpOutSchema>;

export type { requestOtpIn, resetPasswordIn, verifyOtpIn, verifyOtpOut };
