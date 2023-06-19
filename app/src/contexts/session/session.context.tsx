import React, { createContext, useContext, useState } from "react";
import { Session, initialSession } from "../../models/session";

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider: React.FC<SessionProviderProps> = (props) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
};
