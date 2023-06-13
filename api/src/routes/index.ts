import { Router } from "express";
import routesUsuarios from "./routes.usuarios";
import routesRegistroPesos from "./routes.registropeso";
import routesMidias from "./routes.midia";

const routes = Router();

routes.use(routesUsuarios);
routes.use(routesRegistroPesos);
routes.use(routesMidias);


export {routes};