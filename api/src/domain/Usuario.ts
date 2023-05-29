import { Decimal } from "@prisma/client/runtime";

export class Usuario {
    id: number;
    nome: string;
    idade: number;
    email: string;
    senha: string;
    peso: Decimal;
    peso_meta: Decimal;
    altura: Decimal;
    tempo_meta: number;
    is_ativo: boolean;
    criado_em: Date;
    modificado_em: Date;
  
    constructor(
      id: number,
      nome: string,
      idade: number,
      email: string,
      senha: string,
      peso: Decimal,
      peso_meta: Decimal,
      altura: Decimal,
      tempo_meta: number,
      is_ativo: boolean,
      criado_em: Date,
      modificado_em: Date
    ) {
      this.id = id;
      this.nome = nome;
      this.idade = idade;
      this.email = email;
      this.senha = senha;
      this.peso = peso;
      this.peso_meta = peso_meta;
      this.altura = altura;
      this.tempo_meta = tempo_meta;
      this.is_ativo = is_ativo;
      this.criado_em = criado_em;
      this.modificado_em = modificado_em;
    }
  }

  export class EmailUsuario {
    email: string;
  
    constructor(email: string) {
      this.email = email;
    }
  }

  export class AtualizarUsuario {
    id: number;
    dados: DadosAtualizados;

    constructor(id: number, dados: DadosAtualizados) {
      this.id = id;
      this.dados = dados;
    };
  };

  export class DadosAtualizados{
    nome?: string;
    idade?: number;
    email?: string;
    senha?: string;
    altura?: number;
    tempo_meta?: number;
    peso_meta?: number;

    constructor(nome?: string, idade?: number, email?: string, senha?: string, altura?: number, tempo_meta?: number, peso_meta?: number) {
      this.nome = nome;
      this.idade = idade;
      this.email = email;
      this.senha = senha;
      this.altura = altura;
      this.tempo_meta = tempo_meta;
      this.peso_meta = peso_meta;
    };
  };
  