import { Request, Response } from "express";
import { IId } from "./dto/request/IdRequest";
import { RegistroPesoService } from "../services/RegistroPesoService";
import { IAtualizarRegistroPesoRequest, ICriarRegistroPesoRequest } from './dto/request/RegistroPesoRequest';

const service = new RegistroPesoService();

export class RegistroPesoController {

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

    async registrarPeso(req: Request, res: Response) {
        try {
            const { id, peso, peso_meta } = <ICriarRegistroPesoRequest>req.body;
            const response = await service.registrarNovoPeso({ id, peso, peso_meta });
            return res.status(201)
                .json({ code: 201,
                        message:`Peso registrado com sucesso.`,
                        registro: response });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async removerRegistro(req: Request, res: Response) {
        try {
            const { id } = <IId>req.body;
            await service.deletarPeso({ id });
            return res.status(200).json({
                code: 200,
                message: `Registro de peso com id ${id} deletado com sucesso.`
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message
            });
        };
    };

    async buscarRegistroPeso(req: Request, res: Response) {
        try { 
            const { id } = <IId><unknown>req.params;
            const response = await service.buscarRegistroPesoPorId({ id });
            return res.status(200).json({ code:200, registro: response })
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        };
    };

    async atualizarRegistro(req: Request, res: Response) {
        try {
            const { id } = <IId>(<unknown>req.params);
            const dados = <IAtualizarRegistroPesoRequest>req.body;
            const { id: idToUpdate, ...dadosCopy } = dados;
            const response = await service.atualizarPeso({ id: idToUpdate, ...dadosCopy });
            return res.status(200).json({ code: 200, message: `Registro atualizado.`, registro: response });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                message: error.message
            });
        };
    };
};