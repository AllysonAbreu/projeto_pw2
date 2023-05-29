import { IUsuarioBuscaRequest } from "../controllers/dto/request/UsuarioRequest";


export function toResponseBuscaById(Usuario: IUsuarioBuscaRequest) {
    return {
        id: Usuario.id,
        nome: Usuario.nome,
        idade: Usuario.idade,
        email: Usuario.idade,
        peso: Usuario.peso,
        peso_meta: Usuario.peso_meta,
        altura: Usuario.altura,
        tempo_meta: Usuario.tempo_meta,
        is_ativo: Usuario.is_ativo,
        criado_em: Usuario.criado_em,
        modificado_em: Usuario.modificado_em,
    };
};