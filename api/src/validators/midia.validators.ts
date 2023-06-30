
export class MidiaValidators{
    static nomeArquivoIsValid(nome_arquivo?:string){
        if(nome_arquivo === null || nome_arquivo === undefined || nome_arquivo === ''){
            throw new Error('Nome do arquivo não pode ser nulo.');
        };
        return true;
    };

    static conteudoIsValid(conteudo?:Buffer){
        if(conteudo === null || conteudo === undefined){
            throw new Error('Conteúdo não pode ser nulo.');
        };
        return true;
    };
};