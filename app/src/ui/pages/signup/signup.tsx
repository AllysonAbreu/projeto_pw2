import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';


import logo from '../../../assets/images/logo.png';
import './signup.css';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';

const CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE = {
  nome:'',
  idade:'',
  email:'',
  senha:'',
  peso:'',
  peso_meta:'',
  altura:'',
  tempo_meta:'',
};


const Signup: React.FC = () => {

  const [credenciaisRegistro, setCredenciaisRegistro] = useState(CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE);
  const [erro, setErro] = useState('');

  const { register } = useUserApi();

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(value) {
        setErro('');
    };
    setCredenciaisRegistro({...credenciaisRegistro, [name]: value});
  };

  const handleRegister = async (event:React.FormEvent) => {
    event.preventDefault();

    const inputCredenciaisRegistro = Object.entries(credenciaisRegistro);
    const validateForm = inputCredenciaisRegistro.every(([_, value]) => value);

    if(validateForm) {
        try {
            await register(credenciaisRegistro);
            setCredenciaisRegistro(CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE)
            navigate(ROUTE_PATHS.LOGIN);
        } catch (error:any) {
            setErro(error.message);
        }
    };
  };
  
  const handleBackLogin = () => {
    navigate(ROUTE_PATHS.LOGIN);
  };
  
  return (
    <div className="page">
      <div className="signuptitle">
        Crie sua conta
      </div>
      <div className="signupcontainer">
        <img src={logo} alt="Logo" className="signuplogo" />
  	  <form className= "form-singup" onSubmit={handleRegister}>
      <div className="input-row">
          <div>
            <div className="signup-gray-text">Nome Completo</div>
            <InputField
              type='text'
              placeholder="nome"
              name='nome'
              value={credenciaisRegistro.nome}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="signup-gray-text">Email</div>
            <InputField
              type='email'
              placeholder="user@provedor.com"
              name='email'
              value={credenciaisRegistro.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="signup-gray-text">Senha</div>
            <InputField
              type='password'
              placeholder="sua@senha"
              name='senha'
              value={credenciaisRegistro.senha}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="signup-gray-text">Peso Atual</div>
            <InputField
              type='number'
              placeholder="65.90"
              name='peso'
              value={credenciaisRegistro.peso}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="signup-gray-text">Peso a alcançar</div>
            <InputField
              type='number'
              placeholder="75.00"
              name='peso_meta'
              value={credenciaisRegistro.peso_meta}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="signup-gray-text">Tempo para a meta (em meses)</div>
            <InputField
              type='number'
              placeholder="10"
              name='tempo_meta'
              value={credenciaisRegistro.tempo_meta}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <div className="signup-gray-text">Altura</div>
            <InputField
              type='number'
              placeholder="1.73"
              name='altura'
              value={credenciaisRegistro.altura}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="signup-gray-text">Idade</div>
            <InputField
              type='number'
              placeholder="30"
              name='idade'
              value={credenciaisRegistro.idade}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
      </form>
      
      <div className="button-container">
      
        <div className="button-voltar">
          <Button
          buttonColor="#03045E"
          textColor="white"
          buttonText="VOLTAR"
          width="320px"
          height="35px"
          fontSize="14px"
          onClick={handleBackLogin}
          type='button'
          />
        </div>
        <div className="button">
          <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="CRIAR CONTA"
            width="320px"
            height="35px"
            fontSize="14px"
            type='submit'
          />
        </div>
      </div>
      
      </div>
    </div>
  );
}

export default Signup;
