import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import Button from './components/Button/button';
import InputField from './components/InputField/inputfield';
import userIcon from './assets/avatar.png';
import passwordIcon from './assets/password.png'
import { useNavigate } from 'react-router-dom';



const App = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/signup');
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

export default App;
