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
