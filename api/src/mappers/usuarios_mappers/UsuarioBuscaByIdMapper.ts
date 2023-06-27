import { Usuario } from "../../domain/Usuario";


export function toResponseBusca(Usuario: Usuario) {
    return {
        id: Usuario.id,
        nome: Usuario.nome,
        idade: Usuario.idade,
        email: Usuario.email,
        senha: Usuario.senha,
        altura: Usuario.altura,
        tempo_meta: Usuario.tempo_meta,
        peso_meta: Usuario.peso_meta,
        is_ativo: Usuario.is_ativo,
        criado_em: Usuario.criado_em,
        modificado_em: Usuario.modificado_em,
    };
};