import { PrismaClient } from "@prisma/client";
import { TokenBl } from "../domain/TokenBlackList";

const prisma = new PrismaClient();

export class TokenRepositoy {

    async inserirToken( {token}:TokenBl ){
        await prisma.tokenBlacklist.create({
            data:{
                token
            }
        });
    };
    
    async buscarToken( {token}:TokenBl ) {
        const tokenBl = await prisma.tokenBlacklist.findFirst({
            where:{
                token
            }
        });
        return tokenBl;
    };
};