import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import { useUserApi } from '../../../hooks/api/usuarios/use-usuarios-api.hooks';
import UserContext from '../../../contexts/user/user.context';
import './weight.css';
import InputField from '../../components/InputField/inputfield';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import Loader from '../../components/Loader/loader';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { DADOS_USUARIO, INITIAL_WEIGHT } from '../../../constants/initialUser/initialUser';
import { useRegistroPesoApi } from '../../../hooks/api/registroPeso/use-registroPeso-api.hooks';
import { usePagination } from '../../../hooks/pagination/use-pagination.hook';
import { INITIAL_CONTENT_PAGEABLE, INITIAL_CONTENT_PAGE_SIZE } from '../../../constants/initialContentPage/initialContentPage';
import CardWeight from '../../components/CardWeight/cardWeight-component';
import CustomButton from '../../components/CustomButton/custombutton';


const WeightPage: React.FC = () => {

  const [dadosUsuario, setDadosUsuario] = useState(DADOS_USUARIO);
  const [isDadosUpdated, setIsDadosUpdated] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );
  const [registroPeso, setRegistroPeso] = useState(INITIAL_WEIGHT);
  const { page, handleBeforePage, handleNextPage } = usePagination();
  const [pageableDados, setPageableDados] = useState(INITIAL_CONTENT_PAGEABLE);
  const [registrosPesos,setRegistrosPesos] = useState([]);


  const { addToast } = useContext(ToastifyContext);
  const { getUserData } = useUserApi();
  const { register, getRegisters } = useRegistroPesoApi();

  const navigate = useNavigate();

  const handleInputRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(value) {
      setErro((currentState) => ({ ...currentState, [name]: '' }));
    };
    setRegistroPeso({...registroPeso, [name]:value});
  };

  const handleRegistraInfo = async (event:React.FormEvent) => {
    event.preventDefault();

    const inputNovosDados = Object.entries(registroPeso);
    const validateForm = inputNovosDados.every(([_, value]) => value);

    inputNovosDados.forEach(([key, value]) => {
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
          await register(
            dadosUsuario.id,
            registroPeso.peso
          );
          setIsDadosUpdated(!isDadosUpdated)
          addToast({
            title: 'Dados inseridos com sucesso',
            message: 'Seus dados foram inseridos com sucesso!',
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

  function mappedPageInfo(responseUser:any){
    const id = responseUser.id;
    const size = INITIAL_CONTENT_PAGE_SIZE;
    return {
      id,
      size
    };
  };

  function mappedPageableInfo(responsePesos:any){
    const totalPages = responsePesos.totalPages;
    const currentPage = responsePesos.currentPage;

    return {
      totalPages,
      currentPage
    };
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          setDataIsLoading(true);
          const responseUser = await getUserData();
          setDadosUsuario(responseUser);
          const {id, size} = mappedPageInfo(responseUser);
          const responsePesos = await getRegisters(id, page, size);
          setRegistrosPesos(responsePesos.registrosPeso.registrosPeso);
          const {totalPages, currentPage} = mappedPageableInfo(responsePesos);
          setPageableDados({totalPages, currentPage});
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
        setDataIsLoading(false);
      };
      fetchData();
    }, [page, isDadosUpdated]);

  const handleBackDashboard = () => {
    navigate(ROUTE_PATHS.DASHBOARD);
  };

  function renderCards(){
    return registrosPesos.map((registro:any, index:number) => {
      return (
        <CardWeight
          key={index}
          id={registro.id}
          userId={dadosUsuario.id}
          peso={registro.peso}
          dataCriacao={registro.criado_em}
          dataModificacao={registro.modificado_em}
        />
    )});
  };

  return (
    <div className='app'>
      <Navbar username={dadosUsuario.nome} userId={dadosUsuario.imagem} />
      <Header />
      <div className="profile-text">Histórico de Registros</div>
      {dataIsLoading && (
          <div className="loader-user">
            <Loader/>
          </div>
      )}
      <div className='principal-content'>
      <div className="input-container">
        <form className= "form-singup" onSubmit={handleRegistraInfo}>
        <div className="input-row">
          <div className="signup-gray-text">Novo registro:</div>
            <InputField
              type='number'
              placeholder="75.98"
              name='peso'
              value={registroPeso.peso}
              onChange={handleInputRegisterChange}
            />
          <div className="button-save-novo-registro-peso">
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
        </div>
      </form>
      <div>
        {pageableDados && (
          <div className='registro-peso-info'>
            <div className="wrapper__registro-peso">
              <div className="registro-peso__title signup-gray-text">Registros:</div>
              <div className="registro-peso__container">
                {renderCards()}
              </div>
              <div className='pagination-weight'>
                <CustomButton
                  className={`button__pagination-anterior`}
                  text="Voltar"      
                  onClick={handleBeforePage}
                  type='button'
                  disabled={page === 1}
                />
                <span className='numero_pagina'>{page}</span>
                <CustomButton
                  className={`button__pagination-proximo`}
                  text="Próximo"
                  onClick={handleNextPage}
                  type='button'
                  disabled={page === pageableDados.totalPages}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="button-group">
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
  </div>
  );
};

export default WeightPage;
