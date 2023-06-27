import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import './profile.css';
import InputField from '../../components/InputField/inputfield';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import Loader from '../../components/Loader/loader';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';

const DADOS_USUARIO = {
    id: "",
    nome: "",
    idade: "",
    email: "",
    senha: "",
    altura: "",
    tempo_meta: "",
};

const EditProfile: React.FC = () => {

    const [dadosUsuario, setDadosUsuario] = useState(DADOS_USUARIO);
    const [novosDadosUsuario, setNovosDadosUsuario] = useState(DADOS_USUARIO);
    const [isDadosUpdated, setIsDadosUpdated] = useState(false);
    const [userIsLoading, setUserIsLoading] = useState(false);
    const [erro, setErro] = useState(
      CREDENCIAIS_INICIAIS_ERRO_STATE
    );

    const { globalUser } = useContext(UserContext);
    const { addToast } = useContext(ToastifyContext);
    const { getUserData, updateProfile, removeUser, logout } = useUserApi();

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if(value) {
        setErro((currentState) => ({ ...currentState, [name]: '' }));
      };
      setNovosDadosUsuario({...novosDadosUsuario, [name]: value});
    };

    const handleUpdadteUser = async (event:React.FormEvent) => {
      event.preventDefault();
      
      const novosDados = {
        id: novosDadosUsuario.id ? novosDadosUsuario.id : dadosUsuario.id,
        nome: novosDadosUsuario.nome ? novosDadosUsuario.nome : dadosUsuario.nome,
        idade: novosDadosUsuario.idade ? novosDadosUsuario.idade : dadosUsuario.idade,
        email: novosDadosUsuario.email ? novosDadosUsuario.email : dadosUsuario.email,
        senha: novosDadosUsuario.senha ? novosDadosUsuario.senha : dadosUsuario.senha,
        altura: novosDadosUsuario.altura ? novosDadosUsuario.altura : dadosUsuario.altura,
        tempo_meta: novosDadosUsuario.tempo_meta ? novosDadosUsuario.tempo_meta : dadosUsuario.tempo_meta,
      };

      const inputCredenciaisAtualizadas = Object.entries(novosDados);
      const validateForm = inputCredenciaisAtualizadas.every(([_, value]) => value);
  
      inputCredenciaisAtualizadas.forEach(([key, value]) => {
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
            await updateProfile(
              parseInt(dadosUsuario.id),
              novosDados
            );
            setIsDadosUpdated(!isDadosUpdated)
            addToast({
              title: 'Dados atualizados',
              message: 'Seus dados foram atualizados com sucesso!',
              type: TOASTIFY_STATE.SUCESSO,
              duration: 3000,
              show: true,
            });
        } catch (error:any) {
          setErro(error.response.data.message);
          addToast({
            title: 'Erro ao atualizar dados!',
            message: `Verifique suas credenciais e tente novamente. Erro: ${erro}`,
            type: TOASTIFY_STATE.ERROR,
            duration: 10000,
            show: true,
          });
        };
      };
    };
    
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
      }, [globalUser, isDadosUpdated]);

    const handleBackDashboard = () => {
      navigate(ROUTE_PATHS.DASHBOARD);
    };

    const handleDeleteAccount = () => {
      removeUser(parseInt(dadosUsuario.id))
      logout()
      addToast({
        title: 'Usuário removido com sucesso!',
        message: `Dados do usuário foram removidos com sucesso!`,
        type: TOASTIFY_STATE.SUCESSO,
        duration: 3000,
        show: true,
      });
      setTimeout(() => {
        navigate(ROUTE_PATHS.LOGIN);
      }, 3000);
    };

  return (
      <div>
        <Navbar username={dadosUsuario.nome !== '' ? dadosUsuario.nome : 'Nome usuário'}/>
        <Header />
        <div className="profile-text">Perfil</div>
        {userIsLoading && (
            <div className="loader-user">
              <Loader/>
            </div>
        )}
        <div className="input-container">
        <form className= "form-singup" onSubmit={handleUpdadteUser}>
        <div className="input-row">
            <div>
              <div className="signup-gray-text">Nome Completo</div>
              <InputField
                type='text'
                placeholder="nome"
                name='nome'
                value={novosDadosUsuario.nome}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="signup-gray-text">Email</div>
              <InputField
                type='email'
                placeholder="user@provedor.com"
                name='email'
                value={novosDadosUsuario.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="signup-gray-text">Senha</div>
              <InputField
                type='password'
                placeholder="sua@senha"
                name='senha'
                value={novosDadosUsuario.senha}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div>
              <div className="signup-gray-text">Tempo para a meta (em meses)</div>
              <InputField
                type='number'
                placeholder="10"
                name='tempo_meta'
                value={novosDadosUsuario.tempo_meta}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="signup-gray-text">Altura</div>
              <InputField
                type='number'
                placeholder="1.73"
                name='altura'
                value={novosDadosUsuario.altura}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="signup-gray-text">Idade</div>
              <InputField
                type='number'
                placeholder="30"
                name='idade'
                value={novosDadosUsuario.idade}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="button">
            <Button
              buttonColor="#03045E"
              textColor="white"
              buttonText="SALVAR"
              width="320px"
              height="35px"
              fontSize="14px"
              type='submit'
            />
          </div>
        </form>
        <div className="button-group">
            <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="APAGAR CONTA"
            width="350px"
            height="40px"
            fontSize="16px"
            onClick={handleDeleteAccount}
            type='button'
            />
            <Button
            buttonColor="#03045E"
            textColor="white"
            buttonText="VOLTAR"
            width="350px"
            height="40px"
            fontSize="16px"
            onClick={handleBackDashboard}
            type='button'
            />
          </div>
      </div>
  </div>
  );
};

export default EditProfile;
