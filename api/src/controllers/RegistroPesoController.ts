import { Request, Response } from "express";
import { RegistroPesoService } from "../services/RegistroPesoService";
import { IAtualizarRegistroPesoRequest } from './dto/request/RegistroPesoRequest';

const service = new RegistroPesoService();

export class RegistroPesoController {

    async buscarTodosPesosRegistradosByUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { page, pageSize } = req.query;
            const response = await  service.buscarRegistrosPesosByUsuario(Number(id), Number(page), Number(pageSize));
            return res.status(200).json({ response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async registrarPeso(req: Request, res: Response) {
        try {
            const { id, peso } = req.body;
            const response = await  service.registrarNovoPeso(Number(id), peso );
            return res.status(201)
                .json({ message:`Peso registrado com sucesso.`,
                        registro: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async removerRegistro(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await  service.deletarPeso(Number(id));
            return res.status(200).json({
                message: `Registro de peso com id ${id} deletado com sucesso.`
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarRegistroPeso(req: Request, res: Response) {
        try { 
            const { id } = req.params;
            const response = await  service.buscarRegistroPesoPorId(Number(id));
            return res.status(200).json({ registro: response })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async atualizarRegistro(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {peso} = <IAtualizarRegistroPesoRequest>req.body;
            const response = await  service.atualizarPeso( Number(id), Number(peso));
            return res.status(200).json({ message: `Registro atualizado.`, registro: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};