import { IUsuarioCadastroRequest } from "../controllers/dto/request/UsuarioRequest";
import { hash } from 'bcrypt'
import { buscarUsuarioByEmail, buscarUsuarios, cadastrarUsuario, deleteLogicoUsuario, updateUsuario } from "../repository/UsuarioRepository";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "../controllers/dto/request/IdRequest";
import { toResponseCadastro } from "../mappers/usuarios_mappers/UsuarioCadastroMapper";
import { toResponseNovoUsuario, updateUsuarioRequestToObject } from "../mappers/usuarios_mappers/UpdateUsuarioMapper";
import { buscarRegistrosPesosByUsuarioId } from "../repository/RegistroPesoRepository";
import { toResponseRegistroPesoByUserId } from "../mappers/registrosPesos_mappers/RegistroPesoBuscaByUserIdMapper";


export class RegistroPesoService{
    async atualizarUsuario({ id, dados }: AtualizarUsuario) {
        try {
            const dadosAtualizacao = await updateUsuarioRequestToObject(new AtualizarUsuario(id, dados));
            const novosDados = await updateUsuario(dadosAtualizacao);
            if(novosDados){
                return toResponseNovoUsuario(novosDados);
            };    
        } catch (error:any) {
            throw new Error(`Usuário com id ${id} não encontrado.\nErro: ${error.message}.`);
        };
    };

    async buscarRegistrosPesosByUsuario({ id }: IId) {
        try {
            const registros = await buscarRegistrosPesosByUsuarioId({ id });
            if (registros.length > 0) {
                return toResponseRegistroPesoByUserId(registros);
            }
            throw new Error("Usuário não cadastrado.");
        } catch (error:any) {
          throw new Error(`Erro ao buscar registros de peso do usuário com id ${id}.\nErro: ${error.message}.`);  
        };
    };

    async deletarUsuario( {email}:EmailUsuario ) {
        const user = await buscarUsuarioByEmail({ email });
        if (user){
            const id = user.id;
            return await deleteLogicoUsuario({ id });
        }
        throw new Error(`Usuário com email ${email} não cadastrado.`);
    };
    
    async buscarUsuarios() {
        const usuarios = await buscarUsuarios();

        if (usuarios.length === 0) {
            throw new Error('Não há usuários cadastrados no sistema.');
        };
        return usuarios; 
    };
};

