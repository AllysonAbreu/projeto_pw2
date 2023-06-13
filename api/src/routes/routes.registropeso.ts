import { Router } from "express";
import { RegistroPesoController } from "../controllers/RegistroPesoController";
import { verificarToken } from "../middlewares/verificarTokenJWT";

const routesRegistroPesos = Router();
const controller = new RegistroPesoController();

/**
 * @swagger
 * components:
 *   schemas:
 *     BuscarPesoRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Número da página.
 *         pageSize:
 *           type: integer
 *           description: Tamanho da página.
 *       required:
 *         - page
 *         - pageSize
 *
 *     RegistroPesoBuscaByUserIdResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do registro de peso.
 *         peso:
 *           type: number
 *           description: Peso registrado.
 *         peso_meta:
 *           type: number
 *           description: Meta de peso.
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro.
 *         modificado_em:
 *           type: string
 *           format: date-time
 *           description: Data de modificação do registro.
 *       required:
 *         - id
 *         - peso
 *         - peso_meta
 *         - criado_em
 *         - modificado_em
 *
 *     ListRegistroPesoBuscaByIdResponse:
 *       type: object
 *       properties:
 *         registrosPeso:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RegistroPesoBuscaByUserIdResponse'
 *       required:
 *         - registrosPeso
 *
 *     BuscarPesoResponse:
 *       type: object
 *       properties:
 *         registrosPeso:
 *           $ref: '#/components/schemas/ListRegistroPesoBuscaByIdResponse'
 *         totalPages:
 *           type: integer
 *           description: Total de páginas.
 *         pageSize:
 *           type: integer
 *           description: Tamanho da página.
 *         currentPage:
 *           type: integer
 *           description: Página atual.
 *       required:
 *         - registrosPeso
 *         - totalPages
 *         - pageSize
 *         - currentPage
 *
 *     RegistroPesoRequest:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID do usuário.
 *              peso:
 *                  type: number
 *                  description: Peso do usuário.
 *              peso_meta:
 *                  type: number
 *                  description: Meta de peso do usuário.
 */

/**
 * @swagger
 * /usuario/{id}/pesos:
 *   get:
 *     summary: Retorna todos os pesos registrados de um usuário.
 *     tags:
 *       - Registros de Peso
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: Número da página para paginação.
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         description: Tamanho da página para paginação.
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pesos registrados retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuscarPesoResponse'
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Usuário não encontrado.
 */
routesRegistroPesos.get('/usuario/:id/pesos', verificarToken, controller.buscarTodosPesosRegistradosByUsuario);

/**
 * @swagger
 * /pesos/{id}:
 *   get:
 *     summary: Retorna um registro de peso pelo ID.
 *     tags:
 *       - Registros de Peso
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do registro de peso.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Registro de peso retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroPesoBuscaByUserIdResponse'
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Registro de peso não encontrado.
 */
routesRegistroPesos.get('/pesos/:id', verificarToken, controller.buscarRegistroPeso);

/**
 * @swagger
 * /pesos:
 *   post:
 *     summary: Registra um novo peso.
 *     tags:
 *       - Registros de Peso
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do registro de peso a ser registrado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroPesoRequest'
 *     responses:
 *       '201':
 *         description: Registro de peso criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroPesoBuscaByUserIdResponse'
 *       '400':
 *         description: Erro na requisição.
 */
routesRegistroPesos.post('/pesos', verificarToken, controller.registrarPeso);


/**
 * @swagger
 * /usuarios/pesos/{id}:
 *   put:
 *     summary: Atualiza um registro de peso existente.
 *     tags:
 *       - Registros de Peso
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do registro de peso a ser atualizado.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados atualizados do registro de peso.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroPesoRequest'
 *     responses:
 *       '200':
 *         description: Registro de peso atualizado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Registro de peso não encontrado.
 */
routesRegistroPesos.put('/usuarios/pesos/:id', verificarToken, controller.atualizarRegistro);

/**
 * @swagger
 * /usuarios/pesos/{id}:
 *   delete:
 *     summary: Remove um registro de peso existente.
 *     tags:
 *       - Registros de Peso
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do registro de peso a ser removido.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Registro de peso removido com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Registro de peso não encontrado.
 */
routesRegistroPesos.delete('/usuarios/pesos/:id', verificarToken, controller.removerRegistro);

export default routesRegistroPesos;