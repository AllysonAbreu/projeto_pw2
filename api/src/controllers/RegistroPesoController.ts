import { Request, Response } from "express";
import { RegistroPesoService } from "../services/RegistroPesoService";
import { IAtualizarRegistroPesoRequest } from './dto/request/RegistroPesoRequest';


export class RegistroPesoController {

    private service: RegistroPesoService;

    constructor() {
        this.service = new RegistroPesoService();
    };

    async buscarTodosPesosRegistradosByUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { page, pageSize } = req.query;
            const response = await this.service.buscarRegistrosPesosByUsuario(Number(id), Number(page), Number(pageSize));
            return res.status(200).json({ response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        };
    };

    async registrarPeso(req: Request, res: Response) {
        try {
            const { id, peso, peso_meta } = req.body;
            const response = await this.service.registrarNovoPeso(Number(id),{ peso, peso_meta });
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
            await this.service.deletarPeso(Number(id));
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
            const response = await this.service.buscarRegistroPesoPorId(Number(id));
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
            const dados = <IAtualizarRegistroPesoRequest>req.body;
            const response = await this.service.atualizarPeso( Number(id), { ...dados });
            return res.status(200).json({ message: `Registro atualizado.`, registro: response });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};