import { hash } from "bcrypt";
import { AtualizarUsuario, DadosAtualizados } from "../domain/Usuario";

export class SenhaHash{
    static async atualizaSenhaParaHash(id:number, dados:DadosAtualizados): Promise<AtualizarUsuario> {
        if (typeof dados.senha !== 'undefined') {
            dados.senha = await hash(dados.senha, 10)
        };
        return new AtualizarUsuario(id, dados);
    };
};