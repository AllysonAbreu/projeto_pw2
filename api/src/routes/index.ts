import { Router } from "express";
import { routesUsuarios } from "./routes.usuarios";

const routes = Router();

routes.use(routesUsuarios);


export {routes};