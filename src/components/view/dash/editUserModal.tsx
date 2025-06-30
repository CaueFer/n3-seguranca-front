// EditUserDialog.tsx
"use client";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputs/input";

import { IUser, UCargo } from "@/lib/global.types";
import { useToast } from "@/lib/hooks/use-toast";
import { put } from "@/lib/helpers/fetch.helper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  user: IUser;
  onUpdated: (user: IUser) => void;
}

export function EditUserDialog({ user, onUpdated }: Props) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      _id: user._id,
      nome: user.nome,
      email: user.email,
      cargo: user.cargo,
    },
  });

  const editFuncionario = async (user: IUser) => {
    put("/funcionarios/" + user._id, {
      nome: user.nome,
      email: user.email,
      cargo: user.cargo,
    })
      .then(async (res: Response) => {
        const data = await res.json();

        toast({
          description: data.mensagem || "Atualizado com sucesso!",
          variant: "default",
        });
        onUpdated(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative flex cursor-pointer select-none items-center gap-2 w-full rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0">
          <Pencil /> Editar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit(editFuncionario)}>
          <div className="grid gap-3">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" {...register("nome", { required: true })} />
            {errors.nome && (
              <span className="text-destructive text-xs">Nome obrigatório</span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">E‑mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-destructive text-xs">
                E‑mail obrigatório
              </span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="cargo">Cargo</Label>

            <Select
              defaultValue={user.cargo}
              onValueChange={(value) => setValue("cargo", value as UCargo)}
            >
              <SelectTrigger id="cargo">
                <SelectValue placeholder="Selecione o cargo" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem
                  className="cursor-pointer hover:bg-primary/80"
                  value="diretor"
                >
                  Diretor
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-primary/80"
                  value="gerente"
                >
                  Gerente
                </SelectItem>
                <SelectItem className="cursor-pointer " value="funcionario">
                  Funcionário
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.cargo && (
              <span className="text-destructive text-xs">
                Cargo obrigatório
              </span>
            )}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="text-black" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
