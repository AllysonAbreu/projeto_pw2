import { Midia } from "@prisma/client";
import { MidiaResponse } from "../../controllers/dto/response/MidiaResponse";

export class MidiaMappers {

    static buscaMidiaToResponse(midia: Midia, conteudoFille: string) {
        return new MidiaResponse(
            midia?.id,
            midia?.usuario_id,
            midia?.nome_arquivo,
            conteudoFille,
            midia?.criado_em,
            midia?.modificado_em
        );
    };

    static cadastroMidiaResponse(midia:Midia) {
        return midia.id;    
    };

};

