import { PrismaClient } from "@prisma/client";
import { IId } from "../controllers/dto/request/IdRequest";
import { IAtualizarRegistroPesoRequest } from "../controllers/dto/request/RegistroPesoRequest";

const prisma = new PrismaClient();

export async function buscarRegistroPesoById({ id }: { id: number }) {
    try {
        const registroPeso = await prisma.registroPeso.findFirst({
            where: {
                id,
            },
        });
        if(registroPeso === null){
            throw new Error(`Não há registro de peso com o id:${id}.`);
        } else {
            return registroPeso;
        };
    } catch (error:any) {
        throw new Error(`Erro ao buscar registro de peso no banco de dados com o id:${id}.\nError message:${error.message}.`);
    };
};

export async function buscarRegistrosPesosByUsuarioId({ id }:IId) {
    try {
        const registrosPesos = await prisma.registroPeso.findMany({
            where: {
                usuario_id: id,
            },
        });
        if (registrosPesos.length === 0) {
            throw new Error(`Não há registros de peso para o usuário com id: ${id}.`);
        };
        return registrosPesos;
    } catch (error: any) {
        throw new Error(`Erro ao buscar registros de peso no banco de dados com o id: ${id}.\nError message: ${error.message}.`);
    };
};

export async function registrarPeso({ usuarioId, peso, peso_meta }: { usuarioId: number, peso: number, peso_meta: number }) {
    try {
        const registroPeso = await prisma.registroPeso.create({        
            data: {
                usuario_id: usuarioId,
                peso,
                peso_meta
            },
          });
          return registroPeso;
    } catch (error:any) {
        throw new Error(`Erro ao cadastrar registro de peso: ${error.message}`);     
    };
};

export async function atualizarRegistro({ id, peso, peso_meta }:IAtualizarRegistroPesoRequest) {
    try {
        if (peso === undefined || peso === null) {
            return await atualizarPropriedade({ id, propriedade: 'peso_meta', valor: peso_meta });
        };
        if (peso_meta === undefined || peso_meta === null) {
            return await atualizarPropriedade({ id, propriedade: 'peso', valor: peso });
        };
    } catch (error: any) {
        throw new Error(`Erro ao atualizar registro de peso: ${error.message}`);
    };
};

async function atualizarPropriedade({ id, propriedade, valor }: { id: number; propriedade: string; valor?: number }) {
    try {
      const registroPeso = await prisma.registroPeso.update({
        where: {
          id,
        },
        data: {
          [propriedade]: valor,
        },
      });
      return registroPeso;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar a propriedade '${propriedade}' no banco de dados: ${error.message}`);
    };
};

export async function deletarRegistroPeso({ id }: { id: number }) {
    try {
        const registroPeso = await prisma.registroPeso.delete({
            where: {
                id,
            },
        });
        if(registroPeso){
            return registroPeso;
        };
    } catch (error:any) {
        throw new Error(`Erro ao deletar registro de peso: ${error.message}`);
    };
};