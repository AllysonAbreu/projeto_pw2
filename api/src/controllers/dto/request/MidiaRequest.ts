
export class CriarMidiaRequest {
    usuario_id: number;
    nome_arquivo: string;
    conteudo: Buffer;
  
    constructor(usuario_id: number, nome_arquivo: string, conteudo: Buffer) {
      this.usuario_id = usuario_id;
      this.nome_arquivo = nome_arquivo;
      this.conteudo = conteudo;
    }
  }
  

export class AtualizarMidiaRequest {
    nome_arquivo:string;
    conteudo:Express.Multer.File;

    constructor(nome_arquivo:string, conteudo:Express.Multer.File) {
        this.nome_arquivo = nome_arquivo;
        this.conteudo = conteudo;
    };
};