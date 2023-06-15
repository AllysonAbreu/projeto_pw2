import { MidiaValidators } from './../validators/midia.validators';
import { AtualizarMidiaRequest, CriarMidiaRequest } from "../controllers/dto/request/MidiaRequest";
import { MidiaRepository } from "../repository/MidiaRepository";
import { VerificaTipoMidia } from "../utils/verficaTipoMidia";

const repository = new MidiaRepository();

export class MidiaService {

    async criarMidia({usuario_id, nome_arquivo, conteudo}:CriarMidiaRequest) {
        try {
            if(MidiaValidators.nomeArquivoIsValid(nome_arquivo) && MidiaValidators.conteudoIsValid(conteudo)) {
                const req = {usuario_id, nome_arquivo, conteudo};
                const response = await  repository.criarMidia(req);
                return response;
            };
        } catch (error: any) {
            throw new Error(`Não foi possível cadastrar mídia. Erro: ${error.message}.`);
        };
    };

    async obterMidia(id: number) {
        try {
            return await  repository.obterMidia(id);
        } catch (error: any) {
            throw new Error(`Não foi possível obter mídia. Erro: ${error.message}.`);
        };
    };

    async atualizarMidia(id: number, nome_arquivo: string, conteudo: Express.Multer.File) {
        try {
            const midia = new AtualizarMidiaRequest(nome_arquivo, conteudo);
            return await  repository.atualizarMidia(id, midia);
        } catch (error: any) {
            throw new Error(`Não foi possível atualizar mídia. Erro: ${error.message}.`);
        }
    };
    
    async excluirMidia(id: number) {
        try {
            await  repository.excluirMidia(id);
        } catch (error: any) {
            throw new Error(`Não foi possível excluir mídia. Erro: ${error.message}.`);
        };
    };
    
    async listarMidias(id: number, page: number, pageSize: number) {
        try {
            return await  repository.listarMidias(id, page, pageSize);
        } catch (error: any) {
            throw new Error(`Não foi possível listar mídias. Erro: ${error.message}.`);
        };
    };
};