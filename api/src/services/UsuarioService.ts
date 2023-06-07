import { IUsuarioCadastroRequest, IUsuarioLoginRequest } from "../controllers/dto/request/UsuarioRequest";
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { DadosAtualizados, EmailUsuario } from "../domain/Usuario";
import { toResponseLogin } from "../mappers/usuarios_mappers/UsuarioLoginMapper";
import { SenhaHash } from "../utils/senhaHashUtil";

export class UsuariosService{

    private repository: UsuarioRepository;

    constructor(){
        this.repository = new UsuarioRepository();
    };

    async atualizarUsuario(id:number, dados:DadosAtualizados) {
        try {
            const dadosAtualizacao = await SenhaHash.atualizaSenhaParaHash(id,dados);
            return await this.repository.updateUsuario(dadosAtualizacao); 
        } catch (error:any) {
            throw new Error(`Usuário com id ${id} não encontrado.`); 
        };
    };

    async buscarUsuarioPorId(id:number) {
        try {
            return await this.repository.buscarUsuarioById(id);
        } catch (error:any) {
            throw new Error("Usuário não cadastrado."); 
        };
    };

    async deletarUsuario( {email}:EmailUsuario ) {
        try {
            const user = await this.repository.buscarUsuarioByEmail({ email });
            if (user){
                const id = user.id;
                return await this.repository.deleteLogicoUsuario({ id });
            };
        } catch (error:any) {
            throw new Error(`Usuário com email ${email} não cadastrado.\nErro: ${error.message}.`);
        };
    };

    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo }:IUsuarioCadastroRequest) {
        try {
            this.usuarioExiste({ email });
            const senhaHash = hash(senha, 10);
            return await this.repository.cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo }, senhaHash);
        } catch (error:any) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        };
    };
    
    async usuarioExiste({ email }: EmailUsuario) {
        const user = await this.repository.buscarUsuarioByEmail({ email });
        if(user) {
            throw new Error(`Usuário já cadastrado com o email ${email}.`);
        };
        return user;
    };
    
    async buscarUsuarios() {
        const usuarios = await this.repository.buscarUsuarios();
        if (usuarios.length === 0) {
            throw new Error('Não há usuários cadastrados no sistema.');
        };
        return usuarios; 
    };

    async autenticarUsuarioService({ email, senha }: IUsuarioLoginRequest) {
        const user = await this.repository.buscarUsuarioByEmail({ email });
        const senhaAtual = user ? user.senha : '';
        const isSenha = await compare(senha, senhaAtual);
        if (!isSenha) {
            throw new Error('Senha está incorreta.');
        };
        if (!user) {
            throw new Error('Usuário não cadastrado.');
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

