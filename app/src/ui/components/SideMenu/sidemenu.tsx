import React from 'react';
import './sidemenu.css';
import MenuButton from '../MenuButton/menubutton';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useNavigate } from 'react-router-dom';

const SidebarMenu: React.FC<any> = (props) => {

  const { logout } = useUserApi();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  const handleEditProfile = () => {
    navigate(ROUTE_PATHS.PROFILE);
  };

  return (
    <div className="sidebar-menu">
      <h3 className="menu-title">Menu</h3>
      <MenuButton buttonText="Resumo de progresso" />
      <MenuButton buttonText="Registro de alimentação" />
      <MenuButton buttonText="Registro de exercícios" />
      <MenuButton buttonText="Editar perfil" onClick={() => handleEditProfile()} />
      <MenuButton buttonText="Logout" onClick={() => handleLogout()}/>
    </div>
  );
}

export default SidebarMenu;
