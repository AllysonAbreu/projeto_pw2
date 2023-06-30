import { Request, Response } from "express";
import { IUsuarioCadastroRequest } from "./dto/request/UsuarioRequest";
import { UsuarioService } from "../services/UsuarioService";
import { TokenBlackListService } from "../services/TokenBlackListService";
import { DadosAtualizados, EmailUsuario } from "../domain/Usuario";
import { SplitToken } from "../utils/splitToken";
import { DecodeToken } from "../utils/decodeToken";

const usuarioService = new UsuarioService();
const tokenService = new TokenBlackListService();

export class UsuarioController{

    async login(req: Request, res: Response){
        try {
            const { email, senha } = req.body;
            const {id, token} = await usuarioService.autenticarUsuarioService(email,senha);
            return res.status(200).set('Authorization', token).json({
                id, token
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
            const { nome, idade, email, senha, peso, peso_meta, altura, tempo_meta } = <IUsuarioCadastroRequest>req.body;
            const response = await usuarioService.cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta });
            return res.status(201)
                .json({ message:`Usuário cadastrado com sucesso.`,
                        response });
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
            const { token } = req.params;
            const id = DecodeToken.decodeToken(token);
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
            const { nome, idade, email, senha, altura, tempo_meta, peso_meta } = <DadosAtualizados>req.body;
            const response = await usuarioService.atualizarUsuario(Number(id), { nome, idade, email, senha, altura, tempo_meta, peso_meta });
            return res.status(200).json({ message: "Usuário atualizado", usuario: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};