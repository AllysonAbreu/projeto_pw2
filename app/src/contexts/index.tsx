import React, { ReactNode } from "react";
import { UserContextProvider } from "./user/user.context"

const GlobalContext: React.FC< {children:ReactNode} > = ({children}) => {
    return <UserContextProvider> {children} </UserContextProvider>;
};

export default GlobalContext;