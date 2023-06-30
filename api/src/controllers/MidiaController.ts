import { Request, Response } from "express";
import { MidiaService } from "../services/MidiaService";

const service = new MidiaService();

export class MidiaController {

    async criarMidia(req: Request, res: Response) {
      try {
        const { usuario_id, nome_arquivo } = req.body;
        const parseId = Number(usuario_id);
        const conteudo = req.file?.buffer;

        if (!conteudo) {
          throw new Error("Arquivo de imagem não fornecido.");
        }

        const response = await service.criarMidia({ usuario_id:parseId, nome_arquivo, conteudo });
        return res.status(201).json(`Mídia cadastrada com sucesso sob o id ${response}`);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      };
    };
  
  
    async obterMidia(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const response = await  service.obterMidia(Number(id));
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
          const { nome_arquivo, conteudo } = req.body;
          const reponse = await  service.atualizarMidia(Number(id), nome_arquivo, conteudo);
          return res.status(200).json(reponse);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };
    
    async excluirMidia(req: Request, res: Response) {
        try {
          const { id } = req.params;
          await  service.excluirMidia(Number(id));
          return res.status(204).send();
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };

    async listarMidiaByUserId(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const midias = await service.buscarMidia(Number(id));
        return res.status(200).json(midias);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      };
  };
    
    async listarMidiasByUserId(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const { page, pageSize } = req.query;
          const midias = await  service.listarMidias(Number(id), Number(page), Number(pageSize));
          return res.status(200).json(midias);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        };
    };
};