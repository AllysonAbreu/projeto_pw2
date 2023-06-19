import { useMemo } from "react";

import { useHttp } from "../_base/use-http.hook";
import { useGlobalUser } from "../../../contexts/user/user.context";

interface UserApi {
  login: (credentials: { username: string; password: string }) => Promise<any>;
  logout: () => void;
  register: (payload: {
    nome: string;
    idade:number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
  }) => Promise<any>;
  getUserData: (
    id:number
  ) => Promise<any>;
  updateImage: (image: File) => Promise<any>;
  updateProfile: ( id:number,
    payload: {
    nome: string;
    idade:number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
  }) => Promise<any>;
}

export function useUserApi(): UserApi {
  const {setGlobalUser} = useGlobalUser();
  const httpInstance = useHttp({ baseURL: process.env.REACT_APP_API_URL });

  const login = async ({ username, password }: { username: string; password: string }): Promise<any> => {
    try {
      const response = await httpInstance.post("/login", null, {
        auth: { username, password },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    await httpInstance.post("/logout");
    setGlobalUser({ id: "" });
  };

  const register = async (payload: {
    nome: string;
    idade:number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
  }): Promise<any> => {
    const payloadMapped = {
        nome: payload.nome,
        idade: payload.idade,
        email: payload.email,
        senha: payload.senha,
        peso: payload.peso,
        peso_meta: payload.peso_meta,
        altura: payload.altura,
        tempo_meta: payload.tempo_meta,
    };
    try {
      const response = await httpInstance.post("/register/user", payloadMapped);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserData = async (id:number): Promise<any> => {
    try {
      const { data } = await httpInstance.get(`/usuarios/${id}`);
      return {
        id: data?.id,
        nome: data?.nome,
        idade: data?.idade,
        email: data?.email,
        altura: data?.altura,
        tempo_meta: data?.tempo_meta,
        is_ativo: data?.is_ativo,
        criado_em: data?.criado_em,
        modificado_em: data?.modificado_em,
      };
    } catch (error) {
      throw error;
    }
  };

  const updateImage = async (image: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("foto", image);

      const response = await httpInstance.post("/usuarios/alterarFoto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (id:number, payload: {
    nome: string;
    idade:number;
    email: string;
    senha: string;
    peso: number;
    peso_meta: number;
    altura: number;
    tempo_meta: number;
  }): Promise<any> => {
    const payloadMapped = {
        nome: payload.nome,
        idade: payload.idade,
        email: payload.email,
        senha: payload.senha,
        peso: payload.peso,
        peso_meta: payload.peso_meta,
        altura: payload.altura,
        tempo_meta: payload.tempo_meta,
    };
    try {
      const response = await httpInstance.put(`/usuarios/${id}`, payloadMapped);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const removeUser = async(id:number): Promise<any> => {
    try {
      return await httpInstance.remove(`/usuarios/${id}`);
    } catch (error) {
      throw error;
    };
  }

  return useMemo<UserApi>(
    () => ({
      login,
      logout,
      register,
      getUserData,
      updateImage,
      updateProfile,
      removeUser,
    }),
    []
  );
}
