import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';


import logo from '../../../assets/images/logo.png';
import './signup.css';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useUserApi } from '../../../hooks/api/usuarios/use-usuarios-api.hooks';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE } from '../../../constants/initialUser/initialUser';


const Signup: React.FC = () => {

  const [credenciaisRegistro, setCredenciaisRegistro] = useState(CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE);
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );
  console.log(`erro: ${erro.message}`)
  console.log(`cred user: ${credenciaisRegistro.nome}`)


  const { addToast } = useContext(ToastifyContext);
  
  const { register } = useUserApi();

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      setErro((currentState) => ({ ...currentState, [name]: '' }));
    };
    setCredenciaisRegistro({...credenciaisRegistro, [name]: value});
  };

  const handleRegister = async (event:React.FormEvent) => {
    event.preventDefault();
    const inputCredenciaisRegistro = Object.entries(credenciaisRegistro);
    const validateForm = inputCredenciaisRegistro.every(([_, value]) => value);

    inputCredenciaisRegistro.forEach(([key, value]) => {
      if (!value) {
        setErro((currentState) => ({
          ...currentState,
          [key]: 'Campo obrigatório',
        }));
      };
      return value;
    });

    if(validateForm) {
      try {
        await register(credenciaisRegistro);
        setCredenciaisRegistro(CREDENCIAIS_INICIAIS_REGISTRO_USUARIO_STATE)
        addToast({
            title: 'Cadastro realizado com sucesso!',
            message: 'Você já pode fazer login na aplicação.',
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
          title: 'Erro ao cadastrar usuário!',
          message: `Verifique os campos e tente novamente. Erro: ${erro}`,
          type: TOASTIFY_STATE.ERROR,
          duration: 10000,
          show: true,
        });
      };
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
        <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="CRIAR CONTA"
            width="320px"
            height="35px"
            fontSize="14px"
            type='submit'
          />
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
      </div>
      
      </div>
    </div>
  );
}

export default Signup;
