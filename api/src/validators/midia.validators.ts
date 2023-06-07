
export class MidiaValidators{
    static nomeArquivoIsValid(nome_arquivo?:string){
        if(nome_arquivo === null || nome_arquivo === undefined || nome_arquivo === ''){
            throw new Error('Nome do arquivo não pode ser nulo.');
        };
        return true;
    };

    static tipoMidiaIsValid(tipo_midia?:string){
        if(tipo_midia === null || tipo_midia === undefined || tipo_midia === ''){
            throw new Error('Tipo de mídia não pode ser nulo.');
        };
        return true;
    };

    static conteudoIsValid(conteudo?:Express.Multer.File){
        if(conteudo === null || conteudo === undefined){
            throw new Error('Conteúdo não pode ser nulo.');
        };
        return true;
    };
};