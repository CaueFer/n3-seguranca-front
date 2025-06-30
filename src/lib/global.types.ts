interface IUser {
  _id?: string;
  nome: string;
  email: string;
  senhaHash: string;
  cargo: role;
  chavePublica?: string;
  chavePrivadaCriptografada?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type role = 'funcionario' | 'gerente' | 'diretor'