import { IUsuarioCadastroRequest, IUsuarioLoginRequest } from "../controllers/dto/request/UsuarioRequest";
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { buscarUsuarioByEmail, buscarUsuarioById, buscarUsuarios, cadastrarUsuario, deleteLogicoUsuario, updateUsuario } from "../repository/UsuarioRepository";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "../controllers/dto/request/IdRequest";
import { toResponseBuscaById } from "../mappers/usuarios_mappers/UsuarioBuscaByIdMapper";
import { toResponseLogin } from "../mappers/usuarios_mappers/UsuarioLoginMapper";
import { toResponseCadastro } from "../mappers/usuarios_mappers/UsuarioCadastroMapper";
import { toResponseNovoUsuario, updateUsuarioRequestToObject } from "../mappers/usuarios_mappers/UpdateUsuarioMapper";

export class UsuariosService{
    async atualizarUsuario({ id, dados }: AtualizarUsuario) {
        
        const dadosAtualizacao = await updateUsuarioRequestToObject(new AtualizarUsuario(id, dados));

        const novosDados = await updateUsuario(dadosAtualizacao);

        if(novosDados){
            return toResponseNovoUsuario(novosDados);
        };
        throw new Error(`Usuário com id ${id} não encontrado.`);
    };

    async buscarUsuarioPorId({ id }: IId) {
        try {
            const user = await buscarUsuarioById({ id });
            if (user) {
                return toResponseBuscaById(user);
            };
        } catch (error:any) {
            throw new Error("Usuário não cadastrado."); 
        };
    };

    async deletarUsuario( {email}:EmailUsuario ) {
        try {
            const user = await buscarUsuarioByEmail({ email });
            if (user){
                const id = user.id;
                return await deleteLogicoUsuario({ id });
            };
        } catch (error:any) {
            throw new Error(`Usuário com email ${email} não cadastrado.\nErro: ${error.message}.`);
        };
    };

    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }:IUsuarioCadastroRequest) {
        try {
            this.usuarioExiste({ email });
            const senhaHash = hash(senha, 10);
            const user = await cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }, senhaHash);
            if(user){
                return toResponseCadastro(user);
            };
        } catch (error:any) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        };
    };
    
    async usuarioExiste({ email }: EmailUsuario) {
        const user = await buscarUsuarioByEmail({ email });

        if(user) {
            throw new Error(`Usuário já cadastrado com o email ${email}.`);
        };
        return user;
    };
    
    async buscarUsuarios() {
        const usuarios = await buscarUsuarios();

        if (usuarios.length === 0) {
            throw new Error('Não há usuários cadastrados no sistema.');
        };
        return usuarios; 
    };

    async autenticarUsuarioService({ email, senha }: IUsuarioLoginRequest) {
        const user = await buscarUsuarioByEmail({ email });
        const senhaAtual = user ? user.senha : '';

        const isSenha = await compare(senha, senhaAtual);
        if (!isSenha) {
            throw new Error('Senha está incorreta.');
        };

        if (!user) {
            throw new Error('Usuário não cadastrado.');
        }

        const token = sign({ email }, process.env.CHAVE_JWT!, {
            expiresIn: '1d',
            algorithm: 'HS256',
            subject: String(user.id),
        });

        const response = toResponseLogin(user.id,token);
        return {token, response};
    };
};

