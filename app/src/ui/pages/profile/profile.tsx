import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import './profile.css';
import InputField from '../../components/InputField/inputfield';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';

interface Props {
  
}

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

const EditProfile: React.FC<Props> = () => {

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


      const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/dashboard');
    };

  return (
    <div>
      <Navbar username={dadosUsuario.nome !== '' ? dadosUsuario.nome : 'Nome usuário'}/>
      <Header />
      <div className="profile-text">Perfil</div>
      <div className="input-container">
      <div className="edit-input-row">
          <div className="input-field">
            <div className="signup-gray-text">Nome Completo</div>
            <InputField 
              placeholder="nomecompleto"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
          <div className="input-field">
            <div className="signup-gray-text">Peso Atual</div>
            <InputField
              placeholder="pesoatual"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
          <div className="input-field">
            <div className="signup-gray-text">Peso Desejado</div>
            <InputField
              placeholder="pesodesejado"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
        </div>

        <div className="edit-input-row">
          <div className="input-field">
            <div className="signup-gray-text">Nome de Usuário</div>
            <InputField
              placeholder="nomedeusuario"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
          <div className="input-field">
            <div className="signup-gray-text">Email</div>
            <InputField
              placeholder="email"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
          <div className="input-field">
            <div className="signup-gray-text">Tempo para a meta</div>
            <InputField
              placeholder="tempoparameta"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
        </div>

        <div className="edit-input-row">
          <div className="input-field">
            <div className="signup-gray-text">Senha</div>
            <InputField
              placeholder="senha"
              value='{credenciaisUsuario.senha}'
              name='nomecompleto'
              onChange={handleDashboard}
            />
          </div>
          <div className="input-field">
            <div className="signup-gray-text">Idade</div>
                <InputField
                placeholder="idadedousuario"
                value='{credenciaisUsuario.senha}'
                name='nomecompleto'
                onChange={handleDashboard}
                />
            </div>
        </div>
        <div className="button">
          <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="EDITAR PERFIL"
            width="320px"
            height="35px"
            fontSize="14px"
            onClick={handleDashboard}
            type='submit'
          />
        </div>
    </div>
</div>
  );
}

export default EditProfile;
