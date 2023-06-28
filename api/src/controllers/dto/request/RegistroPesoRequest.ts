
export interface IAtualizarRegistroPesoRequest {
    peso?: number;
};

export class CriarRegistroPesoRequest {
    peso?: number;

    constructor(peso?: number) {
        this.peso = peso;
    };
};
