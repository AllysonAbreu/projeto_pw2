import { PrismaClient } from "@prisma/client";
import { IAtualizarRegistroPesoRequest } from "../controllers/dto/request/RegistroPesoRequest";
import { toResponseRegistroPeso, toResponseRegistroPesoByUserId } from "../mappers/registrosPesos_mappers/RegistroPesoBuscaByUserIdMapper";

const prisma = new PrismaClient();

export class RegistroPesoRepository {

    async buscarRegistroPesoById({ id }: { id: number }) {
        try {
            const registroPeso = await prisma.registroPeso.findFirst({
                where: {
                    id,
                },
            });
            if(registroPeso === null){
                throw new Error(`Não há registro de peso com o id:${id}.`);
            } else {
                return toResponseRegistroPeso(registroPeso);
            };
        } catch (error:any) {
            throw new Error(`Erro ao buscar registro de peso no banco de dados com o id:${id}.\nError message:${error.message}.`);
        };
    };
    
    async buscarRegistrosPesosByUsuarioId(id: number, page: number, pageSize: number) {
        try {
            const [registrosPesos, totalRegistros] = await Promise.all([
                prisma.registroPeso.findMany({
                    where: {
                        usuario_id: id,
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
                prisma.registroPeso.count({
                    where: {
                        usuario_id: id,
                    },
                }),
            ]);
    
            if (registrosPesos.length === 0) {
                throw new Error(`Não há registros de peso para o usuário com id: ${id}.`);
            };
    
            const registrosPesoResponse = toResponseRegistroPesoByUserId(registrosPesos);
            const totalPages = Math.ceil(totalRegistros / pageSize);
    
            return {
                registrosPeso: registrosPesoResponse,
                totalPages,
                pageSize,
                currentPage: page,
            };
        } catch (error: any) {
            throw new Error(`Erro ao buscar registros de peso no banco de dados com o id: ${id}.\nError message: ${error.message}.`);
        };
    };
    
    async registrarPeso(id:number, peso:number ) {
        try {
            const [registroPeso] = await prisma.$transaction([
                prisma.registroPeso.create({        
                    data: {
                        usuario_id: id,
                        peso
                    },
                }),
            ]);
            return toResponseRegistroPeso(registroPeso);
        } catch (error:any) {
            throw new Error(`Erro ao cadastrar registro de peso: ${error.message}`);     
        };
    };
    
    async atualizarRegistro(id:number, { peso }:IAtualizarRegistroPesoRequest) {
        try {
            if (peso === undefined || peso === null) {
                const dados = await this.atualizarPropriedade({ id, propriedade: 'peso', valor: peso });
                return toResponseRegistroPeso(dados);
            };
        } catch (error: any) {
            throw new Error(`Erro ao atualizar registro de peso: ${error.message}`);
        };
    };
    
    async atualizarPropriedade({ id, propriedade, valor }: { id: number; propriedade: string; valor?: number }) {
        try {
          const [registroPeso] = await prisma.$transaction([
            prisma.registroPeso.update({
                where: {
                  id,
                },
                data: {
                  [propriedade]: valor,
                  modificado_em: new Date(Date.now())
                },
              }),
          ]);
          return registroPeso;
        } catch (error: any) {
          throw new Error(`Erro ao atualizar a propriedade '${propriedade}' no banco de dados: ${error.message}`);
        };
    };
    
    async deletarRegistroPeso({ id }: { id: number }) {
        try {
            const [registroPeso] = await prisma.$transaction([
                prisma.registroPeso.delete({
                    where: {
                        id,
                    },
                }),
            ]);
            if(registroPeso){
                return registroPeso;
            };
        } catch (error:any) {
            throw new Error(`Erro ao deletar registro de peso: ${error.message}`);
        };
    };
};