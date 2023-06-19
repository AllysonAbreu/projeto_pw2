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
