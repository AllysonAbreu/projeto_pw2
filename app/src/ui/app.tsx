import { Routes, Route } from "react-router";
import { ROUTE_PATHS } from '../constants/routesPaths/routePaths';
import React from 'react';
import PrivateRoute from './components/privateRoutes/privateRoute.component';


import './app.css';
import Login from "./pages/login/login";
import Signup from './pages/signup/signup';
import AboutPage from './pages/about/about';
import DashboardPage from './pages/dashboard/dashboard';



function App() {

  // const [sessionContext, updateSessionContext] = useSessionContext();

  // const setRedirectPath = (path: string) => {
  //   updateSessionContext({...sessionContext, redirectPath: path});
  // }

  // if(!sessionContext.redirectPath) {
  //   setRedirectPath(ROUTE_PATHS.LOGIN);
  // }

  // const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  //   isAuthenticated: !!sessionContext.isAuthenticated,
  //   authenticationPath: ROUTE_PATHS.LOGIN,
  //   redirectPath: sessionContext.redirectPath,
  //   setRedirectPath: setRedirectPath
  // };

  // return (
  //     <div className='app'>
  //       <Routes>
  //         <Route path={ROUTE_PATHS.LOGIN} element={<Signup />} />
  //         <Route path={ROUTE_PATHS.HOME} element={
  //           <PrivateRoute {...defaultProtectedRouteProps} outlet={<Home />} />} />
  //         <Route path={ROUTE_PATHS.ABOUTUS} element={
  //           <PrivateRoute {...defaultProtectedRouteProps} outlet={<AboutPage />} />} />
  //         <Route path={ROUTE_PATHS.DASHBOARD} element={
  //           <PrivateRoute {...defaultProtectedRouteProps} outlet={<DashboardPage />} />} />
  //       </Routes>
  //     </div>
  // );

  return (
    <>
      <div className="app">
        <Routes>
          <Route 
            path={ROUTE_PATHS.REGISTER}
            element={<Signup />}
          />
          <Route 
            path={ROUTE_PATHS.LOGIN}
            element={ <Login />}
          />
          <Route 
            path={ROUTE_PATHS.DASHBOARD}
            element={
              <PrivateRoute path={ROUTE_PATHS.DASHBOARD} element={<DashboardPage />} />
            }
          />
          <Route 
            path={ROUTE_PATHS.ABOUTUS}
            element={
              <PrivateRoute path={ROUTE_PATHS.ABOUTUS} element={<AboutPage />} />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
