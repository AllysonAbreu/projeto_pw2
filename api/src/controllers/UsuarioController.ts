import { Request, Response } from "express";
import { IUpdateUsuarioRequest, IUsuarioCadastroRequest, IUsuarioLoginRequest } from "./dto/request/UsuarioRequest";
import { UsuariosService } from "../services/UsuarioService";
import { TokenBlackListService } from "../services/TokenBlackListService";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "./dto/request/IdRequest";
import { splitToken } from "../utils/splitToken";

const usuarioService = new UsuariosService();
const tokenService = new TokenBlackListService();

export class UsuariosController{
    
    async login(req: Request, res: Response){
        try {

            const { email, senha } = <IUsuarioLoginRequest>req.body;

            const {token,response} = await usuarioService.autenticarUsuarioService({ email, senha });

            return res.status(200).set('Authorization', token).json({
                code: 200,
                response
            })
        } catch (error:any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async logout(req: Request, res: Response) {
        try {
            const bearerToken = req.headers.authorization;

            if (!bearerToken) {
                return res.status(403).json({
                    code: 403,
                    message: 'Não há token.'
                });
            };

            const token = splitToken(bearerToken);
            const isTokenInDb = await tokenService.buscarTokenBl({ token });

            if (isTokenInDb) {
                return res.status(200).json({
                    code: 200,
                    message: 'Logout realizado.'
                });
            };

        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async buscarTodosUsuarios(req: Request, res: Response) {
        try {

            const usuarios = await usuarioService.buscarUsuarios();
            return res.status(200).json({ code:200, usuarios });
            
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async registrarUsuario(req: Request, res: Response) {
        try {
            const { nome, idade, email, senha, peso, peso_meta, altura, tempo_meta } = <IUsuarioCadastroRequest>req.body;

            await usuarioService.usuarioExiste({ email });

            const response = await usuarioService.cadastrarUsuario({
                nome, idade, email, senha, peso, peso_meta, altura, tempo_meta
            });

            return res.status(201)
                .json({ code: 201,
                        message:`Usuário cadastrado com sucesso.`,
                        usuario: response });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async deletarUsuario(req: Request, res: Response) {
        try {

            const { email } = <EmailUsuario>req.body;

            await usuarioService.deletarUsuario({ email });

            return res.status(200).json({
                code: 200,
                message: `Usuário removido com sucesso.`
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message
            });
        };
    };

    async buscarUsuarioById(req: Request, res: Response) {
        try { 
            const { id } = <IId><unknown>req.params;

            const response = await usuarioService.buscarUsuarioPorId({ id })

            return res.status(200).json({ code:200, usuario: response })
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async atualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = <IId>(<unknown>req.params);

            const dados = <IUpdateUsuarioRequest>req.body;

            const dadosCopy = { ...dados };

            const response = await usuarioService.atualizarUsuario(new AtualizarUsuario(id, dadosCopy));

            return res.status(200).json({ code:200, message: "Usuário atualizado", usuario: response })
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message
            });
        };
    };
};