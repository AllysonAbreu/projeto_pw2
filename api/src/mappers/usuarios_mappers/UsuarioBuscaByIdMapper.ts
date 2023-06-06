import { Usuario } from "../../domain/Usuario";


export function toResponseBuscaById(Usuario: Usuario) {
    return {
        id: Usuario.id,
        nome: Usuario.nome,
        idade: Usuario.idade,
        email: Usuario.idade,
        altura: Usuario.altura,
        tempo_meta: Usuario.tempo_meta,
        is_ativo: Usuario.is_ativo,
        criado_em: Usuario.criado_em,
        modificado_em: Usuario.modificado_em,
    };
};