import { hash } from "bcrypt";
import { AtualizarUsuario, DadosAtualizados, Usuario } from "../domain/Usuario";

export async function updateUsuarioRequestToObject({id, dados}:AtualizarUsuario) {

    if (typeof dados.senha !== 'undefined') {
        dados.senha = await hash(dados.senha, 10)
    };

    const dadosAtualizados = new DadosAtualizados(dados.nome, dados.idade, dados.email, dados.senha, dados.peso_meta, dados.altura, dados.tempo_meta);

    const usuarioAtualizado = new AtualizarUsuario(id, dadosAtualizados);

    return usuarioAtualizado;
};

export function toResponseNovoUsuario(usuario:Usuario){
    return {
        id: usuario.id,
        nome: usuario.nome,
        idade: usuario.idade,
        email: usuario.email,
        peso: usuario.peso,
        peso_meta: usuario.peso_meta,
        altura: usuario.altura,
        tempo_meta: usuario.tempo_meta,
        is_ativo: usuario.is_ativo,
        criado_em: usuario.criado_em,
        modificado_em: usuario.modificado_em
    };
};