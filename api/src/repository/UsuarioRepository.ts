import { PrismaClient } from '@prisma/client';
import { AtualizarUsuario, EmailUsuario } from '../domain/Usuario';
import { IUsuarioCadastroRequest } from '../controllers/dto/request/UsuarioRequest';
import { toResponseNovoUsuario } from '../mappers/usuarios_mappers/UpdateUsuarioMapper';
import { toResponseBuscaById } from '../mappers/usuarios_mappers/UsuarioBuscaByIdMapper';
import { toResponseCadastro } from '../mappers/usuarios_mappers/UsuarioCadastroMapper';
import { RegistroPesoService } from '../services/RegistroPesoService';
import { MidiaService } from '../services/MidiaService';
import { CriarRegistroPesoRequest } from '../controllers/dto/request/RegistroPesoRequest';

const prisma = new PrismaClient();

export class UsuarioRepository {

    private serviceRegistroPeso: RegistroPesoService;
    private serviceMidia: MidiaService;

    constructor(){
        this.serviceRegistroPeso = new RegistroPesoService();
        this.serviceMidia = new MidiaService();
    };

    async updateUsuario({ id, dados }: AtualizarUsuario) {
        try {
            const dataAtualizacao = Date.now();
            const novosDados =  await prisma.usuario.update({
                where: {
                    id,
                },
                data: {
                    nome: dados.nome,
                    idade: dados.idade,
                    email: dados.email,
                    senha: dados.senha,
                    altura: dados.altura,
                    tempo_meta: dados.tempo_meta,
                    modificado_em: new Date(dataAtualizacao),
                },
            });
            const registroPeso = await this.serviceRegistroPeso.registrarNovoPeso(id, new CriarRegistroPesoRequest(dados.peso, dados.peso_meta));
            const inserirImagem = await this.serviceMidia.criarMidia(id, dados.nome_arquivo, dados.tipo_midia, dados.conteudo);
            if(registroPeso && inserirImagem){
                return toResponseNovoUsuario(novosDados);
            };
        } catch (error:any) {
          throw new Error(`Erro ao atualizar usuário no banco de dados: ${error.message}`);  
        };
    };
    
    async deleteLogicoUsuario({ id }: { id: number }){
        try {
            const dataAtualizacao = Date.now();
            return await prisma.usuario.update({
                where: {
                    id,
                },
                data:{
                    is_ativo: false,
                    modificado_em: new Date(dataAtualizacao),
                }
            });
        } catch (error:any) {
            throw new Error(`Erro ao remover usuário logicamente do banco de dados: ${error.message}`);
        };
    };
    
    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, nome_arquivo, tipo_midia, conteudo }:IUsuarioCadastroRequest, senhaHash: Promise<string>) {
        try {
            const user =  await prisma.usuario.create({
                data: {
                    nome,
                    idade,
                    email,
                    senha: await senhaHash,
                    altura,
                    tempo_meta,
                },
            });
            const registroPeso = await this.serviceRegistroPeso.registrarNovoPeso(user.id,{peso, peso_meta });
            const inserirImagem = await this.serviceMidia.criarMidia(user.id, nome_arquivo, tipo_midia, conteudo);
            if(registroPeso && inserirImagem){
                return toResponseCadastro(user);
            };
        } catch (error:any) {
            throw new Error(`Erro ao cadastrar usuário no banco de dados: ${error.message}`);
        };
    };
    
    async buscarUsuarioById( id:number ) {
        try {
            const usuario = await prisma.usuario.findFirst({
                where: {
                    id,
                },
              });
            if(usuario){
                return toResponseBuscaById(usuario); 
            };
        } catch (error:any) {
          throw new Error(`Erro ao buscar usuário no banco de dados: ${error.message}`);  
        };
    };
    
    async buscarUsuarioByEmail({ email }: EmailUsuario) {
        try {
            const usuario = await prisma.usuario.findFirst({
                where: {
                    email,
                },
            });
            if(usuario){
                return usuario;
            };
        } catch (error:any) {
            throw new Error(`Erro ao buscar usuário no banco de dados: ${error.message}`);
        };
    };
    
    async buscarUsuarios() {
        try {
            return await prisma.usuario.findMany();
        } catch (error:any) {
            throw new Error(`Erro ao buscar usuários no banco de dados: ${error.message}`);  
        };
    };
};
