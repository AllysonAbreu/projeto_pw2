import { useNavigate } from 'react-router';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';

import logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.png';
import passwordIcon from '../../../assets/images/password.png';
import '../../app.css';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useContext, useEffect, useState } from 'react';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import { userTokenIsValid } from '../../../utils/userTokenIsValid.utils';

const CREDENCIAIS_INICIAIS_USUARIO_STATE = {
    email: '',
    senha: '',
};

const Login: React.FC = () => {

    const [credenciaisUsuario, setCredenciaisUsuario] = useState(CREDENCIAIS_INICIAIS_USUARIO_STATE);
    const [erro, setErro] = useState('');

    const { login } = useUserApi();
    const { globalUser, setGlobalUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if(value) {
            setErro('');
        };
        setCredenciaisUsuario({...credenciaisUsuario, [name]: value});
    };

    const handleLogin = async (event:React.FormEvent) => {
        event.preventDefault();

        const inputCredenciaisUsuario = Object.entries(credenciaisUsuario);
        const validateForm = inputCredenciaisUsuario.every(([_, value]) => value);

        inputCredenciaisUsuario.forEach(([key, value]) => {
            if(!value) {
                setErro(`O campo ${key} é obrigatório`);
            }
            return value;
        });

        if(validateForm) {
            try {
                const {token} = await login(credenciaisUsuario);
                setGlobalUser(token);
            } catch (error:any) {
                setErro(error.message);
            }
        }
    };

    const handleCreateAccount = () => {
        navigate(ROUTE_PATHS.REGISTER);
    };

    useEffect(() => {
        if(userTokenIsValid(globalUser)) {
            navigate(ROUTE_PATHS.DASHBOARD);
        }
    }, [globalUser, navigate]);
  
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
            <form className="form-group" onSubmit={handleLogin}>
                <span className="gray-text">Usuário</span>
                <InputField
                    type="email"
                    placeholder="Digite seu email"
                    iconImage={userIcon}
                    name="email"
                    value={credenciaisUsuario.email}
                    onChange={handleInputChange}
                />
                <span className="gray-text">Senha</span>
                <InputField
                    type="password"
                    placeholder="Digite sua senha"
                    iconImage={passwordIcon}
                    name="senha"
                    value={credenciaisUsuario.senha}
                    onChange={handleInputChange}
                />
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
                type='button'
                />
            </div>
            </div>
        </div>
    );
}

export default Login;
