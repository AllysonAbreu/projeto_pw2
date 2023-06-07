import { PrismaClient } from "@prisma/client";
import { Midia } from "../domain/Midia";
import { CriarMidiaRequest, AtualizarMidiaRequest } from "../controllers/dto/request/MidiaRequest";
import { MidiaMappers } from "../mappers/midias_mappers/MidiaMappers";
import { TipoMidia } from "../domain/enum/EnumTipoMidia";
import { MidiaConverter } from "../utils/midiaConverter";

const prisma = new PrismaClient();

export class MidiaRepository {
    
    async criarMidia(midia: CriarMidiaRequest) {
        try {
            let conteudoBuffer: Buffer = Buffer.from("");
            if(midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
                conteudoBuffer = await MidiaConverter.convertImageToBuffer(midia.conteudo);
            } else if(midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
                conteudoBuffer = await MidiaConverter.convertVideoToBuffer(midia.conteudo);
            };
            const novaMidia = await prisma.midia.create({
                data: {
                    usuario_id: midia.usuario_id,
                    nome_arquivo: midia.nome_arquivo,
                    tipo_midia: midia.tipo_midia,
                    conteudo: conteudoBuffer,
                },
            });
            return MidiaMappers.cadastroMidiaResponse(novaMidia);
        } catch (error: any) {
            throw new Error(`Não foi possível cadastrar mídia no banco de dados. Erro: ${error.message}.`);
        };
    };

    async obterMidia(id: number) {
        try {
            const midia = await prisma.midia.findUnique({
                where: {
                    id,
                },
            });
            if(midia !== null){
                let conteudoFille: string;
                if(midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
                    conteudoFille = MidiaConverter.convertBufferToImage(midia.conteudo);
                    return MidiaMappers.buscaMidiaToResponse(midia,conteudoFille);
                } else if(midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
                    conteudoFille = MidiaConverter.convertBufferToVideo(midia.conteudo);
                    return MidiaMappers.buscaMidiaToResponse(midia,conteudoFille);
                };
            };
        } catch (error: any) {
            throw new Error(`Não foi possível obter mídia no banco de dados. Erro: ${error.message}.`);
        };
    };

    async atualizarMidia(id: number, midia: AtualizarMidiaRequest) {
        try {
            const dataAtualizacao  = new Date();
            let conteudoBuffer: Buffer = Buffer.from("");
            if(midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
                conteudoBuffer = await MidiaConverter.convertImageToBuffer(midia.conteudo);
            } else if(midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
                conteudoBuffer = await MidiaConverter.convertVideoToBuffer(midia.conteudo);
            };
            const midiaAtualizada = await prisma.midia.update({
                where: {
                    id,
                },
                data: {
                    nome_arquivo: midia.nome_arquivo,
                    tipo_midia: midia.tipo_midia,
                    conteudo: conteudoBuffer,
                    modificado_em: dataAtualizacao,
                },
            });
            if(midiaAtualizada !== null){
                let conteudoFille: string;
                if(midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
                    conteudoFille = MidiaConverter.convertBufferToImage(midiaAtualizada.conteudo);
                    return MidiaMappers.buscaMidiaToResponse(midiaAtualizada,conteudoFille);
                } else if(midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
                    conteudoFille = MidiaConverter.convertBufferToVideo(midiaAtualizada.conteudo);
                    return MidiaMappers.buscaMidiaToResponse(midiaAtualizada,conteudoFille);
                };
            };
        } catch (error: any) {
            throw new Error(`Não foi possível atualizar mídia no banco de dados. Erro: ${error.message}.`);
        };
    };

    async excluirMidia(id: number){
        try {
            await prisma.midia.delete({
                where: {
                    id,
                },
            });
        } catch (error: any) {
            throw new Error(`Não foi possível excluir mídia no banco de dados. Erro: ${error.message}.`);
        };
    };

    async listarMidias(usuario_id: number, page: number, pageSize: number) {
        try {
            // Calcule a quantidade de itens para ignorar (pular) com base na página e no tamanho da página
            const skip = (page - 1) * pageSize;
            const midias = await prisma.midia.findMany({
                where: {
                    usuario_id,
                },
                skip, // Pule a quantidade de itens calculada
                take: pageSize, // Defina o número máximo de itens para retornar
            });
            if(midias !== null){
                let conteudoFille: string;
                midias.forEach(midia => {
                    if(midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
                        conteudoFille = MidiaConverter.convertBufferToImage(midiaAtualizada.conteudo);
                        return MidiaMappers.buscaMidiaToResponse(midiaAtualizada,conteudoFille);
                    } else if(midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
                        conteudoFille = MidiaConverter.convertBufferToVideo(midiaAtualizada.conteudo);
                        return MidiaMappers.buscaMidiaToResponse(midiaAtualizada,conteudoFille);
                    };
                });
            };
        } catch (error: any) {
            throw new Error(`Não foi possível listar mídias no banco de dados. Erro: ${error.message}.`);
        };
    };
};