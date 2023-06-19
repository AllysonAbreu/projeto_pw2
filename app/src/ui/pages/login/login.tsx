import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/inputfield';
import Button from '../../components/Button/button';

import logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.png';
import passwordIcon from '../../../assets/images/password.png';
import '../../app.css';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useEffect, useState } from 'react';
import { useUserApi } from '../../../hooks/api/usuarios/usuarios-user-api.hooks';
import { useGlobalUser } from '../../../contexts/user/user.context';

const CREDENCIAIS_INICIAIS_USUARIO_STATE = {
    email: '',
    senha: '',
};

const Login: React.FC = () => {

    const [credenciaisUsuario, setCredenciaisUsuario] = useState(CREDENCIAIS_INICIAIS_USUARIO_STATE);
    const [erro, setErro] = useState('');

    console.log(credenciaisUsuario)
    const { login } = useUserApi();
    const { user, setGlobalUser } = useGlobalUser();

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if(value) {
            setErro('');
        };
        setCredenciaisUsuario({...credenciaisUsuario, [name]: value});
    };

    const handleLogin = async (event:any) => {
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
                const {id} = await login(credenciaisUsuario);
                setGlobalUser(id);
            } catch (error:any) {
                setErro(error.message);
            }
        }
    };

    useEffect(() => {
        if(user?.id) {
            navigate(ROUTE_PATHS.DASHBOARD);
        }
    }, [user, navigate]);
    
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
