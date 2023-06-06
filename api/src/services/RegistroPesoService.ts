import { IId } from "../controllers/dto/request/IdRequest";
import { RegistroPesoRepository } from "../repository/RegistroPesoRepository";
import { IAtualizarRegistroPesoRequest, ICriarRegistroPesoRequest } from "../controllers/dto/request/RegistroPesoRequest";

const repository = new RegistroPesoRepository();

export class RegistroPesoService{

    async atualizarPeso({ id, peso, peso_meta }: IAtualizarRegistroPesoRequest) {
        try {
            return await repository.atualizarRegistro({ id, peso, peso_meta });   
        } catch (error:any) {
            throw new Error(`Registro com id ${id} não encontrado.\nErro: ${error.message}.`);
        };
    };

    async registrarNovoPeso({ id, peso, peso_meta }:ICriarRegistroPesoRequest) {
        try {
            return await repository.registrarPeso({ usuarioId: id, peso, peso_meta });
        } catch (error:any) {
            throw new Error(`Erro ao registrar peso.\nErro: ${error.message}.`);
        };
    };

    async buscarRegistrosPesosByUsuario({ id }: IId) {
        try {
            return await repository.buscarRegistrosPesosByUsuarioId({ id });
        } catch (error:any) {
          throw new Error(`Erro ao buscar registros de peso do usuário com id ${id}.\nErro: ${error.message}.`);  
        };
    };

    async buscarRegistroPesoPorId({ id }: IId) {
        try {
            return await repository.buscarRegistroPesoById({ id });
        } catch (error:any) {
            throw new Error(`Erro ao buscar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };
    };

    async deletarPeso( {id}:IId ) {
        try {
            const registro = await repository.buscarRegistroPesoById({ id });
            if (registro){
                await repository.deletarRegistroPeso({id});
            };
        } catch (error:any) {
            throw new Error(`Erro ao deletar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };        
    };
};