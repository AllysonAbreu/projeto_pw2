import { Router } from "express";
import { MidiaController } from "../controllers/MidiaController";
import { verificarToken } from "../middlewares/verificarTokenJWT";


const routesMidias = Router();
const controller = new MidiaController();


routesMidias.get('/midias/:id', verificarToken, controller.obterMidia);
routesMidias.post('/midias', verificarToken, controller.criarMidia);
routesMidias.put('/midias/:id', verificarToken, controller.atualizarMidia);
routesMidias.delete('/midias/:id', verificarToken, controller.excluirMidia);
routesMidias.get('/midias/usuario/:id', verificarToken, controller.listarMidiasByUserId);

export {routesMidias};