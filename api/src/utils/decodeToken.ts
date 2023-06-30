import {decode} from 'jsonwebtoken'

interface TokenDecode {
    email:string;
    iat:number;
    exp:number;
    sub:string;
};

export class DecodeToken {
    static decodeToken(token:any):string {
        const tokenDecode = decode(token) as TokenDecode;
        const id =  tokenDecode.sub;
        return id;
    };
};