import { TokenBl } from '../domain/TokenBlackList';
import { buscarToken, inserirToken } from '../repository/TokenBlackListRepository';


export class TokenBlackListService {

    async inserirTokenBl( {token}:TokenBl ){
        return await inserirToken({token});
    };

    async buscarTokenBl( {token}:TokenBl ) {
        
        const tokenBl = await buscarToken({token});

        if(tokenBl){
            throw new Error(`Token já foi utilizado.`);
        };
        return true;
    };
};