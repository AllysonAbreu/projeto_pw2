import { PrismaClient } from '@prisma/client';
import { AtualizarUsuario } from '../domain/Usuario';
import { IUsuarioCadastroRequest } from '../controllers/dto/request/UsuarioRequest';
import { toResponseNovoUsuario } from '../mappers/usuarios_mappers/UpdateUsuarioMapper';
import { toResponseBusca, toResponseBuscaUserComum } from '../mappers/usuarios_mappers/UsuarioBuscaByIdMapper';
import { toResponseCadastro } from '../mappers/usuarios_mappers/UsuarioCadastroMapper';
import { MidiaUtils } from '../utils/midiaUtils';

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
                        peso_meta: dados.peso_meta,
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
            const dataAtualizacao = Date.now();
            return await prisma.$transaction([
                prisma.usuario.update({
                    where: {
                        id,
                    },
                    data:{
                        is_ativo: false,
                        modificado_em: new Date(dataAtualizacao),
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
                        peso_meta,
                        registros_peso: {
                            create: {
                                peso,
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
                try{
                    const [midia] = await prisma.midia.findMany({
                        where: {
                            usuario_id:usuario.id,
                        }
                    });
                    if (midia !== null) {
                        const conteudoFille = MidiaUtils.convertToContentType(midia.conteudo);
                        return toResponseBusca(usuario, conteudoFille);
                    };
                } catch (error: any) {
                    throw new Error(`Não foi possível obter mídia no banco de dados. Erro: ${error.message}.`);
                };
            };
        } catch (error:any) {
          throw new Error(`Erro ao buscar usuário no banco de dados: ${error.message}`);  
        };
    };
    
    async buscarUsuarioByEmail(email:string) {
        const emailBusca = email;
        try {
            const usuario = await prisma.usuario.findFirst({
                where: {
                    email:emailBusca,
                },
            });
            if(usuario){
                return toResponseBuscaUserComum(usuario);
            };
        } catch (error:any) {
            throw new Error(`Erro ao buscar usuário no banco de dados: ${error.message}`);
        };
    };
};
