import { TokenBl } from '../domain/TokenBlackList';
import { TokenRepositoy } from '../repository/TokenBlackListRepository';

const repository = new TokenRepositoy();

export class TokenBlackListService {

    async inserirTokenBl( {token}:TokenBl ){
        return await repository.inserirToken({token});
    };

    async buscarTokenBl( {token}:TokenBl ) {
        const tokenBl = await repository.buscarToken({token});
        if(tokenBl){
            throw new Error(`Token já foi utilizado.`);
        };
        await this.inserirTokenBl({token});
        return true;
    };
};