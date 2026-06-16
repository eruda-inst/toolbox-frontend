"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  FormEvent,
} from "react";
import {
  Button,
  Form,
  InputOTP,
  Link as LinkHeroUI,
  toast,
} from "@heroui/react";
import { Card, Separator, Typography } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa6";
import z from "zod";
import { tostadaFf } from "@/configs/font.config";
import { useResetPasswordStore } from "@/stores/resetPassword.store";
import { ResetPasswordService } from "@/services/ResetPassword";
import { verifyOtpOutSchema } from "@/schemas/resetPassword.schema";
import { useRouter } from "next/navigation";

function VerifyOtp() {
  const router = useRouter();

  const setResetToken = useResetPasswordStore((state) => state.setResetToken);
  const email = useResetPasswordStore((state) => state.email);
  const setEmail = useResetPasswordStore((state) => state.setEmail);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(600);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [secondsLeft]);

  const isValidForm = useMemo(() => {
    const codeSchema = z
      .string()
      .length(4)
      .regex(/^\d{4}$/);
    return codeSchema.safeParse(code).success;
  }, [code]);

  useEffect(() => {
    if (secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((p) => p - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [secondsLeft]);

  const handleResend = useCallback(async () => {
    try {
      await ResetPasswordService.requestOtp({ email });
      setSecondsLeft(600);
    } catch (e: unknown) {
      toast.danger("Erro ao reenviar código de verificação");
      console.error(e);
    }
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await ResetPasswordService.verifyOtp({ email, otp: code });
      const resetToken = res.reset_token;
      verifyOtpOutSchema.parse(res);
      setResetToken(resetToken);
      toast.success("Código verificado com sucesso");
      router.push("/login/esqueci-minha-senha/redefinir-senha");
      setEmail("");
      setCode("");
    } catch (e: unknown) {
      toast.danger("Erro ao verificar código");
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
            Verifique seu e-mail
          </Card.Title>

          <Card.Description className="text-center">
            Insira o código de verificação que enviamos para o e-mail
          </Card.Description>

          <Typography
            align="center"
            type="body-sm"
            className="text-accent"
            weight="bold"
          >
            {email}
          </Typography>
        </Card.Header>

        <Card.Content>
          <Form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <InputOTP
              maxLength={4}
              textAlign="center"
              value={code}
              onChange={setCode}
              autoFocus
            >
              <InputOTP.Group className="w-full">
                <InputOTP.Slot index={0} className="h-25" />
                <InputOTP.Slot index={1} className="h-25" />
                <InputOTP.Slot index={2} className="h-25" />
                <InputOTP.Slot index={3} className="h-25" />
              </InputOTP.Group>
            </InputOTP>

            <Button
              type="submit"
              fullWidth
              isDisabled={!isValidForm}
              isPending={isSubmitting}
            >
              {({ isPending }) => (
                <>{isPending ? "Verificando..." : "Verificar código"}</>
              )}
            </Button>
          </Form>

          <Typography align="center" type="body-sm" color="muted">
            Não recebeu o código?
            <br />
            <LinkHeroUI
              isDisabled={secondsLeft > 0}
              className="text-accent"
              onPress={handleResend}
            >
              {secondsLeft > 0
                ? `Clique para reenviar (${formattedTime})`
                : "Clique para reenviar"}
            </LinkHeroUI>
          </Typography>
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

export default VerifyOtp;
