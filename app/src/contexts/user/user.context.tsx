import React, { createContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_USER_KEY } from "../../constants/localstorage/localStorage";

export interface IGlobalUser {
  token: string | null;
}

interface IUserContext {
  globalUser: IGlobalUser;
  setGlobalUser: React.Dispatch<React.SetStateAction<IGlobalUser>>;
}

const DEFAULT_GLOBAL_USER = {
  globalUser: {
    token: "",
  },
  setGlobalUser: () => {},
}

const UserContext = createContext<IUserContext>(DEFAULT_GLOBAL_USER);

const UserContextProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [globalUser, setGlobalUser] = useState<IGlobalUser>(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return DEFAULT_GLOBAL_USER.globalUser;
  });

  const useSetGlobalUser = useCallback((user: IGlobalUser | ((prevState: IGlobalUser) => IGlobalUser)) => {
    setGlobalUser(prevState => {
      if (typeof user === 'function') {
        return user(prevState);
      }
      return user;
    });

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify({token: user}));
  }, []);

  return (
    <UserContext.Provider value={{ globalUser, setGlobalUser:useSetGlobalUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider };
export default UserContext;
