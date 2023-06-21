import { IUsuarioCadastroRequest } from "../controllers/dto/request/UsuarioRequest";
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { DadosAtualizados, EmailUsuario } from "../domain/Usuario";
import { toResponseLogin } from "../mappers/usuarios_mappers/UsuarioLoginMapper";
import { SenhaHash } from "../utils/senhaHashUtil";
import { EmailValidator } from "../validators/email.validators";

const repository = new UsuarioRepository();

export class UsuarioService{

    async atualizarUsuario(id:number, dados:DadosAtualizados) {
        try {
            const dadosAtualizacao = await SenhaHash.atualizaSenhaParaHash(id,dados);
            return await repository.updateUsuario(dadosAtualizacao); 
        } catch (error:any) {
            throw new Error(`Usuário com id ${id} não encontrado.`); 
        };
    };

    async buscarUsuarioPorId(id:number) {
        try {
            return await repository.buscarUsuarioById(id);
        } catch (error:any) {
            throw new Error("Usuário não cadastrado."); 
        };
    };

    async deletarUsuario( {email}:EmailUsuario ) {
        try {
            const user = await repository.buscarUsuarioByEmail(email);
            if (user){
                const id = user.id;
                return await  repository.deleteLogicoUsuario({ id });
            };
        } catch (error:any) {
            throw new Error(`Usuário com email ${email} não cadastrado.\nErro: ${error.message}.`);
        };
    };

    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }:IUsuarioCadastroRequest) {
        try {
            this.usuarioExiste(email);
            const senhaHash = hash(senha, 10);
            return await  repository.cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }, senhaHash);
        } catch (error:any) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        };
    };
    
    async usuarioExiste(email:string) {
        try {
            EmailValidator.emailIsValid(email);
            const user = await  repository.buscarUsuarioByEmail(email);
            if(user) {
                throw new Error(`Usuário já cadastrado com o email ${email}.`);
            };
            return user;
        } catch (error:any) {
          throw new Error(`Erro ao buscar usuário: ${error.message}`);  
        };
    };

    async autenticarUsuarioService(email:string, senha:string) {
        const user = await repository.buscarUsuarioByEmail(email);
        const senhaAtual = user ? user.senha : '';
        const isSenha = await compare(senha, senhaAtual);
        if (!isSenha) {
            throw new Error('Senha está incorreta.');
        };
        if (!user) {
            throw new Error('Usuário não cadastrado.');
        };
        if(!user.is_ativo){
            throw new Error('Usuário inativo.');
        };
        const token = sign({ email }, process.env.CHAVE_JWT!, {
            expiresIn: '1d',
            algorithm: 'HS256',
            subject: String(user.id),
        });
        const response = toResponseLogin(user.id,token);
        return {token, response};
    };
};

