import { TipoMidia } from "../../../domain/enum/EnumTipoMidia";

export class CriarMidiaRequest {
    usuario_id:number;
    nome_arquivo?:string;
    tipo_midia?:TipoMidia;
    conteudo?:Express.Multer.File;

    constructor(usuario_id:number, nome_arquivo?:string, tipo_midia?:TipoMidia, conteudo?:Express.Multer.File) {
        this.usuario_id = usuario_id;
        this.nome_arquivo = nome_arquivo;
        this.tipo_midia = tipo_midia;
        this.conteudo = conteudo;
    };
};

export class AtualizarMidiaRequest {
    nome_arquivo:string;
    tipo_midia:TipoMidia;
    conteudo:Express.Multer.File;

    constructor(nome_arquivo:string, tipo_midia:TipoMidia, conteudo:Express.Multer.File) {
        this.nome_arquivo = nome_arquivo;
        this.tipo_midia = tipo_midia;
        this.conteudo = conteudo;
    };
};