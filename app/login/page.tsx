"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Button,
  Card,
  ColorSwatch,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Separator,
  TextField,
  toast,
  Typography,
} from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { tostadaFf } from "@/configs/font.config";
import { Validator } from "@/utils/Validator";
import { CredIn } from "@/types/authentication.type";
import { credInSchema } from "@/schemas/authentication.schema";
import { Authentication } from "@/services/Authentication";
import { tokenStorage } from "@/libs/tokenStorage.lib";

function Login() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [creds, setCreds] = useState<CredIn>({ email: "", senha: "" });

  const isValidCreds = useMemo(() => {
    const result = credInSchema.safeParse(creds);
    return result.success;
  }, [creds]);

  const handleChange = (key: keyof CredIn, value: string) => {
    setCreds({ ...creds, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await Authentication.login(creds);
      if (res) {
        const { access_token, refresh_token } = res;
        tokenStorage.setTokens(access_token, refresh_token);
        router.push("/");
      }
    } catch (e: unknown) {
      setCreds({ email: "", senha: "" });
      toast.danger("Erro ao fazer login");
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

          <Card.Title className="text-2xl mb-2">
            Bem-vindo ao toolbox
          </Card.Title>

          <Card.Description>
            Faça login para acessar sua plataforma
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-4 mt-4">
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <TextField
              className="space-y-1"
              type="email"
              value={creds.email}
              validate={(v) => {
                if (!v.length) {
                  return "Campo obrigatório";
                }
                if (!Validator.email(v)) {
                  return "E-mail inválido";
                }
                return null;
              }}
              onChange={(v) => handleChange("email", v)}
            >
              <Label className="uppercase">E-mail</Label>

              <Input placeholder="voce@newnet.com.br" />

              <FieldError />
            </TextField>

            <TextField
              className="space-y-1"
              type={isVisible ? "text" : "password"}
              value={creds.senha}
              validate={(v) => {
                if (!v.length) {
                  return "Campo obrigatório";
                }
                if (v.length < 8) {
                  return "Senha muito curta";
                }
                return null;
              }}
              onChange={(v) => handleChange("senha", v)}
            >
              <Label className="uppercase">Senha</Label>

              <InputGroup>
                <InputGroup.Input placeholder="********" />

                <InputGroup.Suffix>
                  {isVisible ? (
                    <FaEyeSlash
                      className="hover:cursor-pointer text-xl"
                      onClick={() => setIsVisible(false)}
                    />
                  ) : (
                    <FaEye
                      className="hover:cursor-pointer text-xl"
                      onClick={() => setIsVisible(true)}
                    />
                  )}
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError />
            </TextField>

            <Link href="forgot-password">
              <Typography
                type="body-xs"
                color="muted"
                align="end"
                className="hover:underline"
              >
                Esqueci minha senha
              </Typography>
            </Link>

            <Button
              type="submit"
              className="w-full mt-4"
              isDisabled={!isValidCreds}
              isPending={isSubmitting}
            >
              {({ isPending }) => <>{isPending ? "Entrando..." : "Entrar"}</>}
            </Button>
          </Form>
        </Card.Content>

        <Card.Footer className="flex flex-col">
          <Separator className="my-4" variant="secondary" />

          <div className="w-full flex items-center gap-x-2">
            <ColorSwatch
              color="#2a5c28"
              className="size-1.5 shadow-[0_0_6px_rgba(74,222,128,.3)]"
            />
            <Typography type="body-xs" color="muted">
              Acesso restrito a colaboradores autorizados.
            </Typography>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Login;
