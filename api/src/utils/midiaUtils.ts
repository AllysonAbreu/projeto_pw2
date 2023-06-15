import { MidiaConverter } from "../utils/midiaConverter";
import { MidiaMappers } from "../mappers/midias_mappers/MidiaMappers";
import { Midia } from "@prisma/client";

export class MidiaUtils {
    static async convertToBuffer(conteudo: Express.Multer.File): Promise<Buffer> {
        if (conteudo !== null && conteudo !== undefined) {
            return await MidiaConverter.convertImageToBuffer(conteudo);
        };     
        throw new Error(`Conteúdo de mídia inválido: ${conteudo}`);
    };

    static convertToContentType(conteudo: Buffer): string {
        if (conteudo !== null && conteudo !== undefined) {
            return MidiaConverter.convertBufferToImage(conteudo);
        };
        throw new Error(`Conteúdo de mídia inválido: ${conteudo}`);
    };

    static mapToMidiaResponse(midia: Midia, conteudo: string) {
        if (conteudo !== null && conteudo !== undefined) {
            return MidiaMappers.buscaMidiaToResponse(midia, conteudo);
        };
        throw new Error(`Conteúdo de mídia inválido: ${conteudo}`);
    };
};
