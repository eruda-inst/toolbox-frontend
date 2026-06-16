"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
  toast,
  Typography,
} from "@heroui/react";
import z from "zod";
import { Validator } from "@/utils/Validator";
import { ResetPasswordService } from "@/services/ResetPassword";
import { useResetPasswordStore } from "@/stores/resetPassword.store";
import { tostadaFf } from "@/configs/font.config";

function ForgotMyPassword() {
  const router = useRouter();

  const setEmailStore = useResetPasswordStore((state) => state.setEmail);

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValidForm = useMemo(() => {
    const emailSchema = z.email();
    const result = emailSchema.safeParse(email);
    return result.success;
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ResetPasswordService.requestOtp({ email });
      setEmailStore(email);
      setEmail("");
      toast.success("Código de verificação enviado com sucesso");
      router.replace("/login/esqueci-minha-senha/verificar-codigo");
    } catch (e: unknown) {
      toast.danger("Erro ao enviar código de verificação");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card
        className="max-w-105 w-full mx-auto border-2 border-border-secondary/40 rounded-2xl px-10 mt-18 dark:shadow-[0_0_0_1px_#1f1f20,0_8px_32px_rgba(0,0,0,.55),0_2px_8px_rgba(0,0,0,.3)]"
        variant="tertiary"
      >
        <Card.Header>
          <Typography
            type="h2"
            align="center"
            className={`${tostadaFf.className} py-8`}
          >
            toolbox
          </Typography>

          <Card.Title className="text-2xl mb-2 text-center">
            Esqueceu sua senha?
          </Card.Title>

          <Card.Description className="text-center">
            Insira seu e-mail abaixo para redefinir sua senha
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-4 mt-4">
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              isRequired
              className="space-y-1"
              type="email"
              value={email}
              onChange={setEmail}
              validate={(v) => {
                if (!v.length) {
                  return "Campo obrigatório";
                }
                if (!Validator.email(v)) {
                  return "E-mail inválido";
                }
                return null;
              }}
            >
              <Label className="uppercase">E-mail</Label>

              <Input placeholder="voce@newnet.com.br" />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              fullWidth
              className="mt-4"
              isDisabled={!isValidForm}
              isPending={isSubmitting}
            >
              {({ isPending }) => (
                <>
                  {isPending
                    ? "Enviando código..."
                    : "Enviar código de verificação"}
                </>
              )}
            </Button>
          </Form>
        </Card.Content>

        <Card.Footer className="flex flex-col">
          <Separator className="my-4" variant="secondary" />

          <Link href="/login" replace>
            <Typography className="flex items-center gap-x-2 hover:underline">
              <FaArrowLeft /> Voltar à tela de login
            </Typography>
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ForgotMyPassword;
