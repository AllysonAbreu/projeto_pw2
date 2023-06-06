import { Router } from "express";
import { routesUsuarios } from "./routes.usuarios";
import { routesRegistroPesos } from "./routes.registropeso";

const routes = Router();

routes.use(routesUsuarios);
routes.use(routesRegistroPesos);


export {routes};