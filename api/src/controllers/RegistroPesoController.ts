import { RegistroPeso } from './../domain/ResgistroPeso';
import { Request, Response } from "express";
import { IUpdateUsuarioRequest, IUsuarioCadastroRequest, IUsuarioLoginRequest } from "./dto/request/UsuarioRequest";
import { UsuariosService } from "../services/UsuarioService";
import { TokenBlackListService } from "../services/TokenBlackListService";
import { AtualizarUsuario, EmailUsuario } from "../domain/Usuario";
import { IId } from "./dto/request/IdRequest";
import { splitToken } from "../utils/splitToken";
import { RegistroPesoService } from "../services/RegistroPesoService";

const service = new RegistroPesoService();

export class RegistroPesoController{

    async buscarTodosPesosRegistradosByUsuario(req: Request, res: Response) {
        try {
            const { id } = <IId><unknown>req.params;
            const response = await service.buscarRegistrosPesosByUsuario({ id });
            return res.status(200).json({ code:200, response });
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