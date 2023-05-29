import { Request, Response } from "express";
import { IUpdateUsuarioRequest, IUsuarioCadastroRequest, IUsuarioLoginRequest } from "./dto/request/UsuarioRequest";
import { UsuariosService } from "../services/UsuarioService";
import { TokenBlackListService } from "../services/TokenBlackListService";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "./dto/request/IdRequest";

const usuarioService = new UsuariosService();
const tokenService = new TokenBlackListService();

export class UsuariosController{
    
    async login(req: Request, res: Response){
        try {

            console.log(req.body);
            const { email, senha } = <IUsuarioLoginRequest>req.body;

            const {token,response} = await usuarioService.autenticarUsuarioService({ email, senha });

            return res.status(200).set('Authorization', token).json({
                code: 200,
                usuario: response
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
            const header = req.headers.authorization;

            if (!header) {
                return res.status(403).json({
                    code: 403,
                    message: 'Não há token.'
                });
            };

            const token = header;

            if (await tokenService.buscarTokenBl({ token })) {
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
                const token = <string>req.headers.authorization;

                if (await tokenService.buscarTokenBl({ token })){
                    const usuarios = await usuarioService.buscarUsuarios();
                    return res.status(200).json({ code:200, usuarios: usuarios });
                };

                return res.status(403).json({
                    code: 403,
                    message: 'Você não tem permissão para acessar essa rota.'
                });
                
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
                        message:`Usuário cadastradro com sucesso.`,
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
            const token = <string>req.headers.authorization;

            await tokenService.buscarTokenBl({ token });

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
            const token = <string>req.headers.authorization;

            await tokenService.buscarTokenBl({ token });

            const { id } = <IId><unknown>req.params;

            const response = await usuarioService.buscarUsuarioPorId({ id })

            return res.status(200).json({ code:200, usuario: response })
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            })
        }
    }

    async atualizarUsuario(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization;

            await tokenService.buscarTokenBl({ token });

            const { id } = <IId>(<unknown>req.params);

            const dados = <IUpdateUsuarioRequest>req.body;

            const dadosCopy = { ...dados };

            const response = await usuarioService.atualizarUsuario(new AtualizarUsuario(id, dadosCopy));

            return res.status(200).json({ code:200, message: "Usuário atualizado", usuario: response })
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message
            })
        } 
    }
};