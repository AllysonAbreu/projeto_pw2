import { IUsuarioCadastroRequest, IUsuarioLoginRequest } from "../controllers/dto/request/UsuarioRequest";
import { compare, hash } from 'bcrypt'
import { buscarUsuarioByEmail, buscarUsuarioById, buscarUsuarios, cadastrarUsuario, deleteLogicoUsuario, updateUsuario } from "../repository/UsuarioRepository";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "../controllers/dto/request/IdRequest";
import { toResponseBuscaById } from "../mappers/UsuarioBuscaByIdMapper";
import { toResponseCadastro } from "../mappers/UsuarioCadastroMapper";
import { toResponseNovoUsuario, updateUsuarioRequestToObject } from "../mappers/usuarios_mappers/UpdateUsuarioMapper";
import { buscarRegistrosPesosByUsuarioId } from "../repository/RegistroPesoRepository";
import { toResponseRegistroPesoByUserId } from "../mappers/registrosPesos_mappers/RegistroPesoBuscaByUserIdMapper";


export class RegistroPesoService{
    async atualizarUsuario({ id, dados }: AtualizarUsuario) {
        
        const dadosAtualizacao = await updateUsuarioRequestToObject(new AtualizarUsuario(id, dados));

        const novosDados = await updateUsuario(dadosAtualizacao);

        if(novosDados){
            return toResponseNovoUsuario(novosDados);
        };
        throw new Error(`Usuário com id ${id} não encontrado.`);
    }

    async buscarRegistrosPesosByUsuario({ id }: IId) {
        const registros = await buscarRegistrosPesosByUsuarioId({ id });
        if (registros) {
            return toResponseRegistroPesoByUserId(registros);
        };
        throw new Error("Usuário não cadastrado.");
    };

    async deletarUsuario( {email}:EmailUsuario ) {
        const user = await buscarUsuarioByEmail({ email });
        if (user){
            const id = user.id;
            return await deleteLogicoUsuario({ id });
        }
        throw new Error(`Usuário com email ${email} não cadastrado.`);
    };

    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }:IUsuarioCadastroRequest) {        
        this.usuarioExiste({ email });
        const senhaHash = hash(senha, 10);
        const user = await cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }, senhaHash);
        return toResponseCadastro(user);
    };
    
    async buscarUsuarios() {
        const usuarios = await buscarUsuarios();

        if (usuarios.length === 0) {
            throw new Error('Não há usuários cadastrados no sistema.');
        };
        return usuarios; 
    };


};

