import { Routes, Route } from "react-router";
import { ROUTE_PATHS } from '../constants/routesPaths/routePaths';
import PrivateRoute from './components/privateRoutes/privateRoute.component';

import './app.css';
import Login from "./pages/login/login";
import Signup from './pages/signup/signup';
import AboutPage from './pages/about/about';
import DashboardPage from './pages/dashboard/dashboard';
import EditProfile from "./pages/profile/profile";
import Toastify from "./components/Toastify/toastify.component";
import WeightPage from "./pages/weight/weight";


function App() {

  return (
      <div className="app">
        <Routes>
          <Route 
            path={ROUTE_PATHS.REGISTER}
            element={<Signup />}
          />
          <Route 
            path={ROUTE_PATHS.LOGIN}
            element={<Login />}
          />
          <Route
            path={ROUTE_PATHS.DASHBOARD}
            element={
              <PrivateRoute element={<DashboardPage />} />
            }
          />
          <Route
            path={ROUTE_PATHS.PROFILE}
            element={
              <PrivateRoute element={<EditProfile />} />
            }
          />
          <Route 
            path={ROUTE_PATHS.ABOUTUS}
            element={
              <PrivateRoute element={<AboutPage />} />
            }
          />
          <Route 
            path={ROUTE_PATHS.WEIGHT}
            element={
              <PrivateRoute element={<WeightPage />} />
            }
          />
        </Routes>
        <Toastify/>
      </div>
  );
};

export default App;
