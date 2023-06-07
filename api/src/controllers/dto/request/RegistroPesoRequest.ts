
export interface IAtualizarRegistroPesoRequest {
    peso?: number;
    peso_meta?: number;
};

export class CriarRegistroPesoRequest {
    peso?: number;
    peso_meta?: number;

    constructor(peso?: number, peso_meta?: number) {
        this.peso = peso;
        this.peso_meta = peso_meta;
    };
};
