import { UserLoginResponse } from "../../controllers/dto/response/UsuarioResponse";


export function toResponseLogin(id:number, token:string) {
    return {
        UserLoginResponse: new UserLoginResponse(id, token)
    };
};