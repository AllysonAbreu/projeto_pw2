import { Request, Response } from "express";
import { IUsuarioCadastroRequest, IUsuarioLoginRequest } from "./dto/request/UsuarioRequest";
import { UsuarioService } from "../services/UsuarioService";
import { TokenBlackListService } from "../services/TokenBlackListService";
import { DadosAtualizados, EmailUsuario } from "../domain/Usuario";
import { SplitToken } from "../utils/splitToken";

const usuarioService = new UsuarioService();
const tokenService = new TokenBlackListService();

export class UsuarioController{

    async login(req: Request, res: Response){
        try {
            const { email, senha } = <IUsuarioLoginRequest>req.body;
            const {token,response} = await usuarioService.autenticarUsuarioService({ email, senha });
            return res.status(200).set('Authorization', token).json({
                response
            });
        } catch (error:any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async logout(req: Request, res: Response) {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                return res.status(403).json({
                    message: 'Não há token.'
                });
            };
            const token = SplitToken.splitToken(bearerToken);
            const isTokenInDb = await tokenService.buscarTokenBl({ token });
            if (isTokenInDb) {
                return res.status(200).json({
                    message: 'Logout realizado.'
                });
            };
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async registrarUsuario(req: Request, res: Response) {
        try {
            const { nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo } = <IUsuarioCadastroRequest>req.body;
            await usuarioService.usuarioExiste({ email });
            const response = await usuarioService.cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo });
            return res.status(201)
                .json({ message:`Usuário cadastrado com sucesso.`,
                        usuario: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
                stack: error.stack
            });
        };
    };

    async deletarUsuario(req: Request, res: Response) {
        try {
            const { email } = <EmailUsuario>req.body;
            await  usuarioService.deletarUsuario({ email });
            return res.status(200).json({
                message: `Usuário removido com sucesso.`
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarUsuarioById(req: Request, res: Response) {
        try { 
            const { id } = req.params;
            const response = await usuarioService.buscarUsuarioPorId(Number(id));
            return res.status(200).json({ usuario: response })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async atualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo } = <DadosAtualizados>req.body;
            const response = await usuarioService.atualizarUsuario(Number(id), { nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo });
            return res.status(200).json({ message: "Usuário atualizado", usuario: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};