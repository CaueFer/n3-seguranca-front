import { RowData } from "@tanstack/react-table";

export interface IUser {
  _id: string;
  nome: string;
  email: string;
  senhaHash?: string;
  cargo: UCargo;
  chavePublica?: string;
  chavePrivadaCriptografada?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UCargo = "funcionario" | "gerente" | "diretor";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateRow?: (newData: TData) => void;
  }
}

export interface IRelatorio {
  titulo: string;
  descricao: string;
  valor: number;
  data?: string;
  status?: "pendente" | "validado" | "assinado" | "rejeitado";
  criadoPor: string;
  assinaturaDigital?: string | null;
  comprovante?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
