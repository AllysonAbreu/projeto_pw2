import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import UserContext from '../../../contexts/user/user.context';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const {globalUser} = useContext(UserContext);
  const isAuthenticated = !!globalUser.id;

  return isAuthenticated ? (
      <div className='private-route-container app'>{element}</div>
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} replace />
  );
};

export default PrivateRoute;
