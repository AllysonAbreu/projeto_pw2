import React from 'react';
import './sidemenu.css';
import MenuButton from '../MenuButton/menubutton';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';

const SidebarMenu: React.FC<any> = (props) => {

  const { logout } = useUserApi();

  const handleLogout = (email:string) => {
    logout(email);
  };

  return (
    <div className="sidebar-menu">
      <h3 className="menu-title">Menu</h3>
      <MenuButton buttonText="Resumo de progresso" />
      <MenuButton buttonText="Registro de alimentação" />
      <MenuButton buttonText="Registro de exercícios" />
      <MenuButton buttonText="Logout" onClick={() => handleLogout(props.dados.email)}/>
    </div>
  );
}

export default SidebarMenu;
