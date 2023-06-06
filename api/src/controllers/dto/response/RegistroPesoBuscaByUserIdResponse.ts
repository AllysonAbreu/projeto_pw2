import { Decimal } from "@prisma/client/runtime/library";

export class RegistroPesoBuscaByUserIdResponse{
    id:number;
    peso:Decimal;
    peso_meta:Decimal;
    criado_em:Date;
    modificado_em:Date;

    constructor(id?: number, peso?: Decimal, peso_meta?: Decimal, criado_em?: Date, modificado_em?: Date) {
        this.id = id || 0;
        this.peso = peso || new Decimal(0);
        this.peso_meta = peso_meta || new Decimal(0);
        this.criado_em = criado_em || new Date();
        this.modificado_em = modificado_em || new Date();
    };
};

export class ListRegistroPesoBuscaByIdResponse{
    registrosPeso:RegistroPesoBuscaByUserIdResponse[];

    constructor(registrosPeso:RegistroPesoBuscaByUserIdResponse[]=[]){
        this.registrosPeso = registrosPeso;
    };
};
