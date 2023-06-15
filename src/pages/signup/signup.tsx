import React from 'react';
import './signup.css';
import logo from '../../assets/logo.png';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';

const Signup: React.FC = () => {
  return (
    <div className="page">
      <div className="title">
        Crie sua conta
      </div>
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />

        <div className="input-row">
          <div>
            <div className="gray-text">Nome Completo</div>
            <InputField
              placeholder="nomecompleto"
            />
          </div>
          <div>
            <div className="gray-text">Peso Atual</div>
            <InputField
              placeholder="pesoatual"
            />
          </div>
          <div>
            <div className="gray-text">Peso Desejado</div>
            <InputField
              placeholder="pesodesejado"
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="gray-text">Nome de Usuário</div>
            <InputField
              placeholder="nomedeusuario"
            />
          </div>
          <div>
            <div className="gray-text">Email</div>
            <InputField
              placeholder="email"
            />
          </div>
          <div>
            <div className="gray-text">Tempo para a meta</div>
            <InputField
              placeholder="tempoparameta"
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="gray-text">Senha</div>
            <InputField
              placeholder="senha"
            />
          </div>
          <div>
            <div className="gray-text">Idade</div>
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
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
