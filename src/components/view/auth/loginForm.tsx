"use client";
import { ComponentPropsWithoutRef, useState } from "react";
import { EyeClosed, Eye, ClipboardMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/inputs/input";
import SpinnerSvg from "@/components/svg/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { clientCookie } from "@/lib/hooks/getClientCookie";
import { post } from "@/lib/helpers/fetch.helper";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const cookie = clientCookie();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const [logged, setLogged] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = (formData: FormData) => {
    setLogged(false);
    setisLoading(true);

    const email = formData.get("email");
    const password = formData.get("password");

    post("/auth/login", {
      email,
      password,
    })
      .then(async (res: Response) => {
        const data = await res.json();

        if (res.ok) {
          toast({
            description: data.message,
            variant: "default",
          });

          setLogged(true);

          cookie.set("token", data.token);

          setTimeout(() => {
            setisLoading(false);

            router.push("/chat");
          }, 1500);
        }

        if (res.status >= 400) {
          toast({
            description: data.detail || data.error,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.error(err);

        setLogged(false);
      })
      .finally(() => setisLoading(false));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ClipboardMinus className="size-6" />
              </div>
              <span className="sr-only">Logo</span>
            </Link>
            <h1 className="text-xl font-bold">Bem vindo ao Relatorious</h1>
            <div className="text-center text-sm">
              Não tem conta?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Criar
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Seu melhor email..."
                required
                className="autofill:bg-background"
                disabled={logged}
              />
            </div>

            {/* SENHA */}
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Sua senha..."
                  minLength={6}
                  required
                  disabled={logged}
                />
                <Button
                className="bg-primary"
                  type="button"
                  size={"sm"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary" disabled={logged}>
              {isLoading ? (
                <>
                  <SpinnerSvg /> Carregando...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      </form>
    
    </div>
  );
}
