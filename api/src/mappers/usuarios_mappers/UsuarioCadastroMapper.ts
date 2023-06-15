import { Usuario } from "../../domain/Usuario";

export function toResponseCadastro(Usuario: Usuario) {
    return {
        is_ativo: Usuario.is_ativo,
        criado_em: Usuario.criado_em
    };
};