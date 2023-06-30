import { useNavigate } from 'react-router';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';

import logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.png';
import passwordIcon from '../../../assets/images/password.png';
import '../../app.css';

import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useContext, useEffect, useState } from 'react';
import { useUserApi } from '../../../hooks/api/usuarios/use-usuarios-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import { userTokenIsValid } from '../../../utils/userTokenIsValid.utils';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';

const CREDENCIAIS_INICIAIS_USUARIO_STATE = {
  email: '',
  senha: '',
};

const Login: React.FC = () => {
  const [credenciaisUsuario, setCredenciaisUsuario] = useState(
    CREDENCIAIS_INICIAIS_USUARIO_STATE
  );
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { login } = useUserApi();
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const { addToast } = useContext(ToastifyContext);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      setErro((currentState) => ({ ...currentState, [name]: '' }));
    };
    setCredenciaisUsuario({ ...credenciaisUsuario, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const inputCredenciaisUsuario = Object.entries(credenciaisUsuario);
    const validateForm = inputCredenciaisUsuario.every(([_, value]) => value);

    inputCredenciaisUsuario.forEach(([key, value]) => {
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
        const response = await login(credenciaisUsuario);
        setGlobalUser(response);
        addToast({
          title: 'Login realizado com sucesso!',
          message: 'Bem vindo!',
          type: TOASTIFY_STATE.SUCESSO,
          duration: 4000,
          show: true,
        });
      } catch (error:any) {
        setErro(error.response.data.message);
        addToast({
          title: 'Erro ao realizar login!',
          message: `Verifique suas credenciais e tente novamente. Erro: ${erro}`,
          type: TOASTIFY_STATE.ERROR,
          duration: 10000,
          show: true,
        });
      };
    };
  };

  const handleCreateAccount = () => {
    navigate(ROUTE_PATHS.REGISTER);
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  useEffect(() => {
    if (userTokenIsValid(globalUser)) {
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  }, [globalUser, navigate]);

  return (
    <div className="page">
      <div className="container">
        <div className="title">Faça o login em nossa</div>
        <div className="title bold">Plataforma</div>
        <img src={logo} alt="Logo" className="logo" />
        <div className="welcome-text">
          <span className="gray-text">Bem vindo ao</span>
          <span className="space"> </span>
          <span className="blue-text">PAF</span>
        </div>

        <form className="form-group" onSubmit={handleLogin}>
          <span className="gray-text">Usuário</span>
          <div className="user-input-container">
            <InputField
              type="email"
              placeholder="Digite seu email"
              name="email"
              value={credenciaisUsuario.email}
              onChange={handleInputChange}
            />
            <img
              className="user-login-icon"
              src={userIcon}
              alt="User login icon"
            />
          </div>        

          <span className="gray-text">Senha</span>
          <div className="password-input-container">
            <InputField
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Digite sua senha"
              name="senha"
              value={credenciaisUsuario.senha}
              onChange={handleInputChange}
            />
            <img
              className="password-icon"
              src={passwordIcon}
              alt="Password Icon"
              onClick={toggleMostrarSenha}
            />
          </div>

          <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="ENTRAR"
            width="350px"
            height="40px"
            fontSize="16px"
            type="submit"
          />
        </form>
        <div className="button-group">
          <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="CRIAR CONTA"
            width="350px"
            height="40px"
            fontSize="16px"
            onClick={handleCreateAccount}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

