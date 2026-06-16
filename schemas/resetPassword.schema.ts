import z from "zod";

const requestOtpInSchema = z.object({
  email: z.email(),
});

const verifyOtpInSchema = z.object({
  email: z.email(),
  otp: z.string().length(4),
});

const verifyOtpOutSchema = z.object({
  reset_token: z.string(),
});

const resetPasswordInSchema = z.object({
  reset_token: z.string(),
  nova_senha: z.string().min(8),
});

export {
  requestOtpInSchema,
  verifyOtpInSchema,
  verifyOtpOutSchema,
  resetPasswordInSchema,
};
