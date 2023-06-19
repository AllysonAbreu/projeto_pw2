import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';

import logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.png';
import passwordIcon from '../../../assets/images/password.png';
import '../../app.css';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';



const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate(ROUTE_PATHS.REGISTER);
  };
  
  return (
    <div className="page">
        <div className="container">
        <div className="title">
            Faça o login em nossa
        </div>
        <div className="title bold">
            Plataforma
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <div className="welcome-text">
            <span className="gray-text">Bem vindo ao</span>
            <span className="space"> </span>
            <span className="blue-text">PAF</span>
        </div>
        <div className="form-group">
            <span className="gray-text">Usuário</span>
            <InputField
            type="text"
            placeholder="Digite seu usuário"
            iconImage={userIcon}
            />
        </div>
        <div className="form-group">
            <span className="gray-text">Senha</span>
            <InputField
            type="password"
            placeholder="Digite sua senha"
            iconImage={passwordIcon}
            />
        </div>
        <div className="button-group">
            <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="CRIAR CONTA"
            width="350px"
            height="40px"
            fontSize="16px"
            onClick={handleCreateAccount}
            />
            <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="ENTRAR"
            width="350px"
            height="40px"
            fontSize="16px"
            />
        </div>
        </div>
    </div>
  );
}

export default Login;
