import { verificarToken } from '../middlewares/verificarTokenJWT';
import { UsuariosController } from './../controllers/UsuarioController';
import { Router } from "express";

const routesUsuarios = Router();
const controller = new UsuariosController();

routesUsuarios.post('/login', controller.login);
routesUsuarios.get('/logout', verificarToken, controller.logout);
routesUsuarios.get('/usuarios', verificarToken, controller.buscarTodosUsuarios);
routesUsuarios.get('/usuarios/:id', verificarToken, controller.buscarUsuarioById);
routesUsuarios.post('/usuarios', controller.registrarUsuario);
routesUsuarios.put('/usuarios/:id', verificarToken, controller.atualizarUsuario);
routesUsuarios.delete('/usuarios/:id', verificarToken, controller.deletarUsuario);


export {routesUsuarios};