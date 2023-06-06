
export interface IAtualizarRegistroPesoRequest {
    id: number;
    peso?: number;
    peso_meta?: number;
};

export interface ICriarRegistroPesoRequest {
    id: number;
    peso: number;
    peso_meta: number;
};
