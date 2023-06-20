import { useContext, useMemo } from "react";

import { useHttp } from "../_base/use-http.hook";
import UserContext, { IGlobalUser } from "../../../contexts/user/user.context";

interface UserApi {
  login: (credentials: { email: string; senha: string }) => Promise<any>;
  logout: (email:string) => void;
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
  getUserData: ( ) => Promise<any>;
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
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const httpInstance = useHttp({ baseURL: process.env.REACT_APP_API_URL });

  const login = async ({ email, senha }: { email: string; senha: string }): Promise<any> => {
    try {
      const response = await httpInstance.post("/login", { email, senha });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (email:string): Promise<void> => {
    await httpInstance.post("/logout", { email });
    setGlobalUser({ token: null });
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
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUserData = async (): Promise<any> => {
    try {
      const token = globalUser;
      const {data} = await httpInstance.get(`/usuarios/${token}`);
      return {
        id: data.usuario?.id,
        nome: data.usuario?.nome,
        idade: data.usuario?.idade,
        email: data.usuario?.email,
        altura: data.usuario?.altura,
        tempo_meta: data.usuario?.tempo_meta,
        is_ativo: data.usuario?.is_ativo,
        criado_em: data.usuario?.criado_em,
        modificado_em: data.usuario?.modificado_em,
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
