import { ComponentPropsWithoutRef, useState } from "react";
import { EyeClosed, Eye, ClipboardMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/inputs/input";
import SpinnerSvg from "@/components/svg/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { clientCookie } from "@/lib/hooks/getClientCookie";
import { post } from "@/lib/helpers/fetch.helper";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";

export function SignupForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { toast } = useToast();
  const cookie = clientCookie();

  const [showPassword, setShowPassword] = useState(false);

  const [logged, setLogged] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSignup = (formData: FormData) => {
    setLogged(false);
    setisLoading(true);

    const username = formData.get("username");
    const email = formData.get("email");
    const cargo = formData.get("cargo");
    const password = formData.get("password");

    post("/auth/registrar", {
      nome: username,
      email,
      cargo,
      senha: password,
    })
      .then(async (res: Response) => {
        const data = await res.json();

        if (res.ok) {
          toast({
            description: data.message || data.mensagem,
            variant: "default",
          });

          setLogged(true);

          cookie.set("token", data.token);

          if (data.token) router.push("/login");
        }

        if (res.status >= 400) {
          toast({
            description: data.detail || data.mensagem,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.error(err);

        setLogged(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={handleSignup}>
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
              Já tem conta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-6 h-[300px]">
            {/* NOME */}
            <div className="grid gap-2">
              <Label htmlFor="username">Nome</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Seu nome..."
                required
                className="autofill:bg-background"
                disabled={logged || isLoading}
              />
            </div>

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
                disabled={logged || isLoading}
              />
            </div>

            {/* CARGO */}
            <div className="grid gap-2">
              <Label htmlFor="cargo">Cargo</Label>

              <Select name="cargo" required disabled={isLoading}>
                <SelectTrigger className="w-full" color="black">
                  <SelectValue placeholder="Selecionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cargo</SelectLabel>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="diretor">Diretor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                  required
                  minLength={6}
                  disabled={logged || isLoading}
                />
                <Button
                  type="button"
                  size={"sm"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  <SpinnerSvg /> Carregando...
                </>
              ) : (
                "Criar"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
