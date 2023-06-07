import { File } from "buffer";
import { AtualizarMidiaRequest, CriarMidiaRequest } from "../controllers/dto/request/MidiaRequest";
import { Midia } from "../domain/Midia";
import { TipoMidia } from "../domain/enum/EnumTipoMidia";
import { MidiaRepository } from "../repository/MidiaRepository";
import { VerificaTipoMidia } from "../utils/verficaTipoMidia";
import { MidiaConverter } from "../utils/midiaConverter";

export class MidiaService {
    private repository: MidiaRepository;

    constructor() {
        this.repository = new MidiaRepository();
    };

    async criarMidia(usuario_id: number, nome_arquivo: string, tipo_midia: TipoMidia, conteudo: Express.Multer.File) {
        if(VerificaTipoMidia.isTipoMidia(tipo_midia)) {
            throw new Error('Tipo de mídia inválido.');
        };
        try {
            const midia = new CriarMidiaRequest(usuario_id, nome_arquivo, tipo_midia, conteudo);
            const response = await this.repository.criarMidia(midia);
            return response;
        } catch (error: any) {
            throw new Error(`Não foi possível cadastrar mídia. Erro: ${error.message}.`);
        };
    };

    async obterMidia(id: number) {
        try {
            return await this.repository.obterMidia(id);
        } catch (error: any) {
            throw new Error(`Não foi possível obter mídia. Erro: ${error.message}.`);
        };
    };

    async atualizarMidia(id: number, nome_arquivo: string, tipo_midia: TipoMidia, conteudo: Express.Multer.File) {
        if(VerificaTipoMidia.isTipoMidia(tipo_midia)) {
            throw new Error('Tipo de mídia inválido.');
        };
        try {
            const midia = new AtualizarMidiaRequest(nome_arquivo, tipo_midia, conteudo);
            return await this.repository.atualizarMidia(id, midia);
        } catch (error: any) {
            throw new Error(`Não foi possível atualizar mídia. Erro: ${error.message}.`);
        }
    };
    
    async excluirMidia(id: number) {
        try {
            await this.repository.excluirMidia(id);
        } catch (error: any) {
            throw new Error(`Não foi possível excluir mídia. Erro: ${error.message}.`);
        };
    };
    
    async listarMidias(id: number, page: number, pageSize: number) {
        try {
            return await this.repository.listarMidias(id, page, pageSize);
        } catch (error: any) {
            throw new Error(`Não foi possível listar mídias. Erro: ${error.message}.`);
        };
    };
};