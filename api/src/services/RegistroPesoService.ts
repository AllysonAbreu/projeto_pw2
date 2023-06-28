import { RegistroPesoRepository } from "../repository/RegistroPesoRepository";
import { IAtualizarRegistroPesoRequest } from "../controllers/dto/request/RegistroPesoRequest";

const repository = new RegistroPesoRepository();

export class RegistroPesoService{

    async atualizarPeso(id:number, { peso }: IAtualizarRegistroPesoRequest) {
        try {
            return await  repository.atualizarRegistro(id, {peso });
        } catch (error:any) {
            throw new Error(`Registro com id ${id} não encontrado.\nErro: ${error.message}.`);
        };
    };

    async registrarNovoPeso(id:number, peso:number) {
        try {
            if(peso !== undefined && peso !== null){
                return await  repository.registrarPeso(id, peso);
            } else {
                throw new Error("Erro ao registrar peso. Peso e peso meta não podem ser nulos.");
            };
        } catch (error:any) {
            throw new Error(`Erro ao registrar peso.\nErro: ${error.message}.`);
        };
    };

    async buscarRegistrosPesosByUsuario(id: number, pageSize: number) {
        try {
            return await  repository.buscarRegistrosPesosByUsuarioId(id, pageSize);
        } catch (error:any) {
          throw new Error(`Erro ao buscar registros de peso do usuário com id ${id}.\nErro: ${error.message}.`);  
        };
    };

    async buscarRegistroPesoPorId(id:number) {
        try {
            return await  repository.buscarRegistroPesoById({ id });
        } catch (error:any) {
            throw new Error(`Erro ao buscar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };
    };

    async deletarPeso(id:number) {
        try {
            const registro = await  repository.buscarRegistroPesoById({ id });
            if (registro){
                await  repository.deletarRegistroPeso({id});
            };
        } catch (error:any) {
            throw new Error(`Erro ao deletar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };        
    };
};