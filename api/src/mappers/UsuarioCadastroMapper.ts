import { Usuario } from "../domain/Usuario";

export function toResponseCadastro(Usuario: Usuario) {
    return {
        id: Usuario.id,
        nome: Usuario.nome,
        is_ativo: Usuario.is_ativo,
        criado_em: Usuario.criado_em,
        modificado_em: Usuario.modificado_em
    };
};