import { PrismaClient } from '@prisma/client';
import { AtualizarUsuario, EmailUsuario } from '../domain/Usuario';
import { IUsuarioCadastroRequest } from '../controllers/dto/request/UsuarioRequest';
import { IId } from '../controllers/dto/request/IdRequest';

const prisma = new PrismaClient();

export async function updateUsuario({ id, dados }: AtualizarUsuario) {
    const dataAtualizacao = Date.now();
    return await prisma.usuario.update({
        where: {
            id,
        },
        data: {
            nome: dados.nome,
            idade: dados.idade,
            email: dados.email,
            senha: dados.senha,
            peso_meta: dados.peso_meta,
            altura: dados.altura,
            tempo_meta: dados.tempo_meta,
            modificado_em: new Date(dataAtualizacao),
        },
    });
};

export async function deleteLogicoUsuario({ id }: { id: number }){
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
};

export async function cadastrarUsuario({ nome, idade, email, senha, peso, peso_meta, altura, tempo_meta }:IUsuarioCadastroRequest, senhaHash: Promise<string>) {
    const user =  await prisma.usuario.create({
        data: {
            nome,
            idade,
            email,
            senha: await senhaHash,
            peso,
            peso_meta,
            altura,
            tempo_meta,
        },
    });   
    return user;
};

export async function buscarUsuarioById({ id }:IId) {
  const usuario = await prisma.usuario.findFirst({
    where: {
        id,
    },
  });
    return usuario;  
};

export async function buscarUsuarioByEmail({ email }: EmailUsuario) {
    const usuario = await prisma.usuario.findFirst({
        where: {
            email,
        },
    });
    return usuario;
};

export async function buscarUsuarios() {
    return await prisma.usuario.findMany();    
};
