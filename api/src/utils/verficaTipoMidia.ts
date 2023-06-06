import { TipoMidia } from "../domain/enum/EnumTipoMidia";

export function isTipoMidia(tipoMida:TipoMidia) {
    return Object.values(TipoMidia).includes(tipoMida);
};