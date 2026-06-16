"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  InputGroup,
  Label,
  Separator,
  TextField,
  toast,
  Typography,
} from "@heroui/react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import z from "zod";
import { ResetPasswordService } from "@/services/ResetPassword";
import { useResetPasswordStore } from "@/stores/resetPassword.store";
import { tostadaFf } from "@/configs/font.config";

function ResetPassword() {
  const router = useRouter();

  const resetToken = useResetPasswordStore((state) => state.resetToken);
  const clearResetToken = useResetPasswordStore(
    (state) => state.clearResetToken,
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValidForm = useMemo(() => {
    const passwordSchema = z.string().min(8);
    const result = passwordSchema.safeParse(password);
    const isValidPassword = result.success;
    const arePasswordsEqual = confirmPassword === password;
    return isValidPassword && arePasswordsEqual;
  }, [password, confirmPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ResetPasswordService.resetPassword({
        reset_token: resetToken,
        nova_senha: password,
      });
      clearResetToken();
      setPassword("");
      setConfirmPassword("");
      toast.success("Senha redefinida com sucesso");
      router.push("/login");
    } catch (e: unknown) {
      toast.danger("Erro ao redefinir senha");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          Escolha uma senha segura para acessar sua conta
        </Card.Description>
      </Card.Header>

      <Card.Content className="space-y-4 mt-4">
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            isRequired
            autoComplete="new-password"
            className="space-y-1"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            validate={(v) => {
              if (!v.length) {
                return "Campo obrigatório";
              }
              if (v.length < 8) {
                return "Senha muito curta";
              }
              return null;
            }}
            onChange={setPassword}
          >
            <Label className="uppercase">Senha</Label>

            <InputGroup>
              <InputGroup.Input placeholder="********" />

              <InputGroup.Suffix>
                {isPasswordVisible ? (
                  <FaEyeSlash
                    className="hover:cursor-pointer text-xl"
                    onClick={() => setIsPasswordVisible(false)}
                  />
                ) : (
                  <FaEye
                    className="hover:cursor-pointer text-xl"
                    onClick={() => setIsPasswordVisible(true)}
                  />
                )}
              </InputGroup.Suffix>
            </InputGroup>

            <FieldError />
          </TextField>

          <TextField
            isRequired
            autoComplete="new-password"
            className="space-y-1"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            validate={(v) => {
              if (!v.length) {
                return "Campo obrigatório";
              }
              if (v.length < 8) {
                return "Senha muito curta";
              }
              if (v !== password) {
                return "Senhas diferentes";
              }
              return null;
            }}
            onChange={setConfirmPassword}
          >
            <Label className="uppercase">Confirmar senha</Label>

            <InputGroup>
              <InputGroup.Input placeholder="********" />

              <InputGroup.Suffix>
                {isConfirmPasswordVisible ? (
                  <FaEyeSlash
                    className="hover:cursor-pointer text-xl"
                    onClick={() => setIsConfirmPasswordVisible(false)}
                  />
                ) : (
                  <FaEye
                    className="hover:cursor-pointer text-xl"
                    onClick={() => setIsConfirmPasswordVisible(true)}
                  />
                )}
              </InputGroup.Suffix>
            </InputGroup>

            <FieldError />
          </TextField>

          <Typography color="muted" type="body-xs">
            Uma senha segura contém pelo menos 8 caracteres, incluíndo letras e
            números
          </Typography>

          <Button
            type="submit"
            fullWidth
            isDisabled={!isValidForm}
            isPending={isSubmitting}
          >
            {({ isPending }) => (
              <>{isPending ? "Redefinindo..." : "Redefinir minha senha"}</>
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
  );
}

export default ResetPassword;
