import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import SidebarMenu from '../../components/SideMenu/sidemenu';
import SearchBar from '../../components/SearchBar/searchbar';
import CustomButton from '../../components/CustomButton/custombutton';

import './dashboard.css'
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import UserContext from '../../../contexts/user/user.context';

const DADOS_USUARIO = {
  id: 0,
  nome: "",
  idade: 0,
  email: "",
  altura: 0,
  tempo_meta: 0,
  is_ativo: true,
  criado_em: "",
  modificado_em: "",
};

const DashboardPage = () => {

  const [dadosUsuario, setDadosUsuario] = useState(DADOS_USUARIO);
  const [erro, setErro] = useState('');

  const { globalUser } = useContext(UserContext);
  const { getUserData } = useUserApi();

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      setDadosUsuario(response);
    } catch (error) {}
  };

  useEffect(() => {
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
        <div className='button-div-row2'>
        <CustomButton text="Playlists" />
        <CustomButton text="Personal" />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
