import z from "zod";

class Validator {
  public static email(email: string) {
    const emailSchema = z.email();
    const result = emailSchema.safeParse(email);
    return result.success;
  }
}

export { Validator };
