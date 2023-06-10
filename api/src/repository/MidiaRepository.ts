import { PrismaClient, TipoMidia } from "@prisma/client";
import { AtualizarMidiaRequest, CriarMidiaRequest } from "../controllers/dto/request/MidiaRequest";
import { MidiaMappers } from "../mappers/midias_mappers/MidiaMappers";
import { MidiaPaginadaResponse } from "../controllers/dto/response/MidiaResponse";
import { MidiaUtils } from "../utils/midiaUtils";
import { VerificaTipoMidia } from "../utils/verficaTipoMidia";

const prisma = new PrismaClient();

export class MidiaRepository {
    
    async criarMidia(midia:CriarMidiaRequest) {
        try {
            if(!VerificaTipoMidia.isTipoMidia(midia.tipo_midia)) {
                throw new Error('Tipo de mídia inválido.');
            };
            const conteudoBuffer: Buffer = await MidiaUtils.convertToBuffer(midia.conteudo, midia.tipo_midia);
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
            if (midia !== null) {
                const conteudoFille = MidiaUtils.convertToContentType(midia.conteudo, midia.tipo_midia);
                return MidiaMappers.buscaMidiaToResponse(midia, conteudoFille);
            };
        } catch (error: any) {
            throw new Error(`Não foi possível obter mídia no banco de dados. Erro: ${error.message}.`);
        };
    };

    async atualizarMidia(id: number, midia: AtualizarMidiaRequest) {
        try {
            const dataAtualizacao  = new Date();
            const conteudoBuffer: Buffer = await MidiaUtils.convertToBuffer(midia.conteudo, midia.tipo_midia);
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
                const conteudoFille = MidiaUtils.convertToContentType(midiaAtualizada.conteudo, midiaAtualizada.tipo_midia);
                return MidiaMappers.buscaMidiaToResponse(midiaAtualizada, conteudoFille);
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
            const [totalRegistros, midias] = await Promise.all([
                prisma.midia.count({
                  where: {
                    usuario_id,
                  },
                }),
                prisma.midia.findMany({
                  where: {
                    usuario_id,
                  },
                  skip, // Pule a quantidade de itens calculada
                  take: pageSize, // Defina o número máximo de itens para retornar
                }),
            ]);
            if(midias !== null){
                const midiasPaginadasResponse: MidiaPaginadaResponse = {
                    listaPaginada: [],
                    paginaAtual: page,
                    totalPaginas: Math.ceil(totalRegistros / pageSize),
                    totalRegistros,
                };
                midias.forEach(midia => {
                    const conteudoFille = MidiaUtils.convertToContentType(midia.conteudo, midia.tipo_midia);
                    const midiaResponse = MidiaUtils.mapToMidiaResponse(midia, conteudoFille);
                    midiasPaginadasResponse.listaPaginada.push(midiaResponse);
                });
                return midiasPaginadasResponse;
            };
        } catch (error: any) {
            throw new Error(`Não foi possível listar mídias no banco de dados. Erro: ${error.message}.`);
        };
    };
};