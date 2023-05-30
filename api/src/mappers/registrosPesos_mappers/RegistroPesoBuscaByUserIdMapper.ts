import { ListRegistroPesoBuscaByIdResponse, RegistroPesoBuscaByUserIdResponse } from "../../controllers/dto/response/RegistroPesoBuscaByUserIdResponse";
import { RegistroPeso } from "../../domain/ResgistroPeso";


export function toResponseRegistroPesoByUserId(RegistroPeso: RegistroPeso[]) {
    const listRegistros = new ListRegistroPesoBuscaByIdResponse();
    const registro = new RegistroPesoBuscaByUserIdResponse();

    RegistroPeso.map((registroPeso) => {
        registro.id=registroPeso.id;
        registro.peso=registroPeso.peso;
        registro.criado_em=registroPeso.criado_em;
        registro.modificado_em=registroPeso.modificado_em;
        
        return listRegistros.registrosPeso.push(registro);
    });
    return listRegistros;
};