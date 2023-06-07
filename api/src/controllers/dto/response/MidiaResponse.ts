

export class MidiaResponse{
    id: number;
    usuario_id: number;
    nome_arquivo: string;
    tipo_midia: string;
    conteudo: string;
    data_criacao: Date;
    data_atualizacao: Date;

    constructor(id: number, usuario_id: number, nome_arquivo: string, tipo_midia: string, conteudo: string, data_criacao: Date, data_atualizacao: Date) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.nome_arquivo = nome_arquivo;
        this.tipo_midia = tipo_midia;
        this.conteudo = conteudo;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    };
};