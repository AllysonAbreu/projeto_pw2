import { Usuario } from "../../domain/Usuario";

export function toResponseNovoUsuario(usuario:Usuario){
    return {
        id: usuario.id,
        nome: usuario.nome,
        idade: usuario.idade,
        email: usuario.email,
        altura: usuario.altura,
        tempo_meta: usuario.tempo_meta,
        is_ativo: usuario.is_ativo,
        criado_em: usuario.criado_em,
        modificado_em: usuario.modificado_em
    };
};