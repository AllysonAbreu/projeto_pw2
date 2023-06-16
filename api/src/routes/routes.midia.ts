import { Router } from "express";
import { MidiaController } from "../controllers/MidiaController";
import { verificarToken } from "../middlewares/verificarTokenJWT";


const routesMidias = Router();
const controller = new MidiaController();

/**
 * @swagger
 * components:
 *   schemas:
 *     MidiaResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID da mídia.
 *         usuario_id:
 *           type: number
 *           description: ID do usuário.
 *         nome_arquivo:
 *           type: string
 *           description: Nome do arquivo da mídia.
 *         tipo_midia:
 *           type: string
 *           description: Tipo da mídia.
 *         conteudo:
 *           type: string
 *           description: Conteúdo da mídia.
 *         data_criacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação da mídia.
 *         data_atualizacao:
 *           type: string
 *           format: date-time
 *           description: Data de atualização da mídia.
 *     MidiaRequest:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: number
 *           description: ID do usuário.
 *         nome_arquivo:
 *           type: string
 *           description: Nome do arquivo da mídia.
 *         tipo_midia:
 *           type: string
 *           description: Tipo da mídia.
 *         conteudo:
 *           type: object
 *           description: Arquivo da mídia.
 *       required:
 *         - usuario_id
 *         - nome_arquivo
 *         - tipo_midia
 *         - conteudo
 *     ListaMidiasResponse:
 *       type: object
 *       properties:
 *         listaPaginada:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MidiaResponse'
 *           description: Lista paginada de mídias.
 *         paginaAtual:
 *           type: number
 *           description: Página atual.
 *         totalPaginas:
 *           type: number
 *           description: Total de páginas.
 *         totalRegistros:
 *           type: number
 *           description: Total de registros.
 */


/**
 * @swagger
 * /midias/{id}:
 *   get:
 *     summary: Obtém uma mídia pelo ID.
 *     tags:
 *       - Midias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da mídia.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Mídia obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MidiaResponse'
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Mídia não encontrada.
 */
routesMidias.get('/midias/:id', verificarToken, controller.obterMidia);

/**
 * @swagger
 * /midias:
 *   post:
 *     summary: Cria uma nova mídia.
 *     tags:
 *       - Midias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados da mídia a ser criada.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MidiaRequest'
 *     responses:
 *       '201':
 *         description: Mídia criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MidiaResponse'
 *       '400':
 *         description: Erro na requisição.
 */
routesMidias.post('/midias', verificarToken, controller.criarMidia);
/**
 * @swagger
 * /usuarios/midias/{id}:
 *   put:
 *     summary: Atualiza uma mídia pelo ID.
 *     tags:
 *       - Midias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da mídia.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados da mídia a ser atualizada.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MidiaRequest'
 *     responses:
 *       '200':
 *         description: Mídia atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MidiaResponse'
 *       '400':
 *         description: Erro na requisição.
 *       '404':
 *         description: Mídia não encontrada.
 */
routesMidias.put('/usuarios/midias/:id', verificarToken, controller.atualizarMidia);
/**
 * @swagger
 * /usuarios/midias/{id}:
 *   delete:
 *     summary: Exclui uma mídia pelo ID.
 *     tags:
 *       - Midias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da mídia.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Mídia excluída com sucesso.
 *       '400':
 *         description: Erro na requisição.
 *       '404':
 *         description: Mídia não encontrada.
 */
routesMidias.delete('/usuarios/midias/:id', verificarToken, controller.excluirMidia);
/**
 * @swagger
 *   /usuario/{id}/midias:
 *     get:
 *       summary: Lista todas as mídias de um usuário.
 *       tags:
 *         - Midias
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           description: ID do usuário.
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: page
 *           description: Número da página.
 *           required: true
 *           schema:
 *             type: integer
 *         - in: query
 *           name: pageSize
 *           description: Tamanho da página.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Mídias listadas com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ListaMidiasResponse'
 *         '401':
 *           description: Não autorizado.
 *         '403':
 *           description: Não há token válido.
 *         '404':
 *           description: Usuário não encontrado ou não possui mídias.
 */
routesMidias.get('/usuario/:id/midias', verificarToken, controller.listarMidiasByUserId);

export default routesMidias;