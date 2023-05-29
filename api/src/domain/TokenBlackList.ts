
export class TokenBlackList{
    id: number;
    token: string;
    criado_em: Date;

    constructor(
      id: number,
      token: string,
      criado_em: Date,
    ) {
      this.id = id;
      this.token = token;
      this.criado_em = criado_em;
    };
};

export class TokenBl{
    token: string;

    constructor(
      token: string,
    ) {
      this.token = token;
    };
}