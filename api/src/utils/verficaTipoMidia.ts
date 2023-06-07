import { TipoMidia } from "../domain/enum/EnumTipoMidia";

export class VerificaTipoMidia {
    static isTipoMidia(tipoMida:TipoMidia) {
        return Object.values(TipoMidia).includes(tipoMida);
    };
};