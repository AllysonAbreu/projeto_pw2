import { Usuario } from "@prisma/client";
import { UserLoginResponse } from "../../controllers/dto/response/UsuarioResponse";


export function toResponseLogin(usuario:Usuario, token:string) {
    const loginUser =  new UserLoginResponse(
        usuario.id,
        usuario.nome,
        usuario.idade,
        usuario.email,
        usuario.altura,
        usuario.tempo_meta,
        usuario.peso_meta,
        usuario.criado_em,
        usuario.modificado_em, 
        token);
    return {...loginUser};
};