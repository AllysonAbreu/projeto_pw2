import React, { createContext, useContext, useState, useCallback } from "react";
import { LOCAL_STORAGE_USER_KEY } from "../../constants/localstorage/localStorage";

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUser {
  id: string;
}

interface IUserContext {
  user: IUser;
  setGlobalUser: (user: IUser) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(() => {
    const stringifyUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return JSON.parse(stringifyUser ?? "{}") as IUser;
  });

  const setGlobalUser = useCallback((user: IUser ) => {
    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  }, []);

  const value: IUserContext = {
    user,
    setGlobalUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useGlobalUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Usuário global deve ser utilizado como um provedor de usuários.");
  }
  return context;
};

export { UserProvider, useGlobalUser };
