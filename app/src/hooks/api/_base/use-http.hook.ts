import { useContext, useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import UserContext from "../../../contexts/user/user.context";
import { LOCAL_STORAGE_USER_KEY } from "../../../constants/localstorage/localStorage";

interface IHttpMethods {
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  remove: (url: string, config?: AxiosRequestConfig, body?: any) => Promise<AxiosResponse<any>>;
}

export function useHttp({ baseURL, headers }: { baseURL?: string; headers?: any }): IHttpMethods {
  const { globalUser,setGlobalUser } = useContext(UserContext);

  const instance = useMemo(() => {
    const httpInstance = axios.create({ baseURL, headers });

    httpInstance.interceptors.request.use((config) => {
      const token = globalUser.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    httpInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401) {
          setGlobalUser({
            token: ""
          });
        }
        throw error;
      }
    );

    return httpInstance;
  }, [baseURL, headers, setGlobalUser]);

  async function post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    try {
      const response = await instance.post(url, data, config);
      return response;
    } catch (error:any) {
      const status = error?.response?.status;
      if (status === 401) {
        setGlobalUser({
          token: ""
        });
      }
      throw error;
    }
  }

  async function put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    try {
      const response = await instance.put(url, data, config);
      return response;
    } catch (error:any) {
      const status = error?.response?.status;
      if (status === 401) {
        setGlobalUser({
          token: ""
        });
      }
      throw error;
    }
  }

  async function get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    try {
      const response = await instance.get(url, config);
      return response;
    } catch (error:any) {
      const status = error?.response?.status;
      if (status === 401) {
        setGlobalUser({
          token: ""
        });
      }
      throw error;
    }
  }

  async function remove(url: string, config?: AxiosRequestConfig, body?: any): Promise<AxiosResponse<any>> {
    try {
      const response = await instance.delete(url, { ...config, data: body });
      return response;
    } catch (error:any) {
      const status = error?.response?.status;
      if (status === 401) {
        setGlobalUser({
          token: ""
        });
      }
      throw error;
    }
  }

  return useMemo<IHttpMethods>(
    () => ({
      post,
      get,
      put,
      remove,
    }),
    [post, get, put, remove]
  );
}
