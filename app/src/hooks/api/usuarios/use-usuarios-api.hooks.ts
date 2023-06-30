import { useContext, useMemo } from "react";

import { useHttp } from "../_base/use-http.hook";
import UserContext from "../../../contexts/user/user.context";

interface UserApi {
  login: (credentials: { email: string; senha: string }) => Promise<any>;
  logout: () => void;
  register: (payload: {
    nome: string;
    idade: string;
    email: string;
    senha: string;
    peso: string;
    peso_meta: string;
    altura: string;
    tempo_meta: string;
  }) => Promise<any>;
  getUserData: ( ) => Promise<any>;
  updateImage: (id:string, nome:string, image: File | null) => Promise<any>;
  getUserImage: (id:string) => Promise<any>;
  updateProfile: ( id:number,
    payload: {
    nome: string;
    idade:string;
    senha: string;
    email: string;
    altura: string;
    tempo_meta: string;
    peso_meta: string;
  }) => Promise<any>;
  removeUser: (id:number) => Promise<any>;
}

export function useUserApi(): UserApi {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const httpInstance = useHttp({ baseURL: process.env.REACT_APP_API_URL });

  const login = async ({ email, senha }: { email: string; senha: string }): Promise<any> => {
    try {
      const response = await httpInstance.post("/login", { email, senha });
      return response.data;
    } catch (error:any) {
      throw error;
    };
  };

  const logout = async (): Promise<void> => {
    try {
      await httpInstance.get("/logout");
      setGlobalUser({    
        id: null,
        token: "",
      });
    } catch (error:any) {
      throw error;
    };
  };

  const register = async (payload: {
    nome: string;
    idade:string;
    email: string;
    senha: string;
    peso: string;
    peso_meta: string;
    altura: string;
    tempo_meta: string;
  }): Promise<any> => {
    const payloadMapped = {
        ...payload,
        peso: parseFloat(payload.peso),
        peso_meta: parseFloat(payload.peso_meta),
        altura: parseFloat(payload.altura),
        tempo_meta: parseInt(payload.tempo_meta),
        idade: parseInt(payload.idade),
    };
    try {
      const response = await httpInstance.post("/register/user", payloadMapped);
      return response.data;
    } catch (error:any) {
      throw error;
    };
  };

  const getUserData = async (): Promise<any> => {
    try {
      const token = globalUser.token;
      const {data} = await httpInstance.get(`/usuarios/${token}`);
      return {
        id: data.usuario?.id,
        nome: data.usuario?.nome,
        idade: data.usuario?.idade,
        email: data.usuario?.email,
        senha: data.usuario?.senha,
        altura: data.usuario?.altura,
        tempo_meta: data.usuario?.tempo_meta,
        peso_meta: data.usuario?.peso_meta,
        is_ativo: data.usuario?.is_ativo,
        criado_em: data.usuario?.criado_em,
        modificado_em: data.usuario?.modificado_em,
        imagem: data.usuario?.imagem,
      };
    } catch (error:any) {
      throw error;
    };
  };

  
  const getUserImage = async (id:string): Promise<any> => {
    try {
      const {data} = await httpInstance.get(`/usuario/${id}/midia`);
      return {
        id: data.usuario?.id,
        usuario_id: data.usuario?.usuario_id,
        nome_arquivo: data.usuario?.nome_arquivo,
        tipo_midia: data.usuario?.tipo_midia,
        conteudo: data.usuario?.conteudo,
        data_criacao: data.usuario?.data_criacao,
        data_atualizacao: data.usuario?.data_atualizacao,
      };
    } catch (error:any) {
      throw error;
    };
  };

  const updateImage = async (id: string, nome: string, image: File | null): Promise<any> => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("usuario_id", id);
        formData.append("nome_arquivo", nome);
        formData.append("conteudo", image);
        const response = await httpInstance.post("/midias", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } else {
        throw new Error("Não há arquivo de imagem.");
      }
    } catch (error: any) {
      throw error;
    }
  };
  
  
  const updateProfile = async (id:number, payload: {
    nome: string;
    idade:string;
    email: string;
    senha: string;
    altura: string;
    tempo_meta: string;
    peso_meta: string;
  }): Promise<any> => {
    const payloadMapped = {
        ...payload,
        idade: parseInt(payload.idade),
        tempo_meta: parseInt(payload.tempo_meta),
        altura: parseFloat(payload.altura),
        peso_meta: parseFloat(payload.peso_meta)
    };
    try {
      const response = await httpInstance.put(`/usuarios/${id}`, payloadMapped);
      return response;
    } catch (error:any) {
      throw error;
    };
  };

  const removeUser = async(id:number): Promise<any> => {
    try {
      return await httpInstance.remove(`/usuarios/${id}`);
    } catch (error:any) {
      throw error;
    };
  }

  return useMemo<UserApi>(
    () => ({
      login,
      logout,
      register,
      getUserData,
      getUserImage,
      updateImage,
      updateProfile,
      removeUser,
    }),
    []
  );
}
