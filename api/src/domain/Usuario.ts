import { Decimal } from "@prisma/client/runtime";
import { TipoMidia } from "./enum/EnumTipoMidia";

export class Usuario {
    id: number;
    nome: string;
    idade: number;
    email: string;
    senha: string;
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
    nome: string;
    idade: number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
    nome_arquivo: string;
    tipo_midia: TipoMidia;
    conteudo: Express.Multer.File;

    constructor(nome: string, idade: number, email: string, senha: string, peso: number, peso_meta: number, altura: number, tempo_meta: number, nome_arquivo: string, tipo_midia: TipoMidia, conteudo: Express.Multer.File){
      this.nome = nome;
      this.idade = idade;
      this.email = email;
      this.senha = senha;
      this.peso = peso;
      this.peso_meta = peso_meta;
      this.altura = altura;
      this.tempo_meta = tempo_meta;
      this.nome_arquivo = nome_arquivo;
      this.tipo_midia = tipo_midia;
      this.conteudo = conteudo;
    };
  };
  