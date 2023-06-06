import { PrismaClient } from "@prisma/client";
import { Midia } from "../domain/Midia";
import { CriarMidiaRequest } from "../controllers/dto/request/MidiaRequest";

const prisma = new PrismaClient();

export class MidiaRepository {
    
    async criarMidia(midia: CriarMidiaRequest): Promise<Midia> {
        const novaMidia = await prisma.midia.create({
            data: {
            usuario_id: midia.usuario_id,
            nome_arquivo: midia.nome_arquivo,
            tipo_midia: midia.tipo_midia,
            conteudo: midia.conteudo,
            },
        });
        return novaMidia;
    };

    async obterMidia(id: number): Promise<Midia | null> {
        const midia = await prisma.midia.findUnique({
            where: {
            id,
            },
        });
        return midia;
    };

    async atualizarMidia(id: number, midia: Midia): Promise<Midia> {
        const midiaAtualizada = await prisma.midia.update({
            where: {
            id,
            },
            data: {
            usuario_id: midia.usuario_id,
            nome_arquivo: midia.nome_arquivo,
            tipo_midia: midia.tipo_midia,
            conteudo: midia.conteudo,
            },
        });
        return midiaAtualizada;
    }

    async excluirMidia(id: number): Promise<void> {
        await prisma.midia.delete({
            where: {
            id,
            },
        });
    };

    async listarMidias(): Promise<Midia[]> {
        const midias = await prisma.midia.findMany();
        return midias;
    };
};