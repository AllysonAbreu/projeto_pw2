import React from 'react';
import './sidemenu.css';
import MenuButton from '../MenuButton/menubutton';

const SidebarMenu: React.FC = () => {
  return (
    <div className="sidebar-menu">
      <h3 className="menu-title">Menu</h3>
      <MenuButton buttonText="Resumo de progresso" />
      <MenuButton buttonText="Registro de alimentação" />
      <MenuButton buttonText="Registro de exercícios" />
      <MenuButton buttonText="Logout" />
    </div>
  );
}

export default SidebarMenu;
