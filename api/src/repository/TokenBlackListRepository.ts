import { PrismaClient } from "@prisma/client";
import { TokenBl } from "../domain/TokenBlackList";

const prisma = new PrismaClient();

export async function inserirToken( {token}:TokenBl ){
        
    await prisma.tokenBlacklist.create({
        data:{
            token
        }
    });
};

export async function buscarToken( {token}:TokenBl ) {
        
    const tokenBl = await prisma.tokenBlacklist.findFirst({
        where:{
            token
        }
    });

    return tokenBl;
};
