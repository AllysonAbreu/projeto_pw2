import { verificarToken } from '../middlewares/verificarTokenJWT';
import { UsuariosController } from './../controllers/UsuarioController';
import { Router } from "express";

const routesUsuarios = Router();
const controller = new UsuariosController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário.
 *           example: user@provedor.com
 *         senha:
 *           type: string
 *           description: Senha do usuário.
 *           example: 123456
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID do usuário.
 *         token:
 *           type: string
 *           description: Token de autenticação do usuário.
 *     UsuarioResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID do usuário.
 *         nome:
 *           type: string
 *           description: Nome do usuário.
 *         idade:
 *           type: number
 *           description: Idade do usuário.
 *         email:
 *           type: string
 *           description: Email do usuário.
 *         altura:
 *           type: number
 *           description: Altura do usuário.
 *         tempo_meta:
 *           type: number
 *           description: Tempo da meta do usuário.
 *         is_ativo:
 *           type: boolean
 *           description: Indica se o usuário está ativo.
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário.
 *         modificado_em:
 *           type: string
 *           format: date-time
 *           description: Data de modificação do usuário.
*     UsuarioRequest:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do usuário.
 *         idade:
 *           type: number
 *           description: Idade do usuário.
 *         email:
 *           type: string
 *           description: Email do usuário.
 *         senha:
 *           type: string
 *           description: Senha do usuário.
 *         peso:
 *           type: number
 *           description: Peso do usuário.
 *         peso_meta:
 *           type: number
 *           description: Meta de peso do usuário.
 *         altura:
 *           type: number
 *           description: Altura do usuário.
 *         tempo_meta:
 *           type: number
 *           description: Tempo da meta do usuário.
 *         nome_arquivo:
 *           type: string
 *           description: Nome do arquivo de mídia do usuário.
 *         tipo_midia:
 *           type: string
 *           enum: [imagem, video]
 *           description: Tipo de mídia do usuário.
 *         conteudo:
 *           type: string
 *           format: binary
 *           description: Conteúdo do arquivo de mídia.
 */


/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Registra um novo usuário.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       description: Dados do usuário a ser registrado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       '201':
 *         description: Usuário registrado com sucesso.
 *       '400':
 *         description: Erro na requisição.
 */
routesUsuarios.post('/register/user', controller.registrarUsuario);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Efetua o login do usuário.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       description: Dados de autenticação do usuário.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       '400':
 *         description: Erro na requisição.
 */
routesUsuarios.post('/login', controller.login);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Efetua o logout do usuário.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout realizado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 */
routesUsuarios.get('/logout', verificarToken, controller.logout);
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuário retornado com sucesso.
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UsuarioResponse' 
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Usuário não encontrado.
 */
routesUsuarios.get('/usuarios/:id', verificarToken, controller.buscarUsuarioById);
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário a ser atualizado.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados atualizados do usuário.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Usuário não encontrado.
 *       '400':
 *         description: Erro na requisição.
 */
routesUsuarios.put('/usuarios/:id', verificarToken, controller.atualizarUsuario);
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário existente.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário a ser deletado.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Usuário deletado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Não há token válido.
 *       '404':
 *         description: Usuário não encontrado.
 */
routesUsuarios.delete('/usuarios/:id', verificarToken, controller.deletarUsuario);

export {routesUsuarios};