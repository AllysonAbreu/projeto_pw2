import { Usuario } from './Usuario';

export class Midia {
  id: number;
  usuario_id: number;
  nome_arquivo: string;
  conteudo: Buffer;
  criado_em: Date;
  modificado_em: Date;
  usuario: Usuario;

  constructor(
    id: number,
    usuario_id: number,
    nome_arquivo: string,
    conteudo: Buffer,
    criado_em: Date,
    modificado_em: Date,
    usuario: Usuario
  ) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.nome_arquivo = nome_arquivo;
    this.conteudo = conteudo;
    this.criado_em = criado_em;
    this.modificado_em = modificado_em;
    this.usuario = usuario;
  };
};
