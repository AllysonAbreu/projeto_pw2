import { Router } from "express";
import { RegistroPesoController } from "../controllers/RegistroPesoController";

const routesRegistroPesos = Router();
const controller = new RegistroPesoController();




export {routesRegistroPesos};