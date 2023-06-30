import { Decimal } from "@prisma/client/runtime";

export class UserLoginResponse{
    id: number | null;
    nome: string | null;
    idade: number | null;
    emailResponse: string | null;
    altura: Decimal | null;
    tempo_meta: number | null;
    peso_meta: Decimal | null;
    criado_em: Date | null;
    modificado_em: Date | null;
    token: string | null;

    constructor(id:number | null, nome:string | null, idade:number | null, emailResponse:string | null, altura:Decimal | null, tempo_meta:number | null, peso_meta: Decimal | null, criado_em:Date | null, modificado_em:Date | null, token:string | null){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.emailResponse = emailResponse;
        this.altura = altura;
        this.tempo_meta = tempo_meta;
        this.peso_meta = peso_meta;
        this.criado_em = criado_em;
        this.modificado_em = modificado_em;
        this.token = token;
    };
};