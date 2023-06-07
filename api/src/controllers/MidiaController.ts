import { Request, Response } from "express";
import { MidiaService } from "../services/MidiaService";

export class MidiaController {

    private service: MidiaService;

    constructor() {
        this.service = new MidiaService();
    };

    async criarMidia(req: Request, res: Response) {
        try {
          const { usuario_id, nome_arquivo, tipo_midia, conteudo } = req.body;
          const response = await this.service.criarMidia(usuario_id, nome_arquivo, tipo_midia, conteudo);
          return res.status(201)
            .json(`Mídia cadastrada com sucesso sob o id ${response}`);
        } catch (error: any) {
          return res.status(400)
            .json({ message: error.message });
        };
    };

    async obterMidia(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const response = await this.service.obterMidia(Number(id));
          if (response) {
            return res.status(200).json(response);
          } else {
            return res.status(404).json({ message: 'Midia não encontrada' });
          };
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };

    async atualizarMidia(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const { nome_arquivo, tipo_midia, conteudo } = req.body;
          const reponse = await this.service.atualizarMidia(Number(id), nome_arquivo, tipo_midia, conteudo);
          return res.status(200).json(reponse);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };
    
    async excluirMidia(req: Request, res: Response) {
        try {
          const { id } = req.params;
          await this.service.excluirMidia(Number(id));
          return res.status(204).send();
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };
    
    async listarMidiasByUserId(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const { page, pageSize } = req.query;
          const midias = await this.service.listarMidias(Number(id), Number(page), Number(pageSize));
          return res.status(200).json(midias);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };
};