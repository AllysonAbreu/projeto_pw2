import React from 'react';
import './signup.css';
import logo from '../../assets/logo.png';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <div className="page">
      <div className="signuptitle">
        Crie sua conta
      </div>
      <div className="signupcontainer">
        <img src={logo} alt="Logo" className="signuplogo" />

        <div className="input-row">
          <div>
            <div className="signup-gray-text">Nome Completo</div>
            <InputField
              placeholder="nomecompleto"
            />
          </div>
          <div>
            <div className="signup-gray-text">Peso Atual</div>
            <InputField
              placeholder="pesoatual"
            />
          </div>
          <div>
            <div className="signup-gray-text">Peso Desejado</div>
            <InputField
              placeholder="pesodesejado"
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="signup-gray-text">Nome de Usuário</div>
            <InputField
              placeholder="nomedeusuario"
            />
          </div>
          <div>
            <div className="signup-gray-text">Email</div>
            <InputField
              placeholder="email"
            />
          </div>
          <div>
            <div className="signup-gray-text">Tempo para a meta</div>
            <InputField
              placeholder="tempoparameta"
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="signup-gray-text">Senha</div>
            <InputField
              placeholder="senha"
            />
          </div>
          <div>
            <div className="signup-gray-text">Idade</div>
            <InputField
              placeholder="idadedousuario"
            />
          </div>
        </div>
        <div className="button">
          <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="CRIAR CONTA"
            width="320px"
            height="35px"
            fontSize="14px"
            onClick={handleDashboard}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
