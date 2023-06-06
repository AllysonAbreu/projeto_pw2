import { CriarMidiaRequest } from "../controllers/dto/request/MidiaRequest";
import { Midia } from "../domain/Midia";
import { TipoMidia } from "../domain/enum/EnumTipoMidia";
import { MidiaRepository } from "../repository/MidiaRepository";
import { isTipoMidia } from "../utils/verficaTipoMidia";


export class MidiaService {
    private repository: MidiaRepository;

    constructor() {
        this.repository = new MidiaRepository();
    };

    async criarMidia(usuario_id: number, nome_arquivo: string, tipo_midia: TipoMidia, conteudo: Buffer): Promise<Midia> {
        if(isTipoMidia(tipo_midia)) {
            throw new Error('Tipo de mídia inválido');
        };
        const midia = new CriarMidiaRequest(usuario_id, nome_arquivo, tipo_midia, conteudo);
        const novaMidia = await this.repository.criarMidia(midia);
        return novaMidia;
    };

    async obterMidia(id: number): Promise<Midia | null> {
        // Verificação de permissões
        // ...

        // Busca da mídia no repositório
        const midia = await this.repository.obterMidia(id);
        return midia;
    };

    async atualizarMidia(id: number, nome_arquivo: string, tipo_midia: string, conteudo: Buffer): Promise<Midia> {
        // Validações e regras de negócio
        // ...
    
        const midia = new Midia(usuario_id, nome_arquivo, tipo_midia, conteudo);
        const midiaAtualizada = await this.repository.atualizarMidia(id, midia);
        return midiaAtualizada;
    };
    
    async excluirMidia(id: number): Promise<void> {
        // Validações e regras de negócio
        // ...
    
        await this.repository.excluirMidia(id);
    };
    
    async listarMidias(): Promise<Midia[]> {
        // Validações e regras de negócio
        // ...
    
        const midias = await this.repository.listarMidias();
        return midias;
    };
};