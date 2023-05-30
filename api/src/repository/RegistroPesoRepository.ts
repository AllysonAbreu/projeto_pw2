import { PrismaClient } from "@prisma/client";
import { IId } from "../controllers/dto/request/IdRequest";

const prisma = new PrismaClient();

export async function buscarRegistroPesoById({ id }: { id: number }) {
    const registroPeso = await prisma.registroPeso.findFirst({
        where: {
            id,
        },
    });
    return registroPeso;
};

export async function buscarRegistrosPesosByUsuarioId({ id }:IId) {
    const registrosPesos = await prisma.registroPeso.findMany({
        where: {
            usuario_id:id,
        },
    });
    return registrosPesos;
};

export async function registrarPeso({ usuarioId, peso }: { usuarioId: number, peso: number }) {
    const registroPeso = await prisma.registroPeso.create({
        data: {
            usuarioId,
            peso,
        },
    });
    return registroPeso;
};

export async function atualizarPeso({ id, peso }: { id: number, peso: number }) {
    const registroPeso = await prisma.registroPeso.update({
        where: {
            id,
        },
        data: {
            peso,
        },
    });
    return registroPeso;
};

export async function deletarRegistroPeso({ id }: { id: number }) {
    const registroPeso = await prisma.registroPeso.delete({
        where: {
            id,
        },
    });
    return registroPeso;
};