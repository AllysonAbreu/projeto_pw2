import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import SidebarMenu from '../../components/SideMenu/sidemenu';
import SearchBar from '../../components/SearchBar/searchbar';
import CustomButton from '../../components/CustomButton/custombutton';

import './dashboard.css'
import { useUserApi } from '../../../hooks/api/usuarios/use-usuarios-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import Loader from '../../components/Loader/loader';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { DADOS_USUARIO } from '../../../constants/initialUser/initialUser';

const DashboardPage = () => {

  const [dadosUsuario, setDadosUsuario] = useState(DADOS_USUARIO);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );

  const { globalUser } = useContext(UserContext);
  const { addToast } = useContext(ToastifyContext);
  const { getUserData } = useUserApi();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserIsLoading(true);
        const response = await getUserData();
        setDadosUsuario(response);
      } catch (error:any) {
        setErro(error.response.data.message);
        addToast({
          title: 'Erro ao carregar dados do usuário',
          message: `Aguarde um pouco ou atualize a página. Erro: ${erro}`,
          type: TOASTIFY_STATE.ERROR,
          duration: 10000,
          show: true,
        });
      };
      setUserIsLoading(false);
    };
    fetchUserData();
  }, [globalUser]);


  return (
    <div>
      <Navbar username={dadosUsuario.nome !== '' ? dadosUsuario.nome : 'Nome usuário'}/>
      <Header />
      <SidebarMenu dados={dadosUsuario} />
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="button-div">
        <div className='button-div-row1'>
          <CustomButton text="Nutricionistas"/>
          <CustomButton text="Academias" />
        </div>
          {userIsLoading && (
            <div className="loader-user">
              <Loader/>
            </div>
          )}
        <div className='button-div-row2'>
          <CustomButton text="Playlists" />
          <CustomButton text="Personal" />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
