import { useMemo } from "react";

import { useHttp } from "../_base/use-http.hook";

interface RegistroPesoApi {
  register: (idRequest:string, pesoRequest:string ) => Promise<any>;
  updateRegister: ( idRequest:string, pesoRequest:string ) => Promise<any>;
  removeRegister: (id:number) => Promise<any>;
  getRegisters: (id:number, page:number, pageSize:number) => Promise<any>;
};

export function useRegistroPesoApi(): RegistroPesoApi {
  const httpInstance = useHttp({ baseURL: process.env.REACT_APP_API_URL });

  const register = async ( idRequest:string, pesoRequest:string ): Promise<any> => {
    const payloadMapped = {
        id: parseInt(idRequest),
        peso: parseFloat(pesoRequest)
    };
    try {
      const response = await httpInstance.post("/pesos", payloadMapped);
      return response;
    } catch (error:any) {
      throw error;
    };
  };

  const updateRegister = async (idRequest:string, pesoRequest:string): Promise<any> => {
    const id = parseInt(idRequest);
    const payloadMapped = {
        peso: parseFloat(pesoRequest)
    };
    try {
      const response = await httpInstance.put(`/usuarios/pesos/${id}`, payloadMapped);
      return response;
    } catch (error:any) {
      throw error;
    };
  };

  const removeRegister = async(id:number): Promise<any> => {
    try {
      return await httpInstance.remove(`/usuarios/pesos/${id}`);
    } catch (error:any) {
      throw error;
    };
  };

  const getRegisters = async(id:number, page:number, pageSize:number): Promise<any> => {
    try {
      const response = await httpInstance.get(`/usuarios/${id}/pesos?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error:any) {
      throw error;
    };
  };

  return useMemo<RegistroPesoApi>(
    () => ({
      register,
      updateRegister,
      removeRegister,
      getRegisters
    }),
    []
  );
};
