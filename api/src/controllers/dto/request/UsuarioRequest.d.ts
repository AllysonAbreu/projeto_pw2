export interface IUsuarioCadastroRequest {
    nome: string;
    idade: number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
};

export interface IUsuarioBuscaRequest {
    id: number;
    nome: string;
    idade: number;
    email: string;
    peso: Decimal;
    peso_meta: Decimal;
    altura: Decimal;
    tempo_meta: number;
    is_ativo: boolean;
    criado_em: Date;
    modificado_em: Date;
};

