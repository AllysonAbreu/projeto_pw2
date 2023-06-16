import { PrismaClient } from '@prisma/client';
import { AtualizarUsuario, EmailUsuario } from '../domain/Usuario';
import { IUsuarioCadastroRequest } from '../controllers/dto/request/UsuarioRequest';
import { toResponseNovoUsuario } from '../mappers/usuarios_mappers/UpdateUsuarioMapper';
import { toResponseBuscaById } from '../mappers/usuarios_mappers/UsuarioBuscaByIdMapper';
import { toResponseCadastro } from '../mappers/usuarios_mappers/UsuarioCadastroMapper';

const prisma = new PrismaClient();

export class UsuarioRepository {

    async updateUsuario({ id, dados }: AtualizarUsuario) {
        try {
            const [novosDados] =  await prisma.$transaction([
                prisma.usuario.update({
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
                        modificado_em: new Date(Date.now()),
                    },
                }),
            ]);
            return toResponseNovoUsuario(novosDados);
        } catch (error:any) {
          throw new Error(`Erro ao atualizar usuário no banco de dados: ${error.message}`);  
        };
    };
    
    async deleteLogicoUsuario({ id }: { id: number }){
        try {
            return await prisma.$transaction([
                prisma.usuario.update({
                    where: {
                        id,
                    },
                    data:{
                        is_ativo: false,
                        modificado_em: new Date(Date.now()),
                    }
                }),
            ]);
        } catch (error:any) {
            throw new Error(`Erro ao remover usuário logicamente do banco de dados: ${error.message}`);
        };
    };
    
    async cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }:IUsuarioCadastroRequest, senhaHash: Promise<string>) {
        try {
            const [user] =  await prisma.$transaction([
                prisma.usuario.create({
                    data: {
                        nome,
                        idade,
                        email,
                        senha: await senhaHash,
                        altura,
                        tempo_meta,
                        registros_peso: {
                            create: {
                                peso,
                                peso_meta,
                            },
                        },
                    },
                    include: {
                        registros_peso: true,
                    },
                }),
            ]);
            return toResponseCadastro(user);
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
};
