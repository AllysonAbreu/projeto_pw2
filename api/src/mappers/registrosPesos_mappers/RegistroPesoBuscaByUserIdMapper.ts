import { ListRegistroPesoBuscaByIdResponse, RegistroPesoBuscaByUserIdResponse } from "../../controllers/dto/response/RegistroPesoBuscaByUserIdResponse";
import { RegistroPeso as PrismaRegistroPeso, RegistroPeso } from '@prisma/client';


export function toResponseRegistroPesoByUserId(registrosPeso: PrismaRegistroPeso[]) {
    const listRegistros = new ListRegistroPesoBuscaByIdResponse();

    registrosPeso.forEach((registroPeso) => {
        const registro = new RegistroPesoBuscaByUserIdResponse();
        registro.id=registroPeso.id;
        registro.peso=registroPeso.peso;
        registro.peso_meta=registroPeso.peso_meta;
        registro.criado_em=registroPeso.criado_em;
        registro.modificado_em=registroPeso.modificado_em;
        
        listRegistros.registrosPeso.push(registro);
    });
    return listRegistros;
};

export function toResponseRegistroPeso(registroPeso:PrismaRegistroPeso){
    const registro = new RegistroPesoBuscaByUserIdResponse();
    registro.id=registroPeso.id;
    registro.peso=registroPeso.peso;
    registro.peso_meta=registroPeso.peso_meta;
    registro.criado_em=registroPeso.criado_em;
    registro.modificado_em=registroPeso.modificado_em;
    return registro;
};