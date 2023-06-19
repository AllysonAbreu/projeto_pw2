import React from 'react';
import { useEffect } from 'react';
import { Navigate, Route, useLocation } from 'react-router';

// export type ProtectedRouteProps = {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   redirectPath: string;
//   setRedirectPath: (path: string) => void;
//   outlet: JSX.Element;
// };

// export default function PrivateRoute({isAuthenticated, authenticationPath, redirectPath, setRedirectPath, outlet}: ProtectedRouteProps) {
//   const currentLocation = useLocation();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setRedirectPath(currentLocation.pathname);
//     }
//   }, [isAuthenticated, setRedirectPath, currentLocation]);

//   if(isAuthenticated && redirectPath === currentLocation.pathname) {
//     return outlet;
//   } else {
//     return <Navigate to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }} />;
//   }
// };

import { useGlobalUser } from "../../../contexts/user/user.context";
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const {user} = useGlobalUser();

  // Verifique se o usuário está autenticado
  const isAuthenticated = !!user;

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} replace />
  );
};

export default PrivateRoute;
