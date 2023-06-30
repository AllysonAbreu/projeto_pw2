import { Usuario } from '@prisma/client';


export function toResponseBusca(Usuario: Usuario, imagem:string) {
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
        imagem,
    };
};

export function toResponseBuscaUserComum(Usuario:Usuario) {
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
