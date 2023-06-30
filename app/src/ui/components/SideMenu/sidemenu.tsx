import React, { useContext, useState } from 'react';
import './sidemenu.css';
import MenuButton from '../MenuButton/menubutton';
import { useUserApi } from '../../../hooks/api/usuarios/use-usuarios-api.hooks';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useNavigate } from 'react-router-dom';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';

const SidebarMenu: React.FC<any> = (props) => {

  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );
  
  const { addToast } = useContext(ToastifyContext);
  const { logout } = useUserApi();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      addToast({
        title: 'Logout realizado com sucesso',
        message: 'Você será redirecionado para a página de login',
        type: TOASTIFY_STATE.SUCESSO,
        duration: 3000,
        show: true,
      });
      setTimeout(() => {
        navigate(ROUTE_PATHS.LOGIN);
      }, 3000);
    } catch (error:any) {
      setErro(error.response.data.message);
      addToast({
        title: 'Erro ao realizar logout',
        message: `Aguarde um pouco ou atualize a página. Erro: ${erro}`,
        type: TOASTIFY_STATE.ERROR,
        duration: 10000,
        show: true,
      });
    };
  };

  const handleEditProfile = () => {
    navigate(ROUTE_PATHS.PROFILE);
  };

  const handleInsertWeight = () => {
    navigate(ROUTE_PATHS.WEIGHT);
  };

  return (
    <div className="sidebar-menu">
      <h3 className="menu-title">Menu</h3>
      <MenuButton buttonText="Resumo de progresso" />
      <MenuButton buttonText="Registro de alimentação" />
      <MenuButton buttonText="Registro de peso" onClick={() => handleInsertWeight()}/>
      <MenuButton buttonText="Editar perfil" onClick={() => handleEditProfile()} />
      <MenuButton buttonText="Logout" onClick={() => handleLogout()}/>
    </div>
  );
}

export default SidebarMenu;
