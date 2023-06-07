import { MidiaConverter } from "../utils/midiaConverter";
import { MidiaMappers } from "../mappers/midias_mappers/MidiaMappers";
import { TipoMidia } from "../domain/enum/EnumTipoMidia";
import { Midia } from "@prisma/client";

export class MidiaUtils {
    static async convertToBuffer(conteudo: Express.Multer.File, tipoMidia: string): Promise<Buffer> {
        if (tipoMidia.toUpperCase() === TipoMidia.IMAGEM) {
            return await MidiaConverter.convertImageToBuffer(conteudo);
        } else if (tipoMidia.toUpperCase() === TipoMidia.VIDEO) {
            return await MidiaConverter.convertVideoToBuffer(conteudo);
        };
        throw new Error(`Tipo de mídia inválido: ${tipoMidia}`);
    };

    static convertToContentType(conteudo: Buffer, tipoMidia: string): string {
        if (tipoMidia.toUpperCase() === TipoMidia.IMAGEM) {
            return MidiaConverter.convertBufferToImage(conteudo);
        } else if (tipoMidia.toUpperCase() === TipoMidia.VIDEO) {
            return MidiaConverter.convertBufferToVideo(conteudo);
        };
        throw new Error(`Tipo de mídia inválido: ${tipoMidia}`);
    };

    static mapToMidiaResponse(midia: Midia, conteudo: string) {
        if (midia.tipo_midia.toUpperCase() === TipoMidia.IMAGEM) {
            return MidiaMappers.buscaMidiaToResponse(midia, conteudo);
        } else if (midia.tipo_midia.toUpperCase() === TipoMidia.VIDEO) {
            return MidiaMappers.buscaMidiaToResponse(midia, conteudo);
        };
        throw new Error(`Tipo de mídia inválido: ${midia.tipo_midia}`);
    };
};
