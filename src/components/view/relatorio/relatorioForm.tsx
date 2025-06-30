"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postForm } from "@/lib/helpers/fetch.helper";
import { useToast } from "@/lib/hooks/use-toast";

const relatorioSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z
    .number({ invalid_type_error: "Valor é obrigatório" })
    .positive("Valor deve ser maior que zero"),
  comprovante: z
    .any()
    .refine(
      (file) => !file || (file && file.length > 0),
      "Arquivo obrigatório"
    ),
});

type RelatorioFormValues = z.infer<typeof relatorioSchema>;

export default function RelatorioForm() {
  const { toast } = useToast();

  const form = useForm<RelatorioFormValues>({
    resolver: zodResolver(relatorioSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      valor: undefined,
      comprovante: undefined,
    },
  });

  async function onSubmit(data: RelatorioFormValues) {
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("descricao", data.descricao);
      formData.append("valor", data.valor.toString());
      if (data.comprovante && data.comprovante.length > 0) {
        formData.append("comprovante", data.comprovante[0]);
      }

      console.log(formData);
      const res = await postForm("/relatorios", formData);

      if (!res.ok) {
        const data = await res.json();
        // console.error(data);

        toast({
          description: data.mensagem || "Ocorreu um erro.",
          variant: "destructive",
        });

        return;
      }

      toast({
        description: "Relatório criado com sucesso!",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        description: "Ocorreu um erro.",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto p-4"
      >
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite a descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  placeholder="Digite o valor"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comprovante"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comprovante (arquivo)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="block w-full h-12 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-primary-700
                    hover:file:bg-indigo-100 cursor-pointer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enviar Relatório
        </Button>
      </form>
    </Form>
  );
}
