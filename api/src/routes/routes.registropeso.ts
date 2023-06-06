import { Router } from "express";
import { RegistroPesoController } from "../controllers/RegistroPesoController";
import { verificarToken } from "../middlewares/verificarTokenJWT";

const routesRegistroPesos = Router();
const controller = new RegistroPesoController();


routesRegistroPesos.get('usuario/:id/pesos', verificarToken, controller.buscarTodosPesosRegistradosByUsuario);
routesRegistroPesos.get('pesos/:id', verificarToken, controller.buscarRegistroPeso);
routesRegistroPesos.post('pesos', verificarToken, controller.registrarPeso);
routesRegistroPesos.put('usuarios/pesos/:id', verificarToken, controller.atualizarRegistro);
routesRegistroPesos.delete('usuarios/pesos/:id', verificarToken, controller.removerRegistro);

export {routesRegistroPesos};