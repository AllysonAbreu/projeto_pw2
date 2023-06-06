import { IId } from "../controllers/dto/request/IdRequest";
import { atualizarRegistro, buscarRegistroPesoById, buscarRegistrosPesosByUsuarioId, deletarRegistroPeso, registrarPeso } from "../repository/RegistroPesoRepository";
import { toResponseRegistroPesoByUserId, toResponseRegistroPeso } from "../mappers/registrosPesos_mappers/RegistroPesoBuscaByUserIdMapper";
import { IAtualizarRegistroPesoRequest, ICriarRegistroPesoRequest } from "../controllers/dto/request/RegistroPesoRequest";

export class RegistroPesoService{
    async atualizarPeso({ id, peso, peso_meta }: IAtualizarRegistroPesoRequest) {
        try {
            const novosDados = await atualizarRegistro({ id, peso, peso_meta });
            if(novosDados){
                return toResponseRegistroPeso(novosDados);
            };    
        } catch (error:any) {
            throw new Error(`Registro com id ${id} não encontrado.\nErro: ${error.message}.`);
        };
    };

    async registrarNovoPeso({ id, peso, peso_meta }:ICriarRegistroPesoRequest) {
        try {
            const registro = await registrarPeso({ usuarioId: id, peso, peso_meta });
            if (registro) {
                return toResponseRegistroPeso(registro);
            };
        } catch (error:any) {
            throw new Error(`Erro ao registrar peso.\nErro: ${error.message}.`);
        };
    };

    async buscarRegistrosPesosByUsuario({ id }: IId) {
        try {
            const registros = await buscarRegistrosPesosByUsuarioId({ id });
            if (registros.length > 0) {
                return toResponseRegistroPesoByUserId(registros);
            }
            throw new Error("Usuário não cadastrado.");
        } catch (error:any) {
          throw new Error(`Erro ao buscar registros de peso do usuário com id ${id}.\nErro: ${error.message}.`);  
        };
    };

    async buscarRegistroPesoPorId({ id }: IId) {
        try {
            const registro = await buscarRegistroPesoById({ id });
            if (registro) {
                return toResponseRegistroPeso(registro);
            };
        } catch (error:any) {
            throw new Error(`Erro ao buscar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };
    };

    async deletarPeso( {id}:IId ) {
        try {
            const registro = await buscarRegistroPesoById({ id });
            if (registro){
                await deletarRegistroPeso({id});
            };
        } catch (error:any) {
            throw new Error(`Erro ao deletar registro de peso com id ${id}.\nErro: ${error.message}.`);
        };        
    };
};

